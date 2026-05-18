import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export type ContactFormProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  
  defaultService?: string;
  serviceOptions?: string[];
  className?: string;
  variant?: "default" | "edtech";
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validateForm(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Name is required";
  else if (values.name.trim().length < 2) errors.name = "Please enter your full name";

  if (!values.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (values.phone.trim() && !/^[\d\s+\-()]{7,20}$/.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.message.trim()) errors.message = "Message is required";
  else if (values.message.trim().length < 10) {
    errors.message = "Please provide a bit more detail (at least 10 characters)";
  }

  return errors;
}

const inputClass =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] focus:ring-2 focus:ring-[#015AAA]/15 transition-all placeholder:text-slate-400 text-slate-900";

export default function ContactForm({
  id = "contact-form",
  title = "Get in touch",
  subtitle = "Tell us about your project or training needs. We typically respond within one business day.",
  defaultService = "",
  serviceOptions,
  className = "",
  variant = "default",
}: ContactFormProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setForm((prev) => ({ ...prev, service: defaultService }));
  }, [defaultService]);

  const accent = variant === "edtech" ? "#0A66C2" : "#015AAA";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    setForm({ name: "", email: "", phone: "", service: defaultService, message: "" });
    setErrors({});
  };

  return (
    <section id={id} className={`scroll-mt-28 ${className}`} aria-labelledby={`${id}-heading`}>
      <motion.div
        className="max-w-3xl mx-auto rounded-2xl border border-slate-100 bg-white p-6 md:p-10 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 text-center md:text-left">
          <p
            className="text-sm font-bold uppercase tracking-wider m-0 mb-2"
            style={{ color: accent }}
          >
            Contact
          </p>
          <h2
            id={`${id}-heading`}
            className="text-2xl md:text-3xl font-bold text-slate-900 m-0 mb-2"
            style={{ }}
          >
            {title}
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0 max-w-xl">{subtitle}</p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
            role="status"
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ background: `${accent}15`, color: accent }}
            >
              <ArrowRight size={22} aria-hidden />
            </motion.div>
            <p className="text-slate-900 font-bold text-lg m-0">Thank you - we&apos;ll be in touch soon.</p>
            <p className="text-slate-500 text-sm mt-2 m-0">Your message has been received.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${id}-name`} className="sr-only">
                  Name
                </label>
                <input
                  id={`${id}-name`}
                  name="name"
                  type="text"
                  placeholder="Name *"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                  className={inputClass}
                />
                {errors.name ? (
                  <p id={`${id}-name-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="sr-only">
                  Email
                </label>
                <input
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                  className={inputClass}
                />
                {errors.email ? (
                  <p id={`${id}-email-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${id}-phone`} className="sr-only">
                  Phone
                </label>
                <input
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  placeholder="Phone"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                  className={inputClass}
                />
                {errors.phone ? (
                  <p id={`${id}-phone-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <label htmlFor={`${id}-service`} className="sr-only">
                  Service
                </label>
                {serviceOptions && serviceOptions.length > 0 && !defaultService ? (
                  <select
                    id={`${id}-service`}
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`${id}-service`}
                    name="service"
                    type="text"
                    placeholder="Service"
                    value={form.service}
                    onChange={handleChange}
                    readOnly={!!defaultService}
                    className={`${inputClass}${defaultService ? " bg-slate-50 text-slate-600" : ""}`}
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor={`${id}-message`} className="sr-only">
                Message
              </label>
              <textarea
                id={`${id}-message`}
                name="message"
                placeholder="How can we help? *"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${id}-message-error` : undefined}
                className={`${inputClass} resize-none min-h-[120px]`}
              />
              {errors.message ? (
                <p id={`${id}-message-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto min-w-[200px] text-white font-semibold py-3.5 px-8 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg border-none cursor-pointer transition-colors"
              style={{ background: accent, boxShadow: `0 8px 24px ${accent}33` }}
            >
              Send message
              <ArrowRight size={16} aria-hidden />
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
