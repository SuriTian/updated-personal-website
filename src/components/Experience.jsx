import React from 'react';
import './Experience.css';

const experiences = [
    {
        role: "Software Engineering Intern",
        company: "Evertz Microsystems",
        location: "Burlington, ON",
        dates: "May 2026 – Aug 2026",
        blurb: "Shipped RIST stream filtering, DTLS-encrypted transport, and a time-sync component on embedded video hardware — plus tracked down a nasty bitrate overflow bug along the way."
    },
    {
        role: "Firmware Team Member",
        company: "Waterloo Rocketry",
        location: "Waterloo, ON",
        dates: "Sept 2025 – Present",
        blurb: "Building the power management and I2C driver firmware that keeps our rocket's canard board alive, running on FreeRTOS."
    },
    {
        role: "Software Engineering Class & EngSoc Rep",
        company: "University of Waterloo",
        location: "Waterloo, ON",
        dates: "Jan 2026 – Present",
        blurb: "Elected to represent 140 classmates as liaison between faculty and the Software Engineering Class of 2030."
    }
];

const Experience = () => {
    return (
        <section className="experience" id="experience">
            <h1>Experience</h1>
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
