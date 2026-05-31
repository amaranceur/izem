import { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { useIzemStore } from '../store/useIzemStore';

type NavTheme = 'dark' | 'light';

const NAV_PROBE_Y = 56;

function resolveNavTheme(): NavTheme {
  const markers = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
  if (!markers.length) return 'dark';

  const matching = Array.from(markers).filter((el) => {
    const { top, bottom } = el.getBoundingClientRect();
    return top <= NAV_PROBE_Y && bottom >= NAV_PROBE_Y;
  });

  if (!matching.length) return 'dark';

  const viewportH = window.innerHeight;
  matching.sort((a, b) => {
    const ha = a.getBoundingClientRect().height;
    const hb = b.getBoundingClientRect().height;
    return Math.abs(ha - viewportH) - Math.abs(hb - viewportH);
  });

  const theme = matching[0].getAttribute('data-nav-theme');
  return theme === 'light' ? 'light' : 'dark';
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navTheme, setNavTheme] = useState<NavTheme>('dark');
  const { isMenuOpen, setMenuOpen } = useIzemStore();

  const isLight = navTheme === 'light';

  const updateNavbar = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
    setNavTheme(resolveNavTheme());
  }, []);

  useEffect(() => {
    updateNavbar();
    window.addEventListener('scroll', updateNavbar, { passive: true });
    window.addEventListener('resize', updateNavbar);
    return () => {
      window.removeEventListener('scroll', updateNavbar);
      window.removeEventListener('resize', updateNavbar);
    };
  }, [updateNavbar]);

  const navLinks = [
    { name: 'Flaveurs', href: '#flavors' },
    { name: 'Énergie', href: '#energy' },
    { name: 'À propos', href: '#lifestyle' },
    { name: 'Trouver IZEM', href: '#distribution' },
  ];

  const navShellClass = isScrolled
    ? isLight
      ? 'bg-[#FFF8E7]/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(26,18,8,0.08)] border-[#1A1208]/10 py-4'
      : 'bg-[#1A1208]/35 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.2)] border-white/15 py-4'
    : isLight
      ? 'bg-[#FFF8E7]/0 py-8'
      : 'bg-transparent py-8';

  const textClass = isLight ? 'text-[#1A1208]' : 'text-white';
  const linkClass = isLight
    ? 'text-[#1A1208]/85 hover:text-[#FF6B2B]'
    : 'text-white/90 hover:text-white';
  const underlineClass = isLight ? 'bg-[#FF6B2B]' : 'bg-white';
  const ctaClass = isLight
    ? 'border-[#1A1208]/15 bg-[#1A1208] text-white hover:bg-[#FF6B2B] hover:border-[#FF6B2B]'
    : 'cursor-pointer border-[#4285e8]/45 bg-[#4285e8]/15 text-white backdrop-blur-md transition-colors duration-200 hover:border-[#4285e8] hover:bg-[#4285e8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4285e8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0a06]';

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-500 ${navShellClass} ${
        isScrolled || isLight ? 'border-b' : 'border-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 md:px-8">
        <a
          href="#"
          className={`cursor-pointer font-bebas text-5xl tracking-widest transition-colors duration-300 md:text-6xl ${textClass} ${
            !isLight ? 'drop-shadow-md' : ''
          }`}
        >
          IZEM
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <ul className="flex gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`group relative cursor-pointer font-nunito text-lg font-bold transition-colors duration-200 ${linkClass}`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full ${underlineClass}`}
                  />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#flavors"
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-7 py-2.5 font-nunito font-extrabold transition-all duration-200 hover:scale-105 ${ctaClass}`}
          >
            Découvrir
            <span>&rarr;</span>
          </a>
        </div>

        <button
          type="button"
          className={`md:hidden ${textClass}`}
          onClick={() => setMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`absolute top-full left-0 flex w-full flex-col gap-6 border-b px-8 py-6 shadow-2xl md:hidden ${
            isLight
              ? 'border-[#1A1208]/10 bg-[#FFF8E7]/98 backdrop-blur-xl'
              : 'border-white/10 bg-[#1A1208]/95 backdrop-blur-xl'
          }`}
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-nunito text-2xl font-bold transition-colors ${
                isLight ? 'text-[#1A1208] hover:text-[#FF6B2B]' : 'text-white hover:text-[#FFD93D]'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#flavors"
            className="mt-2 rounded-full bg-[#FF6B2B] px-6 py-3.5 text-center font-nunito text-lg font-extrabold text-white shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            Découvrir &rarr;
          </a>
        </div>
      )}
    </nav>
  );
}
