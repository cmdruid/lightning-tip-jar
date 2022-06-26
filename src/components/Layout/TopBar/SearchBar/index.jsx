import { useState }  from 'react'
import { useRouter } from 'next/router';
import { AiOutlineSearch } from 'react-icons/ai'

import styles from './styles.module.css'
import { convertToSlug } from '@/lib/utils'

export default function SearchBar() {
  const router = useRouter()
  const [ inputData, setInput ] = useState('');

  const handleSubmit = e => {
    e.preventDefault()
    let slug = convertToSlug(inputData)
    window.location = (`/${slug}`)
    setInput('')
  }

  return (
    <form 
      className={styles.container}
      onSubmit={handleSubmit}
    >
      <input 
        className={styles.input} 
        type="text" value={inputData} 
        onChange={(e) => setInput(e.target.value)}
        placeholder={'search for a tips page ...'}
      />
      <button 
        className={styles.button}
        type='submit'
      >
        <AiOutlineSearch
          className={styles.icon}
          size={25}
        />
      </button>
    </form>
  )
}