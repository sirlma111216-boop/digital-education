import { useState } from "react";
import { instructor } from "@/data/instructor";
import { buildMailto, courseConfig } from "@/data/courseConfig";

export function InstructorPage() {
  const [imgOk, setImgOk] = useState(true);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(instructor.email);
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
          <p className="eyebrow">Instructor · 교수 소개</p>
          <h1 className="display-lg">{instructor.name}</h1>
        </div>

        <div className="instructor-card card">
          <div className="instructor-card__avatar">
            {imgOk ? (
              <img
                src={instructor.photo}
                alt={`${instructor.name} 교수 프로필 사진`}
                onError={() => setImgOk(false)}
              />
            ) : (
              <span className="instructor-card__initials" aria-hidden="true">
                {instructor.initials}
              </span>
            )}
          </div>
          <div className="instructor-card__body">
            <p className="title-md">{instructor.role}</p>
            <p className="muted">현재 강의: {instructor.teaching}</p>
            <div className="instructor-card__actions">
              <a href={buildMailto()} className="btn btn-primary btn-sm">이메일 보내기</a>
              <button className="btn btn-secondary btn-sm" onClick={copyEmail}>
                {copied ? "복사됨 ✓" : "이메일 주소 복사"}
              </button>
              <a
                href={instructor.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                교수 소개 더 보기 ↗
              </a>
            </div>
          </div>
        </div>

        <div className="prose intro-prose">
          {instructor.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <section className="instructor-interests">
          <h2 className="display-sm">관심 분야</h2>
          <div className="chips">
            {instructor.interests.map((it) => (
              <span key={it} className="badge">{it}</span>
            ))}
          </div>
        </section>

        <p className="muted instructor-note">
          자세한 경력과 활동은 <a href={instructor.profileUrl} target="_blank" rel="noopener noreferrer">외부 소개 페이지</a>에서
          확인할 수 있습니다. 수업 관련 질문은 게시판을, 개인적인 확인이 필요한 문의는{" "}
          <a href={buildMailto()}>{courseConfig.contactEmail}</a>로 보내 주세요.
        </p>
      </div>
    </div>
  );
}
