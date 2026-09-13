import React from 'react';
import './Experience.css';

const experiences = [
    {
        role: "Software Engineering Intern",
        company: "Evertz Microsystems",
        location: "Burlington, ON",
        dates: "May 2026 – Aug 2026",
        blurb: "Shipped RIST stream filtering, DTLS-encrypted transport, and a time-sync component on embedded video hardware — plus tracked down a nasty bitrate overflow bug along the way."
    }
];

const Experience = () => {
    return (
        <section className="experience" id="experience">
            <h1>Co-op</h1>
            <div className="experience-list">
                {experiences.map((exp, idx) => (
                    <div className="experience-item" key={idx}>
                        <div className="experience-header">
                            <div>
                                <p className="experience-role">{exp.role}</p>
                                <p className="experience-company">{exp.company} · {exp.location}</p>
                            </div>
                            <p className="experience-dates">{exp.dates}</p>
                        </div>
                        <p className="experience-blurb">{exp.blurb}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
