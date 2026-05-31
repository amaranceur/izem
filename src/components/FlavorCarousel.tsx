import { useLayoutEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Droplet, Flame, Sparkles, Zap, Leaf, Sun } from 'lucide-react';
import { izemProducts } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

const flavors = izemProducts.filter((p) => p.id !== 7);
const SLIDE_COUNT = flavors.length;
const SLIDE_STEPS = Math.max(SLIDE_COUNT - 1, 1);

/** Fraction of a slide transition required to commit to the next/previous flavor */
const SNAP_THRESHOLD = 0.28;

function snapFlavorProgress(progress: number): number {
  const clamped = gsap.utils.clamp(0, 1, progress);
  if (SLIDE_COUNT <= 1) return 0;

  const scaled = clamped * SLIDE_STEPS;
  const baseIndex = Math.floor(scaled);
  const segmentProgress = scaled - baseIndex;

  if (segmentProgress < SNAP_THRESHOLD) {
    return baseIndex / SLIDE_STEPS;
  }
  if (baseIndex >= SLIDE_STEPS) {
    return 1;
  }
  return (baseIndex + 1) / SLIDE_STEPS;
}

function getDominantSlideIndex(progress: number): number {
  const clamped = gsap.utils.clamp(0, 1, progress);
  if (SLIDE_COUNT <= 1) return 0;

  const scaled = clamped * SLIDE_STEPS;
  const baseIndex = Math.floor(scaled);
  const segmentProgress = scaled - baseIndex;

  if (segmentProgress < SNAP_THRESHOLD) {
    return baseIndex;
  }
  return Math.min(baseIndex + 1, SLIDE_COUNT - 1);
}

function getIcon(id: number, color: string) {
  const props = { size: 40, color, strokeWidth: 1.5, 'aria-hidden': true as const };
  switch (id) {
    case 1:
      return <Zap {...props} />;
    case 2:
      return <Flame {...props} />;
    case 3:
      return <Sparkles {...props} />;
    case 4:
      return <Leaf {...props} />;
    case 5:
      return <Sun {...props} />;
    case 6:
      return <Droplet {...props} />;
    default:
      return <Zap {...props} />;
  }
}

type Product = (typeof flavors)[number];

function FlavorSlide({ product, index }: { product: Product; index: number }) {
  return (
    <div
      data-flavor-slide={index}
      className="relative flex h-full w-screen shrink-0 flex-col items-center justify-center overflow-hidden px-6 md:flex-row md:px-20"
      style={{ backgroundColor: product.color }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
        }}
      />

      <div className="pointer-events-none absolute -right-20 top-1/4 h-[70vmin] w-[70vmin] rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-[50vmin] w-[50vmin] rounded-full bg-black/10 blur-3xl" />

      <div
        data-flavor-content
        className="z-10 flex w-full flex-col items-start justify-center will-change-[opacity,transform] md:w-1/2 md:pr-10"
      >
        <div className="flex flex-col gap-4">
          <span
            data-flavor-badge
            className="w-fit rounded-full border border-white/25 px-6 py-2 text-lg font-nunito font-black uppercase tracking-widest shadow-lg"
            style={{ backgroundColor: product.accentColor, color: product.textColor }}
          >
            {product.badge}
          </span>

          <h3
            data-flavor-title
            className="font-bebas text-5xl leading-none drop-shadow-lg md:text-8xl"
            style={{ color: product.textColor }}
          >
            {product.name}
          </h3>

          <p
            data-flavor-desc
            className="max-w-lg font-nunito text-xl font-semibold leading-relaxed opacity-90 md:text-2xl"
            style={{ color: product.textColor }}
          >
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-6">
            <div className="rounded-2xl border border-white/30 bg-white/20 p-4 shadow-xl backdrop-blur-md">
              {getIcon(product.id, product.textColor)}
            </div>
            <div
              className="font-nunito text-xl font-bold tracking-wider md:text-2xl"
              style={{ color: product.textColor }}
            >
              {product.flavor}
              <span className="mx-2 opacity-50">|</span>
              {product.format}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex h-[42vh] w-full items-center justify-center md:mt-0 md:h-[72vh] md:w-1/2">
        <div
          data-flavor-glow
          className="pointer-events-none absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] will-change-opacity md:h-[420px] md:w-[420px]"
          style={{ backgroundColor: product.accentColor, opacity: 0.35 }}
        />
        <img
          data-flavor-can
          src={product.image}
          alt={product.name}
          className="relative h-full w-auto max-w-full object-contain drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)] will-change-[opacity,transform]"
          draggable={false}
        />
      </div>
    </div>
  );
}

