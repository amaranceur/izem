import { Dumbbell, BookOpen, PartyPopper } from 'lucide-react';
import lifestyleImg from '../assets/izem/hero.png';

const cards = [
  { id: 1, icon: Dumbbell, title: 'Sport & Fitness', desc: 'Pour repousser vos limites.', accent: '#FF6B2B' },
  { id: 2, icon: BookOpen, title: 'Études & Focus', desc: 'Une concentration maximale.', accent: '#FFD93D' },
  { id: 3, icon: PartyPopper, title: 'Sorties & Énergie', desc: 'Vivez la nuit algérienne.', accent: '#FF3E6C' },
];

export default function LifestyleSection() {
  return (
    <section
      id="lifestyle"
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#FFF8E7] py-16 sm:py-20 md:py-28"
    >
      <div className="pointer-events-none absolute -left-24 top-1/4 hidden h-72 w-72 rounded-full bg-[#FFD93D]/25 blur-3xl sm:block" />
      <div className="pointer-events-none absolute -right-16 bottom-0 hidden h-96 w-96 rounded-full bg-[#FF6B2B]/10 blur-3xl sm:block" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <p
              data-gsap-text
              data-gsap-split="words"
              className="mb-4 font-nunito text-sm font-bold uppercase tracking-[0.28em] text-[#FF6B2B]"
            >
              À propos
            </p>

            <h2
              data-gsap-text
              data-gsap-split="lines"
              data-gsap-words-stagger="0.12"
              data-gsap-start="top 88%"
              data-gsap-end="top 42%"
              className="font-bebas text-[clamp(52px,9vw,88px)] leading-[0.95] text-[#1A1208]"
            >
              L&apos;ÉNERGIE
              <br />
              <span className="text-[#FF6B2B]">À L&apos;ÉTAT PUR.</span>
            </h2>

            <p
              data-gsap-text
              data-gsap-split="words"
              data-gsap-words-stagger="0.015"
              data-gsap-start="top 85%"
              data-gsap-end="top 38%"
              className="mt-6 max-w-xl font-nunito text-base leading-relaxed text-[#1A1208]/75 sm:text-lg md:text-xl"
            >
              Pour les actifs. Pour les audacieux. Pour les Algériens. IZEM vous accompagne dans
              tous vos moments forts, avec un goût unique et une force inégalée.
            </p>

            <ul
              data-gsap-stagger="0.14"
              data-gsap-start="top 82%"
              data-gsap-end="top 35%"
              className="mt-10 flex flex-col gap-4"
            >
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <li
                    key={card.id}
                    data-gsap-stagger-item
                    className="group flex items-center gap-5 rounded-2xl border border-[#1A1208]/8 bg-white p-5 shadow-[0_8px_30px_rgba(26,18,8,0.06)] transition-shadow hover:shadow-[0_16px_40px_rgba(26,18,8,0.1)]"
                  >
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${card.accent}22`, color: card.accent }}
                    >
                      <Icon size={28} strokeWidth={2.25} />
                    </div>
                    <div>
                      <h4 className="font-bebas text-2xl tracking-wide text-[#1A1208]">{card.title}</h4>
                      <p className="font-nunito text-sm font-medium text-[#1A1208]/65 md:text-base">
                        {card.desc}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div
            data-gsap-text
            data-gsap-start="top 88%"
            data-gsap-end="top 40%"
            className="order-1 lg:order-2"
          >
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#FFD93D] via-[#FF6B2B] to-[#FF3E6C] opacity-35 md:-inset-4" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(26,18,8,0.18)] ring-4 ring-white/80">
                <img
                  src={lifestyleImg}
                  alt="Univers IZEM"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1208]/50 via-transparent to-transparent" />
                <p
                  data-gsap-text
                  data-gsap-split="words"
                  data-gsap-start="top 75%"
                  data-gsap-end="top 45%"
                  className="absolute bottom-4 left-4 right-4 font-bebas text-2xl tracking-wide text-white drop-shadow-md sm:bottom-6 sm:left-6 sm:right-6 sm:text-3xl"
                >
                  VIVEZ CHAQUE INSTANT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
