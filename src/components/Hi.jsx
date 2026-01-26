import React from 'react';
import { useState } from 'react'
import './Hi.css'

import Slider from 'react-slick';

import businessImg from '../assets/Business.JPEG';
import offworkImg from '../assets/Offwork.jpeg';
import orientationImg from '../assets/orientation.jpg';
import duckImg from '../assets/Duck.png';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",   // optional padding on sides
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className="picture-carousel">
            <Slider {...settings}>
                <div className="carousel-slide">
                    <img src={businessImg} alt="Slide 1" className="slide-image" />
                </div>
                <div className="carousel-slide">
                    <img src={offworkImg} alt="Slide 2" className="slide-image" />
                </div>
                <div className="carousel-slide">
                    <img src={orientationImg} alt="Slide 3" className="slide-image" />
                </div>
                <div className="carousel-slide">
                    <img src={duckImg} alt="Slide 4" className="slide-image" />
                </div>
            </Slider>
        </div>
    );
}


const Hi = () => {
    return (
        <section className='hi' id="hi">
            <div className='hero-content'>
                <div className="left-content">
                    <h1>Hiiiiii I'm Suri Tian,</h1>
                    <p className='hero-description'>
                        A 1B Software Engineering undergrad @ University of Waterloo. I have a casual interest in math, especially in Topology!
                    </p>
                </div>
                <div className="right-content">
                    <img src={businessImg} className="main-image" />
                </div>
            </div>

            <div className='picture-carousel'>
                <Carousel />
            </div>
        </section>
    );
};

export default Hi;