'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import styles from './Partners.module.css'

const partners = [
  { name: 'Auditor General of South Africa', logo: '/partners/Auditor-General_of_South_Africa_Logo.png' },
  { name: 'Ayepyep Lifestyle', logo: '/partners/Ayepyep Lifestyle logo.png' },
  { name: 'City of Tshwane', logo: '/partners/City Of Tshwane Logo.png' },
  { name: 'Department of Defence', logo: '/partners/Department of Defence.png' },
  { name: 'Don\'t Look Down Productions', logo: '/partners/Dont look down Productions Logo.png' },
  { name: 'Green Star Productions', logo: '/partners/Green Star Productions logo.jpeg' },
  { name: 'Industrial Chisanyama', logo: '/partners/Industrial Chisanyama Logo.png' },
  { name: 'Mhulu Boutique Hotel', logo: '/partners/Mhulu Boutique Hotel.jpeg' },
  { name: 'RGBC', logo: '/partners/RGBC Logo.png' },
  { name: 'Redlife', logo: '/partners/Redlife-Logo.png' },
  { name: 'Top Notch', logo: '/partners/Top Notch Logo.jpeg' }
]

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const scroll = () => {
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0
      } else {
        track.scrollLeft += 1
      }
    }

    const interval = setInterval(scroll, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`section ${styles.partners}`}>
      <div className="container">
        <div className="section-title">
          <span className="meta">Clients & Partners</span>
          <h2>Dedicated & Trusted Partners</h2>
        </div>
      </div>
      <div className={styles.scrollContainer}>
        <div className={styles.track} ref={trackRef}>
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className={styles.partner}>
              <div className={styles.logoWrapper}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="200px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
