import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import zeroImg from '../assets/izem/IZEM ZERO — Sans Sucre.png';

export default function ZeroSpotlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const [count, setCount] = useState(100);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const canY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let current = 100;
        const step = 1400 / 100;
        const timer = setInterval(() => {
          current--;
          setCount(current);
          if (current <= 0) clearInterval(timer);
        }, step);
        observer.disconnect();
      },
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="zero"
      data-nav-theme="dark"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      style={{ background: 'var(--grad-zero)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        aria-hidden
      >
        <span
          className="font-bebas leading-none text-[#FFFBF0]"
          style={{ fontSize: 'clamp(160px, 30vw, 400px)', opacity: 0.08 }}
        >
          0
        </span>
      </div>

      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, #38BDF840, #6366F100)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 container mx-auto flex w-full flex-col items-center gap-12 px-6 py-24 md:flex-row">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <div className="mb-6 inline-flex items-baseline gap-3">
            <span
              className="font-bebas leading-none text-[#FFFBF0]"
              style={{ fontSize: 'clamp(80px, 15vw, 160px)' }}
            >
              {count}
            </span>
            <span
              data-gsap-text
              data-gsap-split="words"
              data-gsap-start="top 85%"
              data-gsap-end="top 55%"
              className="font-bebas text-5xl text-[#FFFBF0]/80"
            >
              SUCRE
            </span>
          </div>

          <h2
            data-gsap-text
            data-gsap-split="words"
            data-gsap-words-stagger="0.05"
            data-gsap-start="top 82%"
            data-gsap-end="top 45%"
            className="font-bebas text-6xl leading-none text-[#FFFBF0] md:text-8xl"
          >
            IZEM ZERO
          </h2>

          <p
            data-gsap-text
            data-gsap-split="words"
            data-gsap-words-stagger="0.02"
            data-gsap-start="top 78%"
            data-gsap-end="top 40%"
            className="mx-auto mt-4 mb-8 max-w-md font-nunito text-xl font-semibold text-[#FFFBF0]/85 md:mx-0"
          >
            Toute la force d&apos;IZEM, zéro sucre ajouté. Pour les esprits affûtés qui ne font
            aucun compromis.
          </p>

          <div
            data-gsap-stagger="0.08"
            className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start"
          >
            <a
              href="#flavors"
              data-gsap-stagger-item
              className="rounded-full bg-[#FFFBF0] px-8 py-4 text-center font-nunito text-lg font-extrabold text-[#6366F1] shadow-xl transition-transform hover:scale-105"
            >
              Découvrir IZEM Zero &rarr;
            </a>
            <button
              type="button"
              data-gsap-stagger-item
              className="rounded-full border-2 border-[#FFFBF0] px-8 py-4 font-nunito text-lg font-bold text-[#FFFBF0] transition-transform hover:scale-105 hover:bg-white/10"
            >
              Valeurs nutritionnelles
            </button>
          </div>
        </div>

        <div className="relative flex w-full justify-center md:w-1/2">
          <div
            className="pointer-events-none absolute h-72 w-72 rounded-full border-4 border-white/20"
            style={{ animation: 'zeroSpin 12s linear infinite' }}
          />
          <motion.img
            style={{ y: canY, filter: 'drop-shadow(0 30px 60px rgba(99,102,241,0.5))' }}
            src={zeroImg}
            alt="IZEM ZERO — Sans Sucre"
            className="relative z-10 w-56 object-contain md:w-72 lg:w-80"
          />
        </div>
      </div>

      <div
        data-gsap-stagger="0.1"
        data-gsap-start="top 90%"
        data-gsap-end="top 50%"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-wrap justify-center gap-4"
      >
        {['0g Sucre', '100% Force', 'Caféine naturelle', 'Vitamines B'].map((feat) => (
          <span
            key={feat}
            data-gsap-stagger-item
            className="rounded-full border border-white/25 bg-white/15 px-4 py-2 font-nunito text-sm font-bold text-[#FFFBF0] backdrop-blur-sm"
          >
            {feat}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes zeroSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
