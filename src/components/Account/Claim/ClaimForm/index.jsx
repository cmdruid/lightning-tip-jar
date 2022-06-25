import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from './styles.module.css'
import { submitData } from '@/lib/utils'
import { useAccountContext } from '@/context/AccountContext';


export default function ClaimForm() {
  const router = useRouter();
  const { slug } = router.query;
  const { setAccount } = useAccountContext();
  const [ statusMsg, setStatus ] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))

    submitData(data, '/api/account/create', (err, res) => {
      if (err) {
        return setStatus(err || 'Something happened! Please try again.')
      } else { 
        setAccount(res)
        return router.push(`/${slug}`)
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.statusBox}>
        <p className={styles.statusMsg}>
          {statusMsg}
        </p>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputfield}>
          <label>Page Title</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Enter a title for your new tips page." 
          />
        </div>
        <div className={styles.inputfield}>
          <label>Page Description</label>
          <textarea 
            type='text' 
            name="description"
            rows="4" cols="30"
            placeholder="Enter a brief description about your page." 
          />
        </div>
        <div className={styles.inputfield}>
        <label>Recovery Email</label>
          <input  
            type='email' 
            name='email'
            placeholder="Provide an Email for account recovery." 
          />
        </div>
        <input type='hidden' name='slug' value={slug} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}