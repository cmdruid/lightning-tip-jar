import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

import styles from './styles.module.css'

export default function FootBar() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link href='/about'>About</Link>
        <span>&#8226;</span>
        <Link href='/contact'>Contact</Link>
        <span>&#8226;</span>
        <Link href='/learn'>Learn More</Link>
      </div>
      <div className={styles.logo}>
        <a
          href="https://github.com/cmdruid/lightning-tip-jar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Powered by plebs <span><FaGithub size={25}/></span></p> 
       </a>
      </div>
      <div className={styles.printfooter}>
        <span className={styles.printfooterHeadline}>
          Powered by sats4.tips
        </span>
        <p className={styles.printfooterSubheadline}>
          Visit <span className={styles.printfooter_link}>https://sats4.tips</span> to get your own tip jar.
        </p>
      </div>
    </footer>
  )
}
