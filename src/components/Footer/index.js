import Head from 'next/head'
import styles from './styles.module.css'
import { FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
      <footer className={styles.footer}>
        <a
          href="https://github.com/cmdruid/lightning-tip-jar"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Powered by plebs</p> <FaGithub size={25}/>
        </a>
      </footer>
  )
}
