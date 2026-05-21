/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_FORM_ID?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_CLARITY_PROJECT_ID?: string;
  readonly VITE_CF_BEACON_TOKEN?: string;
  readonly VITE_GSC_VERIFICATION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
