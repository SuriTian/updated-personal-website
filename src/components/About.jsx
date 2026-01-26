import React from 'react';
import Slider from 'react-slick';

import './About.css';

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
        speed: 500,
        slidesToShow: 3,        // show 3 cards at a time
        slidesToScroll: 1,
        centerMode: true,       // center the active slide
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


const About = () => {
    return (
        <section className='about' id="about">
            <h1>About Me</h1>
            <div className='container'>
                <div className='about-text'>
                    <h2>Take a look!</h2>
                </div>
            </div>

            <div className='picture-carousel'>
                    <Carousel />
                </div>
        </section>
    );
};

export default About;