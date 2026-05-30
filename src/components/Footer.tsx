import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#1A1208] py-16 text-[#FFFBF0]">
      <div className="container mx-auto px-6 text-center">
        <div data-gsap-stagger="0.15" data-gsap-start="top 92%" data-gsap-end="top 55%">
          <div data-gsap-stagger-item className="mb-10">
            <h2
              data-gsap-text
              data-gsap-split="words"
              data-gsap-words-stagger="0.06"
              className="font-bebas cursor-default text-7xl tracking-wider text-transparent text-stroke opacity-80 md:text-9xl"
            >
              IZEM
            </h2>
            <p
              data-gsap-text
              data-gsap-start="top 88%"
              data-gsap-end="top 58%"
              className="mt-2 font-nunito text-xl font-bold text-[#FFD93D]"
            >
              Produit avec fierté en Algérie par IFRI
            </p>
          </div>

          <div data-gsap-stagger-item className="mb-12 flex justify-center gap-6">
            <a
              href="#"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#332616] transition-colors hover:bg-[#FF6B2B]"
            >
              <FaInstagram className="text-2xl transition-transform group-hover:scale-110" />
            </a>
            <a
              href="#"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#332616] transition-colors hover:bg-[#FF6B2B]"
            >
              <FaFacebookF className="text-2xl transition-transform group-hover:scale-110" />
            </a>
            <a
              href="#"
              className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#332616] transition-colors hover:bg-[#FF6B2B]"
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
