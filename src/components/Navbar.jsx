import React from 'react';
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className='navbar-left'>
            logo
        </div>
        <div className='navbar-content'>
            <ul>
                <li><a href="#hi">HI</a></li>
                <li><a href="#about">ABOUT</a></li>
                <li><a href="#projects">PROJECTS</a></li>
                <li><a href="#fun">FUN</a></li>
            </ul>
        </div>
    </nav>
    );
};

export default Navbar;
