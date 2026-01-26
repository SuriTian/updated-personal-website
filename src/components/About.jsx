import React, { useState, useEffect } from 'react';
import './About.css';

function WordCloud() {
    const list = [
        ['Hobbies', 30],
        ['(Programming) Languages', 70],
        ['Horror', 20],
        ['Coursework', 50],
        ['Movies', 30],
        ['Leadership', 60],
        ['Entrepreneurship', 50],
        ['Music', 30],
    ];

    return (
        <div>
        {list.map(([word, size], idx) => (
            <button
                key={idx}
                style={{
                    fontSize: `${size}px`
                }}
            >
            {word}
            </button>
        ))}
        </div>
    );

}

const About = () => {
    return (
        <section className='about' id="about">
            <h1>About Me</h1>
            <div className='word-cloud'>
                <WordCloud />
            </div>
        </section>
    );
};

export default About;