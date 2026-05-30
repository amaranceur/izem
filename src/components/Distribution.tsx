export default function Distribution() {
  const regions = [
    { name: 'Algérie', top: '40%', left: '48%' },
    { name: 'France', top: '30%', left: '47%' },
    { name: 'Tunisie', top: '38%', left: '50%' },
    { name: 'Libye', top: '42%', left: '52%' },
    { name: 'Sénégal', top: '55%', left: '43%' },
    { name: 'Canada', top: '28%', left: '25%' },
  ];

  return (
    <section
      id="distribution"
      data-nav-theme="light"
      className="relative border-t border-[#1A1208]/10 bg-[#FFF8E7] py-24"
    >
      <div className="container mx-auto px-6 text-center">
        <h2
          data-gsap-text
          data-gsap-split="words"
          data-gsap-words-stagger="0.04"
          data-gsap-start="top 88%"
          data-gsap-end="top 48%"
          className="font-bebas mb-4 text-[64px] text-[#1A1208]"
        >
          L&apos;ÉNERGIE SANS FRONTIÈRES
        </h2>

        <p
          data-gsap-text
          data-gsap-split="words"
          data-gsap-words-stagger="0.02"
          data-gsap-start="top 85%"
          data-gsap-end="top 45%"
          className="mx-auto mb-16 max-w-2xl font-nunito text-xl text-[#1A1208]/80"
        >
          De Bejaia au reste du monde. Retrouvez IZEM partout où l&apos;audace vous mène.
        </p>

        <div
          data-gsap-text
          data-gsap-start="top 82%"
          data-gsap-end="top 38%"
          className="relative mx-auto h-[400px] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#1A1208]/5 bg-[#f5ecda] shadow-inner md:h-[500px]"
        >
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{
              backgroundImage: `radial-gradient(circle at 48% 40%, #FFD93D 0%, transparent 20%), 
                              radial-gradient(circle at 47% 30%, #FF6B2B 0%, transparent 15%),
                              radial-gradient(circle at 25% 28%, #38BDF8 0%, transparent 25%)`,
            }}
          />
          {regions.map((region) => (
            <div
              key={region.name}
              className="absolute group flex flex-col items-center justify-center"
              style={{ top: region.top, left: region.left }}
            >
              <div className="relative flex items-center justify-center">
                <div className="absolute h-4 w-4 animate-pulse-dot rounded-full bg-[#FF6B2B]" />
                <div className="relative z-10 h-2 w-2 rounded-full bg-[#FF6B2B]" />
              </div>
              <div className="pointer-events-none absolute top-4 z-20 whitespace-nowrap rounded bg-[#1A1208] px-2 py-1 font-nunito text-xs font-bold text-[#FFFBF0] opacity-0 transition-opacity group-hover:opacity-100">
                {region.name}
              </div>
            </div>
          ))}
        </div>

        <div
          data-gsap-stagger="0.08"
          data-gsap-start="top 80%"
          data-gsap-end="top 40%"
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {regions.map((r) => (
            <span
              key={r.name}
              data-gsap-stagger-item
              className="rounded-full bg-[#FFD93D]/30 px-4 py-1 font-bebas text-xl text-[#1A1208]"
            >
              {r.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
