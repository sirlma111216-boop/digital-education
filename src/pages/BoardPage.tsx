import { useParams, Navigate, NavLink } from "react-router-dom";
import { BoardNotices } from "@/features/board/BoardNotices";
import { BoardMs365 } from "@/features/board/BoardMs365";
import { BoardQna } from "@/features/board/BoardQna";

const tabs = [
  { key: "notices", label: "공지사항", path: "/board/notices" },
  { key: "ms365-registration", label: "MS365 계정 등록", path: "/board/ms365-registration" },
  { key: "qna", label: "Q&A", path: "/board/qna" },
];

// 삭제된 옛 탭 경로는 새 탭으로 안내한다.
const redirects: Record<string, string> = {
  assignments: "/board/notices",
  anonymous: "/board/qna",
};

export function BoardPage() {
  const { tab } = useParams();
  if (tab && redirects[tab]) return <Navigate to={redirects[tab]} replace />;
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
              className="tab"
              aria-selected={t.key === tab}
              role="tab"
            >
              {t.label}
            </NavLink>
          ))}
        </nav>

        <div className="board-content">
          {tab === "notices" && <BoardNotices />}
          {tab === "ms365-registration" && <BoardMs365 />}
          {tab === "qna" && <BoardQna />}
        </div>
      </div>
    </div>
  );
}
