import styles from './styles.module.css'
import { FaGithub } from 'react-icons/fa'

export default function FootBar() {
  return (
    <>
      <footer className={styles.footer}>
        <a
          href="https://github.com/cmdruid/lightning-tip-jar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Powered by plebs</p> <FaGithub size={25}/>
        </a>
      </footer>
      <div className={styles.printfooter}>
        <p className={styles.printfooterHeadline}>
          Powered by sats4.tips
        </p>
        <p className={styles.printfooterSubheadline}>
          Visit <span className={styles.printfooter_link}>https://sats4.tips</span> to get your own tip jar.
        </p>
      </div>
    </>
  )
}
