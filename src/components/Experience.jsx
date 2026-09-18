import './Experience.css';
import useReveal from '../hooks/useReveal';
import Decor from './Decor';

const experiences = [
    {
        role: "Software Engineering Intern",
        company: "Evertz Microsystems",
        location: "Burlington, ON",
        dates: "May 2026 - Aug 2026",
    }
];

function ExperienceItem({ exp, index }) {
    const ref = useReveal({ delay: index * 100 });

    return (
        <article className="experience-item card reveal" ref={ref}>
            <div className="experience-header">
                <div>
                    <p className="experience-role">{exp.role}</p>
                    <p className="experience-company">{exp.company} · {exp.location}</p>
                </div>
                <p className="experience-dates">{exp.dates}</p>
            </div>
        </article>
    );
}

const Experience = () => {
    const titleRef = useReveal();

    return (
        <section className="experience" id="experience">
            <Decor size="150px" position={{ right: '2%', top: '10%' }} float={{ dur: '12s', delay: '-3s', dx: '-8px', dy: '14px', rot: '-3deg' }} />
            <Decor size="90px" position={{ left: '4%', bottom: '10%' }} float={{ dur: '9s', delay: '-5s', dx: '6px', dy: '11px', rot: '4deg' }} />
            <header className="section-title reveal" ref={titleRef}>
                <h2>Co-op</h2>
            </header>
            <div className="experience-list">
                {experiences.map((exp, idx) => (
                    <ExperienceItem exp={exp} index={idx} key={idx} />
                ))}
            </div>
        </section>
    );
};

export default Experience;
