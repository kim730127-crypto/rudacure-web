# RudaCure Contact Form - Visual Reference Guide

**Design specifications, animations, and before/after comparisons**

---

## Before & After Comparison

### Current State
```
┌─────────────────────────────────────┐
│ Send a Message                      │
├─────────────────────────────────────┤
│                                     │
│ Name                                │
│ [________________]                  │
│                                     │
│ Email                               │
│ [________________]                  │
│                                     │
│ Company                             │
│ [________________]                  │
│                                     │
│ Inquiry Type                        │
│ [  Select...    ▼]                  │
│                                     │
│ Message                             │
│ [________________]                  │
│ [________________]                  │
│                                     │
│ [ ⏳ SENDING... ]  (submitting)     │
│ [ SEND MESSAGE ]  (default)         │
│                                     │
└─────────────────────────────────────┘
```

### After Phase 1 (Quick Wins)
```
┌─────────────────────────────────────┐
│ ✓ Message sent successfully!        │  ← Animated slide-in
│ We will get back to you soon.       │     with checkmark
├─────────────────────────────────────┤
│                                     │
│ Name                                │
│ [████████████████] ← glow effect    │
│                                     │
│ Email                               │
│ [████████████████] ← bg-teal-50     │
│                                     │
│ Company                             │
│ [████████████████]                  │
│                                     │
│ Inquiry Type                        │
│ [  Select...    ▼]                  │
│                                     │
│ Message                             │
│ [████████████████]                  │
│ [████████████████]                  │
│                                     │
│ [⟲ Sending...]  ← spinning icon     │
│ [SEND MESSAGE] (hover: lifted)      │
│                                     │
│ 🔒 SSL Encrypted • ⏱ 24-hr • ✓GDPR │
└─────────────────────────────────────┘
```

### After Phase 2 (Floating Labels)
```
┌─────────────────────────────────────┐
│ Send a Message                      │
├─────────────────────────────────────┤
│                                     │
│ Name (label floating at top-left)   │
│ [████████████████]                  │
│                                     │
│ Email (label floating at top-left)  │
│ [████████████████]                  │
│                                     │
│ Company                             │
│ [████████████████]                  │
│                                     │
│ Inquiry Type                        │
│ [Investment / IR  ▼]                │
│     ↓ FIELDS APPEAR (animated)     │
│ Timeline          Timeline          │
│ [  Select...  ▼]  [Investment...]   │
│                                     │
│ Message                        0/500│  ← Character counter
│ [████████████████]                  │
│                                     │
│ [⟲ Sending...]                     │
│                                     │
│ 🔒 SSL Encrypted • ⏱ 24-hr • ✓GDPR │
└─────────────────────────────────────┘
```

---

## Color Reference

### Form Color Palette

```css
/* Backgrounds */
--input-bg-default:     rgb(249, 250, 251)   /* gray-50 */
--input-bg-focus:       rgb(240, 253, 250)   /* teal-50 */
--form-background:      rgb(255, 255, 255)   /* white */
--liquid-glass-bg:      rgba(255, 255, 255, 0.45)

/* Borders & Rings */
--input-border-default: rgb(229, 231, 235)   /* gray-200 */
--input-border-focus:   rgb(13, 148, 136)    /* teal-600 */
--ring-focus:           rgba(13, 148, 136, 0.1) /* teal glow */

/* Text */
--text-label:           rgb(75, 85, 99)      /* gray-600 */
--text-input:           rgb(31, 41, 55)      /* gray-800 */
--text-error:           rgb(239, 68, 68)     /* red-500 */
--text-success:         rgb(16, 185, 129)    /* emerald-500 */

/* Button */
--btn-primary:          rgb(13, 148, 136)    /* teal-600 */
--btn-hover:            rgb(15, 118, 110)    /* teal-700 */
--btn-shadow:           rgba(13, 148, 136, 0.25)

/* Messages */
--success-bg:           rgb(240, 253, 250)   /* teal-50 */
--error-bg:             rgb(254, 242, 242)   /* red-50 */
--success-border:       rgb(45, 212, 191)    /* teal-300 */
--error-border:         rgb(248, 113, 113)   /* red-400 */
```

