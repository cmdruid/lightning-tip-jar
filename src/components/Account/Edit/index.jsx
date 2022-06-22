import { useState }   from 'react';
import styles         from './styles.module.css'
import { submitData } from '@/lib/utils'
import { useRouter }  from 'next/router';

import { 
  infoFields, 
  stylesFields 
} from './formFields'

// background-image: linear-gradient( 135deg,  10%,  100%);
// background-color: ;

export default function AccountEdit({ account, setAccount }) {
  const router = useRouter();
  const { slug } = router.query;
  const [ statusMsg, setStatus ] = useState('')

  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))

    submitData(data, '/api/account/update', (err, res) => {
      if (err || !res?.slug) {
        console.error(err, res)
        return setStatus('Something happened! Please try again.')
      }
      console.log(res)
      setAccount(res)
      return router.push(`/${res.slug}`)
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Account Profile
      </h2>
      <p className={styles.description}>
        Change your account settings below, then press &apos;Update Account&apos; when finished.
      </p>
      <div className={styles.statusBox}>
        <p className={styles.statusMsg}>
          {statusMsg}
        </p>
      </div>
      <form className={styles.form} onSubmit={ e => handleSubmit(e) }>
        {account.slug && <Fields account={ account }/>}
        <input type='hidden' name='slug' value={slug} />
        <button 
          className={styles.submitBtn} 
          type='submit'
        >
          Update Account
        </button>
      </form>
    </div>
  )
}

function Fields({ account }) {
  return (
    <>
      {
        infoFields.map(field => {
          return <FormField 
            field={ field } 
            key={ field.key } 
            val={ account.info?.[field.key] }
          />
        })
      }
      {
        stylesFields.map(field => {
          return <FormField 
            field={ field } 
            key={ field.key } 
            val={ account.styles?.[field.key] }
          />
        })
      }
    </>
  )
}

function FormField({ field, val = '' }) {
  const initValue = field.value || val || field.default || '';
  const [ input, setInput ] = useState(initValue)
  return (
    <div className={[styles.formfield, styles[field.class], styles[field.type]].join(' ')}>
      <label>{field.label}</label>
      { field.type === 'textarea' 
        ? <textarea 
            name={field.key}
            rows="4" cols="30"
            value={input}
            onChange={ e => setInput(e.target.value) }
          />
        : field.type === 'file'
          ? <input 
              name={field.key}
              type={field.type}
            />
          : <input 
              name={field.key}
              type={field.type}
              placeholder={field.placeholder}
              value={input} 
              onChange={ e => setInput(e.target.value) }
            />
      }
    </div>
  )
}