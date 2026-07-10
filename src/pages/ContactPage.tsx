import { useState } from "react";
import { Link } from "react-router-dom";
import { buildMailto, courseConfig } from "@/data/courseConfig";

export function ContactPage() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(courseConfig.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">Contact · 연락처</p>
          <h1 className="display-lg">교수에게 질문하기</h1>
          <p className="lead">
            수업 내용에 관한 질문은 게시판을 활용해 주세요. 개인적인 확인이 필요한 문의는 이메일로
            보내 주시면 확인 후 답변드리겠습니다.
          </p>
        </div>

        <div className="grid grid-2 contact-grid">
          <div className="card contact-card">
            <h2 className="title-md">이메일로 문의</h2>
            <p className="muted contact-card__email">{courseConfig.contactEmail}</p>
            <p className="muted">
              성적·출결·개인정보처럼 공개하기 어려운 내용은 이메일로 보내 주세요. 메일 제목은
              자동으로 <code>{courseConfig.contactSubject}</code>로 채워지며, 본문에 이름 / 수업 구분 /
              문의 내용을 적어 주세요.
            </p>
            <div className="contact-card__actions">
              <a href={buildMailto()} className="btn btn-primary">이메일 보내기</a>
              <button className="btn btn-secondary" onClick={copyEmail}>
                {copied ? "복사됨 ✓" : "이메일 주소 복사"}
              </button>
            </div>
          </div>

          <div className="card-canvas contact-card">
            <h2 className="title-md">게시판으로 질문</h2>
            <p className="muted">
              수업과 관련된 공개 질문은 익명 게시판을 이용해 주세요. 다른 수강생에게는 익명으로
              표시됩니다.
            </p>
            <ul className="contact-links">
              <li><Link to="/board/anonymous" className="text-link">익명 질문·자유 게시판 →</Link></li>
              <li><Link to="/board/notices" className="text-link">공지사항 →</Link></li>
              <li><Link to="/board/assignments" className="text-link">과제 안내 →</Link></li>
              <li><Link to="/instructor" className="text-link">교수 소개 →</Link></li>
            </ul>
          </div>
        </div>

        <div className="alert alert-info contact-note">
          개인정보와 타인을 특정할 수 있는 내용은 공개 게시판에 작성하지 마세요.
        </div>
      </div>
    </div>
  );
}
