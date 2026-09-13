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
    "AI Drug Discovery": {
        title: "Directed Reading Program",
        content: "Spent a summer digging into AI-assisted drug design, and mostly ended up cataloguing how differently every paper measures \"success.\" Turns out reproducibility is its own research problem in this field.",
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
    ['Hobbies', 22],
    ['(Programming) Languages', 34],
    ['Horror', 20],
    ['Coursework', 25],
    ['Movies', 20],
    ['Leadership', 28],
    ['Waterloo Rocketry', 26],
    ['AI Drug Discovery', 23],
    ['Entrepreneurship', 23],
    ['Music', 20],
];

function estimateSize(word, fontSize) {
    const width = word.length * fontSize * 0.56 + 40;
    const height = fontSize + 30;
    return { width, height };
}

const REST_SPEED = 0.15;
const REST_ANGULAR_SPEED = 0.01;
const REST_FRAMES_NEEDED = 40;
const UPSIDE_DOWN_TOLERANCE = 0.65;
const GLITCH_DURATION_MS = 380;
const GLITCH_COOLDOWN_FRAMES = 60;

function distanceFromUpsideDown(angle) {
    let normalized = angle % (Math.PI * 2);
    if (normalized > Math.PI) normalized -= Math.PI * 2;
    if (normalized < -Math.PI) normalized += Math.PI * 2;
    return Math.min(Math.abs(normalized - Math.PI), Math.abs(normalized + Math.PI));
}

const PhysicsWordCloud = () => {
    const containerRef = useRef(null);
    const pillRefs = useRef([]);
    const [openIdx, setOpenIdx] = useState(null);
    const dims = useMemo(() => WORDS.map(([word, size]) => estimateSize(word, size)), []);
    const pointerDown = useRef({ idx: null, x: 0, y: 0, moved: false });
    const DRAG_THRESHOLD = 6;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        const sizes = dims;

        const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.7 } });
        const world = engine.world;

        const wallOpts = { isStatic: true, restitution: 1, friction: 0 };
        const thickness = 100;
        Matter.Composite.add(world, [
            Matter.Bodies.rectangle(width / 2, -thickness / 2, width + thickness * 2, thickness, wallOpts),
            Matter.Bodies.rectangle(width / 2, height + thickness / 2, width + thickness * 2, thickness, wallOpts),
            Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height + thickness * 2, wallOpts),
            Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height + thickness * 2, wallOpts),
        ]);

        const cols = Math.ceil(Math.sqrt(WORDS.length));
        const bodies = WORDS.map((_, idx) => {
            const { width: w, height: h } = sizes[idx];
            const col = idx % cols;
            const row = Math.floor(idx / cols);
            const x = ((col + 0.5) / cols) * width + (Math.random() - 0.5) * 20;
            const y = ((row + 0.5) / Math.ceil(WORDS.length / cols)) * height + (Math.random() - 0.5) * 20;

            const body = Matter.Bodies.rectangle(x, y, w, h, {
                restitution: 0.8,
                frictionAir: 0.015,
                friction: 0.05,
                frictionStatic: 0.1,
                chamfer: { radius: h / 2 },
            });
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 4, y: (Math.random() - 0.5) * 2 });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
            return body;
        });
        Matter.Composite.add(world, bodies);

        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        const mouse = Matter.Mouse.create(container);
        container.removeEventListener('mousewheel', mouse.mousewheel);
        container.removeEventListener('DOMMouseScroll', mouse.mousewheel);
        container.removeEventListener('wheel', mouse.mousewheel);

        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                damping: 0.15,
                render: { visible: false },
            },
        });
        Matter.Composite.add(world, mouseConstraint);

        const handleWindowMouseMove = (e) => {
            const state = pointerDown.current;
            if (state.idx === null || state.moved) return;
            if (Math.hypot(e.clientX - state.x, e.clientY - state.y) > DRAG_THRESHOLD) {
                state.moved = true;
            }
        };
        const handleWindowMouseUp = () => {
            const state = pointerDown.current;
            if (state.idx !== null && !state.moved) {
                setOpenIdx(state.idx);
            }
            pointerDown.current = { idx: null, x: 0, y: 0, moved: false };
        };
        window.addEventListener('mousemove', handleWindowMouseMove);
        window.addEventListener('mouseup', handleWindowMouseUp);

        const handleWheel = (e) => {
            if (e.deltaY <= 0) return;
            const kick = Math.min(e.deltaY, 120) * 0.09;
            bodies.forEach((body) => {
                Matter.Body.setVelocity(body, {
                    x: body.velocity.x + (Math.random() - 0.5) * kick * 0.3,
                    y: body.velocity.y - kick * (0.7 + Math.random() * 0.6),
                });
                Matter.Body.setAngularVelocity(body, body.angularVelocity + (Math.random() - 0.5) * 0.05);
            });
        };
        window.addEventListener('wheel', handleWheel, { passive: true });

        const maxSpeed = 14;

        Matter.Events.on(engine, 'afterUpdate', () => {
            bodies.forEach((body) => {
                if (Matter.Body.getSpeed(body) > maxSpeed) {
                    Matter.Body.setSpeed(body, maxSpeed);
                }
            });
        });

        const restFrames = new Array(bodies.length).fill(0);
        const glitching = new Array(bodies.length).fill(false);
        const cooldown = new Array(bodies.length).fill(0);

        const triggerGlitch = (idx, body) => {
            glitching[idx] = true;
            const el = pillRefs.current[idx];
            if (el) el.classList.add('pill-glitch');

            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 6, y: -Math.random() * 4 });
            Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.35);

            setTimeout(() => {
                Matter.Body.setAngle(body, 0);
                Matter.Body.setAngularVelocity(body, 0);
                if (el) el.classList.remove('pill-glitch');
                glitching[idx] = false;
                cooldown[idx] = GLITCH_COOLDOWN_FRAMES;
            }, GLITCH_DURATION_MS);
        };

        const checkOrientation = () => {
            bodies.forEach((body, idx) => {
                if (glitching[idx]) return;
                if (cooldown[idx] > 0) {
                    cooldown[idx] -= 1;
                    return;
                }

                const isResting = Matter.Body.getSpeed(body) < REST_SPEED
                    && Math.abs(body.angularVelocity) < REST_ANGULAR_SPEED;
                restFrames[idx] = isResting ? restFrames[idx] + 1 : 0;

                if (restFrames[idx] >= REST_FRAMES_NEEDED) {
                    restFrames[idx] = 0;
                    if (distanceFromUpsideDown(body.angle) < UPSIDE_DOWN_TOLERANCE) {
                        triggerGlitch(idx, body);
                    }
                }
            });
        };

        let rafId;
        const tick = () => {
            bodies.forEach((body, idx) => {
                const el = pillRefs.current[idx];
                if (el) {
                    const { width: w, height: h } = sizes[idx];
                    el.style.transform = `translate(${body.position.x - w / 2}px, ${body.position.y - h / 2}px) rotate(${body.angle}rad)`;
                }
            });
            checkOrientation();
            rafId = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', handleWindowMouseMove);
            window.removeEventListener('mouseup', handleWindowMouseUp);
            window.removeEventListener('wheel', handleWheel);
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
                    onMouseDown={(e) => {
                        pointerDown.current = { idx, x: e.clientX, y: e.clientY, moved: false };
                    }}
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
                                <Typography variant="h6" component="h2" sx={{ mb: 2, color: 'var(--accent)' }}>
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
