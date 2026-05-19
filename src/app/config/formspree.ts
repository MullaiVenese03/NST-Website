/** Official Formspree form hash — https://formspree.io/forms/xkooggpv */
export const FORMSPREE_FORM_ID = "xkooggpv";

const FORMSPREE_ID_PATTERN = /^[a-z0-9]{6,12}$/i;

/**
 * Resolves form ID from env only when it is a valid Formspree hash.
 * Rejects emails (e.g. info@nebulasafetech.com) that cause fetch to the wrong URL.
 */
function resolveFormIdFromEnv(): string {
  const raw = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();
  if (!raw || raw.includes("@") || !FORMSPREE_ID_PATTERN.test(raw)) {
    if (raw?.includes("@") && import.meta.env.DEV) {
      console.warn(
        `[Formspree] VITE_FORMSPREE_FORM_ID must be a form hash (e.g. "${FORMSPREE_FORM_ID}"), not an email. Using default.`,
      );
    }
    return FORMSPREE_FORM_ID;
  }
  return raw;
}

export const ACTIVE_FORMSPREE_FORM_ID = resolveFormIdFromEnv();

export const FORMSPREE_ENDPOINT = `https://formspree.io/f/${ACTIVE_FORMSPREE_FORM_ID}`;
