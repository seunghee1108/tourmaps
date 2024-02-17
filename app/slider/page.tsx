import React, { useState } from 'react';
import styles from '../styles/slide.module.scss';
import "/app/globals.css";

const SlidePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { imageUrl: '/slide.jpg' },
    // { imageUrl: '/slideimage.jpg' },
    { imageUrl: '/slideimage2.jpg' }
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
        >
          <img
            src={slide.imageUrl}
            alt={`Slide ${index + 1}`}
            className={styles.slideImage}
          />
        </div>
      ))}
      <button className={styles.arrow} onClick={prevSlide}>{'<'}</button>
      <button className={styles.arrow} onClick={nextSlide}>{'>'}</button>
    </div>
  );
};

export default SlidePage;
