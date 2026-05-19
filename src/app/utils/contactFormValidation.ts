export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export type ContactFormFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export function validateContactForm(values: ContactFormValues): ContactFormFieldErrors {
  const errors: ContactFormFieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required";
  } else if (values.name.trim().length < 2) {
    errors.name = "Please enter your full name";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (values.phone.trim() && !/^[\d\s+\-()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please provide a bit more detail (at least 10 characters)";
  }

  return errors;
}

export function readContactFormValues(form: HTMLFormElement): ContactFormValues {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    phone: String(data.get("phone") ?? ""),
    service: String(data.get("service") ?? ""),
    message: String(data.get("message") ?? ""),
  };
}
