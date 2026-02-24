'use client'

import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  { q: 'Where are you based?', a: 'We are based in Silverton Pretoria, however we offer our services to most of Southern Africa.' },
  { q: 'What services do you offer?', a: 'From designing and manufacturing unique furniture to creating stunning decor, we have you covered. Our services extend to brand activations, business conferences, and music celebrations.' },
  { q: 'How do you price?', a: 'We tailor our pricing to fit your specific needs and budget. Our quotes are based on your requirements to ensure successful execution.' },
  { q: 'How do I book you?', a: 'Contact us via WhatsApp at 076 721 8716 or email info@langaevents.com. We\'ll provide a personalized quote and schedule a meeting.' }
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={`section ${styles.faq}`}>
      <div className="container">
        <div className="section-title">
          <span className="meta">FAQ's</span>
          <h2>How Can We Help You</h2>
        </div>
        <div className={styles.list}>
          {faqs.map((faq, i) => (
            <div key={i} className={styles.item}>
              <button 
                className={styles.question}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span>{faq.q}</span>
                <span className={styles.icon}>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && (
                <div className={styles.answer}>{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
