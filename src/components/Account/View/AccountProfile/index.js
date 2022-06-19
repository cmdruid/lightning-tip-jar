import styles from './styles.module.css'

export default function AccountProfile({ data, editMode }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{data.title}</h1>
      <p className={styles.description}>{data.desc}</p>
    </div>
  )
}