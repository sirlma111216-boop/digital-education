import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BrandMark } from "@/components/common/BrandMark";
import { courseConfig } from "@/data/courseConfig";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/course", label: "15차시" },
  { to: "/schedule", label: "전체 일정" },
  { to: "/tools", label: "도구 사전" },
  { to: "/glossary", label: "용어 사전" },
  { to: "/board", label: "게시판" },
  { to: "/instructor", label: "교수 소개" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, role, signOut } = useAuth();

  // 라우트 변경 시 드로어 닫기
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="top-nav">
      <div className="container top-nav__inner">
        <Link to="/" className="brand" aria-label={`${courseConfig.title} 홈`}>
          <BrandMark size={22} color="var(--color-primary)" />
          <span className="brand__text">{courseConfig.title}</span>
        </Link>

        <nav className="top-nav__links" aria-label="주요 메뉴">
          {navItems.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="top-nav__cta">
          {user ? (
            <>
              <Link to="/account" className="nav-link">
                내 계정{role === "instructor" ? " · 교수자" : ""}
              </Link>
              <button className="btn btn-secondary btn-sm" onClick={() => void signOut()}>
                로그아웃
              </button>
            </>
          ) : (
            <>
              <a
                href="https://labbitory.com/lecture-univ"
                className="nav-link"
                aria-label="labbitory.com 강의 홈으로 이동"
              >
                labbitory.com
              </a>
              <Link to="/login" className="btn btn-primary btn-sm">
                로그인
              </Link>
            </>
          )}
        </div>

        <button
          className="top-nav__menu-btn"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="drawer" id="mobile-drawer">
          <nav className="drawer__nav" aria-label="모바일 메뉴">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} className="drawer__link">
                {n.label}
              </NavLink>
            ))}
            <div className="drawer__divider" />
            {user ? (
              <>
                <NavLink to="/account" className="drawer__link">
                  내 계정{role === "instructor" ? " · 교수자" : ""}
                </NavLink>
                <button className="btn btn-secondary btn-block" onClick={() => void signOut()}>
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <a
                  href="https://labbitory.com/lecture-univ"
                  className="drawer__link"
                  aria-label="labbitory.com 강의 홈으로 이동"
                >
                  labbitory.com
                </a>
                <NavLink to="/login" className="btn btn-primary btn-block">
                  로그인
                </NavLink>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
