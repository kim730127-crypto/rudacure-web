# RudaCure Contact Form - Implementation Guide

Quick-start guide for implementing modern form design recommendations.

---

## Quick Wins (Phase 1) - 2 Hours

### 1. Update Button with Spinner (15 min)

**File**: `/src/app/[locale]/contact/contact-form.tsx`

Replace button code:

```typescript
<button
  type="submit"
  disabled={formState.loading}
  className={`btn-primary w-full py-3 rounded-lg font-semibold text-sm transition-all relative ${
    formState.loading
      ? 'opacity-75 cursor-wait'
      : 'hover:shadow-lg active:scale-95'
  }`}
  aria-busy={formState.loading}
>
  {formState.loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>Sending...</span>
    </span>
  ) : (
    c.submit
  )}
</button>
```

**Add to globals.css**:

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```

---

### 2. Enhance Input Focus States (15 min)

**File**: `/src/app/[locale]/contact/page.tsx`

Update the `inputCls` constant:

**Current**:
```typescript
const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 focus:outline-none transition-colors";
```

**Updated**:
```typescript
const inputCls = "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:bg-teal-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none focus:scale-105 transition-all duration-150";
```

---

### 3. Enhance Success Message (15 min)

**File**: `/src/app/[locale]/contact/contact-form.tsx`

Replace success message section:

```typescript
{formState.success && (
  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800 animate-success-slide-in flex items-start gap-3">
    <svg
      className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5 animate-checkmark-draw"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M5 13l4 4L19 7"
        strokeDasharray="24"
        strokeDashoffset="24"
      />
    </svg>
    <div>
      <p className="font-semibold mb-1">Message sent successfully!</p>
      <p>We will get back to you as soon as possible.</p>
    </div>
  </div>
)}
```

**Add to globals.css**:

```css
@keyframes checkmark-draw {
  to { stroke-dashoffset: 0; }
}

