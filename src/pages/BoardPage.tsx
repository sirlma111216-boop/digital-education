import { useParams, Navigate, NavLink } from "react-router-dom";
import { BoardNotices } from "@/features/board/BoardNotices";
import { BoardAssignments } from "@/features/board/BoardAssignments";
import { BoardMs365 } from "@/features/board/BoardMs365";
import { BoardAnonymous } from "@/features/board/BoardAnonymous";

const tabs = [
  { key: "notices", label: "공지사항", path: "/board/notices" },
  { key: "assignments", label: "과제", path: "/board/assignments" },
  { key: "ms365-registration", label: "MS365 계정 등록", path: "/board/ms365-registration" },
  { key: "anonymous", label: "익명 질문", path: "/board/anonymous" },
];

export function BoardPage() {
  const { tab } = useParams();
  const valid = tabs.some((t) => t.key === tab);
  if (!valid) return <Navigate to="/board/notices" replace />;

  return (
    <div className="section">
      <div className="container">
        <div className="page-head">
          <p className="eyebrow">Board · 수업 게시판</p>
          <h1 className="display-lg">수업 게시판</h1>
        </div>

        <nav className="tabs board-tabs" aria-label="게시판 카테고리">
          {tabs.map((t) => (
            <NavLink
              key={t.key}
              to={t.path}
              className={({ isActive }) => `tab ${isActive ? "" : ""}`}
              aria-selected={t.key === tab}
              role="tab"
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="board-content">
          {tab === "notices" && <BoardNotices />}
          {tab === "assignments" && <BoardAssignments />}
          {tab === "ms365-registration" && <BoardMs365 />}
          {tab === "anonymous" && <BoardAnonymous />}
        </div>
      </div>
    </div>
  );
}
