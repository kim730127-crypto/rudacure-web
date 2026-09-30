"use client";

import { useState, FormEvent, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { trackContactFormStart } from "@/lib/analytics-events";
import { submitContactForm } from "./actions";

/** Every visible string in the form. Supplied per locale by page.tsx so the
 *  component never renders English on a non-English page. */
export interface ContactFormText {
  stepOf: string; // "{n}" is replaced with the step number
  contactTitle: string;
  messageTitle: string;
  next: string;
  back: string;
  sending: string;
  placeholder: string;
  trust: string;
  success: string;
  errType: string;
  errName: string;
  errEmail: string;
  errMessage: string;
  errGeneric: string;
}

interface ContactFormProps {
  c: {
    name: string;
    email: string;
    company: string;
    type: string;
    message: string;
    submit: string;
    typeOptions: string[];
    form: ContactFormText;
    [key: string]: unknown;
  };
  inputCls: string;
}

interface FormState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  type: string;
  message: string;
  website?: string;
}

type FormStep = "type" | "contact" | "message";

export default function ContactForm({ c, inputCls }: ContactFormProps) {
  // Locale comes from the URL rather than a new prop: the form is rendered from
  // a server page that already sits under /[locale], and threading one more
  // prop through every call site buys nothing.
  const pathname = usePathname();
  const routeLocale = (pathname ?? "").split("/").filter(Boolean)[0] || "ko";
  // `contact_form_start` fires once per mount, on the first keystroke. Paired
  // with `contact_submit` it gives the abandon rate, which is the number that
  // says whether the form itself is the obstacle.
  const startReported = useRef(false);
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    type: "",
    message: "",
    website: "",
  });

  const [step, setStep] = useState<FormStep>("type");
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>(
    {},
  );
  const alertRef = useRef<HTMLDivElement>(null);

  const typeOptions = Array.isArray(c.typeOptions) ? c.typeOptions : [];
  const t = c.form;
  const stepLabel = (n: number) => t.stepOf.replace("{n}", String(n));

  // 2026 Trend: Real-time validation
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case "name":
        return value.trim().length < 2
          ? t.errName
          : null;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : t.errEmail;
      case "message":
        return value.trim().length < 10
          ? t.errMessage
          : null;
      default:
        return null;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (!startReported.current) {
      startReported.current = true;
      trackContactFormStart(routeLocale);
    }
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Emit custom event when inquiry type changes
    if (name === "type" && value) {
      const event = new CustomEvent("inquiryTypeChanged", {
        detail: { type: value },
      });
      window.dispatchEvent(event);
    }

    // Real-time validation feedback
    if (validationErrors[name as keyof FormData]) {
      const error = validateField(name, value);
      setValidationErrors((prev) => {
        const updated = { ...prev };
        if (error) {
          updated[name as keyof FormData] = error as any;
        } else {
          delete updated[name as keyof FormData];
        }
        return updated;
      });
    }

    // Clear form state
    if (formState.error) {
      setFormState((prev) => ({ ...prev, error: null }));
    }
  };

  const handleNext = () => {
    if (step === "type") {
      if (!formData.type) {
        setFormState({
          loading: false,
          success: false,
          error: t.errType,
        });
        return;
      }
      setStep("contact");
    } else if (step === "contact") {
      // Validate contact step
      const nameError = validateField("name", formData.name);
      const emailError = validateField("email", formData.email);

      if (nameError || emailError) {
        setValidationErrors({
          ...(nameError && { name: nameError as any }),
          ...(emailError && { email: emailError as any }),
        });
        return;
      }

      setStep("message");
    }
  };

  const handleBack = () => {
    if (step === "contact") setStep("type");
    if (step === "message") setStep("contact");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate message
    const messageError = validateField("message", formData.message);
    if (messageError) {
      setValidationErrors((prev) => ({
        ...prev,
        message: messageError as any,
      }));
      return;
    }

    setFormState({ loading: true, success: false, error: null });

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        track("contact_submit", {
          type: formData.type || "unspecified",
          locale: routeLocale,
        });
        setFormState({
          loading: false,
          success: true,
          error: null,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          type: "",
          message: "",
          website: "",
        });
        setStep("type");
        setValidationErrors({});

        // Auto-hide success after 5s
        setTimeout(() => {
          setFormState((prev) => ({ ...prev, success: false }));
        }, 5000);
      } else {
        // Server messages are English-only; show the localized one instead.
        setFormState({
          loading: false,
          success: false,
          error: t.errGeneric,
        });
      }
    } catch (error) {
      setFormState({
        loading: false,
        success: false,
        error: t.errGeneric,
      });
    }
  };

  // Step transitions. Vertical offsets only, so RTL (ar) does not slide the
  // wrong way.
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.06, duration: 0.24, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Messages - ARIA Live Region */}
      <motion.div
        ref={alertRef}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: formState.success || formState.error ? 1 : 0,
          y: formState.success || formState.error ? 0 : -10,
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl border p-4 text-sm ${
          formState.success
            ? "bg-accent-tint border-accent-line text-accent-deep"
            : formState.error
              ? "bg-danger-tint border-danger-line text-danger"
              : "hidden"
        }`}
      >
        {formState.success && t.success}
        {formState.error}
      </motion.div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.website || ""}
        onChange={handleChange}
        style={{ display: "none" }}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {/* Step 1: Inquiry Type Selection (Progressive Disclosure) */}
        {step === "type" && (
          <motion.div
            key="step-type"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-ink-900">
                {c.type}
              </h3>
              <p className="text-sm text-ink-500 mt-1">
                {stepLabel(1)}
              </p>
            </div>

            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                htmlFor="contact-type"
                className="text-xs font-medium text-ink-700 block mb-2"
              >
                {c.type}
              </label>
              <select
                id="contact-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`${inputCls} border-hairline cursor-pointer`}
                disabled={formState.loading}
              >
                {typeOptions.map((opt, i) => (
                  <option key={i} value={i === 0 ? "" : opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </motion.div>

            <motion.button
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              type="button"
              onClick={handleNext}
              disabled={!formData.type || formState.loading}
              className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {t.next}
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Contact Details */}
        {step === "contact" && (
          <motion.div
            key="step-contact"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-ink-900">
                {t.contactTitle}
              </h3>
              <p className="text-sm text-ink-500 mt-1">
                {stepLabel(2)}
              </p>
            </div>

            {/* Name Field */}
            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                htmlFor="contact-name"
                className="text-xs font-medium text-ink-700 block mb-2"
              >
                {c.name}
              </label>
              <div className="relative">
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputCls} ${
                    validationErrors.name
                      ? "border-danger focus:border-danger focus:ring-danger/20"
                      : "border-hairline"
                  }`}
                  disabled={formState.loading}
                  required
                  aria-required="true"
                  aria-invalid={!!validationErrors.name}
                />
                <AnimatePresence>
                  {formData.name && !validationErrors.name && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-accent"
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10" /></svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {validationErrors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-danger mt-1"
                  >
                    {validationErrors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email Field */}
            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                htmlFor="contact-email"
                className="text-xs font-medium text-ink-700 block mb-2"
              >
                {c.email}
              </label>
              <div className="relative">
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputCls} ${
                    validationErrors.email
                      ? "border-danger focus:border-danger focus:ring-danger/20"
                      : "border-hairline"
                  }`}
                  disabled={formState.loading}
                  required
                  aria-required="true"
                  aria-invalid={!!validationErrors.email}
                />
                <AnimatePresence>
                  {formData.email && !validationErrors.email && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-accent"
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5l10 -10" /></svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence>
                {validationErrors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-danger mt-1"
                  >
                    {validationErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Company Field */}
            <motion.div
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                htmlFor="contact-company"
                className="text-xs font-medium text-ink-700 block mb-2"
              >
                {c.company}
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`${inputCls} border-hairline`}
                disabled={formState.loading}
              />
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              custom={3}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-3 pt-4"
            >
              <button
                type="button"
                onClick={handleBack}
                disabled={formState.loading}
                className="btn btn-secondary flex-1 disabled:opacity-50"
              >
                {t.back}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  !formData.name || !formData.email || formState.loading
                }
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {t.next}
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Message */}
        {step === "message" && (
          <motion.div
            key="step-message"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-ink-900">
                {t.messageTitle}
              </h3>
              <p className="text-sm text-ink-500 mt-1">
                {stepLabel(3)}
              </p>
            </div>

            <motion.div
              custom={0}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
            >
              <label
                htmlFor="contact-message"
                className="text-xs font-medium text-ink-700 block mb-2"
              >
                {c.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`${inputCls} resize-none ${
                  validationErrors.message
                    ? "border-danger focus:border-danger focus:ring-danger/20"
                    : "border-hairline"
                }`}
                disabled={formState.loading}
                required
                aria-required="true"
                aria-invalid={!!validationErrors.message}
                placeholder={t.placeholder}
              />
              <AnimatePresence>
                {validationErrors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-danger mt-1"
                  >
                    {validationErrors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Trust Signal - 2026 Trend */}
            <motion.div
              custom={1}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="rounded-lg border border-hairline bg-surface-sunken p-3 text-xs text-ink-600"
            >
              {t.trust}
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              custom={2}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-3 pt-4"
            >
              <button
                type="button"
                onClick={handleBack}
                disabled={formState.loading}
                className="btn btn-secondary flex-1 disabled:opacity-50"
              >
                {t.back}
              </button>
              <button
                type="submit"
                disabled={formState.loading}
                className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {formState.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin motion-reduce:animate-none"
                      aria-hidden="true"
                    />
                    {t.sending}
                  </span>
                ) : (
                  c.submit
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div className="flex gap-2 mt-8">
        {["type", "contact", "message"].map((s, i) => (
          <motion.div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors duration-200 ${
              ["type", "contact", "message"].indexOf(step) >= i
                ? "bg-accent"
                : "bg-hairline-strong"
            }`}
          />
        ))}
      </motion.div>
    </form>
  );
}
