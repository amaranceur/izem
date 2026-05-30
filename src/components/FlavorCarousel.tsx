import { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { Droplet, Flame, Sparkles, Zap, Leaf, Sun } from 'lucide-react';
import { izemProducts } from '../data/products';
const flavors = izemProducts.filter((p) => p.id !== 7);
const SLIDE_COUNT = flavors.length;
const SCROLL_VH_PER_SLIDE = 100;

function getIcon(id: number, color: string) {
  const props = { size: 40, color, strokeWidth: 1.5 };
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

function FlavorSlide({
  product,
  index,
  scrollYProgress,
}: {
  product: Product;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / (SLIDE_COUNT - 1);
  const center = index * step;
  const pad = step * 0.55;

  const contentOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, center - pad), center, Math.min(1, center + pad)],
    [0.2, 1, 0.2]
  );
  const contentY = useTransform(
    scrollYProgress,
    [Math.max(0, center - pad), center, Math.min(1, center + pad)],
    [56, 0, -56]
  );
  const canScale = useTransform(
    scrollYProgress,
    [Math.max(0, center - pad * 0.85), center, Math.min(1, center + pad * 0.85)],
    [0.88, 1, 0.88]
  );
  const canY = useTransform(
    scrollYProgress,
    [Math.max(0, center - step), center, Math.min(1, center + step)],
    [32, 0, -32]
  );
  const glowOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, center - pad), center, Math.min(1, center + pad)],
    [0.15, 0.55, 0.15]
  );

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

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="z-10 mt-24 flex w-full flex-col items-start justify-center pr-0 md:mt-0 md:w-1/2 md:pr-10"
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
      </motion.div>

      <div className="relative z-10 mt-8 flex h-[42vh] w-full items-center justify-center md:mt-0 md:h-[72vh] md:w-1/2">
        <motion.div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px] md:h-[420px] md:w-[420px]"
          style={{ backgroundColor: product.accentColor, opacity: glowOpacity }}
        />
        <motion.img
          src={product.image}
          alt={product.name}
          style={{ scale: canScale, y: canY }}
          className="relative h-full w-auto max-w-full object-contain drop-shadow-[0_28px_56px_rgba(0,0,0,0.45)] will-change-transform"
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function FlavorCarousel() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // 1:1 with scroll — no spring lag
  const x = useTransform(
    scrollYProgress,
    (p) => `-${p * (SLIDE_COUNT - 1) * 100}vw`
  );

  const progressWidth = useTransform(scrollYProgress, (p) => `${Math.max(p * 100, 2)}%`);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.round(v * (SLIDE_COUNT - 1));
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  return (
    <section
      id="flavors"
      ref={targetRef}
      style={{ height: `${SLIDE_COUNT * SCROLL_VH_PER_SLIDE}vh` }}
      className="relative bg-[#1A1208]"
    >
      <div
        data-nav-theme="dark"
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="pointer-events-none absolute top-8 left-0 z-30 w-full px-6 text-center md:top-12">
          <p className="font-nunito text-xs font-bold uppercase tracking-[0.35em] text-white/50 md:text-sm">
            Faites défiler
          </p>
          <h2
            data-gsap-text
            data-gsap-split="words"
            data-gsap-words-stagger="0.05"
            className="font-bebas text-[52px] tracking-widest text-white/90 drop-shadow-md md:text-[88px]"
          >
            NOS FLAVEURS
          </h2>
        </div>

        <motion.div
          className="flex h-full will-change-transform"
          style={{
            x,
            width: `${SLIDE_COUNT * 100}vw`,
          }}
        >
          {flavors.map((product, index) => (
            <FlavorSlide
              key={product.id}
              product={product}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>

        <div className="pointer-events-none absolute bottom-8 left-0 z-30 flex w-full flex-col items-center gap-5 px-6 md:bottom-10">
          <div className="flex items-center gap-3 font-nunito text-sm font-bold tracking-widest text-white/70">
            <span className="text-white tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-white/30">/</span>
            <span className="tabular-nums text-white/40">
              {String(SLIDE_COUNT).padStart(2, '0')}
            </span>
          </div>

          <div className="h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-white/15 md:max-w-sm">
            <motion.div
              className="h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.5)]"
              style={{ width: progressWidth }}
            />
          </div>

          <div className="flex items-center gap-2.5">
            {flavors.map((product, i) => (
              <motion.span
                key={product.id}
                className="rounded-full transition-colors duration-300"
                style={{
                  width: i === activeIndex ? 28 : 8,
                  height: 8,
                  backgroundColor:
                    i === activeIndex ? product.accentColor : 'rgba(255,255,255,0.25)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
