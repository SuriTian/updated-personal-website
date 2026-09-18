import { useEffect, useState } from 'react';

export default function useActiveSection(ids) {
    const [active, setActive] = useState(ids[0]);

    useEffect(() => {
        const ratios = new Map(ids.map((id) => [id, 0]));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
                });

                let best = null;
                let bestRatio = 0;
                ratios.forEach((ratio, id) => {
                    if (ratio > bestRatio) {
                        bestRatio = ratio;
                        best = id;
                    }
                });

                if (best) setActive(best);
            },
            { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
        );

        const elements = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean);

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [ids]);

    return active;
}
