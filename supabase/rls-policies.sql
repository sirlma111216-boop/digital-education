-- ============================================================================
-- 행 수준 보안(RLS) 정책 + Storage 정책
-- schema.sql 실행 후 이 파일을 실행하세요.
--
-- 원칙:
--  - 공지/과제 작성·수정·삭제: instructor 만
--  - 과제 제출/ MS365 등록: 본인만 생성·조회·수정, instructor 는 전체 조회
--  - 익명글: 인증 사용자 작성, 작성자는 본인 글 수정, instructor 전체 관리
--  - 다른 학생은 author_id·실명·이메일을 조회할 수 없음(뷰로 분리)
--  - 권한은 UI 가 아니라 이 정책으로 강제
-- ============================================================================

-- 모든 대상 테이블 RLS 활성화
alter table public.profiles                enable row level security;
alter table public.notices                 enable row level security;
alter table public.assignments             enable row level security;
alter table public.assignment_submissions  enable row level security;
alter table public.ms365_registrations     enable row level security;
alter table public.anonymous_posts         enable row level security;
alter table public.anonymous_comments      enable row level security;
alter table public.reports                 enable row level security;

-- ----------------------------------------------------------------------------
-- profiles
-- ----------------------------------------------------------------------------
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles
  for select using ( id = auth.uid() or public.is_instructor() );

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update using ( id = auth.uid() )
  with check (
    id = auth.uid()
    -- 학생이 스스로 role 을 바꾸지 못하도록: 기존 role 을 그대로 유지해야 함
    and role = (select role from public.profiles p where p.id = auth.uid())
  );

-- insert 는 handle_new_user 트리거(SECURITY DEFINER)가 담당하므로 별도 정책 불필요.

-- ----------------------------------------------------------------------------
-- notices : 학생/게스트 조회(공개 범위·예약 공개 반영), 교수자 전체 관리
-- ----------------------------------------------------------------------------
drop policy if exists notices_select on public.notices;
create policy notices_select on public.notices
  for select using (
    public.is_instructor()
    or (
      (publish_at is null or publish_at <= now())
      and (
        visibility = 'public'
        or (visibility = 'authenticated' and auth.uid() is not null)
      )
    )
  );

drop policy if exists notices_write on public.notices;
create policy notices_write on public.notices
  for all using ( public.is_instructor() )
  with check ( public.is_instructor() and author_id = auth.uid() );

-- ----------------------------------------------------------------------------
-- assignments : 조회는 공개 범위 반영, 관리(생성/수정/삭제)는 교수자만
-- ----------------------------------------------------------------------------
drop policy if exists assignments_select on public.assignments;
create policy assignments_select on public.assignments
  for select using (
    public.is_instructor()
    or (
      visibility = 'public'
      or (visibility = 'authenticated' and auth.uid() is not null)
    )
  );

drop policy if exists assignments_write on public.assignments;
create policy assignments_write on public.assignments
  for all using ( public.is_instructor() )
  with check ( public.is_instructor() and author_id = auth.uid() );

-- ----------------------------------------------------------------------------
-- assignment_submissions : 본인만 CRUD, 교수자는 전체 조회 + 피드백(update)
-- ----------------------------------------------------------------------------
drop policy if exists submissions_select on public.assignment_submissions;
create policy submissions_select on public.assignment_submissions
  for select using ( student_id = auth.uid() or public.is_instructor() );

drop policy if exists submissions_insert on public.assignment_submissions;
create policy submissions_insert on public.assignment_submissions
  for insert with check ( student_id = auth.uid() );

drop policy if exists submissions_update on public.assignment_submissions;
create policy submissions_update on public.assignment_submissions
  for update using ( student_id = auth.uid() or public.is_instructor() )
  with check ( student_id = auth.uid() or public.is_instructor() );

drop policy if exists submissions_delete on public.assignment_submissions;
create policy submissions_delete on public.assignment_submissions
  for delete using ( student_id = auth.uid() or public.is_instructor() );

-- ----------------------------------------------------------------------------
-- ms365_registrations : 본인만 CRUD, 교수자는 전체 조회. 다른 학생 접근 불가.
-- ----------------------------------------------------------------------------
drop policy if exists ms365_select on public.ms365_registrations;
create policy ms365_select on public.ms365_registrations
  for select using ( student_id = auth.uid() or public.is_instructor() );

drop policy if exists ms365_insert on public.ms365_registrations;
create policy ms365_insert on public.ms365_registrations
  for insert with check ( student_id = auth.uid() );

