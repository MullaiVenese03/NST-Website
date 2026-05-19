import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { ValidationError } from "@formspree/react";
import type { ContactFormFieldErrors, ContactFormValues } from "../utils/contactFormValidation";
import { getFormspreeErrorMessage } from "../utils/contactFormspree";
import { useContactFormspree, useResetFormspreeOnSuccess } from "../hooks/useContactFormspree";

export type ContactFormProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  defaultService?: string;
  serviceOptions?: string[];
  className?: string;
  variant?: "default" | "edtech";
};

const inputClass =
  "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#015AAA] focus:ring-2 focus:ring-[#015AAA]/15 transition-all placeholder:text-slate-400 text-slate-900";

const emptyValues = (service = ""): ContactFormValues => ({
  name: "",
  email: "",
  phone: "",
  service,
  message: "",
});

export default function ContactForm({
  id = "contact-form",
  title = "Get in touch",
  subtitle = "Tell us about your project or training needs. We typically respond within one business day.",
  defaultService = "",
  serviceOptions,
  className = "",
  variant = "default",
}: ContactFormProps) {
  const [form, setForm] = useState<ContactFormValues>(() => emptyValues(defaultService));
  const [errors, setErrors] = useState<ContactFormFieldErrors>({});
  const { state, submitContact, resetFormspree } = useContactFormspree();

  const accent = variant === "edtech" ? "#0A66C2" : "#015AAA";
  const formspreeErrorMessage = getFormspreeErrorMessage(state.errors);

  useEffect(() => {
    setForm((prev) => ({ ...prev, service: defaultService }));
  }, [defaultService]);

  const resetFields = useCallback(() => {
    setForm(emptyValues(defaultService));
    setErrors({});
  }, [defaultService]);

  useResetFormspreeOnSuccess(state.succeeded, resetFormspree, resetFields);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const clientErrors = await submitContact(form);
    if (clientErrors) {
      setErrors(clientErrors);
    } else {
      setErrors({});
    }
  };

  const showServiceSelect = Boolean(serviceOptions?.length) && !defaultService;

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
          >
            {title}
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed m-0 max-w-xl">{subtitle}</p>
        </div>

        {state.succeeded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
            role="status"
            aria-live="polite"
          >
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
              style={{ background: `${accent}15`, color: accent }}
            >
              <ArrowRight size={22} aria-hidden />
            </motion.div>
            <p className="text-slate-900 font-bold text-lg m-0">Thank you — we&apos;ll be in touch soon.</p>
            <p className="text-slate-500 text-sm mt-2 m-0">Your message has been received.</p>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            aria-busy={state.submitting}
          >
            {formspreeErrorMessage ? (
              <p className="text-red-600 text-sm m-0 p-3 rounded-xl bg-red-50 border border-red-100" role="alert">
                {formspreeErrorMessage}{" "}
                <a href="mailto:info@nebulasafetech.com" className="font-semibold underline">
                  info@nebulasafetech.com
                </a>
                .
              </p>
            ) : null}

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
                  disabled={state.submitting}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id}-name-error` : undefined}
                  className={inputClass}
                />
                {errors.name ? (
                  <p id={`${id}-name-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                    {errors.name}
                  </p>
                ) : (
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-600 text-xs mt-1.5 m-0"
                  />
                )}
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
                  disabled={state.submitting}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id}-email-error` : undefined}
                  className={inputClass}
                />
                {errors.email ? (
                  <p id={`${id}-email-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                    {errors.email}
                  </p>
                ) : (
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-600 text-xs mt-1.5 m-0"
                  />
                )}
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
                  disabled={state.submitting}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                  className={inputClass}
                />
                {errors.phone ? (
                  <p id={`${id}-phone-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                    {errors.phone}
                  </p>
                ) : (
                  <ValidationError
                    prefix="Phone"
                    field="phone"
                    errors={state.errors}
                    className="text-red-600 text-xs mt-1.5 m-0"
                  />
                )}
              </div>
              <div>
                <label htmlFor={`${id}-service`} className="sr-only">
                  Service type
                </label>
                {showServiceSelect ? (
                  <select
                    id={`${id}-service`}
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    disabled={state.submitting}
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions!.map((opt) => (
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
                    placeholder="Service type"
                    value={form.service}
                    onChange={handleChange}
                    readOnly={!!defaultService}
                    disabled={state.submitting}
                    className={`${inputClass}${defaultService ? " bg-slate-50 text-slate-600" : ""}`}
                  />
                )}
                <ValidationError
                  prefix="Service"
                  field="service"
                  errors={state.errors}
                  className="text-red-600 text-xs mt-1.5 m-0"
                />
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
                disabled={state.submitting}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? `${id}-message-error` : undefined}
                className={`${inputClass} resize-none min-h-[120px]`}
              />
              {errors.message ? (
                <p id={`${id}-message-error`} className="text-red-600 text-xs mt-1.5 m-0" role="alert">
                  {errors.message}
                </p>
              ) : (
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-600 text-xs mt-1.5 m-0"
                />
              )}
            </div>

            <motion.button
              type="submit"
              disabled={state.submitting}
              whileHover={state.submitting ? undefined : { scale: 1.01 }}
              whileTap={state.submitting ? undefined : { scale: 0.98 }}
              className="w-full sm:w-auto min-w-[200px] text-white font-semibold py-3.5 px-8 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg border-none cursor-pointer transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ background: accent, boxShadow: `0 8px 24px ${accent}33` }}
              aria-disabled={state.submitting}
            >
              {state.submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Send message
                  <ArrowRight size={16} aria-hidden />
                </>
              )}
            </motion.button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
