import Image from 'next/image'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    name: 'Busi & Aaron Phangiso',
    role: 'Wedding Clients',
    text: 'Langa Events transformed our wedding into a magical fairy tale. Every detail was perfect, from the stunning floral arrangements to the seamless coordination. They made our dream day come true beyond our wildest expectations.',
    image: '/testimony/Busi & Aaron Phangiso.JPG'
  },
  {
    name: 'Lehlogonolo & Lucky Mgidi',
    role: 'Wedding Clients',
    text: 'We couldn\'t have asked for a better team to plan our wedding. Langa Events brought our vision to life with creativity and precision. From the elegant decor to the flawless coordination, everything was absolutely perfect.',
    image: '/testimony/Lehlogonolo & Lucky Mgidi.jpg'
  },
  {
    name: 'Thabo & Lebo Mashigo',
    role: 'Wedding Clients',
    text: 'Langa Events made our wedding day truly unforgettable. Their professionalism and passion for creating beautiful moments was evident in every detail. Our guests are still talking about how stunning everything looked!',
    image: '/testimony/Thabo & Lebo Mashigo.jpg'
  }
]

export default function Testimonials() {
  return (
    <section className={`section ${styles.testimonials}`}>
      <div className="container">
        <div className="section-title">
          <span className="meta">Testimonials</span>
          <h2>What Our Clients Say About Us</h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((testimonial, i) => (
            <div key={i} className={styles.testimonial}>
              <div className={styles.imageWrapper}>
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className={styles.content}>
                <p className={styles.text}>"{testimonial.text}"</p>
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
