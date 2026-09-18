import { useState } from 'react'
import './Projects.css'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';
import useReveal from '../hooks/useReveal';
import Decor from './Decor';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    width: '90%',
    maxWidth: '640px',
    maxHeight: '80vh',
    overflowY: 'auto',
    bgcolor: 'var(--bg-raised)',
    border: '1px solid var(--border-strong)',
    borderRadius: 'var(--radius)',
    boxShadow: '0 40px 90px -30px rgba(0, 0, 0, 0.9)',
    outline: 'none',
    p: { xs: 3, sm: 4 },
};

const items = [
    {
        name: "Portfolio",
        category: ["Javascript/HTML/CSS", "React", "Git"],
        date: "Jan 2026 – Present",
        bullets: [
            "Built and maintain this personal portfolio site with React, Vite, and MUI."
        ]
    },
    {
        name: "EngHacks: Plork",
        category: ["JavaScript", "React", "Node.js", "Express.js", "MySQL"],
        date: "Mar 2026",
        bullets: [
            "Designed a full stack teammate matching web application using Node.js, Express.js, and MySQL.",
            "Built React frontend with a functional landing page, onboarding flow, project browsing, and application system.",
            "Integrated Jaccard similarity and Gale-Shapley matching algorithms to power a compatibility scoring system."
        ]
    },
    {
        name: "Rogue-Like RPG Game",
        category: ["Unity", "C#", "Git"],
        bullets: []
    },
    {
        name: "PosePerfect",
        category: ["Python", "Flask", "Javascript/HTML/CSS", "Git"],
        date: "Nov 2025 – Dec 2025",
        bullets: [
            "Built a real-time exercise feedback web application using Flask and JavaScript, integrating pose estimation to provide live feedback on exercise form.",
            "Created detailed test plans to ensure reliable feature validation, by defining test cases, edge conditions, and expected outcomes.",
            "Managed sprints, issue boards, Git workflows, and scrum meetings using Agile methodology, delivering features reliably and on schedule."
        ]
    },
    {
        name: "AI in Drug Discovery",
        category: ["Research"],
        date: "May 2026 – Aug 2026",
        bullets: [
            "Investigated AI-assisted fragment-based drug design through a faculty-mentored research program.",
            "Co-designed a research proposal auditing inconsistent evaluation metrics (validity, QED, synthetic accessibility, docking score) used across the field."
        ]
    },
    {
        name: "SigMaps",
        category: ["APIs", "Javascript/HTML/CSS", "Git"],
        bullets: []
    },
    {
        name: "FlareRed",
        category: ["APIs", "Javascript/HTML/CSS", "Git"],
        bullets: []
    }
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function ProjectCard({ item, index }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const revealRef = useReveal({ delay: (index % 3) * 90 });
    const titleId = 'project-' + slugify(item.name) + '-title';

    return (
        <>
            <button
                type="button"
                className="item card reveal"
                ref={revealRef}
                onClick={handleOpen}
                aria-haspopup="dialog"
            >
                <span className="item-name">{item.name}</span>
                <span className="tag-container">
                    {item.category.map((cat, i) => (
                        <span key={i} className='category-tag'>{cat}</span>
                    ))}
                </span>
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby={titleId}
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'rgba(8, 22, 21, 0.6)',
                            backdropFilter: 'blur(4px)',
                        },
                    },
                }}
            >
                <Fade in={open} timeout={250}>
                    <Box sx={modalStyle}>
                        <Typography
                            id={titleId}
                            variant="h6"
                            component="h2"
                            sx={{ mb: item.date ? 0.5 : 2, color: 'var(--text)', fontWeight: 700 }}
                        >
                            {item.name}
                        </Typography>
                        {item.date && (
                            <Typography variant="body2" sx={{ mb: 2, color: 'var(--text-muted)' }}>
                                {item.date}
                            </Typography>
                        )}
                        <div className="tag-container" style={{ marginBottom: '1.5rem' }}>
                            {item.category.map((cat, i) => (
                                <span key={i} className='category-tag'>{cat}</span>
                            ))}
                        </div>
                        {item.bullets.length > 0 ? (
                            <ul className="modal-bullets">
                                {item.bullets.map((bullet, i) => (
                                    <li key={i}>
                                        <Typography variant="body1">{bullet}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body1" sx={{ color: 'var(--text-muted)' }}>
                                Details coming soon.
                            </Typography>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

function MultiFilters() {
    const [selectedFilters, setSelectedFilters] = useState([]);

    let filters = ["C#", "Javascript/HTML/CSS", "Python", "Unity", "React", "Research"];

    const handleFilterButtonClick = (selectedCategory) => {
        // unselect
        if (selectedFilters.includes(selectedCategory)) {
            let filters = selectedFilters.filter((el) => el !== selectedCategory);
            setSelectedFilters(filters);
        }
        // add to selection
        else {
            setSelectedFilters([...selectedFilters, selectedCategory]);
        }
    };

    const filteredItems =
        selectedFilters.length === 0
            ? items
            : items.filter((item) =>
                  selectedFilters.some((filter) => item.category.includes(filter))
              );

    return (
        <div>
            <div className='filters' role="group" aria-label="Filter projects by technology">
                {filters.map((category, idx) => (
                    <button
                        type="button"
                        onClick={() => handleFilterButtonClick(category)}
                        aria-pressed={selectedFilters.includes(category)}
                        className={`button ${
                            selectedFilters?.includes(category) ? "active" : ""
                        }`}
                        key={`filters-${idx}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className='items-category'>
                {filteredItems.map((item, idx) => (
                    <ProjectCard item={item} index={idx} key={`items-${item.name}`} />
                ))}
            </div>

        </div>
    );
}


const Projects = () => {
    const titleRef = useReveal();

    return (
        <section className='projects' id="projects">
            <Decor size="100px" position={{ left: '-6%', top: '6%' }} float={{ dur: '10s', delay: '-7s', dx: '5px', dy: '12px', rot: '5deg' }} />
            <Decor size="140px" position={{ right: '-5%', bottom: '4%' }} float={{ dur: '11s', delay: '-1s', dx: '-7px', dy: '13px', rot: '-4deg' }} />
            <header className="section-title reveal" ref={titleRef}>
                <h2>Projects</h2>
            </header>
            <MultiFilters />
        </section>
    );
};

export default Projects;
