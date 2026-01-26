import React from 'react';
import { useState } from 'react'
import './Fun.css'
import TicTacToe from './TicTacToe'

// , but I decided to extend it to ultimate tic tac toe add an AI to it. Try to win!

const Fun = () => {
    return (
        <section className='fun' id='fun'>
            <h1>Fun!!!</h1>
            <p>Making TicTacToe was my introduction to React</p> 
            <TicTacToe/>
        </section>
    );
};

export default Fun;