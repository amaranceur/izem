import { Zap, Dumbbell, Leaf, Dna, Sparkles } from 'lucide-react';

export default function EnergyStrip() {
  const items = [
    { icon: <Zap size={36} />, text: 'Caféine' },
    { icon: <Dumbbell size={36} />, text: 'Taurine' },
    { icon: <Leaf size={36} />, text: 'Guarana' },
    { icon: <Dna size={36} />, text: 'Vitamines B' },
    { icon: <Sparkles size={36} />, text: 'Inositol' },
  ];

  // Repeat items to ensure smooth scrolling
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <section id="energy" data-nav-theme="light" className="overflow-hidden border-y-4 border-[#1A1208] bg-[#FFD93D] py-6">
      <p
        data-gsap-text
        data-gsap-split="words"
        data-gsap-start="top 95%"
        data-gsap-end="top 70%"
        className="mb-4 text-center font-nunito text-xs font-bold uppercase tracking-[0.35em] text-[#1A1208]/55"
      >
        Ce qui vous booste
      </p>
      <div className="flex w-[200%] animate-marquee whitespace-nowrap">
        {repeatedItems.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center mx-8 font-bebas text-[48px] text-[#1A1208]"
          >
            <span className="mr-4">{item.icon}</span>
            <span>{item.text}</span>
            <span className="mx-8 opacity-50">·</span>
          </div>
        ))}
      </div>
    </section>
  );
}
