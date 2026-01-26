import React from 'react';
import './About.css';

const About = () => {
    return (
        <section className='about' id="about">
            <h1>About Me</h1>
            <div className='section-container'>
                <div className='about-text'>
                    <h2>Take a look!</h2>
                </div>
                <div className='picture-carousel'>
                    {/* pictures here later */}
                </div>
            </div>
        </section>
    );
};

export default About;