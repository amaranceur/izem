import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SplitMode = 'block' | 'words' | 'lines';

export function splitWords(el: HTMLElement) {
  const text = el.textContent?.trim() ?? '';
  if (!text || el.dataset.gsapSplitDone === 'true') return;

  el.dataset.gsapSplitDone = 'true';
  el.dataset.gsapOriginalText = text;
  el.setAttribute('aria-label', text);
  el.innerHTML = text
    .split(/\s+/)
    .map(
      (word) =>
        `<span class="gsap-word-wrap inline-block overflow-hidden align-bottom"><span class="gsap-word inline-block">${word}&nbsp;</span></span>`
    )
    .join('');
}

function restoreSplitText(el: HTMLElement) {
  const original = el.dataset.gsapOriginalText;
  if (original) {
    el.textContent = original;
    delete el.dataset.gsapSplitDone;
    delete el.dataset.gsapOriginalText;
  }
}

function splitLines(el: HTMLElement) {
  if (el.dataset.gsapSplitDone === 'true') return;

  const html = el.innerHTML;
  el.dataset.gsapSplitDone = 'true';
  el.dataset.gsapOriginalHtml = html;

  const parts = html.split(/<br\s*\/?>/i);
  el.innerHTML = parts
    .map(
      (line, i) =>
        `<span class="gsap-line-wrap block overflow-hidden"><span class="gsap-line block">${line.trim()}</span></span>${
          i < parts.length - 1 ? '<br aria-hidden="true" />' : ''
        }`
    )
    .join('');
}

function getTargets(el: HTMLElement, mode: SplitMode): Element[] {
  if (mode === 'words') {
    splitWords(el);
    return Array.from(el.querySelectorAll('.gsap-word'));
  }
  if (mode === 'lines') {
    splitLines(el);
    return Array.from(el.querySelectorAll('.gsap-line'));
  }
  return [el];
}

function restoreElement(el: HTMLElement) {
  if (el.dataset.gsapOriginalHtml) {
    el.innerHTML = el.dataset.gsapOriginalHtml;
    delete el.dataset.gsapSplitDone;
    delete el.dataset.gsapOriginalHtml;
  } else {
    restoreSplitText(el);
  }
}

/**
 * Text reveals on scroll (GSAP ScrollTrigger).
 * Default: play once when element enters viewport — reliable & visible.
 * Add data-gsap-scrub="true" for scroll-scrubbed motion.
 */
export function initGsapScrollText(scope: HTMLElement | Document = document) {
  const splitElements: HTMLElement[] = [];

  const ctx = gsap.context(() => {
    const root = scope instanceof Document ? scope.documentElement : scope;

    root.querySelectorAll<HTMLElement>('[data-gsap-text]').forEach((el) => {
      if (el.closest('[data-flavor-slide]')) return;

      const mode = (el.dataset.gsapSplit as SplitMode) || 'block';
      const start = el.dataset.gsapStart || 'top 90%';
      const useScrub = el.dataset.gsapScrub === 'true';
      const end = el.dataset.gsapEnd || (useScrub ? 'top 45%' : 'top 60%');
      const scrub = useScrub ? Number(el.dataset.gsapScrubAmount ?? '1') : false;
      const wordStagger = Number(el.dataset.gsapWordsStagger ?? '0.06');

      const targets = getTargets(el, mode);
      if (!targets.length) return;
      splitElements.push(el);

      const vars = { y: 40, opacity: 0 };
      const toVars = {
        y: 0,
        opacity: 1,
        ease: 'power3.out',
        stagger: mode === 'block' ? 0 : wordStagger,
        duration: useScrub ? 1 : 0.85,
        ...(useScrub ? { ease: 'none' as const } : {}),
      };

      gsap.fromTo(targets, vars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start,
          end: useScrub ? end : undefined,
          scrub,
          toggleActions: useScrub ? undefined : 'play none none none',
          once: !useScrub,
        },
      });
    });

    root.querySelectorAll<HTMLElement>('[data-gsap-stagger]').forEach((container) => {
      if (!container.querySelector('[data-gsap-stagger-item]')) return;

      const items = container.querySelectorAll('[data-gsap-stagger-item]');
      const start = container.dataset.gsapStart || 'top 88%';
      const useScrub = container.dataset.gsapScrub === 'true';

      gsap.fromTo(
        items,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: useScrub ? 'none' : 'power3.out',
          stagger: Number(container.dataset.gsapStagger ?? '0.1'),
          duration: useScrub ? 1 : 0.75,
          scrollTrigger: {
            trigger: container,
            start,
            end: container.dataset.gsapEnd || 'top 40%',
            scrub: useScrub ? Number(container.dataset.gsapScrubAmount ?? '1') : false,
            toggleActions: useScrub ? undefined : 'play none none none',
            once: !useScrub,
          },
        }
      );
    });
  }, scope);

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return {
    revert: () => {
      ctx.revert();
      splitElements.forEach(restoreElement);
      ScrollTrigger.refresh();
    },
  };
}

export function refreshGsapScroll() {
  ScrollTrigger.refresh();
}
