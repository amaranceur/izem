import { useId, useLayoutEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Zap } from 'lucide-react';
import zeroImg from '../assets/izem/IZEM ZERO — Sans Sucre.png';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_LENGTH_VH = 1.35;

const CIRCLE_TEXT_OUTER =
  ' · 0g SUCRE · IZEM ZERO · SANS COMPROMIS · 100% FORCE · ÉNERGIE PURE · ';
const CIRCLE_TEXT_INNER =
  ' · IFRI · ALGÉRIE · ZÉRO SUCRE · BOOST · CONCENTRATION · ';

function getCoverRadius() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return Math.hypot(w, h) * 0.55;
}

function getStartRadius() {
  return Math.min(window.innerWidth, window.innerHeight) * 0.14;
}

function CircularText({
  text,
  radius,
  fontSize = 10.5,
  reverse = false,
  className = '',
}: {
  text: string;
  radius: number;
  fontSize?: number;
  reverse?: boolean;
  className?: string;
}) {
  const pathId = useId().replace(/:/g, '');
  const d = `M 100, 100 m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`h-full w-full ${className}`}
      aria-hidden="true"
      style={reverse ? { transform: 'scaleX(-1)' } : undefined}
    >
      <defs>
        <path id={pathId} d={d} fill="none" />
      </defs>
      <text
        fill="currentColor"
        fontSize={fontSize}
        fontFamily="Nunito, sans-serif"
        fontWeight="800"
        letterSpacing="2.5"
      >
        <textPath href={`#${pathId}`} startOffset="0%">
          {text.repeat(2)}
        </textPath>
      </text>
    </svg>
  );
}

function ZeroCircleRing({
  ringRef,
  ringTextOuterRef,
  ringTextInnerRef,
  ringGlowRef,
  startRadius,
  animate = true,
}: {
  ringRef: RefObject<HTMLDivElement | null>;
  ringTextOuterRef: RefObject<HTMLDivElement | null>;
  ringTextInnerRef: RefObject<HTMLDivElement | null>;
  ringGlowRef: RefObject<HTMLDivElement | null>;
  startRadius: number;
  animate?: boolean;
}) {
  const size = startRadius * 2;

  return (
    <div
      ref={ringRef}
      className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        ref={ringGlowRef}
        className="absolute inset-[-12%] rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(99,102,241,0.12) 45%, transparent 70%)',
        }}
      />

      <div
        className={`absolute inset-0 rounded-full p-[3px] ${animate ? 'zero-ring-gradient-spin' : ''}`}
        style={{
          background: 'conic-gradient(from 0deg, #38BDF8, #6366F1, #FFFBF0, #38BDF8)',
        }}
      >
        <div className="h-full w-full rounded-full bg-[#1A1208]/95" />
      </div>

      <div className="absolute inset-[5%] rounded-full border border-[#FFFBF0]/20" />

      <div ref={ringTextOuterRef} className="absolute inset-[2%]">
        <div className={`h-full w-full text-[#FFFBF0]/90 ${animate ? 'zero-text-spin' : ''}`}>
          <CircularText text={CIRCLE_TEXT_OUTER} radius={88} fontSize={10.5} />
        </div>
      </div>

      <div ref={ringTextInnerRef} className="absolute inset-[14%]">
        <div className={`h-full w-full text-[#38BDF8]/80 ${animate ? 'zero-text-spin-reverse' : ''}`}>
          <CircularText text={CIRCLE_TEXT_INNER} radius={72} fontSize={8.5} reverse />
        </div>
      </div>

      {[0, 90, 180, 270].map((deg) => (
        <div
          key={deg}
          className="absolute inset-0"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#FFFBF0] shadow-[0_0_10px_rgba(255,251,240,0.8)]" />
        </div>
      ))}

      <Sparkles
        className="absolute -top-1 right-[18%] h-4 w-4 text-[#FFFBF0]/70"
        strokeWidth={2}
        aria-hidden="true"
      />
      <Zap
        className="absolute bottom-[12%] left-[10%] h-4 w-4 text-[#38BDF8]/80"
        strokeWidth={2}
        aria-hidden="true"
      />
    </div>
  );
}

