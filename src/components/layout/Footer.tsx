import { Link } from "react-router-dom";
import { BrandMark } from "@/components/common/BrandMark";
import { courseConfig, buildMailto } from "@/data/courseConfig";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="brand">
            <BrandMark size={22} color="var(--color-on-dark)" />
            <span className="brand__text">{courseConfig.title}</span>
          </div>
          <p className="footer__tagline">{courseConfig.subtitle}</p>
        </div>

        <nav className="footer__col" aria-label="학습">
          <h2 className="footer__heading">학습</h2>
          <Link to="/introduction">과정 소개</Link>
          <Link to="/course">15차시</Link>
          <Link to="/schedule">전체 일정</Link>
          <Link to="/tools">도구 사전</Link>
          <Link to="/glossary">용어 사전</Link>
        </nav>

        <nav className="footer__col" aria-label="소통">
          <h2 className="footer__heading">소통</h2>
          <Link to="/board/notices">공지사항</Link>
          <Link to="/board/assignments">과제</Link>
          <Link to="/board/anonymous">익명 질문</Link>
          <Link to="/contact">연락처</Link>
        </nav>

        <nav className="footer__col" aria-label="정보">
          <h2 className="footer__heading">정보</h2>
          <Link to="/instructor">교수 소개</Link>
          <Link to="/about">이 포털 소개</Link>
          <a href={buildMailto()}>이메일 보내기</a>
          <a href={courseConfig.instructorProfileUrl} target="_blank" rel="noopener noreferrer">
            교수 소개 더 보기
          </a>
        </nav>
      </div>

      <div className="container footer__bottom">
        <p className="muted">
          © {new Date().getFullYear()} {courseConfig.title}. 강의 교안을 재구성한 학습용 포털입니다.
        </p>
      </div>
    </footer>
  );
}
