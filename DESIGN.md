---
name: Academic Excellence
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1b1b1c'
  on-surface-variant: '#484554'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#797586'
  outline-variant: '#c9c4d7'
  surface-tint: '#6042d6'
  primary: '#451ebb'
  on-primary: '#ffffff'
  primary-container: '#5d3fd3'
  on-primary-container: '#d8ceff'
  inverse-primary: '#cabeff'
  secondary: '#006970'
  on-secondary: '#ffffff'
  secondary-container: '#7af1fc'
  on-secondary-container: '#006e75'
  tertiary: '#713300'
  on-tertiary: '#ffffff'
  tertiary-container: '#954500'
  on-tertiary-container: '#ffc9ab'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6deff'
  primary-fixed-dim: '#cabeff'
  on-primary-fixed: '#1c0062'
  on-primary-fixed-variant: '#4723be'
  secondary-fixed: '#7df4ff'
  secondary-fixed-dim: '#5dd8e2'
  on-secondary-fixed: '#002022'
  on-secondary-fixed-variant: '#004f54'
  tertiary-fixed: '#ffdbc8'
  tertiary-fixed-dim: '#ffb68b'
  on-tertiary-fixed: '#321300'
  on-tertiary-fixed-variant: '#743400'
  background: '#fcf9f8'
  on-background: '#1b1b1c'
  surface-variant: '#e5e2e1'
  heritage-red: '#DD3333'
  surface-mist: '#F2EDEB'
  white: '#FFFFFF'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The design system is built for a professional education consultancy that bridges the gap between local ambition and global opportunity. The brand personality is **authoritative, nurturing, and visionary**, reflecting over a decade of industry leadership. 

The visual style follows a **Modern Corporate** aesthetic with **Tonal Minimalism**. It prioritizes clarity and information density without sacrificing warmth. By utilizing generous white space and a structured hierarchy, the UI evokes a sense of organized professionalism and "academic calm," ensuring students and parents feel a sense of security and trust in the consultancy's guidance.

## Colors
The color strategy centers on a **Deep Indigo Purple** (Primary) to represent wisdom and institutional stability, paired with a **Vibrant Teal** (Secondary) to represent growth and modern innovation.

- **Primary:** Use for high-priority actions, active states, and navigational accents.
- **Secondary:** Use for success indicators, "Next Steps," and supporting visual interest in illustrations or iconography.
- **Heritage Red:** Reserved strictly for urgent alerts, deadlines, or critical "Call to Action" elements that require immediate attention.
- **Surface Mist:** This low-saturation neutral is the primary background for content containers to reduce eye strain compared to pure white.

## Typography
This design system utilizes **Plus Jakarta Sans** exclusively to maintain a contemporary, geometric, yet friendly appearance. The typeface's wide apertures and modern proportions ensure high legibility in both dense academic descriptions and bold marketing headlines.

Headlines should utilize a tighter letter-spacing and heavier weights to project confidence. Body copy is set with a generous line height (1.5x) to facilitate the reading of long-form educational guides. Labels and small captions use a medium or semi-bold weight to ensure they remain distinct at small scales.

## Layout & Spacing
The layout follows a **Fixed-Width Grid** on desktop (12 columns) and a **Fluid Grid** on mobile (4 columns). 

- **Vertical Rhythm:** Built on an 8px base unit. Section spacing should typically be 80px (10 units) on desktop and 48px (6 units) on mobile to allow the content to breathe.
- **Alignment:** Content is strictly left-aligned to establish a clear vertical "reading line," with the exception of centered Hero sections or Call-to-Action banners.
- **Safe Zones:** High-density forms (like application portals) should utilize a 16px internal padding (2 units) to maintain structure.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and **Soft Ambient Shadows**. 

1. **Base:** The primary background uses `white` or `surface-mist`.
2. **Surface:** Content cards use a white background with a very subtle 1px border in a light grey (10% opacity neutral).
3. **Elevated:** Interactive elements or active cards use a soft, large-radius shadow: `0px 10px 30px rgba(30, 30, 30, 0.05)`.
4. **Overlay:** Modals and dropdowns use a crisp 1px border and a more pronounced shadow to separate from the background.

Avoid heavy dark shadows; the depth should feel like paper layers stacked in natural light.

## Shapes
The shape language is **Refined and Rounded**. Standard UI components use a 0.5rem (8px) corner radius. This strikes a balance between the "sharpness" of traditional academia and the "softness" of a modern, approachable service.

Larger containers like cards or feature images should use `rounded-lg` (16px) to emphasize their role as distinct content modules. Decorative elements, such as student testimonial avatars or status tags, may utilize a pill-shape to provide visual variety.

## Components

- **Buttons:** Primary buttons are solid `primary_color` with white text. Secondary buttons use the `secondary_color` as a ghost border with teal text. All buttons have a height of 48px for accessibility.
- **Input Fields:** Use a 1px `neutral` border at 20% opacity. Upon focus, the border transitions to the `primary_color` with a 2px stroke. Include clear, floating labels to assist students during long application processes.
- **Cards:** White backgrounds with `rounded-lg` corners. Cards for "Destination Countries" should feature a top-heavy image followed by a 24px padded text area.
- **Chips/Tags:** Used for "Course Categories" or "Scholarship Status." These are pill-shaped with a 10% opacity background of the `secondary_color` and a darker version of the text color.
- **Status Indicators:** Use `heritage-red` for "Urgent Action Required" or "Application Rejected," and `secondary_color` for "Approved" or "Success."
- **Progress Steppers:** Essential for application tracking. Use a linear horizontal track with the Indigo Primary color indicating completion.