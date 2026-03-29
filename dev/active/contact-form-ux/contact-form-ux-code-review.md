# Contact Form UX/UI Code Review

Last Updated: 2026-03-30

---

## Executive Summary

The contact form implementation is a two-file split between a Next.js Server Component (`page.tsx`) and a Client Component (`contact-form.tsx`), backed by a Server Action (`actions.ts`). The architecture is sound and idiomatic for Next.js 14+. The visual design is polished and on-brand. However, there are significant gaps in accessibility, internationalization completeness, mobile UX, and form validation feedback that would be important to address before this form serves a global, professional pharma/biotech audience.

The most critical issues are: labels are not programmatically associated with inputs (WCAG failure), success/error messages are not announced to screen readers, loading state uses an emoji that breaks screen reader experience, error messages are hardcoded in English in the server action, and the `typeOptions` prop type is too loose (`Record<string, string | string[]>`) creating a runtime safety gap.

---

## Critical Issues (Must Fix)

### 1. Labels Not Associated with Inputs — WCAG 2.1 SC 1.3.1, 4.1.2 Failure

**File:** `contact-form.tsx`, lines 114, 127, 140, 152, 169

Every `<label>` element is missing an `htmlFor` attribute, and no corresponding `id` attribute exists on any input. This means screen readers cannot announce which label belongs to which field when the user focuses the input. This is a Level A WCAG failure and also means clicking the label text does not focus the input, degrading usability for all users on small tap targets.

```tsx
// Current — label and input are not connected
<label className="text-xs text-gray-600 block mb-1">{c.name}</label>
<input type="text" name="name" ... />

// Required fix — associate via htmlFor/id
<label htmlFor="contact-name" className="text-xs text-gray-600 block mb-1">{c.name}</label>
<input id="contact-name" type="text" name="name" ... />
```

This must be applied to all five fields: name, email, company, type (select), and message (textarea).

### 2. Success and Error Messages Not Announced to Screen Readers — WCAG 2.1 SC 4.1.3 Failure

**File:** `contact-form.tsx`, lines 100–111

The success and error banners are conditionally rendered in the DOM, but there is no `role="alert"` or `aria-live` region to notify assistive technology that a status change occurred. A screen reader user who submits the form will receive no feedback whatsoever because focus does not move to the message and no live announcement is made.

```tsx
// Current — invisible to screen readers
<div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800">
  ...
</div>

// Required fix
<div
  role="alert"
  aria-live="assertive"
  className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800"
>
  ...
</div>
```

For the success message in particular, `role="status"` with `aria-live="polite"` is semantically more appropriate since it is not an error.

### 3. Loading State Uses an Emoji as the Sole Visual Indicator — WCAG 2.1 SC 1.1.1

**File:** `contact-form.tsx`, line 190

```tsx
{formState.loading ? '⏳ Sending...' : c.submit}
```

The hourglass emoji `⏳` is announced literally by screen readers as "hourglass not done" or similar, which is jarring. More importantly, the button label changes entirely, which can disorient users. The emoji also has no `aria-hidden` applied and no accessible alternative. The button needs `aria-disabled="true"` while loading (not just `disabled`) to remain in the focus order for screen reader users who need to understand the current state.

Additionally, the "Sending..." text is hardcoded in English and will not translate. This is the only copy string inside the form component that is not sourced from the `c` prop.

### 4. Server Action Validation Error Messages Are Hardcoded in English

**File:** `actions.ts`, lines 122–134

All server-side validation error messages (`'Name is required'`, `'Email is required'`, `'Message is required'`, `'Please enter a valid email address'`) are English-only strings. These reach the client via `result.message` and are displayed directly in the error banner (line 109 of `contact-form.tsx`). A Japanese or Chinese user who encounters a validation error will receive English text.

The form currently performs no client-side validation, so these server messages are the only validation feedback path. This is the intersection of the two issues below, but the server side specifically must either accept a `locale` parameter to return localised messages or the client must perform its own validation with localised strings.

### 5. `inputCls` Prop Passed from Server Component to Client Component Crosses the Server/Client Boundary Unnecessarily

