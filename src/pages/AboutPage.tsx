import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">About · 이 포털 소개</p>
          <h1 className="display-lg">이 포털에 대하여</h1>
        </div>

        <div className="prose intro-prose">
          <p className="lead">
            이 포털은 ‘디지털 교육’ 15차시를 하나의 흐름으로 학습하고, 교수자가 콘텐츠를 쉽게
            수정·확장할 수 있도록 만든 <strong>콘텐츠 중심 학습 포털</strong>입니다. 동시에 15차시의
            마지막 주제인 <strong>바이브 코딩</strong>으로 만든 교육용 웹앱의 사례이기도 합니다.
          </p>

          <h2>어떻게 만들어졌나</h2>
          <ul>
            <li>콘텐츠·메타데이터·UI·상태·스타일을 분리해 유지보수가 쉽도록 설계했습니다.</li>
            <li>각 차시는 별도 콘텐츠 파일로 분리되어 있어, 파일을 추가하면 목록에 자동 반영됩니다.</li>
            <li>디자인은 CSS 변수(디자인 토큰)로 분리해 나중에 손쉽게 교체할 수 있습니다.</li>
            <li>게시판·계정은 Supabase(Auth·Database·Storage)와 행 수준 보안으로 보호됩니다.</li>
          </ul>

          <h2>콘텐츠 출처</h2>
          <p>
            차시 본문은 업로드된 강의 교안을 재구성한 것입니다. 빠르게 바뀌는 외부 서비스 정보는
            공식 문서를 우선 확인하도록 안내하며, 각 자료에는 마지막 확인일을 표시했습니다.
          </p>

          <h2>개인정보 보호</h2>
          <ul>
            <li>학생의 이메일과 제출물은 다른 학생에게 공개되지 않습니다.</li>
            <li>MS365 계정 등록은 비공개 폼으로, 본인과 교수자만 조회할 수 있습니다.</li>
            <li>익명 게시판은 학생 간에는 익명이며, 교수자는 안전한 운영을 위해 필요 시 작성자를 확인할 수 있습니다.</li>
          </ul>
        </div>

        <div className="intro-cta">
          <Link to="/course" className="btn btn-primary">15차시 보기</Link>
          <Link to="/board" className="btn btn-secondary">게시판 가기</Link>
        </div>
      </div>
    </div>
  );
}
