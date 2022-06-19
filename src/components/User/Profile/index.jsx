import { useState }   from 'react';
import styles         from './styles.module.css'
import { submitForm } from '@/lib/utils.mjs';

const fields = [ 
  { label: 'username', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'email', type: 'email', placeholder: 'used for account recovery ...'}
];

export default function UserProfile({ state, dispatch }) {

  const { data: user } = state || {}

  const handleSubmit = e => {
    submitForm(e, '/api/user/update', json => {
      console.log('callback', json)
      dispatch({ type: 'set_data', value: { data: json }})
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