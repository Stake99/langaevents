import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={`section ${styles.about}`}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.imageWrapper}>
              <Image
                src="/home/Eugene & Tebogo Rens Town 13.jpg"
                alt="Langa Events Setup"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className={styles.textSection}>
            <span className="meta">Langa Events Solution</span>
            <h2>Pride Defines Our Craft, Excellence is Our Promise</h2>
            <p>At Langa Events, we transform your vision into unforgettable experiences. With 14 years of expertise in event design, decor, and management, we deliver excellence in every detail.</p>
            <p>When it comes to your special day, settle for nothing less than the finest; entrust Langa Events for unparalleled excellence.</p>
            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.icon}>✓</span>
                <h3>Professional Team</h3>
              </div>
              <div className={styles.feature}>
                <span className={styles.icon}>✓</span>
                <h3>Quality Service</h3>
              </div>
              <div className={styles.feature}>
                <span className={styles.icon}>✓</span>
                <h3>Always Improving</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
