-- ============================================================================
-- 디지털 교육 포털 — 데이터베이스 스키마 (Supabase / PostgreSQL)
--
-- 실행 순서:
--   1) schema.sql        (이 파일: 테이블·enum·트리거·뷰·버킷)
--   2) rls-policies.sql  (행 수준 보안 정책 + Storage 정책)
--
-- Supabase 대시보드 → SQL Editor 에 붙여넣고 실행하세요.
-- ============================================================================

-- 확장
create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- ENUM 타입
-- ----------------------------------------------------------------------------
do $$ begin
  create type public.user_role as enum ('guest', 'student', 'instructor');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.visibility as enum ('public', 'authenticated');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.submission_type as enum ('text', 'url', 'file', 'external_lms');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.submission_status as enum ('submitted', 'late', 'returned', 'resubmitted');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.post_status as enum ('open', 'answered', 'closed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.report_target as enum ('post', 'comment');
exception when duplicate_object then null; end $$;

-- ----------------------------------------------------------------------------
-- updated_at 자동 갱신 트리거 함수
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ----------------------------------------------------------------------------
-- profiles : auth.users 와 1:1. 회원가입 시 트리거로 자동 생성(기본 role=student).
--   ※ role 은 사용자가 직접 바꿀 수 없습니다(RLS + 트리거로 차단).
--   ※ 교수자 지정은 관리자 SQL 로만: update profiles set role='instructor' where id=...
-- ----------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'student',
  display_name text,
  student_number text,
  created_at timestamptz not null default now()
);

-- 신규 가입 시 프로필 자동 생성 (role 은 항상 student 로 강제)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 현재 사용자가 교수자인지 확인 (SECURITY DEFINER 로 profiles RLS 재귀 방지)
create or replace function public.is_instructor()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'instructor'
  );
$$;

-- ----------------------------------------------------------------------------
-- notices : 공지사항
-- ----------------------------------------------------------------------------
create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  is_pinned boolean not null default false,
  visibility public.visibility not null default 'authenticated',
  publish_at timestamptz,
  author_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists notices_pinned_idx on public.notices (is_pinned desc, created_at desc);
create index if not exists notices_publish_idx on public.notices (publish_at);

drop trigger if exists notices_updated on public.notices;
create trigger notices_updated before update on public.notices
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- assignments : 과제
-- ----------------------------------------------------------------------------
create table if not exists public.assignments (
  id uuid primary key default gen_random_uuid(),
  session_id text,
  title text not null,
  description text not null default '',
  due_at timestamptz,
  submission_type public.submission_type not null default 'text',
  external_url text,
  allow_late boolean not null default false,
  visibility public.visibility not null default 'authenticated',
  points integer,
  author_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists assignments_due_idx on public.assignments (due_at);

drop trigger if exists assignments_updated on public.assignments;
create trigger assignments_updated before update on public.assignments
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- assignment_submissions : 학생 제출 (본인·교수자만 접근)
-- ----------------------------------------------------------------------------
create table if not exists public.assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  text_content text,
  submitted_url text,
  file_path text,
  status public.submission_status not null default 'submitted',
  feedback text,
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (assignment_id, student_id)
);
create index if not exists submissions_assignment_idx on public.assignment_submissions (assignment_id);
create index if not exists submissions_student_idx on public.assignment_submissions (student_id);

drop trigger if exists submissions_updated on public.assignment_submissions;
create trigger submissions_updated before update on public.assignment_submissions
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- ms365_registrations : MS365 계정 등록 (비공개 폼. 본인·교수자만)
-- ----------------------------------------------------------------------------
create table if not exists public.ms365_registrations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade unique,
  student_number text not null,
  student_name text not null,
  ms365_email text not null,
  note text,
  consented_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ms365_email)
);

drop trigger if exists ms365_updated on public.ms365_registrations;
create trigger ms365_updated before update on public.ms365_registrations
  for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- anonymous_posts / anonymous_comments : 익명 게시판
--   학생 화면에는 익명 라벨만 노출. author_id 는 DB 에 저장하되 뷰로 가림.
-- ----------------------------------------------------------------------------
create table if not exists public.anonymous_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  anonymous_label text not null,
  title text not null,
  body text not null,
  status public.post_status not null default 'open',
  is_hidden boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists posts_created_idx on public.anonymous_posts (created_at desc);

drop trigger if exists posts_updated on public.anonymous_posts;
create trigger posts_updated before update on public.anonymous_posts
  for each row execute function public.set_updated_at();

create table if not exists public.anonymous_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.anonymous_posts(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  anonymous_label text not null,
  body text not null,
  is_instructor_reply boolean not null default false,
  is_hidden boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists comments_post_idx on public.anonymous_comments (post_id, created_at);

-- reports : 신고
create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.profiles(id) on delete cascade,
  target_type public.report_target not null,
  target_id uuid not null,
  reason text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- 익명 공개 뷰 : author_id 를 제외해 학생에게 작성자를 노출하지 않음.
--   (뷰 소유자 권한으로 동작하여 기반 테이블 RLS 를 우회하되, 컬럼은 안전하게 제한)
-- ----------------------------------------------------------------------------
create or replace view public.anonymous_posts_public as
  select id, anonymous_label, title, body, status, is_hidden, created_at, updated_at
  from public.anonymous_posts
  where is_hidden = false;

create or replace view public.anonymous_comments_public as
  select id, post_id, anonymous_label, body, is_instructor_reply, is_hidden, created_at
  from public.anonymous_comments
  where is_hidden = false;

-- 미등록자 확인 등 교수자용 헬퍼 뷰 (교수자만 접근하도록 RLS 로 보호되는 기반 테이블 사용)
create or replace view public.ms365_missing as
  select p.id as student_id, p.display_name, p.student_number
  from public.profiles p
  left join public.ms365_registrations r on r.student_id = p.id
  where p.role = 'student' and r.id is null;

-- ----------------------------------------------------------------------------
-- Storage 버킷
--   assignments : 과제 파일 제출 (비공개)
--   attachments : 공지/과제 첨부 (공개 읽기)
-- ----------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('assignments', 'assignments', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('attachments', 'attachments', true)
on conflict (id) do nothing;
