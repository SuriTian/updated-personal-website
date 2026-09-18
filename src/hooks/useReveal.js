import { useEffect, useRef } from 'react';

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function useReveal({ threshold = 0.15, delay = 0 } = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        if (prefersReducedMotion()) {
            el.classList.add('is-visible');
            return;
        }

        if (delay) el.style.transitionDelay = `${delay}ms`;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            { threshold, rootMargin: '0px 0px -10% 0px' }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold, delay]);

    return ref;
}
