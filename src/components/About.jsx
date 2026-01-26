import React from 'react';
import './About.css';
import businessImg from '../assets/Business.JPEG';

const About = () => {
    return (
        <section className='about' id="about">
            <h1>About Me</h1>
            <div className='container'>
                <div className='about-text'>
                    <h2>Take a look!</h2>
                </div>
                <div className='picture-carousel'>
                    <img className="business-img" src={businessImg}></img>
                </div>
            </div>
        </section>
    );
};

export default About;