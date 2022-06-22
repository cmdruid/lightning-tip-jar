import { useState }   from 'react'
import { useRouter }  from 'next/router'
import Typed          from "react-typed"

import styles         from './styles.module.css'
import { sanitize }   from '@/lib/utils'
import Loading        from '@/components/Widgets/Loading'

export default function SlugForm() {
  const router = useRouter()
  const [ input, setInput ]   = useState('')
  const [ status, setStatus ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (!input) return setStatus('You must enter a name!')

    const slug = sanitize(input)
    setStatus('loading')

    const data = await fetch(`/api/account/check?slug=${slug}`)
      .then(res => res.json())
      .catch(e => setStatus('Something went wrong! please try again.'))

    if (data?.isAvailable) {
      return router.push(`/${slug}`)
    }

    return setStatus(`That name is not available! Try a different name.`)
  }

  return (
    <>
      <form onSubmit={ e => handleSubmit(e) } className={styles.form}>
        <Typed
          strings={['Shiners Saloon', 'Satoshi Steakhouse', 'Nakamoto Bank']}
          typeSpeed={150}
          attr="placeholder"
          loop
        >
          <input 
            className={styles.input} 
            type="text" 
            value={input} 
            onChange={ e => setInput(e.target.value) }
          />
        </Typed>
        <button type='submit' className={styles.submitButton}>Create Tips Page</button>
      </form>
      { status === 'loading'
        ? <Loading />
        : <p className={styles.statusMsg}>{status}</p>
      }
    </>
  )
}