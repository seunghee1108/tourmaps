'use client'

import React, { useState } from 'react';
import styles from '../styles/slide.module.scss';
const SlidePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { color: 'azure', image: '/seoul.jpg' },
    { color: 'azure', image: '/path/to/image2.jpg' }
    // { color: 'beige'},
    // { color: 'azure' }
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  return (
    <div className={styles.slider}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
          style={{ backgroundColor: slide.color }}
        >
        <img src="/seoul.jpg" alt="서울" />
          {index === currentSlide && (
            <img src={slide.image} alt={`Slide ${index + 1}`} className={styles.slideImage} />
          )}
        </div>
      ))}
      <button className={styles.arrow} onClick={prevSlide}>{'<'}</button>
      <button className={styles.arrow} onClick={nextSlide}>{'>'}</button>
    </div>
  );
};

export default SlidePage;
