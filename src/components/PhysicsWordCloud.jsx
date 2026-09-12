import { useEffect, useMemo, useRef, useState } from 'react';
import Matter from 'matter-js';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';
import './PhysicsWordCloud.css';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    width: '80%',
    maxWidth: '700px',
    maxHeight: '80%',
    overflowY: 'auto',
    bgcolor: 'black',
    border: '2px solid white',
    p: 4,
};

const MODAL_CONFIG = {
    Hobbies: {
        title: "Hobbies",
        content: "Math!!!",
    },
    "(Programming) Languages": {
        title: "Languages & Tools",
        content: "C/C++, Python, Java, JavaScript, HTML/CSS — plus Node.js, Express.js, React, Three.js, Pytest, REST APIs, MySQL, and Redis.",
    },
    "Horror": {
        title: "Horror",
        content: "I love collecting Junji Ito mangas, playing horror games and watching horror games playthroughs!",
    },
    "Coursework": {
        title: "Coursework",
        content: "Introduction to Programming (C), Data Abstractions and Implementations (C++), Linear Algebra, Digital Circuits, Linear Circuits",
    },
    "Movies": {
        title: "Movie Ratings",
        content: "Interstellar 10/10",
    },
    "Leadership": {
        title: "Software Engineering Class & EngSoc Rep",
        content: "Elected representative for 140 students, serving as liaison between faculty and the Software Engineering Class of 2030 (Jan 2026–Present).",
    },
    "Waterloo Rocketry": {
        title: "Building Rockets (Sort Of)",
        content: "I'm on the Firmware team, writing the code that keeps our canard board's power rails alive and its sensors talking over I2C. Turns out embedded debugging is 10% coding and 90% wondering why the oscilloscope hates you.",
    },
    "Entrepreneurship": {
        title: "Two Business Experiences @ Junior Achievement",
        content: "Repaw Styles VP of Tech, SereniSlimes President",
    },
    "Music": {
        title: "I bought Spotify Premium...",
        content: "Default content",
    },
    default: {
        title: "Info",
        content: "Default content",
    },
};

const WORDS = [
    ['Hobbies', 30],
    ['(Programming) Languages', 46],
    ['Horror', 28],
    ['Coursework', 34],
    ['Movies', 28],
    ['Leadership', 38],
    ['Waterloo Rocketry', 36],
    ['Entrepreneurship', 32],
    ['Music', 28],
];

// Rough estimate of a pill's rendered box so physics bodies roughly match what's drawn.
function estimateSize(word, fontSize) {
    const width = word.length * fontSize * 0.56 + 40;
    const height = fontSize + 30;
    return { width, height };
}

const PhysicsWordCloud = () => {
    const containerRef = useRef(null);
    const pillRefs = useRef([]);
    const [openIdx, setOpenIdx] = useState(null);
    const dims = useMemo(() => WORDS.map(([word, size]) => estimateSize(word, size)), []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const sizes = dims;

        const engine = Matter.Engine.create({ gravity: { x: 0, y: 0 } });
        const world = engine.world;

        const wallOpts = { isStatic: true, restitution: 1, friction: 0 };
        const thickness = 100;
        Matter.Composite.add(world, [
            Matter.Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, wallOpts),
            Matter.Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, wallOpts),
            Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, wallOpts),
            Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, wallOpts),
        ]);

        // Lay bodies out on a rough grid first so they don't all spawn overlapping in the corner,
        // then let physics settle/spread them out.
        const cols = Math.ceil(Math.sqrt(WORDS.length));
        const bodies = WORDS.map((_, idx) => {
            const { width: w, height: h } = sizes[idx];
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const x = ((col + 0.5) / cols) * width + (Math.random() - 0.5) * 20;
            const y = ((row + 0.5) / Math.ceil(WORDS.length / cols)) * height + (Math.random() - 0.5) * 20;

            const body = Matter.Bodies.rectangle(x, y, w, h, {
                restitution: 0.95,
                frictionAir: 0.03,
                friction: 0,
                frictionStatic: 0,
                chamfer: { radius: h / 2 },
            });
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);
            return body;
        });
        Matter.Composite.add(world, bodies);

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        const mouse = { x: -9999, y: -9999 };
        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        const repelRadius = 150;
        const repelStrength = 0.0011;

        Matter.Events.on(engine, 'beforeUpdate', () => {
            bodies.forEach((body) => {
                const dx = body.position.x - mouse.x;
                const dy = body.position.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                if (dist < repelRadius) {
                    const force = (1 - dist / repelRadius) * repelStrength;
                    Matter.Body.applyForce(body, body.position, {
                        x: (dx / dist) * force,
                        y: (dy / dist) * force,
                    });
                }
            });
        });

        let rafId;
        const tick = () => {
            bodies.forEach((body, idx) => {
                const el = pillRefs.current[idx];
                if (el) {
                    const { width: w, height: h } = sizes[idx];
                    el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
                }
            });
            rafId = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(rafId);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
            Matter.Runner.stop(runner);
            Matter.Composite.clear(world, false);
            Matter.Engine.clear(engine);
        };
    }, [dims]);

    return (
        <div className="physics-cloud" ref={containerRef}>
            {WORDS.map(([word, size], idx) => (
                <button
                    key={idx}
                    ref={(el) => (pillRefs.current[idx] = el)}
                    className="physics-pill"
                    style={{
                        fontSize: `${size}px`,
                        width: dims[idx]?.width,
                        height: dims[idx]?.height,
                    }}
                    onClick={() => setOpenIdx(idx)}
                >
                    {word}
                </button>
            ))}

            {WORDS.map(([word], idx) => {
                const config = MODAL_CONFIG[word] ?? MODAL_CONFIG.default;
                return (
                    <Modal
                        key={`modal-${idx}`}
                        open={openIdx === idx}
                        onClose={() => setOpenIdx(null)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        slotProps={{
                            backdrop: {
                                sx: {
                                    backgroundColor: 'transparent',
                                    backdropFilter: 'none',
                                },
                            },
                        }}
                    >
                        <Fade in={openIdx === idx} timeout={250}>
                            <Box sx={modalStyle}>
                                <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                                    {config.title}
                                </Typography>
                                <Typography variant="body1">
                                    {config.content}
                                </Typography>
                            </Box>
                        </Fade>
                    </Modal>
                );
            })}
        </div>
    );
};

export default PhysicsWordCloud;
