import type { SubmissionError } from "@formspree/core";
import type { ContactFormValues } from "./contactFormValidation";

export function buildFormspreeFormData(values: ContactFormValues): FormData {
  const data = new FormData();
  data.append("name", values.name.trim());
  data.append("email", values.email.trim());
  data.append("message", values.message.trim());

  const phone = values.phone.trim();
  if (phone) data.append("phone", phone);

  const service = values.service.trim();
  if (service) data.append("service", service);

  return data;
}

export function getFormspreeErrorMessage(errors: SubmissionError | null): string | null {
  if (!errors) return null;

  const formErrors = errors.getFormErrors();
  if (formErrors.length > 0) {
    const { code, message } = formErrors[0];
    if (code === "FORM_NOT_FOUND") {
      return "The contact form is not linked to Formspree yet. Please email us directly.";
    }
    if (code === "INACTIVE") {
      return "This form is inactive. Please email us directly.";
    }
    return message;
  }

  for (const fieldErrors of errors.getAllFieldErrors()) {
    if (fieldErrors.length > 0) return fieldErrors[0].message;
  }

  return "Something went wrong sending your message. Please try again.";
}
