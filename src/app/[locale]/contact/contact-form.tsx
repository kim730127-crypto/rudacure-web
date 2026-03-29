'use client'

import { useState, FormEvent, useRef } from 'react'
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

  const alertRef = useRef<HTMLDivElement>(null)

  const typeOptions = Array.isArray(c.typeOptions) ? c.typeOptions : []

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error on input
    if (formState.error) {
      setFormState(prev => ({ ...prev, error: null }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        })
        // Auto-hide success message after 5 seconds
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
        error: 'An unexpected error occurred. Please try again.',
      })
    }
  }

  // Get localized loading message
  const getLocalizedLoadingText = (): string => {
    const loadingMessages: Record<string, string> = {
      en: 'Sending...',
      ko: '전송 중...',
      ja: '送信中...',
      zh: '发送中...',
      es: 'Enviando...',
      fr: 'Envoi...',
    }
    // Infer locale from c object keys (ko, en, ja, etc.)
    const locale = Object.keys(c).find(k => typeof c[k] === 'string') || 'en'
    return loadingMessages[locale] || 'Sending...'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Status Messages - ARIA Live Region */}
      <div
        ref={alertRef}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={`rounded-lg p-4 text-sm transition-all ${
          formState.success
            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
            : formState.error
              ? 'bg-red-50 border border-red-200 text-red-800'
              : 'hidden'
        }`}
      >
        {formState.success && '✓ Message sent successfully! We will get back to you soon.'}
        {formState.error && `✕ ${formState.error}`}
      </div>

      {/* Honeypot Field - Hidden from users */}
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

      {/* Name Field */}
      <div>
        <label htmlFor="contact-name" className="text-xs text-gray-600 block mb-1">
          {c.name}
        </label>
        <input
          id="contact-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`${inputCls} focus:ring-2 focus:ring-teal-500`}
          disabled={formState.loading}
          required
          aria-required="true"
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="contact-email" className="text-xs text-gray-600 block mb-1">
          {c.email}
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`${inputCls} focus:ring-2 focus:ring-teal-500`}
          disabled={formState.loading}
          required
          aria-required="true"
        />
      </div>

      {/* Company Field */}
      <div>
        <label htmlFor="contact-company" className="text-xs text-gray-600 block mb-1">
          {c.company}
        </label>
        <input
          id="contact-company"
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className={`${inputCls} focus:ring-2 focus:ring-teal-500`}
          disabled={formState.loading}
        />
      </div>

      {/* Type Field */}
      <div>
        <label htmlFor="contact-type" className="text-xs text-gray-600 block mb-1">
          {c.type}
        </label>
        <select
          id="contact-type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={`${inputCls} focus:ring-2 focus:ring-teal-500`}
          disabled={formState.loading}
        >
          {typeOptions.map((opt, i) => (
            <option key={i} value={i === 0 ? '' : opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="contact-message" className="text-xs text-gray-600 block mb-1">
          {c.message}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className={`${inputCls} focus:ring-2 focus:ring-teal-500 resize-none`}
          disabled={formState.loading}
          required
          aria-required="true"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={formState.loading}
        className={`btn-primary w-full py-3 rounded-lg font-semibold text-sm transition-all focus:ring-2 focus:ring-teal-500 ${
          formState.loading
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-lg active:scale-95'
        }`}
      >
        {formState.loading ? getLocalizedLoadingText() : c.submit}
      </button>
    </form>
  )
}
