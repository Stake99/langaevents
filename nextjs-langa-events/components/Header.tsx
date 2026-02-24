'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import styles from './Header.module.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.nav}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/ChatGPT Image Feb 24, 2026, 10_47_31 AM.png"
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
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/questionnaire" className={styles.cta}>Questionnaire</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
