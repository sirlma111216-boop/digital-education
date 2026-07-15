import { Link } from "react-router-dom";
import { courseConfig, categories, buildMailto } from "@/data/courseConfig";
import { instructor } from "@/data/instructor";
import { allSessions } from "@/content/sessions";
import { SessionCard } from "@/components/course/SessionCard";
import { BrandMark } from "@/components/common/BrandMark";
import { NoticesPreview } from "@/features/board/NoticesPreview";

export function HomePage() {
  return (
    <>
      {/* --- Hero --- */}
      <section className="hero section">
        <div className="container hero__grid">
          <div className="hero__main">
            <p className="eyebrow hero__eyebrow">
              <BrandMark size={16} color="var(--color-primary)" /> 한 학기 디지털 강의실
            </p>
            <h1 className="display-xl hero__title">{courseConfig.title}</h1>
            <p className="hero__key">{courseConfig.subtitle}</p>
            <p className="hero__lead lead">
              디지털 교육은 새로운 도구를 빠르게 익히는 수업이 아닙니다. 학습자의 차이를 이해하고,
              수업·평가·협업을 더 나은 방식으로 다시 설계하는 과정입니다. 15주 동안 교육 이론에서
              Google과 Microsoft의 학교 플랫폼, 다양한 에듀테크, 생성형 AI와 바이브 코딩까지 이어지는
              여정을 통해 ‘도구를 사용하는 사람’을 넘어 ‘교육 문제를 기술로 해결하는 수업 설계자’로
              성장합니다.
            </p>
            <div className="hero__actions">
              <Link to="/course" className="btn btn-primary">
                15차시 살펴보기
              </Link>
              <Link to="/schedule" className="btn btn-secondary">
                전체 일정 보기
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                교수에게 질문하기
              </Link>
            </div>
          </div>

          {/* 장식용 그래픽 (style.md 로 교체 가능한 영역) */}
          <aside className="hero__aside" aria-hidden="true">
            <div className="hero__spark">
              <BrandMark size={120} color="var(--color-primary)" />
              <div className="hero__orbit hero__orbit--1" />
              <div className="hero__orbit hero__orbit--2" />
            </div>
          </aside>
        </div>
      </section>

      {/* --- 이 수업에서 배우는 것 --- */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2 className="display-md">이 수업에서 배우는 것</h2>
          </div>
          <div className="grid grid-2 learn-grid">
            {[
              { t: "디지털 교육의 이론과 수업 설계", d: "정렬(Alignment), ISTE, UDL로 교육 먼저의 관점을 세웁니다." },
              { t: "Google Workspace와 Microsoft 365", d: "학교 플랫폼으로 수업의 흐름을 설계합니다." },
              { t: "퀴즈·메타버스·과정 중심 평가", d: "몰입과 평가를 학습 목표와 연결합니다." },
              { t: "생성형 AI와 바이브 코딩", d: "AI를 협력 도구로 쓰고, 교육용 웹앱을 만듭니다." },
            ].map((c) => (
              <div key={c.t} className="card learn-card">
                <h3 className="title-md">{c.t}</h3>
                <p className="muted">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 5개 대분류 --- */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head">
            <h2 className="display-md">5개 대분류로 이어지는 흐름</h2>
          </div>
          <div className="category-list">
            {categories.map((c, i) => (
              <Link key={c.id} to={`/course?category=${c.id}`} className="card-canvas card-link category-row">
                <span className="category-row__num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <div className="category-row__head">
                    <h3 className="title-md">{c.label}</h3>
                    <span className="badge badge-outline">{c.range}</span>
                  </div>
                  <p className="muted">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --- 15차시 미리보기 --- */}
      <section className="section section--tight">
        <div className="container">
          <div className="section-head section-head--row">
            <h2 className="display-md">15차시 미리보기</h2>
            <Link to="/course" className="text-link">전체 보기 →</Link>
          </div>
          <div className="grid grid-3">
            {allSessions.slice(0, 6).map((s) => (
              <SessionCard key={s.id} session={s} />
            ))}
          </div>
        </div>
      </section>

      {/* --- 공지 + 교수 소개 + 연락 --- */}
      <section className="section section--tight">
        <div className="container home-bottom">
          <div className="home-bottom__notices">
            <div className="section-head section-head--row">
              <h2 className="display-sm">최근 공지</h2>
              <Link to="/board/notices" className="text-link">더 보기 →</Link>
            </div>
            <NoticesPreview limit={3} />
          </div>

          <aside className="card-dark home-instructor">
            <p className="eyebrow" style={{ color: "var(--color-on-dark-soft)" }}>교수 소개</p>
            <h2 className="display-sm" style={{ color: "var(--color-on-dark)" }}>{instructor.name}</h2>
            <p style={{ color: "var(--color-on-dark-soft)" }}>{instructor.role}</p>
            <p className="home-instructor__intro">{instructor.intro[0]}</p>
            <div className="home-instructor__actions">
              <Link to="/instructor" className="btn btn-secondary-on-dark btn-sm">교수 소개</Link>
              <a href={buildMailto()} className="btn btn-primary btn-sm">이메일 보내기</a>
            </div>
          </aside>
        </div>
      </section>

      {/* --- CTA 밴드 --- */}
      <section className="section--tight">
        <div className="container">
          <div className="card-coral cta-band">
            <div>
              <h2 className="display-sm" style={{ color: "var(--color-on-primary)" }}>궁금한 점이 있나요?</h2>
              <p style={{ color: "color-mix(in srgb, var(--color-on-primary) 85%, transparent)" }}>
                수업 내용은 익명 게시판에서, 개인적인 확인은 이메일로 편하게 남겨 주세요.
              </p>
            </div>
            <div className="cta-band__actions">
              <Link to="/board/anonymous" className="btn btn-secondary">익명으로 질문하기</Link>
              <Link to="/tools" className="btn btn-secondary">도구·용어 사전</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