**File:** `page.tsx`, line 87; `contact-form.tsx`, line 7

The `inputCls` string is defined in the server component and passed as a prop to the client component. This is not wrong in a runtime sense, but it means that styling logic for a client component is defined in a server file and must be serialised across the server/client boundary. The `inputCls` value is a static Tailwind class string with no dynamic locale-dependent variation. It belongs in the client component file. This also tightly couples the parent page's implementation details to the child form's internals.

---

## Important Improvements (Should Fix)

### 6. No Client-Side Validation — Every Validation Round-Trip Goes to the Server

**File:** `contact-form.tsx`

The form relies entirely on the `required` HTML attribute on three fields (name, email, message) and server-side validation for error messages. The HTML `required` attribute will produce browser-native validation UI which is not styled, not translated, and varies significantly across browsers and operating systems. The select (inquiry type) and company fields have no client-side constraint at all.

A user who enters an invalid email and submits will wait for a network round-trip to the server before seeing the error. The recommended approach is to add client-side validation (either via native constraint validation with custom messages or via a lightweight schema) that shows translated, styled error messages inline beneath each field before the form is submitted — not in a global banner at the top.

The server-side validation in `actions.ts` should remain as a defence-in-depth layer, but client-side validation should be the primary UX feedback mechanism.

### 7. Field-Level Error Display Is Missing — All Errors Use a Global Banner

**File:** `contact-form.tsx`, lines 107–111

When a server error occurs (e.g. `'Name is required'`), it appears in a single banner above all fields. The user must read the message and then scan the form to find which field is the problem. WCAG SC 3.3.1 requires that input errors identify the field in error. The correct pattern is to display error text directly beneath the relevant field and use `aria-describedby` on the input to associate it with that error message, and `aria-invalid="true"` to signal the error state programmatically.

```tsx
// Desired pattern per field
<input
  id="contact-name"
  aria-describedby={nameError ? "contact-name-error" : undefined}
  aria-invalid={nameError ? "true" : undefined}
  ...
/>
{nameError && (
  <p id="contact-name-error" role="alert" className="text-xs text-red-600 mt-1">
    {nameError}
  </p>
)}
```

### 8. `ContactFormProps` Type Is Too Loose

**File:** `contact-form.tsx`, line 7

```tsx
interface ContactFormProps {
  c: Record<string, string | string[]>
  inputCls: string
}
```

The `c` prop is the locale content object, which has a known shape (from the `C` object in `page.tsx`). By typing it as `Record<string, string | string[]>`, every property access requires a runtime type guard (the `Array.isArray(c.typeOptions)` check on line 40 exists for exactly this reason). The fix is to define a concrete `ContactContent` interface that mirrors the actual shape of each locale entry, and use that type for the prop. This eliminates the runtime check and brings the TypeScript type safety to the component boundary.

### 9. Auto-Dismissing Success Message Causes Accessibility Issues and Data Loss Risk

**File:** `contact-form.tsx`, lines 77–80

```tsx
setTimeout(() => {
  setFormState(prev => ({ ...prev, success: false }))
}, 5000)
```

The success message disappears after 5 seconds with no way for the user to dismiss it or acknowledge it. This violates WCAG 2.1 SC 2.2.1 (Timing Adjustable) because the user may not have had time to read it. Screen reader users may not even hear the announcement before it disappears. The timeout is also tied to component mount but not cleaned up — if the component unmounts (e.g. the user navigates away) before the timeout fires, this is a benign but unnecessary memory leak (a `useEffect` cleanup should clear it).

The recommended approach for a success state is to keep the message visible until the user either dismisses it or navigates away. If auto-dismiss is a product requirement, the timeout should be extended to at least 10 seconds, and the message should include a close button.

### 10. Korean Address Strings Exist Only in Korean for HQ and Seoul Office in Non-Korean Locales

**File:** `page.tsx`, lines 40–44 (zh locale)

