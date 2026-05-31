# IZEM Landing Page — Design Overrides

> **Overrides** `design-system/izem/MASTER.md` for this project.
> Stack: **React 19 + Vite + TypeScript + Tailwind CSS v4 + GSAP + Framer Motion**

---

## Brand (keep — do NOT replace with generic skill palette)

| Role | Hex | Token |
|------|-----|-------|
| Sun | `#FFD93D` | `--izem-sun` |
| Citrus | `#FF6B2B` | `--izem-citrus` |
| Strawberry | `#FF3E6C` | `--izem-strawberry` |
| Sky | `#38BDF8` | `--izem-sky` |
| Blueberry | `#6366F1` | `--izem-blueberry` |
| Cream BG | `#FFF8E7` | `--izem-cream` |
| Text | `#1A1208` | `--izem-black` |

**Typography:** Bebas Neue (display), Nunito (body), Cairo (accent Arabic-friendly)

**Mood:** Joyful, energetic, Algerian youth, sunshine & fruit — NOT cold SaaS blue, NOT AI purple gradients.

---

## Pattern (from skill — adapted)

- **Scroll-triggered storytelling** — horizontal flavor carousel, scroll-fill typography, pinned sections
- **CTA:** Hero + per-section mini CTAs; primary `#FF6B2B` / white text
- **Sections:** Hero → Highlights → Flavors → Energy → Lifestyle → Zero → Distribution → Footer

---

## UX rules (from UI UX Pro Max checklist)

- Lucide icons only (no emoji icons)
- `cursor-pointer` on all clickables
- Hover transitions 150–300ms
- Contrast ≥ 4.5:1 on body text
- Visible focus rings
- `prefers-reduced-motion` respected
- Breakpoints: 375, 768, 1024, 1440px

---

## Anti-patterns for IZEM

- ❌ Generic fintech blue as primary brand color
- ❌ Dark “energy drink cyber” cliché unless Zero section only
- ❌ Layout-shifting hover scales on grid cards
- ❌ Text hidden at opacity 0 without scroll fallback