---

## Animation Specifications

### Button Hover Animation

**Duration**: 200ms
**Easing**: cubic-bezier(0.16, 1, 0.3, 1)
**Effect**: Scale + Lift

```
BEFORE (at rest):
━━━━━━━━━━━━━━━━━━━━
[ SEND MESSAGE ]
━━━━━━━━━━━━━━━━━━━━

AFTER (hover):
       ┌─ translate Y by -2px
       │  ┌─ scale to 1.02
       │  │
      ╭─┴─╮
━━━━━━┃     ┃━━━━━━   ← subtle lift
      ┃ SEND┃         ← text grows slightly
      ┃MESSAGE┃
      ╰─┬─╯
        │
        └─ shadow expands
```

### Input Focus Animation

**Duration**: 150ms
**Effect**: Background change + Border + Glow + Subtle scale

```
BEFORE (at rest):
┌──────────────────┐
│ [gray text]      │  ← gray background
│ gray border      │
└──────────────────┘

AFTER (focus):
  ✨ glow
  ↓
┌──────────────────┐
│ [text]           │  ← teal-50 background
│ teal border ━━━━ │
│ 0 0 0 3px glow   │
└──────────────────┘
  ↑
  └─ scale 1.005
```

### Success Message Entry

**Duration**: 400ms
**Easing**: cubic-bezier(0.16, 1, 0.3, 1)
**Effect**: Slide up + Fade in

```
START (t=0):
           ↑ 8px above
           |
           v opacity: 0%
[✓ Success message]

END (t=400ms):
[✓ Success message]  ← at correct position
↑ opacity: 100%
```

### Checkmark Draw Animation

**Duration**: 500ms
**Easing**: cubic-bezier(0.34, 1.56, 0.64, 1)
**Effect**: SVG stroke animation

```
START:         END:
  ✗            ✓
(invisible)  (drawn)

Stroke path:  (1)→(2)
             5  4
           /   ↑
         (2)    |
         |   (3)
         ↓
         ✓
```

### Input Shake (Error)

**Duration**: 500ms
**Effect**: Horizontal shake

```
Position over time:

        ↗ error detected
       /
      ←→← shake warning ←→←
  0   50   100  150  200  250  300  350  400  450  500ms
```

---

## Typography Scale

### Current Typography

```
Page Title:     5xl (48px) bold
Section Title:  lg (18px) semibold
Label:          xs (12px) semibold
Input Text:     sm (14px) regular
Error Message:  xs (12px) regular
Button Text:    sm (14px) semibold
```

### Mobile Optimization

```
Page Title:     3xl (30px) bold
Section Title:  lg (18px) semibold
Label:          sm (14px) semibold      ← increased from xs
Input Text:     base (16px) regular     ← increased, prevents zoom
Error Message:  xs (12px) regular
Button Text:    sm (14px) semibold
```

---

## Spacing & Layout

### Input Field Spacing

```
┌─────────────────────────────────────┐
│ Label (text-xs)                     │
│ ↓ mb-1 (4px gap)                   │
│ ┌─────────────────────────────────┐ │
│ │ [input py-2.5 px-4]             │ │
│ │ h: 40px                         │ │
│ └─────────────────────────────────┘ │
│ ↓ space-y-4 (16px to next field)   │
└─────────────────────────────────────┘
```

### Form Container

```
Mobile (< 768px):        Tablet+ (≥ 768px):
┌────────────────┐       ┌────────────────────────┐
│ p-6 (24px)     │       │ p-6 (24px)             │
│                │       │                        │
│ [form]         │       │ [form]                 │
│                │       │                        │
│ space-y-4      │       │ space-y-4              │
│                │       │                        │
└────────────────┘       └────────────────────────┘
```

---

## State Diagrams

### Input Field States

