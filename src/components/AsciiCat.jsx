import { useEffect, useRef } from 'react';
import { animate, createScope, stagger } from 'animejs';
import './AsciiCat.css';

const CAT_LINES = [
    "     /\\_/\\",
    "    ( o.o )",
    "     > ^ <",
    "    /|   |\\",
    "   ( |   | )",
    "    \\|___|/",
    "     |   |",
    "    /     \\",
    "   (_______)",
];

const AsciiCat = () => {
    const rootRef = useRef(null);

    useEffect(() => {
        const scope = createScope({ root: rootRef }).add(() => {
            animate('.ascii-line', {
                opacity: [0, 1],
                x: [-12, 0],
                duration: 500,
                delay: stagger(45),
                ease: 'outQuad',
                onComplete: () => {
                    animate(rootRef.current, {
                        y: [0, -8],
                        duration: 2200,
                        ease: 'inOutSine',
                        loop: true,
                        alternate: true,
                    });
                },
            });
        });

        return () => scope.revert();
    }, []);

    return (
        <pre className="ascii-cat" ref={rootRef} aria-label="ASCII art of a cat">
            {CAT_LINES.map((line, idx) => (
                <span className="ascii-line" key={idx}>{line}{"\n"}</span>
            ))}
        </pre>
    );
};

export default AsciiCat;
