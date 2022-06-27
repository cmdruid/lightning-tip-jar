import { useState }   from 'react';
import styles         from './styles.module.css'
import { submitData } from '@/lib/utils';
import { useUserContext } from '@/context/UserContext'

const fields = [ 
  { label: 'username', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'email', type: 'email', placeholder: 'used for account recovery ...'}
];

export default function UserProfile() {
  const [ statusMsg, setStatus ] = useState('');
  const [ user, setUser ] = useUserContext();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target))

    submitData(data, '/api/user/update', (err, data) => {
      if (!err) return setUser(data)
      console.error('/api/user/update', err)
      return setStatus('Something went wrong! Please try again.')
    })
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        User Profile
      </h2>
      <p className={styles.description}>
        Change your profile settings below, then press &apos;Update Profile&apos; when finished.
      </p>
      <div className={styles.msgBox}>
        <p className={styles.statusMsg}>
          {statusMsg}
        </p>
      </div>
      <form className={styles.form} onSubmit={ e => handleSubmit(e) }>
        {user.key && fields.map(field => {
          return <FormField 
            field={ field } 
            key={ field.label } 
            val={ user[field.label] }
          />
        })}
        <button 
          className={styles.submitBtn} 
          type='submit'
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}

function FormField({ field, val = '' }) {
  const [ input, setInput ] = useState(val)
  return (
    <div className={styles.formfield}>
      <label>{field.label}</label>
      <input 
        name={field.label}
        type={field.type}
        placeholder={field.placeholder}
        value={input} 
        onChange={ e => setInput(e.target.value) }/>
    </div>
  )
}