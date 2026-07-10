-- ============================================================================
-- 개발용 샘플 데이터 (선택)
-- 먼저 교수자 계정을 하나 지정해야 합니다:
--   update public.profiles set role='instructor' where id='<교수자 auth uid>';
-- 그 후 이 파일을 실행하면 첫 번째 교수자를 작성자로 샘플 공지/과제를 넣습니다.
-- ============================================================================

do $$
declare
  inst uuid;
begin
  select id into inst from public.profiles where role = 'instructor' order by created_at limit 1;
  if inst is null then
    raise notice '교수자 계정이 없습니다. 먼저 profiles.role 을 instructor 로 지정하세요.';
    return;
  end if;

  insert into public.notices (title, body, is_pinned, visibility, author_id)
  values
    ('디지털 교육 수업에 오신 것을 환영합니다',
     E'이 포털에서 15차시 학습, 공지·과제·익명 질문을 이용할 수 있습니다.\n\n- 수업 관련 공개 질문은 익명 게시판을 이용해 주세요.\n- 개인적인 확인이 필요한 문의는 이메일로 보내 주세요.',
     true, 'public', inst),
    ('MS365 계정 등록 안내',
     E'수업용 Microsoft 365 환경 구성을 위해 [게시판 → MS365 계정 등록]에서 학교용 계정을 등록해 주세요. 입력한 정보는 다른 학생에게 공개되지 않습니다.',
     false, 'authenticated', inst)
  on conflict do nothing;

  insert into public.assignments (session_id, title, description, submission_type, visibility, allow_late, author_id)
  values
    ('04', '[4차시] Drive 협업 흐름 정리',
     E'Drive 폴더 구조와 Forms 응답 수합 경험을 간단히 정리해 제출하세요. (개인정보 제외)',
     'text', 'authenticated', true, inst)
  on conflict do nothing;
end $$;
