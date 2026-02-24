'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.nav}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            <Image
              src="/logo.png"
              alt="Langa Events"
              width={90}
              height={28}
              priority
              style={{ objectFit: 'contain' }}
            />
          </Link>
          
          <button 
            className={styles.toggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
            <Link href="/" onClick={closeMenu}>Home</Link>
            <Link href="/about" onClick={closeMenu}>About</Link>
            <Link href="/services" onClick={closeMenu}>Services</Link>
            <Link href="/contact" onClick={closeMenu}>Contact</Link>
            <Link href="/questionnaire" className={styles.cta} title="Start Questionnaire" aria-label="Start Questionnaire" onClick={closeMenu}>
              <Image
                src="/online-registration.png"
                alt="Questionnaire"
                width={22}
                height={22}
                className={styles.icon}
              />
              <span>Get Started</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
