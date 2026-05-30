import { useLayoutEffect, type RefObject } from 'react';
import { initGsapScrollText, refreshGsapScroll } from '../gsap/scrollText';

export function useGsapScrollText(scopeRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const el = scopeRef.current;
    if (!el) return;

    const api = initGsapScrollText(el);

    const refresh = () => refreshGsapScroll();
    window.addEventListener('load', refresh);
    const t1 = window.setTimeout(refresh, 100);
    const t2 = window.setTimeout(refresh, 800);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      api.revert();
    };
  }, [scopeRef]);
}
