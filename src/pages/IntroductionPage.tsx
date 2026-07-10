import { Link } from "react-router-dom";
import { categories } from "@/data/courseConfig";

export function IntroductionPage() {
  return (
    <div className="section">
      <div className="container narrow">
        <div className="page-head">
          <p className="eyebrow">Introduction · 과정 소개</p>
          <h1 className="display-lg">교육이 먼저, 기술은 수단</h1>
        </div>

        <div className="prose intro-prose">
          <p className="lead">
            디지털 교육은 새로운 도구를 빠르게 익히는 수업이 아닙니다. 학습자의 차이를 이해하고,
            수업·평가·협업을 더 나은 방식으로 다시 설계하는 과정입니다.
          </p>
          <p>
            이 과정은 단순한 강의 목록이나 링크 모음이 아닙니다. 15차시의 이론, 플랫폼 활용,
            에듀테크, 생성형 AI, 바이브 코딩을 하나의 흐름으로 학습하며, ‘도구를 사용하는 사람’을
            넘어 ‘교육 문제를 기술로 해결하는 수업 설계자’로 성장하는 것을 목표로 합니다.
          </p>
          <h2>15주 학습 여정</h2>
          <p>다섯 개의 대분류가 이론에서 실천으로, 다시 창작으로 이어집니다.</p>
        </div>

        <ol className="intro-journey">
          {categories.map((c, i) => (
            <li key={c.id} className="intro-journey__item card">
              <span className="intro-journey__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="intro-journey__head">
                  <h3 className="title-md">{c.label}</h3>
                  <span className="badge badge-outline">{c.range}</span>
                </div>
                <p className="muted">{c.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="intro-cta">
          <Link to="/course" className="btn btn-primary">15차시 살펴보기</Link>
          <Link to="/schedule" className="btn btn-secondary">전체 일정 보기</Link>
        </div>
      </div>
    </div>
  );
}
