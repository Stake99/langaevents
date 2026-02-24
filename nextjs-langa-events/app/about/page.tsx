import Image from 'next/image'
import styles from './about.module.css'

export const metadata = {
  title: 'About Us | Langa Events',
  description: '14 years of excellence in event planning and management',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image
            src="/home/Eugene & Tebogo Rens Town 10.jpg"
            alt="About Langa Events"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.hero}>
            <span className="meta">About Us</span>
            <h1>Creating Memorable Experiences Since 2010</h1>
            <p>With 14 years of expertise, we transform visions into unforgettable events</p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className={styles.story}>
          <div className={styles.storyGrid}>
            <div className={styles.storyImage}>
              <Image
                src="/home/Konka Finale Finale 8.jpg"
                alt="Langa Events Story"
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.storyContent}>
              <h2>Our Story</h2>
              <p>Langa Events has built success by establishing long-term relationships with private clients, business establishments, and multiple government entities over 14 years.</p>
              <p>We are a full-service event supplier and management company specializing in event design, decor, brand activations, meetings, and conference planning.</p>
              <p>From concept to creation, we handle every detail with precision and passion, ensuring your event is nothing short of extraordinary.</p>
            </div>
          </div>
        </section>

        <section className={styles.values}>
          <h2>Why Choose Us</h2>
          <div className={styles.grid}>
            <div className={styles.value}>
              <div className={styles.icon}>🎯</div>
              <h3>Individualism</h3>
              <p>We offer a full range of services including event design, furniture manufacturing, and décor tailored to your unique vision.</p>
            </div>
            <div className={styles.value}>
              <div className={styles.icon}>👥</div>
              <h3>Experienced Team</h3>
              <p>With 14 years of experience, we have forged strong relationships with trusted brands, vendors, and partners, ensuring flawless execution.</p>
            </div>
            <div className={styles.value}>
              <div className={styles.icon}>⭐</div>
              <h3>Professionalism</h3>
              <p>Our dedicated team works closely with you, listening to your ideas and preferences, to craft a tailor-made experience that exceeds expectations.</p>
            </div>
            <div className={styles.value}>
              <div className={styles.icon}>✓</div>
              <h3>Qualified</h3>
              <p>We are a full-service event supplier and management company with expertise in event design, brand activations, and conference planning.</p>
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Ready to Plan Your Event?</h2>
          <p>Let's create something extraordinary together</p>
          <a href="/questionnaire" className="btn btn-primary">Get Started</a>
        </section>
      </div>
    </div>
  )
}
