import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="section">
      <div className="container narrow center-block">
        <p className="eyebrow">404</p>
        <h1 className="display-lg">페이지를 찾을 수 없습니다</h1>
        <p className="lead">주소가 바뀌었거나 없는 페이지입니다.</p>
        <div className="intro-cta">
          <Link to="/" className="btn btn-primary">홈으로</Link>
          <Link to="/course" className="btn btn-secondary">15차시 보기</Link>
        </div>
      </div>
    </div>
  );
}
