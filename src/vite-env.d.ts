/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_INSTRUCTOR_HINT_EMAILS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
