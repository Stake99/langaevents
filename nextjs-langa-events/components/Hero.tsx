'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Hero.module.css'

const slides = [
  {
    image: '/home/Eugene & Tebogo Rens Town 10.jpg',
    title: 'Creating Unforgettable Events',
    subtitle: 'Professional event planning and management for your special occasions'
  },
  {
    image: '/home/Konka Finale 9.jpg',
    title: 'Exceptional Event Design',
    subtitle: 'Transforming your vision into stunning reality'
  },
  {
    image: '/home/Konka Finale Finale 8.jpg',
    title: 'Memorable Celebrations',
    subtitle: '14 years of excellence in event management'
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.hero}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${index === currentSlide ? styles.active : ''}`}
        >
          <img 
            src={slide.image} 
            alt={slide.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div className={styles.overlay}></div>
        </div>
      ))}
      <div className="container">
        <div className={styles.content}>
          <h1>{slides[currentSlide].title}</h1>
          <p>{slides[currentSlide].subtitle}</p>
          <a href="/questionnaire" className={`btn btn-primary ${styles.ctaBtn}`}>
            <Image
              src="/online-registration.png"
              alt="Get a Quote"
              width={24}
              height={24}
              style={{ objectFit: 'contain' }}
            />
            <span className={styles.btnText}>Get a Quote</span>
          </a>
        </div>
      </div>
      <div className={styles.indicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
