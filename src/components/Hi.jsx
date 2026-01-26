import React from 'react';
import { useState } from 'react'
import './Hi.css'

const Hi = () => {
    return (
        <section className='hi' id="hi">
            <h1>Hiiiiii I'm Suri,</h1>
            <div className='hero-content'>
                <div className="left-content">
                    <p className='hero-description'>
                        a 1B Software Engineering undergrad @ the University of Waterloo
                    </p>
                </div>
                <div className="right-content">
                    insert images
                </div>
            </div>
        </section>
    );
};

export default Hi;