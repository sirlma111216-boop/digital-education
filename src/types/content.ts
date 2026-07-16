/* ==========================================================================
   Content model — the shape of a single course session and its building blocks.
   Sessions live in src/content/sessions/*.ts and conform to `Session`.
   ========================================================================== */

export type CategoryId =
  | "theory" // 1~3차시: 디지털 교육의 이론과 기반
  | "google" // 4~5차시: Google Workspace와 수업 설계
  | "microsoft" // 6~10차시: Microsoft 365 Education과 학교 플랫폼
  | "edutech" // 11~12차시: 다양한 에듀테크와 몰입·평가
  | "genai"; // 13~15차시: 생성형 AI와 바이브 코딩

export type SessionLevel = "입문" | "중급" | "심화";

/** A learning objective (2~4 per session). */
export type LearningObjective = string;

/** Concept-map node — rendered as a lightweight CSS/SVG diagram, never a hotlinked image. */
export interface ConceptNode {
  label: string;
  description?: string;
}

/** An image asset shown inside content (local asset, never a hotlink). */
export interface ContentImage {
  src: string; // e.g. "/assets/sessions/01/ISTE01.png"
  alt: string;
  caption?: string;
}

/** A body-learning block: a heading + markdown prose (+ optional images). */
export interface TheoryBlock {
  heading: string;
  /** Markdown string, rendered with react-markdown + sanitize. */
  body: string;
  /** Optional figures rendered under the prose. */
  images?: ContentImage[];
  /** "side" places the (first) image beside the prose on wide screens. Default: below. */
  imageLayout?: "side" | "bottom";
}

/** A comparison table (structured, mobile-friendly). */
export interface CompareTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

/** A classroom case study or example. */
export interface CaseStudy {
  title: string;
  body: string;
}

/** A hands-on practice lab (ONLY sessions 4~15). */
export interface PracticeLab {
  title: string;
  goal: string;
  steps: string[];
  /** Optional self-checklist items for the practice. */
  checklist?: string[];
  deliverable?: string;
}

/** Quick-understanding checkpoint questions. */
export type QuizItem =
  | {
      type: "mcq";
      question: string;
      choices: string[];
      answerIndex: number;
      explanation?: string;
    }
  | {
      type: "ox";
      question: string;
      answer: boolean;
      explanation?: string;
    }
  | {
      type: "self";
      question: string;
    };

/** A key term with KO/EN pairing. */
export interface KeyTerm {
  term: string;
  en?: string;
  definition: string;
}

/** A reference / source with optional verification date. */
export interface SourceLink {
  label: string;
  url?: string;
  note?: string;
  lastVerified?: string; // YYYY-MM-DD
}

/** Frontmatter-equivalent metadata for a session. */
export interface SessionMeta {
  id: string; // "01" .. "15"
  slug: string; // url slug, e.g. "digital-education-foundations"
  title: string;
  category: CategoryId;
  summary: string;
  duration: number; // minutes
  level: SessionLevel;
  keywords: string[];
  theoryRatio: number; // 0..100
  practiceRatio: number; // 0..100
  published: boolean;
  lastUpdated: string; // YYYY-MM-DD
  sourceFiles?: string[];
}

/** A full session: metadata + structured content body. */
export interface Session extends SessionMeta {
  /** Short intro / overview paragraph (개요). */
  overview: string;
  objectives: LearningObjective[];
  keyQuestion: string;
  conceptMap: {
    title: string;
    nodes: ConceptNode[];
    /** Optional caption describing the relationship. */
    caption?: string;
  };
  theoryBlocks: TheoryBlock[];
  compareTables?: CompareTable[];
  caseStudies?: CaseStudy[];
  /** Present ONLY for sessions 4~15. Sessions 1~3 must omit this. */
  practice?: PracticeLab;
  quiz: QuizItem[];
  reflection: string[];
  terms: KeyTerm[];
  sources: SourceLink[];
  /** Optional caution/callout notes surfaced in the UI. */
  cautions?: string[];
}

/** A top-level category descriptor for grouping/filtering. */
export interface CategoryInfo {
  id: CategoryId;
  label: string;
  range: string; // e.g. "1~3차시"
  description: string;
}
