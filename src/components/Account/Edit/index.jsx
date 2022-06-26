import { useState }   from 'react';
import { useRouter }  from 'next/router';

import styles from './styles.module.css'

import { 
  parseFormData, 
  submitData 
} from '@/lib/utils'

import { 
  infoFields,
  contactFields,
  stylesFields 
} from './formFields'
import { useThemeContext } from '../../../context/ThemeContext';

export default function AccountEdit({ account, setAccount }) {
  const router   = useRouter();
  const { slug } = router.query;
  const { setStyles, setTheme }  = useThemeContext()
  const [ statusMsg, setStatus ] = useState('')

  function handleReset() {
    setStyles(account.styles, setTheme)
    router.reload(window.location.pathname)
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const data = parseFormData(e.target);

    data.fgColor1 = data.fgColor1 + 'dd'

    submitData(data, '/api/account/update', (err, res) => {
      if (err) {
        setStatus(err || 'Something happened! Please try again.')
      } else { 
        setAccount(res)
        window.location = `/${slug}`
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Page Profile
        </h2>
        <p className={styles.description}>
          Change your account settings below, then press &apos;Update Account&apos; when finished.
        </p>
      </div>
      <div className={styles.statusBox}>
        <p className={styles.statusMsg}>
          {statusMsg}
        </p>
      </div>
      <form className={styles.form} onSubmit={ e => handleSubmit(e) }>
        {account.slug && <Fields account={ account }/>}
        <input type='hidden' name='slug' value={slug} />
        <div className={styles.btnrow}>
          <button className={styles.submitBtn} type='submit'>
            Update Account
          </button>
          <button 
            className={styles.resetBtn} 
            type='button'
            onClick={handleReset}
            >
            Reset Changes
          </button>
        </div>
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
            prefix={ 'info' } 
            field={ field } 
            key={ field.key } 
            val={ account.info?.[field.key] }
          />
        })
      }
      {
        contactFields.map(field => {
          return <FormField
            prefix={ 'contact' } 
            field={ field } 
            key={ field.key } 
            val={ account.contact?.[field.key] }
          />
        })
      }
      {
        stylesFields.map(field => {
          return <FormField
            prefix={ 'styles' } 
            field={ field } 
            key={ field.key } 
            val={ account.styles?.[field.key] }
          />
        })
      }
    </>
  )
}

function FormField({ prefix, field, val = '' }) {
  const initValue = field.value || val || field.default || '';
  const { setStyles, setTheme } = useThemeContext()
  const [ input, setInput ] = useState(initValue)

  function handleChange(value) {
    if (prefix === 'styles') {
      setStyles({ [field.key]: value }, setTheme)
    }
    setInput(value)
  }

  return (
    <div className={[styles.formfield, styles[field.class], styles[field.type]].join(' ')}>
      <label>{field.label}</label>
      <div className={styles.inputrow}>
        { field.type === 'textarea' 
          ? <textarea 
              name={`${prefix}.${field.key}`}
              rows="4" cols="30"
              value={input}
              onChange={ e => setInput(e.target.value) }
            />
          : field.type === 'file'
            ? <input 
                name={`${prefix}.${field.key}`}
                type={field.type}
              />
              : <input 
                  name={`${prefix}.${field.key}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={input} 
                  onChange={e => handleChange(e.target.value)}
                />
        }
        { field.default && 
          <div 
            className={styles.defaultBtn}
            onClick={() => handleChange(field.default)}
          >
            Default
          </div>
        }  
      </div>
    </div>
  )
}