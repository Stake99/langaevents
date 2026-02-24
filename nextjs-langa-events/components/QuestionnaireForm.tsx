'use client'

import { useState } from 'react'
import styles from './QuestionnaireForm.module.css'

export default function QuestionnaireForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    event_type: '',
    budget_range: '',
    services: [] as string[],
    guest_count: '',
    timeline: '',
    venue: '',
    name: '',
    phone: '',
    email: '',
    event_description: '',
    referral_source: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter(s => s !== value)
        : [...prev.services, value]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setShowThankYou(true)
      } else {
        alert('Failed to submit. Please try again.')
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showThankYou) {
    return (
      <div className={styles.thankYou}>
        <div className={styles.checkmark}>✓</div>
        <h2>Thank You!</h2>
        <p>Your event inquiry has been successfully submitted.</p>
        <p>Our team will review your request and get back to you within 24-48 hours.</p>
        <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
          Continue Browsing
        </button>
      </div>
    )
  }

  const progressPercentage = (step / 3) * 100

  return (
    <div className={styles.formContainer}>
      <div className={styles.progress}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className={styles.progressSteps}>
          <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <span>Event Type</span>
          </div>
          <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <span>Details</span>
          </div>
          <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div>
            <span>Contact</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.step}>
            <h3>What type of event are you planning?</h3>
            <p>Select your event type and budget range</p>
            
            <div className={styles.formGroup}>
              <label>Event Type <span className={styles.required}>*</span></label>
              <div className={styles.eventTypes}>
                {[
                  { value: 'Wedding', icon: '💍' },
                  { value: 'Corporate Event', icon: '💼' },
                  { value: 'Brand Activation', icon: '⭐' },
                  { value: 'Social Event', icon: '🍷' },
                  { value: 'Birthday/Celebration', icon: '🎉' },
                  { value: 'Gala Dinner', icon: '💎' }
                ].map(type => (
                  <label key={type.value} className={styles.eventType}>
                    <input
                      type="radio"
                      name="event_type"
                      value={type.value}
                      checked={formData.event_type === type.value}
                      onChange={handleChange}
                      required
                    />
                    <span>
                      <span className={styles.optionIcon}>{type.icon}</span>
                      {type.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Budget Range <span className={styles.required}>*</span></label>
              <select name="budget_range" value={formData.budget_range} onChange={handleChange} required>
                <option value="">Select your budget range</option>
                <option value="Under R50,000">💰 Under R50,000</option>
                <option value="R50,000 - R100,000">💰💰 R50,000 - R100,000</option>
                <option value="R100,000 - R250,000">💰💰💰 R100,000 - R250,000</option>
                <option value="R250,000+">💎 R250,000+</option>
              </select>
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className="btn btn-primary" onClick={() => setStep(2)}>
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.step}>
            <h3>Tell us about your event</h3>
            <p>Help us understand your needs better</p>
            
            <div className={styles.formGroup}>
              <label>Services Needed <span className={styles.required}>*</span></label>
              <div className={styles.checkboxGrid}>
                {[
                  { value: 'Event Design & Decor', icon: '🎨' },
                  { value: 'Furniture & Setup', icon: '🪑' },
                  { value: 'Floral Arrangements', icon: '🌸' },
                  { value: 'Sound & DJ', icon: '🎵' },
                  { value: 'Catering Services', icon: '🍽️' },
                  { value: 'Photography/Videography', icon: '📸' },
                  { value: 'Full Event Management', icon: '📋' }
                ].map(service => (
                  <label key={service.value} className={styles.checkbox}>
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.value)}
                      onChange={() => handleCheckbox(service.value)}
                    />
                    <div className={styles.checkboxCard}>
                      <span className={styles.checkboxIcon}>{service.icon}</span>
                      <span className={styles.checkboxLabel}>
                        {service.value === 'Photography/Videography' ? (
                          <>
                            Photography/<br/>Videography
                          </>
                        ) : (
                          service.value
                        )}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>👥 Guest Count <span className={styles.required}>*</span></label>
                <select name="guest_count" value={formData.guest_count} onChange={handleChange} required>
                  <option value="">Select guest count</option>
                  <option value="Under 50">Under 50</option>
                  <option value="50-100">50-100</option>
                  <option value="100-200">100-200</option>
                  <option value="200+">200+</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>📅 Timeline <span className={styles.required}>*</span></label>
                <select name="timeline" value={formData.timeline} onChange={handleChange} required>
                  <option value="">When is your event?</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="1-2 Months">1-2 Months</option>
                  <option value="2-4 Months">2-4 Months</option>
                  <option value="4+ Months">4+ Months</option>
                </select>
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>📍 Venue/Location</label>
              <input type="text" name="venue" value={formData.venue} onChange={handleChange} placeholder="e.g., Johannesburg, Pretoria" />
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className="btn" onClick={() => setStep(1)}>← Back</button>
              <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Next →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className={styles.step}>
            <h3>Your Contact Information</h3>
            <p>We'll use this to send you a personalized quote</p>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label>👤 Full Name <span className={styles.required}>*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className={styles.formGroup}>
                <label>📞 Phone <span className={styles.required}>*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>✉️ Email <span className={styles.required}>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <div className={styles.formGroup}>
              <label>💭 Tell us about your vision</label>
              <textarea name="event_description" value={formData.event_description} onChange={handleChange} rows={4} placeholder="Describe your dream event..." />
            </div>
            
            <div className={styles.formGroup}>
              <label>🔍 How did you hear about us?</label>
              <select name="referral_source" value={formData.referral_source} onChange={handleChange}>
                <option value="">Select an option</option>
                <option value="Google">Google</option>
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="Referral">Friend/Family Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className={styles.buttonGroup}>
              <button type="button" className="btn" onClick={() => setStep(2)}>← Back</button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry ✨'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
