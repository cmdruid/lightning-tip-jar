import styles from './styles.module.css'

export default function MerchantHeader({title, desc}) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{desc}</p>
    </div>
  )
}