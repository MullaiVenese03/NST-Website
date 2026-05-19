import type { SubmissionError } from "@formspree/core";

export function getFormspreeErrorMessage(errors: SubmissionError | null): string | null {
  if (!errors) return null;

  const formErrors = errors.getFormErrors();
  if (formErrors.length > 0) {
    const { code, message } = formErrors[0];
    if (code === "FORM_NOT_FOUND") {
      return "The contact form could not be reached. Please try again later or email us directly at";
    }
    if (code === "INACTIVE") {
      return "This form is inactive. Please email us directly at";
    }
    if (message.includes("reCAPTCHA")) {
      return "Form security settings are blocking submission. Please email us directly at";
    }
    if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
      return "Could not connect to the form service. Check your connection or email us at";
    }
    if (message.includes("@") && message.includes("fetch")) {
      return "Form is misconfigured. Please email us directly at";
    }
    return message;
  }

  for (const fieldErrors of errors.getAllFieldErrors()) {
    if (fieldErrors.length > 0) return fieldErrors[0].message;
  }

  return "Something went wrong sending your message. Please try again or email us at";
}
