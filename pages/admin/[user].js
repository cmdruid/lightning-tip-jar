import styles from '@/styles/Home.module.css'
import { FaGithub } from 'react-icons/fa'

export default function User() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          User page
        </h1>

        <p className={styles.description}>
          Testing the API with our lightning node!
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/cmdruid/lightning-tip-jar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Powered by plebs</p> <FaGithub size={25}/>
        </a>
      </footer>
    </div>
  )
}