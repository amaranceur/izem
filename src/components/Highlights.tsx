import { Zap, Droplet, MapPin } from 'lucide-react';

const features = [
  {
    icon: Zap,
    iconClass: 'text-[#FFD93D]',
    ringClass: 'bg-[#FFD93D]/15',
    title: 'Énergie',
    desc: 'Un boost immédiat pour dépasser vos limites.',
  },
  {
    icon: Droplet,
    iconClass: 'text-[#38BDF8]',
    ringClass: 'bg-[#38BDF8]/15',
    title: 'Hydratation',
    desc: 'Une fraîcheur intense qui désaltère.',
  },
  {
    icon: MapPin,
    iconClass: 'text-[#FF3E6C]',
    ringClass: 'bg-[#FF3E6C]/15',
    title: 'Made in Algeria',
    desc: "L'excellence locale, pensée pour le monde.",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" data-nav-theme="light" className="relative overflow-hidden px-4 pt-10 pb-16 sm:pb-20 md:pt-14 md:pb-24">
      <div className="container mx-auto max-w-5xl">
        <p
          data-gsap-text
          data-gsap-split="words"
          data-gsap-start="top 90%"
          data-gsap-end="top 62%"
          className="mb-8 text-center font-nunito text-sm font-bold uppercase tracking-[0.3em] text-[#1A1208]/45"
        >
          Pourquoi IZEM
        </p>

        <div
          data-gsap-stagger="0.12"
          data-gsap-start="top 88%"
          data-gsap-end="top 38%"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                data-gsap-stagger-item
                className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/60 bg-white/90 p-6 text-center shadow-[0_12px_40px_rgba(26,18,8,0.08)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-2 sm:rounded-3xl sm:p-8"
              >
                <div
                  className={`relative mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-inner ${feature.ringClass}`}
                >
                  <Icon size={32} className={feature.iconClass} strokeWidth={2.25} />
                </div>

                <h3 className="font-bebas mb-3 text-2xl text-[#1A1208] sm:text-3xl">{feature.title}</h3>
                <p className="font-nunito text-base font-medium leading-relaxed text-[#1A1208]/70 md:text-[17px]">
                  {feature.desc}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
