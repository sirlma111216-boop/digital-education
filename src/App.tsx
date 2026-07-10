import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { IntroductionPage } from "@/pages/IntroductionPage";
import { SchedulePage } from "@/pages/SchedulePage";
import { InstructorPage } from "@/pages/InstructorPage";
import { ContactPage } from "@/pages/ContactPage";
import { CoursePage } from "@/pages/CoursePage";
import { SessionPage } from "@/pages/SessionPage";
import { ToolsPage } from "@/pages/ToolsPage";
import { GlossaryPage } from "@/pages/GlossaryPage";
import { AboutPage } from "@/pages/AboutPage";
import { LoginPage } from "@/pages/LoginPage";
import { AccountPage } from "@/pages/AccountPage";
import { BoardPage } from "@/pages/BoardPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/introduction" element={<IntroductionPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/course/:param" element={<SessionPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />

        {/* 게시판: 탭 기반. /board 는 공지로 리다이렉트 */}
        <Route path="/board" element={<Navigate to="/board/notices" replace />} />
        <Route path="/board/:tab" element={<BoardPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