```
                    ┌─────────────┐
                    │   FOCUSED   │ ← on focus
                    │ bg-teal-50  │
                    │ border-teal │
                    └─────────────┘
                         ↓ ↑
        ┌──────────────────┼──────────────────┐
        ↓                  │                  ↑
   ┌─────────┐        ┌────────────┐    ┌──────────┐
   │ DEFAULT │        │   ERROR    │←───│ INVALID  │
   │ bg-50   │   ←────│ bg-red-50  │    │ FEEDBACK │
   │ border  │        │ border-red │    └──────────┘
   └─────────┘        └────────────┘
      ↓ ↑                  ↓
      │ └──────────────────┴─ Correction entered
      │
      └─ Enter valid data
```

### Form Submission States

```
START
  ↓
[INITIAL] ← All fields visible, button enabled
  ↓ (user clicks submit)
[VALIDATING] ← Client-side check
  ↓ (all valid)
[SUBMITTING] ← Button shows spinner
  ↓ (server response)
[SUCCESS] ← Checkmark message, form resets
  OR
[ERROR] ← Error message, fields kept
  ↓
[INITIAL] ← Ready for retry
```

---

## Focus States Visual Reference

### Focus Indicator Contrast

```
✓ GOOD (meets WCAG AA 3:1 ratio):
┌────────────────────────────┐
│ [text teal ring on white]  │  ← 3px solid teal border
│                            │
└────────────────────────────┘

✗ BAD (insufficient contrast):
┌────────────────────────────┐
│ [text gray ring on white]  │  ← 1px thin gray (hard to see)
│                            │
└────────────────────────────┘
```

---

## Mobile Touch Target Reference

### Current Sizing
```
Input height: 40px (2.5rem)
Button height: 48px
Touch target: 40-48px minimum
```

### Recommended Mobile
```
Input height: 48px (3rem)      ← larger
Button height: 56px (3.5rem)   ← much larger
Label font: 14px (sm)          ← from 12px
Input font: 16px (base)        ← from 14px

┌──────────────────────┐
│ Label (14px)         │
│ ↓ 4px               │
│ ┌──────────────────┐ │
│ │ [Touch zone]     │ │ ← 48px tall
│ │ [Input text 16px]│ │
│ │                  │ │
│ └──────────────────┘ │
└──────────────────────┘

Minimum touch target: 44×44px (Apple)
Recommended: 48×48px (Google Material)
```

---

## Message Display Specifications

### Success Message

```
Icon: SVG checkmark, 20px × 20px
      Animated stroke draw (500ms)
      Color: emerald-600

Background: emerald-50 (rgb(240, 253, 250))
Border: 1px emerald-200
Border-radius: 8px
Padding: 16px
Gap between icon and text: 12px

Text Layout:
┌─────────────────────────────────┐
│ ✓ Message Sent Successfully!    │
│   We will get back to you...    │
└─────────────────────────────────┘

Animation: Slide in from top
  Duration: 400ms
  From: translateY(-8px), opacity 0
  To: translateY(0), opacity 1

Auto-hide: 5000ms (after success)
```

### Error Message

```
Icon: SVG circle with X, 20px × 20px
      Color: red-600

Background: red-50 (rgb(254, 242, 242))
Border: 1px red-200
Border-radius: 8px
Padding: 16px
Gap between icon and text: 12px

Text Layout:
┌─────────────────────────────────┐
│ ✕ Error                         │
│   Please correct the marked...  │
└─────────────────────────────────┘

Animation: Slide in from left
  Duration: 300ms
  From: translateX(-20px), opacity 0
  To: translateX(0), opacity 1

Visibility: Until user corrects and retries
```

---

## Liquid Glass Card Styling

### Current Implementation

```
┌─ Outer border (white 50% transparent)
│
│ ┌──────────────────────────────────┐
│ │ ::before pseudo-element          │  ← 50% highlight at top
│ │ (white gradient, pointer-events) │
│ │ ┌────────────────────────────────┤
│ │ │ Actual form content            │
│ │ │ (position: relative, z-index)  │
│ │ └────────────────────────────────┤
│ │                                  │
│ └──────────────────────────────────┘
│
└─ Backdrop blur: 40px
   Box shadow: 8px 32px
   Background: Linear gradient 135°
```

### CSS Properties

