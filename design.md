# 🥤 IZEM IFRI — 3D Landing Page Generation Prompt

---

## 🎯 THE MASTER PROMPT

> Copy and paste everything below this line into your AI coding tool (v0, Bolt, Cursor, Claude, etc.)

---

```
Build a stunning, joyful, immersive 3D landing page for IZEM — an Algerian energy drink brand by IFRI.
IZEM is the Algerian equivalent of Red Bull, available in cans (25cl & 50cl) and glass bottles (25cl),
in multiple flavors. The page should feel ALIVE, energetic, vibrant, and celebratory — like a
burst of fruit and light. No dark/electronic vibes. Think: sunshine, fruit market, Algerian heat,
bold youth energy.

---

## 🧃 PRODUCT LINEUP — 8 IZEM ITEMS TO SHOWCASE

Display exactly 7 IZEM products in the hero/product section:

1. IZEM CAN 25cl — Classic / Original (Black can) — "Saveur classique intense"
2. IZEM CAN 25cl — Pastèque Fraise (Red can) — "Pastèque Fraise"
3. IZEM CAN 25cl — Coco Myrtille (White can) — "Coco Myrtille"
4. IZEM CAN 25cl — Pomme Figue (Blue can) — "Pomme Figue"
5. IZEM CAN 25cl — Tropical (Orange can) — "Tropical Évasion"
6. IZEM GLASS BOTTLE 25cl — Citron — "Citron Pétillant"
7. IZEM ZERO — Sans Sucre (Sugar Free) — "Zero Sucre, 100% Force"

---

## 🎨 COLOR PALETTE — JOYFUL & BRIGHT (Non-electronic)

Use these exact CSS variables throughout the project:

/* Primary Palette */
--izem-sun: #FFD93D;         /* Warm golden yellow — primary hero bg accent */
--izem-citrus: #FF6B2B;      /* Deep orange — main CTA color */
--izem-strawberry: #FF3E6C;  /* Hot pink-red — for strawberry/red flavors */
--izem-sky: #38BDF8;         /* Sky blue — light refreshing sections */
--izem-lime: #84CC16;        /* Fresh lime green — nature/freshness accent */
--izem-blueberry: #6366F1;   /* Soft indigo/violet — for Coco Myrtille */
--izem-fig: #A16207;         /* Warm fig brown — for Pomme Figue product */
--izem-white: #FFFBF0;       /* Warm off-white — not cold white */
--izem-black: #1A1208;       /* Warm near-black — text */
--izem-cream: #FFF8E7;       /* Page background warm cream */

/* Gradient Combos */
--grad-hero:   linear-gradient(135deg, #FFD93D 0%, #FF6B2B 60%, #FF3E6C 100%);
--grad-can:    linear-gradient(180deg, #FF6B2B 0%, #FFD93D 100%);
--grad-zero:   linear-gradient(135deg, #38BDF8 0%, #6366F1 100%);
--grad-nature: linear-gradient(135deg, #84CC16 0%, #38BDF8 100%);

---

## 🏗️ PAGE SECTIONS (in order)

### 1. NAVBAR
- Logo: "IZEM" in bold blocky font (Bebas Neue or Black Han Sans)
- Right: nav links (Flaveurs, Énergie, À propos, Trouver IZEM)
- CTA button: "Découvrir →" with --izem-citrus background
- Sticky, transparent → frosted glass blur on scroll
- Subtle animated color shimmer on logo

### 2. HERO SECTION (3D Centerpiece)
- Fullscreen section with --grad-hero background
- LARGE 3D animated can rotating slowly in center (Three.js or CSS 3D transform)
- Headline: "RÉVEILLE TA FORCE" — displayed in massive staggered text animation
- Subheadline: "L'énergie algérienne en canette — Izem by IFRI"
- Floating fruit particles (watermelons, strawberries, lemons, figs) in background using CSS keyframes
- Scroll-down indicator with bounce animation

### 3. FLAVOR CAROUSEL (8 Products)
- Horizontal scrollable 3D card carousel (CSS perspective / Three.js / Swiper.js)
- Each card:
  - 3D tilt on hover (Vanilla-Tilt.js or CSS transform perspective)
  - Product name in Bebas Neue
  - Flavor description in French
  - Color-coded background matching flavor identity
  - Subtle glow shadow matching the can color
- Cards float up and settle on page enter (staggered animation, 100ms delay each)
- Active/hovered card scales to 110% with drop shadow

### 4. ENERGY STRIP — INGREDIENTS SECTION
- Horizontal scrolling marquee strip
- Shows: ⚡ Caféine · 💪 Taurine · 🌿 Guarana · 🧬 Vitamines B · ✨ Inositol ·
- Background: --izem-sun (yellow), text: --izem-black
- Looping infinite scroll animation

### 5. THE IZEM MOMENT — LIFESTYLE SECTION
- 2-column layout: left text, right abstract 3D illustration or geometric art
- Tagline: "Pour les actifs. Pour les audacieux. Pour les Algériens."
- 3 icon cards:
  - 🏋️ Sport & Fitness
  - 📚 Études & Concentration
  - 🎉 Sorties & Énergie
- Each card does a flip animation on hover revealing a fun fact

### 6. IZEM ZERO SPOTLIGHT
- Full-width section with --grad-zero background (sky blue to indigo)
- Large "0 SUCRE" text animation (counting up/down reveal)
- White/silver can 3D model floating in center
- CTA: "Découvrir IZEM Zero →"

### 7. WHERE TO FIND US — MAP/DISTRIBUTION
- Section showing: Algérie · France · Tunisie · Libye · Sénégal · Canada
- Animated globe or simple stylized flat map with pulsing dot indicators
- Background: --izem-cream

### 8. FOOTER
- IZEM logo large, centered
- Tagline: "Produit avec fierté en Algérie par IFRI"
- Social icons (Instagram, Facebook, TikTok)
- Minimal links: Mentions légales · Contact · IFRI Group

---

## 💻 FULL TECH STACK

### Frontend Framework
- **React 18** with **Vite** (fast HMR, ESM build)
- TypeScript (strict mode)

### 3D & Animation
- **Three.js** (r160+) — 3D can model, hero centerpiece, floating particles
  - Use GLTFLoader for can models OR procedural CylinderGeometry + texture maps
  - OrbitControls for interactive rotation
  - PointLight + AmbientLight setup for realistic can sheen
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — helpers: Float, Environment, ContactShadows, OrbitControls
- **Framer Motion** (v11) — page-level transitions, card enter animations, stagger effects
- **GSAP** (v3) — hero text reveal, ScrollTrigger for scroll-based animations
- **Vanilla-Tilt.js** — card tilt on mouse hover for product cards

### Styling
- **Tailwind CSS v3** — utility classes for layout and spacing
- CSS custom properties (vars above) for palette
- Custom CSS for 3D transforms, keyframe animations, and gradient meshes

### Carousel / Scroll
- **Swiper.js** (v11) — 3D coverflow carousel for product section
  - `effect: 'coverflow'` with `coverflowEffect: { rotate: 30, depth: 200 }`

### Fonts (load from Google Fonts)
- **Bebas Neue** — Hero titles, product names, section headings
- **Nunito** — Body text, descriptions (rounded, friendly, warm)
- **Cairo** — For any Arabic text elements (brand name in Arabic script)

### Icons & Assets
- **Lucide React** — UI icons (arrow, menu, location pin, etc.)
- **React Icons** — Social media icons (FaInstagram, FaTiktok, FaFacebook)
- Fruit emojis as particle elements (no image assets needed for particles)

### State Management
- **Zustand** — lightweight global store (active flavor state, scroll position, nav state)

### Build & Dev Tools
- **Vite 5** — dev server + bundler
- **ESLint + Prettier** — code quality
- **@vitejs/plugin-react** — React Fast Refresh

### Performance
- **Intersection Observer API** — lazy-load animations only when in viewport
- **React.lazy + Suspense** — lazy-load Three.js canvas sections
- Canvas fallback: if WebGL not available, show static image fallback

---

## ✍️ TYPOGRAPHY RULES

| Element         | Font        | Size     | Weight | Color           |
|-----------------|-------------|----------|--------|-----------------|
| Hero title      | Bebas Neue  | 120px    | 400    | #FFFBF0         |
| Section title   | Bebas Neue  | 64px     | 400    | #1A1208         |
| Product name    | Bebas Neue  | 32px     | 400    | varies by flavor |
| Body text       | Nunito      | 16px     | 400    | #1A1208         |
| CTA button      | Nunito      | 18px     | 800    | #FFFBF0         |
| Marquee text    | Bebas Neue  | 48px     | 400    | #1A1208         |

---

## 🎬 ANIMATION SPECS

| Animation            | Library       | Trigger       | Duration | Easing        |
|----------------------|---------------|---------------|----------|---------------|
| Hero text reveal     | GSAP          | On load       | 1.2s     | power3.out    |
| Can rotation         | Three.js loop | Always        | ∞ / 8s   | linear        |
| Card float-in        | Framer Motion | Scroll enter  | 0.6s     | spring        |
| Card tilt            | Vanilla-Tilt  | Mouse hover   | instant  | CSS 3D        |
| Marquee scroll       | CSS keyframes | Always        | ∞ / 20s  | linear        |
| Fruit particles      | CSS keyframes | Always        | ∞ varied | ease-in-out   |
| Flavor card flip     | CSS transform | Hover         | 0.5s     | cubic-bezier  |
| Scroll fade-up       | GSAP ST       | ScrollTrigger | 0.8s     | power2.out    |
| Globe pulse dots     | CSS animation | Always        | ∞ / 2s   | ease          |

---

## 📁 RECOMMENDED PROJECT STRUCTURE

```
izem-landing/
├── public/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero3D.tsx          ← Three.js can scene
│   │   ├── FlavorCarousel.tsx  ← Swiper 3D coverflow
│   │   ├── EnergyStrip.tsx     ← Infinite marquee
│   │   ├── LifestyleSection.tsx
│   │   ├── ZeroSpotlight.tsx
│   │   ├── Distribution.tsx
│   │   └── Footer.tsx
│   ├── data/
│   │   └── products.ts         ← 8 IZEM product objects
│   ├── hooks/
│   │   └── useScrollAnimation.ts
│   ├── store/
│   │   └── useIzemStore.ts     ← Zustand
│   ├── styles/
│   │   ├── globals.css         ← CSS vars + keyframes
│   │   └── animations.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

