import QuestionnaireForm from '@/components/QuestionnaireForm'
import styles from './questionnaire.module.css'

export default function QuestionnairePage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.intro}>
          <span className="meta">Get Started</span>
          <h1>Plan Your Dream Event</h1>
          <p>Tell us about your vision and we'll create a personalized quote tailored to your needs.</p>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.icon}>⏱️</div>
            <h3>Quick & Easy</h3>
            <p>Complete our 3-step questionnaire in just a few minutes</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>✓</div>
            <h3>Personalized Quote</h3>
            <p>Receive a customized quote based on your specific needs</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.icon}>📞</div>
            <h3>Fast Response</h3>
            <p>Get a response from our team within 24-48 hours</p>
          </div>
        </div>

        <QuestionnaireForm />
      </div>
    </div>
  )
}
