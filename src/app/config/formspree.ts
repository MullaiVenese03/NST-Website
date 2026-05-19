/** Formspree form hash ID from https://formspree.io/forms/<id> */
export const FORMSPREE_FORM_ID =
  import.meta.env.VITE_FORMSPREE_FORM_ID?.trim() || "xgoqvrkb";

/** Optional project ID when the form lives under a Formspree project */
export const FORMSPREE_PROJECT_ID = import.meta.env.VITE_FORMSPREE_PROJECT_ID?.trim() || undefined;

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
