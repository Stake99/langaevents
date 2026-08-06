import Image from 'next/image'
import styles from './services.module.css'

export const metadata = {
  title: 'Our Services | Langa Events',
  description: 'Full-service event planning, design, and management',
}

const services = [
  {
    id: 'weddings',
    icon: '💍',
    title: 'Weddings',
    description: 'We craft unforgettable weddings, focusing on every exquisite detail to ensure a perfect, magical, and truly enchanting day.',
    features: ['Venue decoration', 'Floral arrangements', 'Furniture & setup', 'Full coordination'],
    image: '/services/CRUZ 1.jpg',
    gallery: [
      '/home/Eugene & Tebogo Rens Town 10.jpg',
      '/home/Eugene & Tebogo Rens Town 13.jpg',
      '/projects/Eugene & Tebogo Tafel Kop 1.jpg',
      '/projects/Eugene & Tebogo Tafelkop 3.jpg',
      '/projects/Eugene & Tebogo Tafelkop 4.jpg',
      '/projects/Eugene & Tebogo Tafelkop 5.jpg',
      '/projects/Eugene & Tafelkop 6.jpg',
      '/projects/Eugene & Tebeogo Tafelkop 2.jpg',
      '/services/CRUZ 1.jpg',
      '/services/CRUZ 2 .jpg',
      '/services/CRUZ 3.jpg'
    ]
  },
  {
    id: 'brand-activations',
    icon: '⭐',
    title: 'Brand Activations',
    description: 'Transform brand interactions into unforgettable experiences. Langa Events designs impactful activations.',
    features: ['Product launches', 'Experiential marketing', 'Pop-up events', 'Brand experiences'],
    image: '/services/Windhoek 1.jpg',
    gallery: [
      '/services/Windhoek 1.jpg',
      '/services/Windhoek 2.jpg',
      '/services/Windhoek 3.jpg',
      '/services/Windhoek 4.jpg',
      '/services/New_Normalbranding-Recovered-Recovered-Recovered copy.jpg',
      '/home/68309364_2181503335311561_5364076551094665216_n.jpg'
    ]
  },
  {
    id: 'social-events',
    icon: '🍷',
    title: 'Social Events',
    description: 'Langa Events elevates social events, transforming your vision into unforgettable experiences.',
    features: ['Birthday parties', 'Anniversaries', 'Private celebrations', 'Themed events'],
    image: '/services/CRUZ 5.jpg',
    gallery: [
      '/home/Konka Birthday 1.jpg',
      '/home/Konka 8.jpg',
      '/home/Konka Finale 9.jpg',
      '/home/Konka Finale Finale 8.jpg',
      '/services/CRUZ 5.jpg',
      '/services/CRUZ 6.jpg',
      '/services/CRUZ 7.jpg'
    ]
  },
  {
    id: 'corporate-events',
    icon: '💼',
    title: 'Corporate Events',
    description: 'From conferences to product launches, we deliver professional corporate events that leave lasting impressions.',
    features: ['Conferences', 'Seminars', 'Team building', 'Gala dinners'],
    image: '/services/CRUZ 8.jpg',
    gallery: [
      '/services/CRUZ 8.jpg',
      '/services/CRUZ 9.jpg',
      '/services/CRUZ 10.jpg',
      '/home/34308699_1558305604298007_4799143426589196288_n.jpg',
      '/projects/IMG_0770copy.jpg'
    ]
  },
  {
    id: 'event-design',
    icon: '🎨',
    title: 'Event Design & Decor',
    description: 'Custom event design and stunning decor that brings your vision to life with creativity and precision.',
    features: ['Custom themes', 'Decor styling', 'Lighting design', 'Floral arrangements'],
    image: '/services/CRUZ 3.jpg',
    gallery: [
      '/services/CRUZ 3.jpg',
      '/services/CRUZ 4.jpg',
      '/services/CRUZ 1.jpg',
      '/services/CRUZ 5.jpg',
      '/home/Eugene & Tebogo Rens Town 10.jpg',
      '/home/Konka Finale Finale 8.jpg'
    ]
  },
  {
    id: 'furniture-manufacturing',
    icon: '🪑',
    title: 'Furniture Manufacturing',
    description: 'We design and manufacture unique furniture pieces tailored to your event needs.',
    features: ['Custom furniture', 'Event seating', 'Stage design', 'Unique pieces'],
    image: '/services/CRUZ 10.jpg',
    gallery: [
      '/services/CRUZ 10.jpg',
      '/services/CRUZ 8.jpg',
      '/services/CRUZ 2 .jpg',
      '/projects/Eugene & Tebogo Tafelkop 4.jpg',
      '/home/Konka 8.jpg'
    ]
  }
]

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image
            src="/home/Konka Finale 9.jpg"
            alt="Langa Events Services"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.hero}>
            <span className="meta">Our Services</span>
            <h1>Comprehensive Event Solutions</h1>
            <p>From concept to creation, we handle every detail of your event</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.services}>
          {services.map((service, i) => (
            <a key={i} href={`/services/${service.id}`} className={styles.service}>
              <div className={styles.serviceImage}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={styles.serviceContent}>
                <div className={styles.icon}>{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className={styles.features}>
                  {service.features.map((feature, j) => (
                    <li key={j}>✓ {feature}</li>
                  ))}
                </ul>
                <div className={styles.viewMore}>
                  View Gallery →
                </div>
              </div>
            </a>
          ))}
        </div>

        <section className={styles.cta}>
          <h2>Ready to Get Started?</h2>
          <p>Tell us about your event and receive a personalized quote</p>
          <a href="/questionnaire" className="btn btn-primary">Request a Quote</a>
        </section>
      </div>
    </div>
  )
}