```css
background: linear-gradient(
  135deg,
  rgba(255, 255, 255, 0.45) 0%,
  rgba(255, 255, 255, 0.25) 40%,
  rgba(255, 255, 255, 0.35) 100%
);
backdrop-filter: blur(40px) saturate(1.8);
border: 1px solid rgba(255, 255, 255, 0.5);
border-radius: 1.25rem;
box-shadow:
  0 0 0 0.5px rgba(255, 255, 255, 0.6) inset,  /* inner rim */
  0 8px 32px rgba(0, 0, 0, 0.08),                /* outer shadow */
  0 2px 8px rgba(0, 0, 0, 0.04);                 /* soft edge */
```

---

## Progressive Disclosure Animation

### Field Reveal Sequence

```
Time: 0ms
Form with base fields visible
[Name] [Email] [Company] [Type ▼] [Message]

User selects: "Investment / IR"

Time: 0-400ms
Animation slides new section in from top
[Name] [Email] [Company] [Type ▼]
┌─────────────────────────────────┐ ← New section
│ Timeline    [Select...    ▼]    │   Slide in from top
│ Inv. Stage  [Select...    ▼]    │   Fade in
└─────────────────────────────────┘
[Message]

Time: 400ms+
New fields at full opacity
Ready for interaction
```

### CSS Animation

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

## Accessibility Visuals

### Focus Outline Visibility

```
✓ GOOD:
┌─ Outer focus ring (3px teal)
├──────────────────────────────┐
│ Input field                  │
│ [text content with outline]  │
└──────────────────────────────┘
└─ Clear, visible, high contrast

✗ POOR:
Input field      (very faint outline - hard to see)
[text content]
```

### Error Association Example

```
INCORRECT (visually associated only):
┌─────────────────────┐
│ Email               │
│ [________________]  │
│                     │
│ Please enter valid  │  ← User doesn't know this applies to email
│ email address       │

CORRECT (aria-describedby):
┌─────────────────────────────────────┐
│ Email                               │
│ [________________] aria-describedby │
│ ↓                                   │
│ Please enter valid email address    │  ← Linked via aria-describedby
└─────────────────────────────────────┘
```

---

## Loading Spinner Specifications

### SVG Spinner

```
Animation:
- Full 360° rotation
- Duration: 1000ms
- Easing: linear
- Infinite repeat

Visual:
Circle outline with gradient
┌───────┐
│  ⟲    │  ← spinning icon
└───────┘

Appearance with text:
[⟲ Sending...]   ← icon left, text right, 8px gap
```

---

## Button States Matrix

| State | Background | Text | Shadow | Transform | Cursor |
|-------|-----------|------|--------|-----------|--------|
| Default | teal-600 | white | none | scale-100 | pointer |
| Hover | teal-700 | white | 0 8px 24px | translateY(-2px) scale(1.01) | pointer |
| Active | teal-700 | white | small | translateY(-1px) scale(0.99) | pointer |
| Disabled | teal-600 | white | none | scale-100 | not-allowed |
| Loading | teal-600 | white | none | scale-100 | wait |

---

## Responsive Breakpoints

### Form Width

```
Mobile (< 640px):
Max-width: 100%
Padding: 24px
Single column

Tablet (640px - 1024px):
Max-width: 600px
Padding: 24px
Single column

Desktop (> 1024px):
Max-width: 800px
Padding: 24px
Two columns (contact info + form)
```

---

## Final Visual Summary

### The Three Phases Visually

**Phase 1: Delight** (2 hours)
- Spinning loader instead of emoji ← Speed perception
- Input glow on focus ← Clarity
- Animated checkmark ← Celebration
- Trust badges ← Credibility

**Phase 2: Smart** (6-8 hours)
- Floating labels ← Space efficiency
- Progressive disclosure ← Reduced overwhelm
- Character counter ← Guidance

**Phase 3: Excellence** (8-10 hours)
- Multi-step indicator ← Progress clarity
- Real-time validation ← Error prevention
- Dark mode ← Modern polish

**Total Result**: Form that feels modern, professional, and delightful.

---

This visual reference complements the implementation guide. Use it when:
- Reviewing designs with stakeholders
- Building component variations
- Explaining animations to the team
- QA testing visual states