The `hqAddr` and `seoulAddr` for the `zh`, `ja`, `es`, and `fr` locales use the English romanised form of the address, which is correct. However, for a Chinese or Japanese audience, the Korean addresses could reasonably be provided in the local script or at minimum localised to the regional address format. This is a content concern rather than a code defect, but it is worth flagging since the addresses for `ko` locale are in Korean script while all other locales fall back to English romanisation without a localised version.

### 11. `getRecipientEmail` Has a Silent Duplicate Key Bug in the Type Map

**File:** `actions.ts`, lines 29–32

```ts
'投资 / IR': 'js.shin@rudacure.com',         // Chinese: Investment
...
'投資 / IR': 'js.shin@rudacure.com',        // Japanese: Investment
```

The Chinese `'投资 / IR'` (simplified) and Japanese `'投資 / IR'` (traditional) use different Unicode characters (`资` vs `資`) so these are actually two distinct keys. This is correct behaviour, but it is not obvious from the code. A comment clarifying the Unicode distinction would prevent future maintainers from accidentally merging them. More importantly, the Korean `'투자 / IR'` key on line 40 will never match because the Korean select option value in `page.tsx` line 14 is `"투자 / IR"` — and these two strings are identical, so routing does work. But the entire routing mechanism is fragile: any whitespace or punctuation difference between the page's `typeOptions` string and the `getRecipientEmail` map key will silently fall through to the default. This is a maintenance risk.

---

## Minor Suggestions (Nice to Have)

### 12. The Form Container Card Has a Hover Transform That Moves the Entire Form

**File:** `page.tsx`, line 148; `globals.css`, line 125–132

The `.liquid-glass` class applies `transform: translateY(-2px)` on hover. The contact form is wrapped in a `liquid-glass` div. When the user hovers over the form card, the entire form shifts upward by 2px. While visually subtle, this is unexpected behaviour for an interactive element (as opposed to a decorative card). Hover transforms are conventional for non-interactive cards that suggest clickability. Applying them to a form container creates a confusing affordance and can cause micro-jitter when the cursor is near the card edge. The form panel should either use a static `glass-card` variant or the hover transform should be suppressed for the form wrapper.

### 13. Select Element Uses Index-Based Empty Value Detection, Not a Sentinel Value

**File:** `contact-form.tsx`, lines 160–164

```tsx
{typeOptions.map((opt, i) => (
  <option key={i} value={i === 0 ? '' : opt}>
    {opt}
  </option>
))}
```

The "please select" placeholder option is identified by `i === 0`, meaning its behaviour is tied to array position rather than content. If the `typeOptions` array order ever changes or a locale adds a prepended item, this silently breaks. The placeholder option should use an explicit empty string value in the content data, or the component should treat the first element specially only if `opt` matches a known placeholder pattern.

Additionally, using `key={i}` for list items where the order is fixed is acceptable here, but using the option value as the key would be more semantically correct.

### 14. Phone/Fax Numbers Are Not Marked Up as Links on Mobile

**File:** `page.tsx`, lines 109, 125

```tsx
<p className="text-gray-600 text-sm mt-2">Tel: 032-724-9070 | Fax: 032-724-9071</p>
```

Mobile users cannot tap-to-call or tap-to-copy these numbers because they are plain text inside a `<p>` tag. They should be wrapped in `<a href="tel:+82327249070">` links. This is especially relevant given that the primary audience includes international partners who may be viewing this on a mobile device during a conference or site visit.

### 15. Email Addresses in the Inquiry Contact List Are Not `mailto:` Links

**File:** `page.tsx`, lines 141–143

The email addresses `sh.kim@rudacure.com`, `js.shin@rudacure.com`, and `jyshin@rudacure.com` are rendered as styled text spans without being wrapped in `<a href="mailto:...">`. A user who wants to contact a specific department by email must manually copy the address. This reduces the utility of listing the contact emails and is a missed progressive enhancement opportunity.

### 16. Google Maps `iframe` Elements Have No Title Attribute

**File:** `page.tsx`, lines 111–120, 127–136

