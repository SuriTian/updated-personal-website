import React from 'react';
import { useEffect, useState } from 'react'
import './Projects.css'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade';

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

function ProjectCard({ item }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div className="item" onClick={handleOpen}>
                <p>{item.name}</p>
                <div className="tag-container">
                    {item.category.map((cat, i) => (
                        <span key={i} className='category-tag'>{cat}</span>
                    ))}
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
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
                <Fade in={open} timeout={250}>
                    <Box sx={modalStyle}>
                        <Typography variant="h6" component="h2" sx={{ mb: item.date ? 0.5 : 2, color: 'var(--accent)' }}>
                            {item.name}
                        </Typography>
                        {item.date && (
                            <Typography variant="body2" sx={{ mb: 2, color: '#999' }}>
                                {item.date}
                            </Typography>
                        )}
                        <div className="tag-container" style={{ marginBottom: '1rem' }}>
                            {item.category.map((cat, i) => (
                                <span key={i} className='category-tag'>{cat}</span>
                            ))}
                        </div>
                        {item.bullets.length > 0 ? (
                            <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
                                {item.bullets.map((bullet, i) => (
                                    <li key={i} style={{ marginBottom: '8px', lineHeight: 1.5 }}>
                                        <Typography variant="body1">{bullet}</Typography>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <Typography variant="body1" sx={{ color: '#999' }}>
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
    const [filteredItems, setfilteredItems] = useState(items);

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

    useEffect(() => {
        filterItems();
    }, [selectedFilters]);

    const filterItems = () => {
        if (selectedFilters.length > 0) {
            let tempItems = items.filter((item) =>
                selectedFilters.some((filter) => item.category.includes(filter))
            );
            setfilteredItems(tempItems);
        } else {
            setfilteredItems([...items]);
        }
    };

    return (
        <div>
            <div className='filters'>
                {filters.map((category, idx) => (
                    <button
                        onClick={() => handleFilterButtonClick(category)}
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
                    <ProjectCard item={item} key={`items-${idx}`} />
                ))}
            </div>

        </div>
    );
}


const Projects = () => {
    return (
        <section className='projects' id="projects">
            <h1>Projects</h1>
            <MultiFilters />
        </section>
    );
};

export default Projects;
