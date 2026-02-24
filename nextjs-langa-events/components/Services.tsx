import styles from './Services.module.css'

const services = [
  { 
    icon: '💍', 
    title: 'Weddings', 
    description: 'We craft unforgettable weddings with exquisite attention to detail.'
  },
  { 
    icon: '⭐', 
    title: 'Brand Activations', 
    description: 'Transform brand interactions into unforgettable experiences.'
  },
  { 
    icon: '🍷', 
    title: 'Social Events', 
    description: 'Elevate your social events with our creative expertise.'
  },
  { 
    icon: '💼', 
    title: 'Corporate Events', 
    description: 'Professional events that leave lasting impressions.'
  },
  { 
    icon: '🎨', 
    title: 'Event Design', 
    description: 'Custom design and stunning decor for your vision.'
  },
  { 
    icon: '🪑', 
    title: 'Furniture & Setup', 
    description: 'Unique furniture pieces tailored to your needs.'
  }
]

export default function Services() {
  return (
    <section className={`section ${styles.services}`}>
      <div className="container">
        <div className="section-title">
          <span className="meta">Our Services</span>
          <h2>Event Maestros Sculpting Remarkable Occasions</h2>
        </div>
        <div className={styles.grid}>
          {services.map((service, i) => (
            <div key={i} className={styles.service}>
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{service.icon}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
