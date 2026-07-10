/* ==========================================================================
   Board / auth domain types. These mirror the Supabase schema (supabase/schema.sql).
   ========================================================================== */

export type Role = "guest" | "student" | "instructor";

export interface Profile {
  id: string;
  role: Role;
  display_name: string | null;
  student_number: string | null;
  created_at: string;
}

export type Visibility = "public" | "authenticated";

export interface Notice {
  id: string;
  title: string;
  body: string;
  is_pinned: boolean;
  visibility: Visibility;
  publish_at: string | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export type SubmissionType = "text" | "url" | "file" | "external_lms";

export interface Assignment {
  id: string;
  session_id: string | null;
  title: string;
  description: string;
  due_at: string | null;
  submission_type: SubmissionType;
  external_url: string | null;
  allow_late: boolean;
  visibility: Visibility;
  points: number | null;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export type SubmissionStatus =
  | "submitted"
  | "late"
  | "returned"
  | "resubmitted";

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  text_content: string | null;
  submitted_url: string | null;
  file_path: string | null;
  status: SubmissionStatus;
  feedback: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface Ms365Registration {
  id: string;
  student_id: string;
  student_number: string;
  student_name: string;
  ms365_email: string;
  note: string | null;
  consented_at: string;
  updated_at: string;
}

export type PostStatus = "open" | "answered" | "closed";

export interface AnonymousPost {
  id: string;
  author_id: string;
  anonymous_label: string;
  title: string;
  body: string;
  status: PostStatus;
  is_hidden: boolean;
  reply_count?: number;
  created_at: string;
  updated_at: string;
}

export interface AnonymousComment {
  id: string;
  post_id: string;
  author_id: string;
  anonymous_label: string;
  body: string;
  is_instructor_reply: boolean;
  is_hidden: boolean;
  created_at: string;
}

export type ReportTargetType = "post" | "comment";

export interface Report {
  id: string;
  reporter_id: string;
  target_type: ReportTargetType;
  target_id: string;
  reason: string;
  created_at: string;
}