export default function ZeroSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextOuterRef = useRef<HTMLDivElement>(null);
  const ringTextInnerRef = useRef<HTMLDivElement>(null);
  const ringGlowRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const section = sectionRef.current;
    const pin = pinRef.current;
    const content = contentRef.current;
    const ring = ringRef.current;
    const ringGlow = ringGlowRef.current;
    const scrollHint = scrollHintRef.current;
    if (!section || !pin || !content) return;

    const revealItems = content.querySelectorAll<HTMLElement>('[data-zero-reveal]');

    const ctx = gsap.context(() => {
      gsap.set(revealItems, { opacity: 0.25, y: 24 });

      const tween = gsap.fromTo(
        content,
        { clipPath: () => `circle(${getStartRadius()}px at 50% 50%)` },
        {
          clipPath: () => `circle(${getCoverRadius()}px at 50% 50%)`,
          ease: 'none',
        }
      );

      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * SCROLL_LENGTH_VH}`,
        pin,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: tween,
        onUpdate: (self) => {
          const progress = self.progress;
          const radius =
            getStartRadius() + (getCoverRadius() - getStartRadius()) * progress;

          if (ring) {
            ring.style.width = `${radius * 2}px`;
            ring.style.height = `${radius * 2}px`;
            ring.style.opacity = String(Math.max(0, 1 - progress * 1.25));
          }

          if (ringGlow) {
            ringGlow.style.opacity = String(0.85 - progress * 0.65);
            ringGlow.style.transform = `scale(${1 + progress * 0.15})`;
          }

          if (ringTextOuterRef.current) {
            ringTextOuterRef.current.style.transform = `rotate(${progress * 140}deg)`;
          }
          if (ringTextInnerRef.current) {
            ringTextInnerRef.current.style.transform = `rotate(${-progress * 90}deg)`;
          }

          if (scrollHint) {
            scrollHint.style.opacity = String(Math.max(0, 1 - progress * 2.5));
          }

          const countValue = Math.max(0, Math.round(100 - progress * 100));
          if (countRef.current) {
            countRef.current.textContent = String(countValue);
            const countScale = 1 + Math.sin(progress * Math.PI) * 0.06;
            countRef.current.style.transform = `scale(${countScale})`;
            countRef.current.style.color =
              countValue > 50 ? '#FFFBF0' : countValue > 0 ? '#38BDF8' : '#FFFBF0';
            countRef.current.style.filter =
              countValue === 0
                ? 'drop-shadow(0 0 28px rgba(56,189,248,0.75))'
                : 'drop-shadow(0 0 18px rgba(255,251,240,0.35))';
          }

          const countRing = content.querySelector<SVGCircleElement>('[data-zero-count-ring]');
          if (countRing) {
            const circumference = 2 * Math.PI * 54;
            countRing.style.strokeDashoffset = String(
              circumference * (1 - progress)
            );
            countRing.style.opacity = String(0.35 + progress * 0.65);
          }

          const sucreStrike = content.querySelector<HTMLElement>('[data-zero-strike]');
          if (sucreStrike) {
            sucreStrike.style.transform = `scaleX(${gsap.utils.clamp(0, 1, (progress - 0.15) / 0.55)})`;
          }

          const sucreWord = content.querySelector<HTMLElement>('[data-zero-sucre-word]');
          if (sucreWord) {
            const sucreFade = gsap.utils.clamp(0.35, 1, 1 - progress * 0.55);
            sucreWord.style.opacity = String(sucreFade);
            sucreWord.style.letterSpacing = `${progress * 0.18}em`;
          }

          const zeroBadge = content.querySelector<HTMLElement>('[data-zero-badge]');
          if (zeroBadge) {
            const badgeProgress = gsap.utils.clamp(0, 1, (progress - 0.72) / 0.28);
            zeroBadge.style.opacity = String(badgeProgress);
            zeroBadge.style.transform = `translateY(${(1 - badgeProgress) * 12}px) scale(${0.85 + badgeProgress * 0.15})`;
          }

          content.querySelectorAll<HTMLElement>('[data-zero-particle]').forEach((el, i) => {
            const delay = i * 0.04;
            const p = gsap.utils.clamp(0, 1, (progress - delay) / (1 - delay));
            el.style.opacity = String((1 - p) * 0.75);
            el.style.transform = `translate3d(${(i % 2 === 0 ? -1 : 1) * p * 18}px, ${-p * 40}px, 0) scale(${1 - p * 0.5})`;
          });

          const canImg = content.querySelector<HTMLElement>('[data-zero-can]');
          if (canImg) {
            const canProgress = gsap.utils.clamp(0, 1, (progress - 0.35) / 0.65);
            canImg.style.transform = `translate3d(0, ${(1 - canProgress) * 28}px, 0) rotate(${-2 + canProgress * 2}deg) scale(${0.94 + canProgress * 0.06})`;
          }

          const canGlow = content.querySelector<HTMLElement>('[data-zero-can-glow]');
          if (canGlow) {
            const glowP = gsap.utils.clamp(0, 1, (progress - 0.4) / 0.6);
            canGlow.style.opacity = String(0.2 + glowP * 0.5);
            canGlow.style.transform = `scale(${0.9 + glowP * 0.2})`;
          }

          content.querySelectorAll<HTMLElement>('[data-zero-feat]').forEach((el, i) => {
            const featStart = 0.55 + i * 0.06;
            const featP = gsap.utils.clamp(0, 1, (progress - featStart) / 0.25);
            el.style.opacity = String(0.2 + featP * 0.8);
            el.style.transform = `translate3d(0, ${(1 - featP) * 16}px, 0) scale(${0.92 + featP * 0.08})`;
          });

          revealItems.forEach((el) => {
            const fade = gsap.utils.clamp(0.25, 1, (progress - 0.2) / 0.55);
            if (el.hasAttribute('data-zero-feat') || el.closest('[data-zero-sucre-hero]')) return;
            el.style.opacity = String(fade);
            el.style.transform = `translate3d(0, ${(1 - fade) * 24}px, 0)`;
          });
        },
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    window.addEventListener('load', refresh);
    const t = window.setTimeout(refresh, 400);

    return () => {
      window.removeEventListener('resize', refresh);
      window.removeEventListener('load', refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [reduceMotion]);

  const content = (
    <>
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="font-bebas leading-none text-[#FFFBF0]"
          style={{ fontSize: 'clamp(160px, 30vw, 400px)', opacity: 0.08 }}
        >
          0
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,251,240,0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(56,189,248,0.2) 0%, transparent 45%)',
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, #38BDF840, #6366F100)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto flex w-full flex-col items-center gap-10 px-4 py-20 sm:gap-12 sm:px-6 sm:py-24 md:flex-row">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <div
            data-zero-sucre-hero
            data-zero-reveal
            className="relative mb-6 flex flex-col items-center gap-4 will-change-[opacity,transform] sm:inline-flex sm:flex-row sm:items-baseline sm:gap-3"
          >
            <div className="relative inline-flex items-center justify-center">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <span
                  key={i}
                  data-zero-particle
                  className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-[#FFFBF0]/70 will-change-[opacity,transform]"
                  style={{
                    left: `${12 + (i % 4) * 22}%`,
                    top: `${8 + Math.floor(i / 4) * 55}%`,
                  }}
                  aria-hidden="true"
                />
              ))}

              <svg
                className="pointer-events-none absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] -rotate-90"
                viewBox="0 0 120 120"
                aria-hidden="true"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255,251,240,0.15)"
                  strokeWidth="3"
                />
                <circle
                  data-zero-count-ring
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54}
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(56,189,248,0.6))',
                  }}
                />
              </svg>

              <span
                ref={countRef}
                className="relative font-bebas leading-none text-[#FFFBF0] transition-colors duration-200 will-change-[opacity,transform]"
                style={{
                  fontSize: 'clamp(64px, 18vw, 160px)',
                  filter: 'drop-shadow(0 0 18px rgba(255,251,240,0.35))',
                }}
              >
                {reduceMotion ? '0' : '100'}
              </span>
            </div>

            <div className="relative flex flex-col items-center gap-2 sm:items-start">
              <span
                data-zero-sucre-word
                className="relative font-bebas text-4xl text-[#FFFBF0]/80 will-change-[opacity,letter-spacing] sm:text-5xl"
              >
                SUCRE
                <span
                  data-zero-strike
                  className={`absolute left-0 top-[52%] h-[3px] w-full origin-left rounded-full bg-[#FFFBF0] shadow-[0_0_12px_rgba(255,251,240,0.8)] will-change-transform ${reduceMotion ? 'scale-x-100' : 'scale-x-0'}`}
                  aria-hidden="true"
                />
              </span>
              <span
                data-zero-badge
                className={`inline-flex items-center gap-1.5 rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/15 px-3 py-1 font-nunito text-xs font-extrabold uppercase tracking-widest text-[#FFFBF0] will-change-[opacity,transform] ${reduceMotion ? 'opacity-100' : 'opacity-0'}`}
              >
                <Zap className="h-3.5 w-3.5 text-[#38BDF8]" strokeWidth={2.5} aria-hidden="true" />
                0g ajouté
              </span>
            </div>
          </div>

          <h2
            data-zero-reveal
            data-gsap-text
            data-gsap-split="words"
            data-gsap-words-stagger="0.05"
            data-gsap-start="top 82%"
            data-gsap-end="top 45%"
            className="font-bebas text-[clamp(48px,12vw,96px)] leading-none text-[#FFFBF0] will-change-[opacity,transform]"
          >
            IZEM ZERO
          </h2>

          <p
            data-zero-reveal
            data-gsap-text
            data-gsap-split="words"
            data-gsap-words-stagger="0.02"
            data-gsap-start="top 78%"
            data-gsap-end="top 40%"
            className="mx-auto mt-4 mb-8 max-w-md font-nunito text-base font-semibold text-[#FFFBF0]/85 will-change-[opacity,transform] sm:text-lg md:mx-0 md:text-xl"
          >
            Toute la force d&apos;IZEM, zéro sucre ajouté. Pour les esprits affûtés qui ne font
            aucun compromis.
          </p>

          <div
            data-zero-reveal
            data-gsap-stagger="0.08"
            className="flex w-full flex-col justify-center gap-3 will-change-[opacity,transform] sm:flex-row sm:gap-4 md:justify-start"
          >
            <a
              href="#flavors"
              data-gsap-stagger-item
              className="cursor-pointer rounded-full bg-[#FFFBF0] px-6 py-3.5 text-center font-nunito text-base font-extrabold text-[#6366F1] shadow-xl transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFBF0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6366F1] sm:px-8 sm:py-4 sm:text-lg"
            >
              Découvrir IZEM Zero &rarr;
            </a>
            <button
              type="button"
              data-gsap-stagger-item
              className="cursor-pointer rounded-full border-2 border-[#FFFBF0] px-6 py-3.5 font-nunito text-base font-bold text-[#FFFBF0] transition-colors duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFFBF0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#6366F1] sm:px-8 sm:py-4 sm:text-lg"
            >
              Valeurs nutritionnelles
            </button>
          </div>
        </div>

        <div
          data-zero-reveal
          className="relative flex w-full justify-center will-change-[opacity,transform] md:w-1/2"
        >
          <div
            data-zero-can-glow
            className="pointer-events-none absolute inset-0 m-auto h-64 w-64 rounded-full will-change-[opacity,transform] md:h-80 md:w-80"
            style={{
              background:
                'radial-gradient(circle, rgba(255,251,240,0.18) 0%, rgba(99,102,241,0.08) 55%, transparent 75%)',
            }}
            aria-hidden="true"
          />
          <img
            data-zero-can
            src={zeroImg}
            alt="IZEM ZERO — Sans Sucre"
            className="relative z-10 w-44 object-contain drop-shadow-[0_30px_60px_rgba(99,102,241,0.55)] will-change-transform sm:w-56 md:w-72 lg:w-80"
          />
        </div>
      </div>

      <div
        data-gsap-stagger="0.1"
        data-gsap-start="top 90%"
        data-gsap-end="top 50%"
        className="absolute bottom-6 left-1/2 z-10 flex max-w-[95vw] -translate-x-1/2 flex-wrap justify-center gap-2 px-2 sm:bottom-8 sm:gap-4 sm:px-0"
      >
        {['0g Sucre', '100% Force', 'Caféine naturelle', 'Vitamines B'].map((feat) => (
          <span
            key={feat}
            data-zero-feat
            data-gsap-stagger-item
            className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 font-nunito text-xs font-bold text-[#FFFBF0] backdrop-blur-sm will-change-[opacity,transform] sm:px-4 sm:py-2 sm:text-sm"
          >
            {feat}
          </span>
        ))}
      </div>
    </>
  );

  if (reduceMotion) {
    return (
      <section
        id="zero"
        data-nav-theme="dark"
        className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
        style={{ background: 'var(--grad-zero)' }}
      >
        {content}
      </section>
    );
  }

  const startRadius = getStartRadius();

  return (
    <section
      ref={sectionRef}
      id="zero"
      style={{ height: `${(1 + SCROLL_LENGTH_VH) * 100}dvh` }}
      aria-label="IZEM Zero"
    >
      <div
        ref={pinRef}
        data-nav-theme="dark"
        className="relative h-[100dvh] overflow-hidden bg-[#1A1208]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.15) 0%, transparent 55%)',
          }}
          aria-hidden="true"
        />

        <ZeroCircleRing
          ringRef={ringRef}
          ringTextOuterRef={ringTextOuterRef}
          ringTextInnerRef={ringTextInnerRef}
          ringGlowRef={ringGlowRef}
          startRadius={startRadius}
        />

        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-6 left-1/2 z-30 -translate-x-1/2 px-4 text-center sm:bottom-10"
          aria-hidden="true"
        >
          <p className="font-nunito text-xs font-bold uppercase tracking-[0.35em] text-[#FFFBF0]/50">
            Faites défiler
          </p>
          <p className="mt-1 font-bebas text-xl tracking-widest text-[#38BDF8]/80 sm:text-2xl">
            OUVREZ LE CERCLE
          </p>
        </div>

        <div
          ref={contentRef}
          className="absolute inset-0 flex items-center overflow-hidden"
          style={{
            background: 'var(--grad-zero)',
            clipPath: `circle(${startRadius}px at 50% 50%)`,
          }}
        >
          {content}
        </div>
      </div>

      <style>{`
        @keyframes zeroTextSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes zeroTextSpinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes zeroRingGradientSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .zero-text-spin {
          animation: zeroTextSpin 22s linear infinite;
        }
        .zero-text-spin-reverse {
          animation: zeroTextSpinReverse 16s linear infinite;
        }
        .zero-ring-gradient-spin {
          animation: zeroRingGradientSpin 10s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .zero-text-spin,
          .zero-text-spin-reverse,
          .zero-ring-gradient-spin {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
