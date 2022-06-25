import styles from './styles.module.css'

export default function AccountProfile({ info }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{info.title}</h1>
      <div className={styles.info}>
        <p className={styles.description}>{info.description}</p>
        { info.location
        && <p className={styles.location}>{info.location}</p>
      }
      </div>
      
    </div>
  )
}