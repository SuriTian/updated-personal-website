import React, { useEffect, useRef } from 'react';
import WordCloud from 'wordcloud';
import './About.css';

const About = () => {
  const canvasRef = useRef(null);

  const list = [
    ['Horror', 20],
    ['(Programming) Languages', 60],
    ['Games', 30],
    ['Hobbies', 20],
    ['Coursework', 50],
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const drawWordCloud = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;   // full width
      canvas.height = parent.offsetHeight; // full height of container


      WordCloud(canvas, {
        list,
        gridSize: Math.floor(canvas.width / 30), // spacing
        weightFactor: (size) => (canvas.width / 8) * (size / 100),
        fontFamily: 'sans-serif',
        color: '#ffffff',
        rotateRatio: 0,
        minSize: 0,
        shuffle: false,
        backgroundColor: 'rgba(153, 0, 255, 0)',
        origin: [canvas.width / 2, canvas.height / 2], // center largest word
        click: function(item) { alert(item[0]); }, // clickable words
        hover: function(item) {}, // hover effect
      });
    };

    drawWordCloud();
    window.addEventListener('resize', drawWordCloud);
    return () => window.removeEventListener('resize', drawWordCloud);

  }, []);

  return (
    <section className="about" id="about">
      <h1>About Me</h1>
      <div className="container" style={{ width: '100%', height: '500px', margin: '0 auto' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </section>
  );
};

export default About;