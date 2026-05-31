import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#1A1208] py-12 text-[#FFFBF0] sm:py-16">
      <div className="container mx-auto px-4 text-center sm:px-6">
        <div data-gsap-stagger="0.15" data-gsap-start="top 92%" data-gsap-end="top 55%">
          <div data-gsap-stagger-item className="mb-10">
            <h2
              data-gsap-text
              data-gsap-split="words"
              data-gsap-words-stagger="0.06"
              className="font-bebas cursor-default text-[clamp(64px,18vw,144px)] tracking-wider text-transparent text-stroke opacity-80"
            >
              IZEM
            </h2>
            <p
              data-gsap-text
              data-gsap-start="top 88%"
              data-gsap-end="top 58%"
              className="mt-2 font-nunito text-base font-bold text-[#FFD93D] sm:text-xl"
            >
              Produit avec fierté en Algérie par IFRI
            </p>
          </div>

          <div data-gsap-stagger-item className="mb-10 flex justify-center gap-4 sm:mb-12 sm:gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#332616] transition-colors hover:bg-[#FF6B2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1208]"
            >
              <FaInstagram className="text-2xl transition-transform group-hover:scale-110" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#332616] transition-colors hover:bg-[#FF6B2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1208]"
            >
              <FaFacebookF className="text-2xl transition-transform group-hover:scale-110" />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#332616] transition-colors hover:bg-[#FF6B2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1208]"
            >
              <FaTiktok className="text-2xl transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>

        <p
          data-gsap-text
          data-gsap-start="top 90%"
          data-gsap-end="top 60%"
          className="mt-8 font-nunito text-xs opacity-40"
        >
          © {new Date().getFullYear()} IZEM by IFRI. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
