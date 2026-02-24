import Image from 'next/image'
import FAQ from '@/components/FAQ'
import styles from './contact.module.css'

export const metadata = {
  title: 'Contact Us | Langa Events',
  description: 'Get in touch with Langa Events for your event planning needs',
}

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image
            src="/home/34308699_1558305604298007_4799143426589196288_n.jpg"
            alt="Contact Langa Events"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.hero}>
            <span className="meta">Contact Us</span>
            <h1>Let's Create Something Amazing</h1>
            <p>Get in touch with our team to discuss your event</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.card}>
              <h3>Get In Touch</h3>
              
              <div className={styles.contactItem}>
                <div className={styles.itemIcon}>📞</div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:0767218716">076 721 8716</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.itemIcon}>✉️</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:info@langaevents.com">info@langaevents.com</a>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.itemIcon}>📍</div>
                <div>
                  <h4>Location</h4>
                  <p>Silverton, Pretoria<br/>South Africa</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <div className={styles.itemIcon}>⏰</div>
                <div>
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 - 18:00<br/>Sunday & Public Holidays: Closed</p>
                </div>
              </div>
            </div>

            <div className={styles.social}>
              <h3>Follow Us</h3>
              <div className={styles.socialLinks}>
                <a href="https://web.facebook.com/langaevents" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <span>📘 Facebook</span>
                </a>
                <a href="https://www.instagram.com/langaevents/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                  <span>📷 Instagram</span>
                </a>
              </div>
            </div>
          </div>

          <div className={styles.ctaSection}>
            <div className={styles.cta}>
              <h2>Ready to Plan Your Event?</h2>
              <p>Fill out our questionnaire to receive a personalized quote tailored to your needs.</p>
              <a href="/questionnaire" className="btn btn-primary">Start Questionnaire</a>
              
              <div className={styles.alternative}>
                <p>Or reach out directly:</p>
                <div className={styles.quickContact}>
                  <a href="https://wa.me/27767218716" target="_blank" rel="noopener noreferrer" className="btn">
                    💬 WhatsApp Us
                  </a>
                  <a href="mailto:info@langaevents.com" className="btn">
                    ✉️ Send Email
                  </a>
                </div>
              </div>
            </div>
            
            <div className={styles.imageGallery}>
              <div className={styles.galleryImage}>
                <Image
                  src="/home/Konka 8.jpg"
                  alt="Event Setup"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        <FAQ />
      </div>
    </div>
  )
}