---

## 📦 PACKAGE.JSON DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.16.0",
    "@react-three/drei": "^9.105.0",
    "framer-motion": "^11.0.0",
    "gsap": "^3.12.5",
    "swiper": "^11.0.0",
    "vanilla-tilt": "^1.8.1",
    "zustand": "^4.5.0",
    "lucide-react": "^0.383.0",
    "react-icons": "^5.0.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 🌟 DESIGN SOUL

The page should feel like:
- Biting into a cold watermelon on a hot Algerian summer afternoon
- The energy of a street football game in Bejaia
- Proud, local, bold — not trying to copy Red Bull, owning its Algerian identity
- Colors inspired by: Saharan sunsets, Mediterranean fruit markets, Kabyle handcraft patterns
- NO dark backgrounds in main sections (only IZEM Zero section uses cool blues)
- Warmth, joy, movement, pride
```

---

## 🧃 PRODUCT DATA OBJECT (paste into `/src/data/products.ts`)

```typescript
export const izemProducts = [
  {
    id: 1,
    name: "IZEM Original",
    format: "Canette 25cl",
    flavor: "Classique",
    description: "La saveur énergisante originale, intense et légèrement amère.",
    color: "#1A1208",
    accentColor: "#FFD93D",
    textColor: "#FFFBF0",
    emoji: "⚫",
    badge: "Le Classique",
    image: "IZEM CAN 25cl — Classic.png"
  },
  {
    id: 2,
    name: "IZEM Pastèque Fraise",
    format: "Canette 25cl",
    flavor: "Pastèque · Fraise",
    description: "Frais et fruité, un mélange sucré de pastèque avec une touche acidulée.",
    color: "#FF3E6C",
    accentColor: "#FFD93D",
    textColor: "#FFFBF0",
    emoji: "🍓",
    badge: "Best Seller",
    image: "IZEM CAN 25cl — Pastèque Fraise.png"
  },
  {
    id: 3,
    name: "IZEM Coco Myrtille",
    format: "Canette 25cl",
    flavor: "Coco · Myrtille",
    description: "Saveur douce et exotique de noix de coco équilibrée par la myrtille.",
    color: "#6366F1",
    accentColor: "#FFFBF0",
    textColor: "#FFFBF0",
    emoji: "🫐",
    badge: "Nouveau",
    image: "IZEM CAN 25cl — Coco Myrtille.png"
  },
  {
    id: 4,
    name: "IZEM Pomme Figue",
    format: "Canette 25cl",
    flavor: "Pomme · Figue",
    description: "Alliance de la pomme croquante et de la figue sucrée.",
    color: "#38BDF8",
    accentColor: "#A16207",
    textColor: "#1A1208",
    emoji: "🍏",
    badge: "Gourmand",
    image: "IZEM CAN 25cl — Pomme Figue.png"
  },
  {
    id: 5,
    name: "IZEM Tropical",
    format: "Canette 25cl",
    flavor: "Tropical",
    description: "Une explosion de fruits exotiques en canette. Saveur tropicale intense.",
    color: "#FF6B2B",
    accentColor: "#FFD93D",
    textColor: "#FFFBF0",
    emoji: "🌴",
    badge: "Tropical",
    image: "IZEM CAN 25cl — Tropical.png"
  },
  {
    id: 6,
    name: "IZEM Citron",
    format: "Bouteille Verre 25cl",
    flavor: "Citron Pétillant",
    description: "Pétillant et vif, le citron revigorant pour un boost immédiat.",
    color: "#FFD93D",
    accentColor: "#FF6B2B",
    textColor: "#1A1208",
    emoji: "🍋",
    badge: "Rafraîchissant",
    image: "IZEM GLASS BOTTLE 25cl — Citron.png"
  },
  {
    id: 7,
    name: "IZEM ZERO",
    format: "Canette 25cl",
    flavor: "Sans Sucre",
    description: "Toute la force d'IZEM, zéro sucre. Pour les esprits affûtés.",
    color: "#38BDF8",
    accentColor: "#6366F1",
    textColor: "#FFFBF0",
    emoji: "✨",
    badge: "Sugar Free",
    image: "IZEM ZERO — Sans Sucre.png"
  }
];
```

---

*Generated for IZEM by IFRI — Algeria's energy drink brand*
*IFRI: 40+ years of Algerian beverage innovation*