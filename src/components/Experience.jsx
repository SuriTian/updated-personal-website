import React from 'react';
import './Experience.css';

const experiences = [
    {
        role: "Software Engineering Intern",
        company: "Evertz Microsystems",
        location: "Burlington, ON",
        dates: "May 2026 – Aug 2026",
        bullets: [
            "Implemented Reliable Internet Stream Transport (RIST) Part 6 to support selective stream filtering, optimizing test stream bandwidth by 25%.",
            "Extended RIST filtering to support runtime reconfiguration, DTLS-encrypted transport, and SNMP trap alerts, meeting product requirements for secure, configurable stream delivery.",
            "Identified and internally patched a bitrate calculation overflow bug in libRIST during device integration testing.",
            "Built a time synchronization component using Chrony with NTS over NTP, providing authenticated and tamper-resistant clock synchronization for embedded devices.",
            "Extended a REST API plugin with four new endpoints for hardware status, inter-switch port, and sender/receiver stream configuration.",
            "Refactored the networking router module for a new device architecture, removing hardware-dependent requests to support testing in a virtual machine environment."
        ]
    },
    {
        role: "Firmware Team Member",
        company: "Waterloo Rocketry",
        location: "Waterloo, ON",
        dates: "Sept 2025 – Present",
        bullets: [
            "Designed a power management module to monitor and control canard board power rails, including fault handling and power-state management.",
            "Implemented an interrupt-driven, DMA-based I2C driver with FreeRTOS semaphore synchronization and manual cache coherency management."
        ]
    },
    {
        role: "Software Engineering Class & EngSoc Rep",
        company: "University of Waterloo",
        location: "Waterloo, ON",
        dates: "Jan 2026 – Present",
        bullets: [
            "Elected representative for 140 students, serving as liaison between faculty and the Software Engineering Class of 2030, communicating updates and advocating on students' behalf."
        ]
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
                        <ul className="experience-bullets">
                            {exp.bullets.map((bullet, i) => (
                                <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