.animate-checkmark-draw {
  animation: checkmark-draw 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes success-slide-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-success-slide-in {
  animation: success-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

### 4. Enhance Error Message (15 min)

**File**: `/src/app/[locale]/contact/contact-form.tsx`

Replace error message section:

```typescript
{formState.error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800 animate-slide-in-error flex items-start gap-3">
    <svg
      className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
    <div>
      <p className="font-semibold mb-1">Error</p>
      <p>{formState.error}</p>
    </div>
  </div>
)}
```

**Add to globals.css**:

```css
@keyframes slide-in-error {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in-error {
  animation: slide-in-error 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

---

### 5. Add Trust Signals Section (15 min)

**File**: `/src/app/[locale]/contact/page.tsx`

Add below the form closing tag in the JSX:

```typescript
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  // ... existing code ...

  return (
    <div className="pt-24">
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          {/* ... existing header and contact sections ... */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ... left column with maps ... */}

            <div className="liquid-glass p-6">
              <h3 className="text-lg font-semibold mb-6 text-gray-900">{c.formTitle}</h3>
              <ContactForm c={c} inputCls={inputCls} />

              {/* Trust Signals - ADD HERE */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>SSL Encrypted</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>24-hour response</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 8a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>GDPR Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Phase 2: Floating Labels (3 Hours)

### Create Reusable Form Input Component

**File**: Create `/src/components/form-input.tsx`

```typescript
'use client'

import { useState } from 'react'

interface FormInputProps {
  label: string
  type?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  required?: boolean
  error?: string
  placeholder?: string
}

export function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  disabled,
  required,
  error,
  placeholder,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const hasValue = value.length > 0

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={disabled}
        required={required}
        className={`w-full pt-6 pb-2.5 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800
          focus:bg-teal-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 focus:outline-none
          transition-all duration-150 peer placeholder-transparent
          ${error ? 'border-red-500 focus:ring-red-500/10' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        placeholder={label}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 text-xs font-medium text-gray-600 transition-all duration-150 pointer-events-none
          ${isFocused || hasValue ? 'top-2 text-teal-600' : 'top-3.5 text-gray-500'}
        `}
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {error && (
        <div
          id={`${name}-error`}
          role="alert"
          className="text-red-600 text-xs mt-1 animate-fade-in"
        >
          {error}
        </div>
      )}
    </div>
  )
}
```

**Add to globals.css**:

```css
@keyframes fade-in-error {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in-error 0.2s ease-out;
}
```

**Update contact-form.tsx** to use new component for name and email fields:

```typescript
import { FormInput } from '@/components/form-input'

export default function ContactForm({ c, inputCls }: ContactFormProps) {
  // ... existing state ...

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... error/success messages stay same ... */}

      <FormInput
        label={c.name}
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        disabled={formState.loading}
        required
        error={formState.fieldErrors?.name}
      />

      <FormInput
        label={c.email}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={formState.loading}
        required
        error={formState.fieldErrors?.email}
      />

      {/* ... rest of form ... */}
    </form>
  )
}
```

---

### Progressive Disclosure

**Update contact-form.tsx** to add conditional fields based on inquiry type:

```typescript
const [formData, setFormData] = useState<FormData>({
  name: '',
  email: '',
  company: '',
  type: '',
  message: '',
  timeline: '',      // New
  investmentStage: '', // New
  projectType: '',   // New
})

const renderAdditionalFields = () => {
  if (!formData.type) return null

  // Investment/IR specific fields
  if (
    formData.type.includes('Investment') ||
    formData.type.includes('投资') ||
    formData.type.includes('Inversión') ||
    formData.type.includes('Investissement')
  ) {
    return (
      <div className="space-y-4 pt-4 border-t border-gray-200 animate-fade-up">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Timeline</label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className={inputCls}
            disabled={formState.loading}
          >
            <option value="">Select timeline...</option>
            <option value="6months">6 months</option>
            <option value="1year">1 year</option>
            <option value="2plus">2+ years</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-600 block mb-1">Investment Stage</label>
          <select
            name="investmentStage"
            value={formData.investmentStage}
            onChange={handleChange}
            className={inputCls}
            disabled={formState.loading}
          >
            <option value="">Select stage...</option>
            <option value="seed">Seed</option>
            <option value="seriesA">Series A</option>
            <option value="growth">Growth</option>
          </select>
        </div>
      </div>
    )
  }

  // CRO Services specific fields
  if (formData.type.includes('CRO')) {
    return (
      <div className="space-y-4 pt-4 border-t border-gray-200 animate-fade-up">
        <div>
          <label className="text-xs text-gray-600 block mb-1">Project Type</label>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className={inputCls}
            disabled={formState.loading}
          >
            <option value="">Select project type...</option>
            <option value="discovery">Drug Discovery</option>
            <option value="clinical">Clinical Trials</option>
            <option value="manufacturing">Manufacturing</option>
          </select>
        </div>
      </div>
    )
  }

  return null
}

// In JSX, after the inquiry type field:
{renderAdditionalFields()}
```

**Add to globals.css**:

```css
@keyframes fade-up-reveal {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up-reveal 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

### Character Counter on Message

**Update message field in contact-form.tsx**:

```typescript
<div>
  <div className="flex items-center justify-between mb-1">
    <label className="text-xs text-gray-600 block">{c.message}</label>
    <span className={`text-xs ${
      formData.message.length > 400 ? 'text-orange-500 font-semibold' : 'text-gray-400'
    }`}>
      {formData.message.length}/500
    </span>
  </div>
  <textarea
    name="message"
    value={formData.message}
    onChange={(e) => {
      if (e.target.value.length <= 500) {
        handleChange(e)
      }
    }}
    rows={4}
    maxLength={500}
    className={`${inputCls} resize-none`}
    disabled={formState.loading}
    required
    aria-describedby="message-count"
    placeholder="Provide details about your inquiry..."
  />
  <div id="message-count" className="sr-only">
    {formData.message.length} of 500 characters entered
  </div>
</div>
```

---

## Phase 3: Multi-Step Form (6+ Hours)

### Step Indicator Component

**File**: Create `/src/components/form-step-indicator.tsx`

```typescript
interface FormStepIndicatorProps {
  totalSteps: number
  currentStep: number
  steps: string[]
}

export function FormStepIndicator({
  totalSteps,
  currentStep,
  steps,
}: FormStepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex-1">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                  index + 1 <= currentStep
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    index + 1 < currentStep ? 'bg-teal-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <p className="text-xs text-gray-600 mt-2 text-center">{step}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Testing Checklist

- [ ] Button spinner animates on load
- [ ] Input background changes to teal-50 on focus
- [ ] Success message slides in with animated checkmark
- [ ] Error message slides in with error icon
- [ ] Trust signals display correctly
- [ ] Progressive disclosure shows/hides fields smoothly
- [ ] Character counter updates in real-time
- [ ] Character limit prevents exceeding 500
- [ ] Form is fully keyboard navigable
- [ ] Screen readers announce errors correctly
- [ ] Mobile: touch targets are 48px minimum
- [ ] Mobile: form fields are readable at 16px font
- [ ] All animations run smoothly (60fps)

---

## Performance Verification

```bash
# Check CSS file size
wc -l src/app/globals.css

# Run Lighthouse
npm run build
npm run start
# Then test at localhost:3000/en/contact with Chrome DevTools Lighthouse tab
```

---

## Rollback Plan

If issues arise:

1. **Button spinner**: Revert to emoji by removing SVG spinner
2. **Input focus**: Remove `focus:bg-teal-50` and `focus:scale-105` classes
3. **Animations**: Comment out animation classes (keep CSS)
4. **Progressive disclosure**: Remove `renderAdditionalFields()` call

All changes are additive and can be safely removed independently.

---

## Monitoring

After deployment:

1. **Analytics**: Track form completion rate vs. baseline
2. **User Testing**: Gather feedback on new animations
3. **Performance**: Monitor Lighthouse score
4. **Accessibility**: Run axe DevTools audit
5. **Mobile**: Test on real devices (iPhone, Android)

---

## Timeline

| Phase | Duration | Impact | Priority |
|-------|----------|--------|----------|
| Phase 1 | 2 hours | +10-15% | HIGH |
| Phase 2 | 6-8 hours | +15-25% | MEDIUM |
| Phase 3 | 8-10 hours | +5-10% | LOW |

**Recommendation**: Implement Phase 1 immediately, Phase 2 within 2 weeks, Phase 3 by end of month.
