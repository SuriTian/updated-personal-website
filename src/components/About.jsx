import React, { useState, useEffect } from 'react';
//import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
//import { createPortal } from 'react-dom';
import './About.css';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { bgBG } from '@mui/material/locale';
import Fade from '@mui/material/Fade';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
  width: '80%', 
  maxWidth: '1000px', 
  height: '80%',
  maxHeight: '550px',
  bgcolor: 'black', 
  border: '2px solid white',
  p: 4,
};

const MODAL_CONFIG = {
  Hobbies: {
    title: "Hobbies",
    content: "Math!!!",
    width: 400,
  },
  "(Programming) Languages": {
    title: "Languages",
    content: "JavaScript, React, Python, C++",
    width: 500,
  },
  "Horror": {
    title: "Horror",
    content: "I love collecting Junji Ito mangas, playing horror games and watching horror games playthroughs!",
    width: 500,
  },
  "Coursework": {
    title: "Coursework",
    content: "Introduction to Programming (C), Data Abstractions and Implementations (C++), Linear Algebra, Digital Circuits, Linear Circuits",
    width: 500,
  },
  "Movies": {
    title: "Movie Ratings: ",
    content: "Interstellar 10/10"
  },
  "Leadership": {
    title: "What I've been doing @ UWaterloo",
    content: "Math Society Class Rep (Fall 25), EngSoc Rep (Winter 26), Academic Rep (Winter 26)"
  },
  "Entrepreneurship": {
    title: "Two Business Experiences @ Junior Achievement",
    content: "Repaw Styles VP of Tech, SereniSlimes President"
  },
  "Music": {
    title: "I bought Spotify Premium..."
  },
  default: {
    title: "Info",
    content: "Default content",
    width: 300,
  },
};


function ModalDescription({idx, word, size}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const config = MODAL_CONFIG[word] ?? MODAL_CONFIG.default;


    return (
        <>
            <button 
                onClick={handleOpen}
                key={idx}
                style={{
                    fontSize: `${size}px`
                }}
            >
                {word}
            </button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                slotProps={{
                    backdrop: {
                        sx: {
                            backgroundColor: 'transparent', 
                            backdropFilter: 'none',
                        },
                    },
                }}

            >
                <Fade in={open} timeout={250}>
                    <Box sx={style}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            {config.title}
                        </Typography>
                        <Typography variant="p">
                            {config.content}
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

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
            <ModalDescription word={word} size={size} key={idx}/>
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


/**
 * <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
 */