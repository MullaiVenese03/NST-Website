import { useCallback, useEffect } from "react";
import { useForm } from "@formspree/react";
import { FORMSPREE_FORM_ID } from "../config/formspree";
import {
  validateContactForm,
  type ContactFormFieldErrors,
  type ContactFormValues,
} from "../utils/contactFormValidation";
import { buildFormspreeFormData } from "../utils/contactFormspree";

export function useContactFormspree() {
  const [state, formspreeSubmit, resetFormspree] = useForm(FORMSPREE_FORM_ID);

  const submitContact = useCallback(
    async (values: ContactFormValues): Promise<ContactFormFieldErrors | null> => {
      const clientErrors = validateContactForm(values);
      if (Object.keys(clientErrors).length > 0) {
        return clientErrors;
      }

      await formspreeSubmit(buildFormspreeFormData(values));
      return null;
    },
    [formspreeSubmit],
  );

  return {
    state,
    submitContact,
    resetFormspree,
  };
}

export function useResetFormspreeOnSuccess(
  succeeded: boolean,
  resetFormspree: () => void,
  onResetFields: () => void,
) {
  useEffect(() => {
    if (!succeeded) return;
    onResetFields();
    const timer = window.setTimeout(() => resetFormspree(), 4500);
    return () => window.clearTimeout(timer);
  }, [succeeded, resetFormspree, onResetFields]);
}
