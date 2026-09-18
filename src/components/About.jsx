import './About.css';
import PhysicsWordCloud from './PhysicsWordCloud';
import useReveal from '../hooks/useReveal';
import Decor from './Decor';

import radio from '../assets/decor/radio.webp';

const About = () => {
    const titleRef = useReveal();

    return (
        <section className='about' id="about">
            <Decor size="80px" position={{ right: 'calc(100% + 1.5rem)', top: '36%' }} float={{ dur: '11s', delay: '-2s', dx: '7px', dy: '14px', rot: '5deg' }} />
            <Decor src={radio} alt="A little wooden retro radio" size="clamp(160px, 17vw, 330px)" tilt="-14deg" position={{ right: '1%', top: '2%' }} float={{ dur: '9s', delay: '-6s', dx: '-6px', dy: '10px', rot: '-4deg' }} />
            <header className="section-title reveal" ref={titleRef}>
                <h2>About Me</h2>
                <p className="section-lede">
                    Open sesame!
                </p>
            </header>
            <PhysicsWordCloud />
        </section>
    );
};

export default About;
