import { useState }   from 'react';
import styles         from './styles.module.css'
import { submitForm } from '@/lib/utils.mjs';

const fields = [
  { label: 'title', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'description', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'logo', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'phone', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'email', type: 'email', placeholder: 'used for account recovery ...'},
  { label: 'location', type: 'email', placeholder: 'used for account recovery ...'},
  { label: 'fgcolor', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'bgcolor', type: 'text', placeholder: 'enter a display name ...'},
  { label: 'txtcolor', type: 'text', placeholder: 'enter a display name ...'}
];

export default function EditProfile({ state, dispatch }) {

  const user = state.data || {}

  const handleSubmit = e => {
    submitForm(e, '/api/user/update', () => {
      dispatch({ type: 'get_update', dispatch })
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