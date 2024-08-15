/// <reference types="vite/client" />

interface ImportMeta {
  env: ImportMetaEnv;
}

interface ImportMetaEnv {
  VITE_PUBLIC_BASE_URL_API: string;
  VITE_PUBLIC_API_TOKEN: string;
}