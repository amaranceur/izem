import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Flame, Zap, Sparkles, Droplet } from 'lucide-react';
import classicImg from '../assets/izem/IZEM CAN 25cl — Classic.png';

export default function Hero3D() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const canRotateX = useTransform(smoothMouseY, [-0.5, 0.5], [15, -15]);
  const canRotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const canTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [-30, 30]);
  const canTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [-30, 30]);
  
  const bgTranslateX = useTransform(smoothMouseX, [-0.5, 0.5], [20, -20]);
  const bgTranslateY = useTransform(smoothMouseY, [-0.5, 0.5], [20, -20]);
  const particlesX = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
  const particlesY = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    // Elegant reveal animation
    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('.char');
      gsap.fromTo(
        chars,
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.015,
          duration: 0.6,
          ease: 'back.out(1.5)',
          delay: 0.1,
        }
      );
    }
  }, []);

  return (
    <section 
      data-nav-theme="dark"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative z-20 w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#FF6B2B] perspective-1000 pb-36 md:pb-44"
    >
      {/* --- LAYER 1: Deep Gradients & Noise --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF3E6C] via-[#FF6B2B] to-[#FFD93D] opacity-90" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      {/* --- LAYER 2: Blurred Orbs (Parallax) --- */}
      <motion.div 
        style={{ x: bgTranslateX, y: bgTranslateY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#FFD93D] rounded-full mix-blend-overlay filter blur-[100px] opacity-60 animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[#FF3E6C] rounded-full mix-blend-overlay filter blur-[120px] opacity-50" />
      </motion.div>

      {/* --- LAYER 3: Particles & Splashes --- */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ x: particlesX, y: particlesY }}>
          <div className="absolute top-1/4 left-[15%] text-white/40 animate-float" style={{ animationDelay: '0s' }}><Zap size={40} /></div>
          <div className="absolute bottom-1/3 right-[18%] text-white/50 animate-float" style={{ animationDelay: '1s' }}><Flame size={48} /></div>
          <div className="absolute top-1/3 right-[25%] text-white/60 animate-float" style={{ animationDelay: '2s' }}><Sparkles size={32} /></div>
          <div className="absolute bottom-1/4 left-[20%] text-white/40 animate-float" style={{ animationDelay: '0.5s' }}><Droplet size={36} /></div>
        </motion.div>
      </div>

      {/* Note: LAYER 4 (Square Light Rays) has been removed as requested */}

      {/* --- LAYER 5: Main Content (Center Composition) --- */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center pt-24 h-full">
        
        {/* Massive 3D Can Container */}
        <motion.div 
          style={{ 
            rotateX: canRotateX, 
            rotateY: canRotateY,
            x: canTranslateX,
            y: canTranslateY
          }}
          className="relative w-full max-w-[400px] md:max-w-[500px] aspect-[1/1.5] mb-8 transform-gpu preserve-3d cursor-pointer group"
        >
          {/* Intense Shadow */}
          <motion.div 
            style={{ 
              x: useTransform(smoothMouseX, [-0.5, 0.5], [40, -40]),
              y: useTransform(smoothMouseY, [-0.5, 0.5], [40, -40]),
            }}
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-black/40 blur-[40px] rounded-[100%]"
          />
          
          <motion.img
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.45 }}
            src={classicImg}
            alt="IZEM Classic Can"
            className={`w-full h-full object-contain filter drop-shadow-2xl ${isHovering ? '' : 'animate-heroCanFloat'}`}
            style={{ transform: 'translateZ(50px)' }}
          />
        </motion.div>

        {/* Elegant Modern Typography */}
        <div className="max-w-4xl mt-[-2rem] md:mt-[-4rem] z-20">
          <h1 
            ref={headlineRef}
            className="font-bebas text-white tracking-wide leading-[0.85] drop-shadow-2xl"
            style={{ fontSize: 'clamp(80px, 15vw, 180px)' }}
          >
            {'RÉVEILLE TON'.split('').map((char, i) => (
              <span key={`rt-${i}`} className="char inline-block">{char === ' ' ? '\u00A0' : char}</span>
            ))}
            <br />
            {'ÉNERGIE.'.split('').map((char, i) => (
              <span key={`te-${i}`} className="char inline-block text-[#FFD93D]">{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-nunito text-xl md:text-3xl font-semibold text-white/90 drop-shadow-md mt-6 md:mt-8 tracking-wide"
          >
            L'énergie algérienne en canette.
          </motion.p>
        </div>

        {/* Premium CTA Buttons — above following sections */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8, type: 'spring', stiffness: 90 }}
          className="relative z-40 mt-12 mb-4 flex flex-col gap-5 sm:flex-row"
        >
          <motion.a
            href="#flavors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-white px-10 py-4 font-nunito text-lg font-extrabold text-[#FF6B2B] shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          >
            <span className="relative z-10">Découvrir les saveurs</span>
            <motion.span 
              className="relative z-10 inline-block"
              whileHover={{ x: 5 }}
            >
              &rarr;
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.a>
          
          <motion.a
            href="#lifestyle"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(255,255,255,0.22)' }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/10 px-10 py-4 font-nunito text-lg font-extrabold text-white backdrop-blur-md"
          >
            Voir l'univers IZEM
          </motion.a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-b from-transparent to-[#FFF8E7] md:h-40" />

      <motion.a
        href="#highlights"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/70 sm:flex md:bottom-8"
        aria-label="Faire défiler"
      >
        <span className="font-nunito text-xs font-semibold uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-5 rounded-full border-2 border-white/50"
        >
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mt-1.5 block h-2 w-1 rounded-full bg-white/80"
          />
        </motion.span>
      </motion.a>
      
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes heroCanFloat {
          0%   { transform: translateY(0px) rotate(-1deg); }
          50%  { transform: translateY(-20px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(-1deg); }
        }
        .animate-heroCanFloat {
          animation: heroCanFloat 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}
