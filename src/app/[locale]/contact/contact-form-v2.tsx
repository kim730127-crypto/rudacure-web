'use client'

import { useState, FormEvent, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { submitContactForm } from './actions'

interface ContactFormProps {
  c: Record<string, string | string[]>
  inputCls: string
}

interface FormState {
  loading: boolean
  success: boolean
  error: string | null
}

interface FormData {
  name: string
  email: string
  company: string
  type: string
  message: string
  website?: string
}

type FormStep = 'type' | 'contact' | 'message'

export default function ContactForm({ c, inputCls }: ContactFormProps) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    success: false,
    error: null,
  })

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    type: '',
    message: '',
    website: '',
  })

  const [step, setStep] = useState<FormStep>('type')
  const [validationErrors, setValidationErrors] = useState<Partial<FormData>>({})
  const alertRef = useRef<HTMLDivElement>(null)

  const typeOptions = Array.isArray(c.typeOptions) ? c.typeOptions : []

  // 2026 Trend: Real-time validation
  const validateField = (name: string, value: string): string | null => {
    switch (name) {
      case 'name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : null
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Invalid email address'
      case 'message':
        return value.trim().length < 10 ? 'Message must be at least 10 characters' : null
      default:
        return null
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Real-time validation feedback
    if (validationErrors[name as keyof FormData]) {
      const error = validateField(name, value)
      setValidationErrors(prev => {
        const updated = { ...prev }
        if (error) {
          updated[name as keyof FormData] = error as any
        } else {
          delete updated[name as keyof FormData]
        }
        return updated
      })
    }

    // Clear form state
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }))
    }
  }

  const handleNext = () => {
    if (step === 'type') {
      if (!formData.type) {
        setFormState({
          loading: false,
          success: false,
          error: 'Please select an inquiry type',
        })
        return
      }
      setStep('contact')
    } else if (step === 'contact') {
      // Validate contact step
      const nameError = validateField('name', formData.name)
      const emailError = validateField('email', formData.email)

      if (nameError || emailError) {
        setValidationErrors({
          ...(nameError && { name: nameError as any }),
          ...(emailError && { email: emailError as any }),
        })
        return
      }

      setStep('message')
    }
  }

  const handleBack = () => {
    if (step === 'contact') setStep('type')
    if (step === 'message') setStep('contact')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate message
    const messageError = validateField('message', formData.message)
    if (messageError) {
      setValidationErrors(prev => ({ ...prev, message: messageError as any }))
      return
    }

    setFormState({ loading: true, success: false, error: null })

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setFormState({
          loading: false,
          success: true,
          error: null,
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          type: '',
          message: '',
          website: '',
        })
        setStep('type')
        setValidationErrors({})

        // Auto-hide success after 5s
        setTimeout(() => {
          setFormState(prev => ({ ...prev, success: false }))
        }, 5000)
      } else {
        setFormState({
          loading: false,
          success: false,
          error: result.message,
        })
      }
    } catch (error) {
      setFormState({
        loading: false,
        success: false,
        error: 'An error occurred. Please try again.',
      })
    }
  }

  const getLocalizedLoadingText = (): string => {
    const loadingMessages: Record<string, string> = {
      en: 'Sending...',
      ko: '전송 중...',
      ja: '送信中...',
      zh: '发送中...',
      es: 'Enviando...',
      fr: 'Envoi...',
    }
    const locale = Object.keys(c).find(k => typeof c[k] === 'string') || 'en'
    return loadingMessages[locale] || 'Sending...'
  }

  // 2026 Trend: Progressive Disclosure animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  }

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  }

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
        className={`rounded-lg p-4 text-sm transition-all ${
          formState.success
            ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
            : formState.error
              ? 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
              : 'hidden'
        }`}
      >
        {formState.success && '✓ Message sent successfully! We will get back to you soon.'}
        {formState.error && `✕ ${formState.error}`}
      </motion.div>

      {/* Honeypot */}
      <input
        type="text"
        name="website"
        value={formData.website || ''}
        onChange={handleChange}
        style={{ display: 'none' }}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {/* Step 1: Inquiry Type Selection (Progressive Disclosure) */}
        {step === 'type' && (
          <motion.div
            key="step-type"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {c.type}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Step 1 of 3
              </p>
            </div>

            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="contact-type" className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-2">
                {c.type}
              </label>
              <select
                id="contact-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`${inputCls} cursor-pointer`}
                disabled={formState.loading}
              >
                {typeOptions.map((opt, i) => (
                  <option key={i} value={i === 0 ? '' : opt}>
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
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 text-white py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          </motion.div>
        )}

        {/* Step 2: Contact Details */}
        {step === 'contact' && (
          <motion.div
            key="step-contact"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Contact Information
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Step 2 of 3
              </p>
            </div>

            {/* Name Field */}
            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="contact-name" className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-2">
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
                      ? 'border-red-500 focus:ring-red-500/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  disabled={formState.loading}
                  required
                  aria-required="true"
                  aria-invalid={!!validationErrors.name}
                />
                <AnimatePresence>
                  {formData.name && !validationErrors.name && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    >
                      ✓
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
                    className="text-xs text-red-600 dark:text-red-400 mt-1"
                  >
                    {validationErrors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Email Field */}
            <motion.div custom={1} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="contact-email" className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-2">
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
                      ? 'border-red-500 focus:ring-red-500/30'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                  disabled={formState.loading}
                  required
                  aria-required="true"
                  aria-invalid={!!validationErrors.email}
                />
                <AnimatePresence>
                  {formData.email && !validationErrors.email && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    >
                      ✓
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
                    className="text-xs text-red-600 dark:text-red-400 mt-1"
                  >
                    {validationErrors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Company Field */}
            <motion.div custom={2} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="contact-company" className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-2">
                {c.company}
              </label>
              <input
                id="contact-company"
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={inputCls}
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
                className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-3 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!formData.name || !formData.email || formState.loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 text-white py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Step 3: Message */}
        {step === 'message' && (
          <motion.div
            key="step-message"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Your Message
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Step 3 of 3
              </p>
            </div>

            <motion.div custom={0} variants={fieldVariants} initial="hidden" animate="visible">
              <label htmlFor="contact-message" className="text-xs font-medium text-slate-700 dark:text-slate-300 block mb-2">
                {c.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`${inputCls} resize-none`}
                disabled={formState.loading}
                required
                aria-required="true"
                aria-invalid={!!validationErrors.message}
                placeholder="Tell us more about your inquiry..."
              />
              <AnimatePresence>
                {validationErrors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-xs text-red-600 dark:text-red-400 mt-1"
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
              className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 text-xs text-emerald-800 dark:text-emerald-200"
            >
              🔒 Secure submission • 2-business-day response time
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
                className="flex-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 py-3 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                Back
              </button>
              <motion.button
                whileHover={{ scale: formState.loading ? 1 : 1.02 }}
                whileTap={{ scale: formState.loading ? 1 : 0.98 }}
                type="submit"
                disabled={formState.loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 dark:from-cyan-600 dark:to-cyan-700 text-white py-3 rounded-lg font-semibold text-sm transition-all hover:shadow-lg hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formState.loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⌛
                    </motion.span>
                    {getLocalizedLoadingText()}
                  </span>
                ) : (
                  c.submit
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div className="flex gap-2 mt-8">
        {['type', 'contact', 'message'].map((s, i) => (
          <motion.div
            key={s}
            className={`h-1 flex-1 rounded-full transition-all ${
              step === s
                ? 'bg-cyan-500 dark:bg-cyan-400'
                : ['type', 'contact', 'message'].indexOf(step) > i
                  ? 'bg-emerald-500 dark:bg-emerald-400'
                  : 'bg-slate-200 dark:bg-slate-700'
            }`}
            layoutId={`progress-${s}`}
          />
        ))}
      </motion.div>
    </form>
  )
}