function FlavorSectionStatic({ product }: { product: Product }) {
  const navTheme = product.textColor === '#1A1208' ? 'light' : 'dark';

  return (
    <article
      data-flavor-slide={product.id}
      data-nav-theme={navTheme}
      aria-label={product.name}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-28 md:flex-row md:px-20 md:py-32"
      style={{ backgroundColor: product.color }}
    >
      <div className="z-10 flex w-full flex-col items-start justify-center md:w-1/2 md:pr-10">
        <div className="flex flex-col gap-4">
          <span
            className="w-fit rounded-full border border-white/25 px-6 py-2 text-lg font-nunito font-black uppercase tracking-widest shadow-lg"
            style={{ backgroundColor: product.accentColor, color: product.textColor }}
          >
            {product.badge}
          </span>
          <h3
            className="font-bebas text-5xl leading-none drop-shadow-lg md:text-8xl"
            style={{ color: product.textColor }}
          >
            {product.name}
          </h3>
          <p
            className="max-w-lg font-nunito text-xl font-semibold leading-relaxed opacity-90 md:text-2xl"
            style={{ color: product.textColor }}
          >
            {product.description}
          </p>
          <div className="mt-8 flex items-center gap-6">
            <div className="rounded-2xl border border-white/30 bg-white/20 p-4 shadow-xl backdrop-blur-md">
              {getIcon(product.id, product.textColor)}
            </div>
            <div
              className="font-nunito text-xl font-bold tracking-wider md:text-2xl"
              style={{ color: product.textColor }}
            >
              {product.flavor}
              <span className="mx-2 opacity-50">|</span>
              {product.format}
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-10 flex h-[38vh] w-full items-center justify-center md:mt-0 md:h-[68vh] md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="relative h-full w-auto max-w-full object-contain drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)]"
          draggable={false}
        />
      </div>
    </article>
  );
}

function updateSlideFocus(track: HTMLDivElement, progress: number) {
  const focus = gsap.utils.clamp(0, 1, progress) * SLIDE_STEPS;

  Array.from(track.children).forEach((slide, index) => {
    const distance = Math.abs(focus - index);
    const strength = gsap.utils.clamp(0, 1, 1 - distance);
    const eased = gsap.parseEase('power2.out')(strength);
    const fade = 0.18 + eased * 0.82;
    const yOffset = (1 - eased) * 22;
    const scale = 0.93 + eased * 0.07;

    const content = slide.querySelector<HTMLElement>('[data-flavor-content]');
    const can = slide.querySelector<HTMLElement>('[data-flavor-can]');
    const glow = slide.querySelector<HTMLElement>('[data-flavor-glow]');

    if (content) {
      content.style.opacity = String(fade);
      content.style.transform = `translate3d(0, ${yOffset}px, 0)`;
    }
    if (can) {
      can.style.opacity = String(fade);
      can.style.transform = `translate3d(0, ${yOffset * 0.7}px, 0) scale(${scale})`;
    }
    if (glow) {
      glow.style.opacity = String(0.12 + eased * 0.38);
    }
  });
}

function updateNavTheme(pin: HTMLDivElement, progress: number) {
  const index = getDominantSlideIndex(progress);
  const theme = flavors[index].textColor === '#1A1208' ? 'light' : 'dark';
  pin.setAttribute('data-nav-theme', theme);
}

export default function FlavorCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const getScrollDistance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: 'none',
        force3D: true,
      });

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin,
        scrub: 0.85,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        fastScrollEnd: false,
        animation: tween,
        snap: {
          snapTo: snapFlavorProgress,
          duration: { min: 0.7, max: 1.15 },
          delay: 0.04,
          ease: 'power2.inOut',
        },
        onUpdate: (self) => {
          updateSlideFocus(track, self.progress);
          updateNavTheme(pin, self.progress);
        },
        onSnapComplete: (self) => {
          updateSlideFocus(track, self.progress);
          updateNavTheme(pin, self.progress);
        },
      });

      updateSlideFocus(track, 0);
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('load', refresh);

    const imgRefresh = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('load', refresh);
      window.clearTimeout(imgRefresh);
      ctx.revert();
    };
  }, [reduceMotion]);

  if (reduceMotion) {
    return (
      <section id="flavors" className="relative" aria-labelledby="flavors-heading">
        <header
          data-nav-theme="dark"
          className="relative flex min-h-screen flex-col items-center justify-center bg-[#1A1208] px-6 text-center"
        >
          <h2
            id="flavors-heading"
            className="font-bebas text-[52px] tracking-widest text-white/90 md:text-[88px]"
          >
            NOS FLAVEURS
          </h2>
        </header>
        {flavors.map((product) => (
          <FlavorSectionStatic key={product.id} product={product} />
        ))}
      </section>
    );
  }

  return (
    <section id="flavors" className="relative" aria-labelledby="flavors-heading">
      <header
        data-nav-theme="dark"
        className="relative flex min-h-screen flex-col items-center justify-center bg-[#1A1208] px-6 text-center"
      >
        <p className="font-nunito text-xs font-bold uppercase tracking-[0.35em] text-white/60 md:text-sm">
          Faites défiler
        </p>
        <h2
          id="flavors-heading"
          data-gsap-text
          data-gsap-split="words"
          data-gsap-words-stagger="0.05"
          className="mt-4 font-bebas text-[52px] tracking-widest text-white/90 drop-shadow-md md:text-[88px]"
        >
          NOS FLAVEURS
        </h2>

        <div className="mt-12 flex flex-col items-center gap-2" aria-hidden="true">
          <span className="font-nunito text-xs font-semibold uppercase tracking-widest text-white/60">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/50"
          >
            <ChevronDown size={24} strokeWidth={2} aria-hidden="true" />
          </motion.div>
        </div>
      </header>

      <div ref={sectionRef} className="relative bg-[#1A1208]">
        <div
          ref={pinRef}
          data-nav-theme="dark"
          className="relative flex h-screen items-center overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex h-full w-max will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            {flavors.map((product, index) => (
              <FlavorSlide key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
