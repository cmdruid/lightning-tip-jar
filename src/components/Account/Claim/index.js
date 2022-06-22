import styles from './styles.module.css'
import LogoHeader  from '@/components/Widgets/LogoHeader'
import LoginWidget from '@/components/Widgets/LoginWidget';
import { submitData } from '@/lib/utils' 
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '@/context/UserContext';

export default function AccountClaim({ setAccount }) {
  const router   = useRouter();
  const { slug } = router.query;
  const [ user ] = useUserContext();

  return (
    <div>
      <main>
        <LogoHeader slug={ slug }/>
        <h1 className={styles.title}>This space is available!</h1>
        { !user.key && 
          <>
            <p className={styles.description}>
              You need to login before claiming this space.
            </p>
            <p className={styles.description}>
              Use your wallet to scan the image below, or copy / paste the authentication code.
            </p>
            <LoginWidget />
          </> 
        }
        { user.key &&
          <>
            <p className={styles.description}>
              Fill out the form below to claim this space and setup your tip jar.
            </p>
            <FormComponent 
              slug={ slug } 
              router={ router } 
              setAccount={ setAccount }
            />
          </>
        }

      </main>
    </div>
  )
}

function FormComponent({ slug, router, setAccount }) {
  const [ statusMsg, setStatus ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))

    submitData(data, '/api/account/create', data => {
      if (data.error) {
        console.error(err)
        return setStatus('Something went wrong! Please try again.')
      }
      
      setAccount(data)
      return router.push(`/${slug}`)
    })
  }

  return (
    <div className={styles.formContainter}>
      <div className={styles.statusBox}>
        <p className={styles.statusMsg}>
          {statusMsg}
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Title</label>
        <input 
          className={styles.input} 
          type="text" 
          name="title" 
          placeholder="Enter your tip jar page title." 
        />
        <label className={styles.label}>Description</label>
        <textarea 
          className={styles.input} 
          type='text' 
          name="description"
          rows="4" cols="30"
          placeholder="Enter your tip jar page description." 
        />
        <label className={styles.label}>Email</label>
        <input 
          className={styles.input} 
          type='email' 
          name='email' 
          placeholder="Email to use for account recovery." 
        />
        <input type='hidden' name='slug' value={slug} />
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
  )
}
