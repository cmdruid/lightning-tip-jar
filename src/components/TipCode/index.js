import useSWR from 'swr'
import Image  from 'next/image'
import styles from './styles.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function TipComponent() {
  const { data, error } = useSWR('/api/getoffer', fetcher)
  
  if (error) return <div>failed to load!</div>
  if (!data) return <div>loading...</div>
  if (data && !data.item) return <div>Unable to locate item!</div>

  return (
    <div className={styles.div}>
      <p>Filler</p>
    </div>
  )
}