drop policy if exists ms365_update on public.ms365_registrations;
create policy ms365_update on public.ms365_registrations
  for update using ( student_id = auth.uid() )
  with check ( student_id = auth.uid() );

drop policy if exists ms365_delete on public.ms365_registrations;
create policy ms365_delete on public.ms365_registrations
  for delete using ( student_id = auth.uid() or public.is_instructor() );

-- ----------------------------------------------------------------------------
-- anonymous_posts : 인증 사용자 작성, 작성자 본인 수정, 교수자 전체 관리.
--   ※ 학생은 기반 테이블에서 '본인 글'만 조회 가능(author_id 노출 방지).
--   ※ 목록/열람은 author_id 를 제거한 public 뷰로 수행.
-- ----------------------------------------------------------------------------
drop policy if exists posts_select on public.anonymous_posts;
create policy posts_select on public.anonymous_posts
  for select using ( author_id = auth.uid() or public.is_instructor() );

drop policy if exists posts_insert on public.anonymous_posts;
create policy posts_insert on public.anonymous_posts
  for insert with check ( author_id = auth.uid() );

drop policy if exists posts_update on public.anonymous_posts;
create policy posts_update on public.anonymous_posts
  for update using ( author_id = auth.uid() or public.is_instructor() )
  with check ( author_id = auth.uid() or public.is_instructor() );

drop policy if exists posts_delete on public.anonymous_posts;
create policy posts_delete on public.anonymous_posts
  for delete using ( author_id = auth.uid() or public.is_instructor() );

-- anonymous_comments
drop policy if exists comments_select on public.anonymous_comments;
create policy comments_select on public.anonymous_comments
  for select using ( author_id = auth.uid() or public.is_instructor() );

drop policy if exists comments_insert on public.anonymous_comments;
create policy comments_insert on public.anonymous_comments
  for insert with check ( author_id = auth.uid() );

drop policy if exists comments_update on public.anonymous_comments;
create policy comments_update on public.anonymous_comments
  for update using ( author_id = auth.uid() or public.is_instructor() )
  with check ( author_id = auth.uid() or public.is_instructor() );

drop policy if exists comments_delete on public.anonymous_comments;
create policy comments_delete on public.anonymous_comments
  for delete using ( author_id = auth.uid() or public.is_instructor() );

-- reports : 인증 사용자 신고 작성, 교수자만 조회
drop policy if exists reports_insert on public.reports;
create policy reports_insert on public.reports
  for insert with check ( reporter_id = auth.uid() );

drop policy if exists reports_select on public.reports;
create policy reports_select on public.reports
  for select using ( public.is_instructor() );

-- ----------------------------------------------------------------------------
-- 공개 뷰 접근 권한
--   익명 뷰: 인증 사용자가 목록/열람. author_id 없음.
--   ms365_missing: 교수자만(뷰가 참조하는 기반 테이블 RLS 로 보호되나 명시적으로 revoke).
-- ----------------------------------------------------------------------------
grant select on public.anonymous_posts_public to anon, authenticated;
grant select on public.anonymous_comments_public to anon, authenticated;

revoke all on public.ms365_missing from anon, authenticated;
grant select on public.ms365_missing to authenticated; -- 실제 행 접근은 RLS 로 교수자만

-- ============================================================================
-- Storage 정책 (storage.objects)
-- ============================================================================

-- assignments 버킷: 학생은 자신의 폴더(<uid>/...)에만 업로드/조회, 교수자는 전체 조회
drop policy if exists assignments_upload on storage.objects;
create policy assignments_upload on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'assignments'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists assignments_read on storage.objects;
create policy assignments_read on storage.objects
  for select to authenticated
  using (
    bucket_id = 'assignments'
    and ( (storage.foldername(name))[1] = auth.uid()::text or public.is_instructor() )
  );

drop policy if exists assignments_delete on storage.objects;
create policy assignments_delete on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'assignments'
    and ( (storage.foldername(name))[1] = auth.uid()::text or public.is_instructor() )
  );

-- attachments 버킷: 공개 읽기, 업로드는 교수자만
drop policy if exists attachments_read on storage.objects;
create policy attachments_read on storage.objects
  for select using ( bucket_id = 'attachments' );

drop policy if exists attachments_write on storage.objects;
create policy attachments_write on storage.objects
  for insert to authenticated
  with check ( bucket_id = 'attachments' and public.is_instructor() );

drop policy if exists attachments_delete on storage.objects;
create policy attachments_delete on storage.objects
  for delete to authenticated
  using ( bucket_id = 'attachments' and public.is_instructor() );
