import styles       from './styles.module.css'
import SlugForm     from '@/components/Landing/SlugForm'
import CallToAction from '@/components/Landing/CallToAction'

export default function Landing() {

  return (
    <div className={styles.container}>
      
      <div className={styles.heroSection}>
        <p className={styles.title}>Your own personalized space for <br/>collecting tips in Bitcoin.</p>
        <SlugForm />
      </div>
      <div className={styles.ctaSection}>
        <CallToAction />
      </div>
    </div>
  )
}

