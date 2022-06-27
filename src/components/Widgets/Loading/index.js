import styles  from './styles.module.css'
import Spinner from './Spinner'

export default function Loading() {

  return (
    <div className={styles.loadContainer}>
      <Spinner />
      <p className={styles.loadText}>Loading ...</p>
    </div>
  )
}