Both `<iframe>` elements lack a `title` attribute. Screen readers will attempt to announce the iframe content with no descriptive label, typically falling back to the `src` URL which is an unreadable Google Maps embed URL. WCAG SC 4.1.2 requires that all user interface components have a name. Adding `title="Headquarters location map"` and `title="Seoul office location map"` resolves this.

### 17. Redundant Conditional in the Success Message Render

**File:** `contact-form.tsx`, lines 101–103

```tsx
{formState.success && (
  <div ...>
    ✓ {formState.success ? 'Message sent successfully! We will get back to you soon.' : ''}
  </div>
)}
```

The outer `&&` gate already ensures this renders only when `formState.success` is `true`. The inner ternary `{formState.success ? '...' : ''}` is therefore always evaluating to the truthy branch and the empty string branch is dead code. This is also the only copy string in the component that is not internationalised.

### 18. `inputCls` Focus Ring Uses `ring-1` Which May Be Insufficient for WCAG 2.1 SC 1.4.11

**File:** `page.tsx`, line 87

```tsx
const inputCls = "... focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 ..."
```

The focus indicator is `ring-1` (1px) with `ring-teal-500/20` (20% opacity teal). WCAG 2.1 SC 1.4.11 Non-text Contrast requires focus indicators to have a 3:1 contrast ratio against adjacent colours. A 20% opacity ring on a white background is likely to fail this ratio. The ring width should be at least `ring-2` and the opacity should be 100% (full `ring-teal-500`) to ensure adequate contrast. The `focus:outline-none` suppresses the browser default outline, making this custom ring the sole focus indicator — it must therefore meet the contrast threshold.

---

## Architecture Considerations

### Internationalisation Architecture: Two Parallel Systems

The project maintains two independent translation systems: a `translations` object in `src/lib/i18n.ts` used via the `t()` helper, and a page-level `C` constant object defined inline in `page.tsx`. The contact page uses only the inline `C` constant and passes a slice of it down to `contact-form.tsx` as the `c` prop. The `i18n.ts` translations file also contains contact form strings (e.g. `contact.form.name`, `contact.form.submit`) that are never consumed.

This duplication means any copy change to the contact form requires updating both `C` in `page.tsx` and the dead keys in `i18n.ts`. The contact page content strings should either be unified under `i18n.ts` (using the `t()` function in the server component) or the `i18n.ts` contact strings should be removed. The current state creates a maintenance inconsistency that will produce translation drift over time.

### Server Action Error Messages Not Internationalised

The `actions.ts` Server Action returns validation and system error messages as hardcoded English strings. These are surfaced directly to end users. For a multilingual application targeting pharmaceutical and biotech professionals across six locales, English-only error messages in non-English locales represent a professional quality gap. The recommended approach is to pass the current locale to the server action and use the same `t()` i18n system to return localised validation messages.

### Form State Reset After Submission Loses Inquiry Context

When the form submits successfully, all fields including the `type` (inquiry category) are reset to empty. If the user wishes to send a follow-up message of the same inquiry type, they must re-select the category. Consider whether preserving the `type` selection on reset would improve repeat-use UX.

---

## Next Steps

Priority order for implementation:

1. Add `htmlFor` / `id` pairs to all label/input combinations (Critical, low effort)
2. Add `role="alert"` and `role="status"` to the message banners (Critical, low effort)
3. Replace emoji loading indicator with translated text and `aria-busy` on the form (Critical, low effort)
4. Add `title` attributes to both Google Maps iframes (Critical, low effort)
5. Add client-side field-level validation with translated error messages beneath each field (Important, medium effort)
6. Make server action validation messages locale-aware (Important, medium effort)
7. Correct the `focus:ring` contrast for WCAG 1.4.11 compliance (Important, low effort)
8. Wrap phone numbers and email addresses in `tel:` and `mailto:` links (Minor, low effort)
9. Move `inputCls` into `contact-form.tsx` and define a concrete `ContactContent` type (Minor, low effort)
10. Add cleanup to the success message `setTimeout` via `useEffect` return (Minor, low effort)
11. Resolve the dual i18n system — unify under `i18n.ts` or remove dead keys (Architecture, medium effort)
