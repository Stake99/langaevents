'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useState } from 'react'
import styles from './service-detail.module.css'

const services = [
  {
    id: 'weddings',
    icon: '💍',
    title: 'Weddings',
    description: 'We craft unforgettable weddings, focusing on every exquisite detail to ensure a perfect, magical, and truly enchanting day.',
    fullDescription: 'At Langa Events, we understand that your wedding day is one of the most important moments of your life. Our dedicated team works tirelessly to bring your vision to life, handling every detail from venue decoration to floral arrangements. With 14 years of experience, we create magical, enchanting celebrations that you and your guests will remember forever.',
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
    fullDescription: 'Create memorable brand experiences that resonate with your audience. Our brand activation services combine creativity with strategic thinking to deliver campaigns that drive engagement and build lasting connections. From product launches to experiential marketing events, we make your brand stand out.',
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
    fullDescription: 'Whether it\'s a milestone birthday, anniversary, or intimate gathering, we create social events that reflect your personality and style. Our attention to detail and creative approach ensures every celebration is unique, memorable, and perfectly executed.',
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
    fullDescription: 'Elevate your corporate gatherings with our professional event management services. We specialize in conferences, seminars, team building activities, and gala dinners that align with your business objectives while creating engaging experiences for your attendees.',
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
    fullDescription: 'Our event design and decor services transform spaces into stunning environments that captivate and inspire. From custom themes to lighting design and floral arrangements, we create cohesive, beautiful settings that enhance your event experience.',
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
    fullDescription: 'Stand out with custom-designed furniture pieces created specifically for your event. Our manufacturing capabilities allow us to bring unique concepts to life, from custom seating to stage designs and specialty pieces that make your event truly one-of-a-kind.',
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

export default function ServiceDetailPage() {
  const params = useParams()
  const service = services.find(s => s.id === params.id)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  if (!service) {
    return (
      <div className={styles.notFound}>
        <h1>Service Not Found</h1>
        <a href="/services" className="btn btn-primary">Back to Services</a>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.heroSection}>
        <div className={styles.heroImage}>
          <Image
            src={service.image}
            alt={service.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className={styles.heroOverlay}></div>
        </div>
        <div className="container">
          <div className={styles.hero}>
            <div className={styles.icon}>{service.icon}</div>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className={styles.content}>
          <div className={styles.details}>
            <h2>About This Service</h2>
            <p>{service.fullDescription}</p>
            
            <h3>What We Offer</h3>
            <ul className={styles.featureList}>
              {service.features.map((feature, i) => (
                <li key={i}>
                  <span className={styles.checkmark}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <div className={styles.cta}>
              <h3>Ready to Get Started?</h3>
              <p>Let's discuss your event and create something amazing together.</p>
              <a href="/questionnaire" className="btn btn-primary">Request a Quote</a>
            </div>
          </div>
        </section>

        <section className={styles.gallery}>
          <h2>Gallery</h2>
          <p className={styles.gallerySubtitle}>Explore our work in {service.title.toLowerCase()}</p>
          
          <div className={styles.galleryGrid}>
            {service.gallery.map((image, i) => (
              <div 
                key={i} 
                className={styles.galleryItem}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${service.title} ${i + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.backSection}>
          <a href="/services" className={styles.backLink}>
            ← Back to All Services
          </a>
        </section>
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
          <div className={styles.lightboxContent}>
            <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
              ✕
            </button>
            <Image
              src={selectedImage}
              alt="Full size"
              fill
              style={{ objectFit: 'contain' }}
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  )
}
