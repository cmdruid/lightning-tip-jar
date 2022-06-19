import styles from './styles.module.css'
import LogoHeader  from '@/components/Widgets/LogoHeader'
import LoginWidget from '@/components/Widgets/LoginWidget';

export default function AccountClaim({ slug, user }) {

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
            <FormComponent user={ user } slug={ slug }/>
          </>
        }

      </main>
    </div>
  )
}

function FormComponent({ user, slug }) {

  async function submitForm(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target))

    formData.slug  = slug
    formData.adminKey = user.key

    console.log(formData)

    fetch('/api/account/createAccount', { 
      body: JSON.stringify(formData), 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => { if (res.status === 200) window.location.reload(); })
    .catch(err => { console.log(err); router.push('/error'); })
  }

  return (
    <form onSubmit={submitForm} className={styles.form}>
      <label className={styles.label}>Title</label>
      <input className={styles.input} type="text" name="title" placeholder="Enter your tip jar page title" />
      <label className={styles.label}>Description</label>
      <input className={styles.input} type='text' name="description" placeholder="Enter your tip jar page description" />
      <button type="submit" className={styles.submitButton}>Submit</button>
    </form>
  )
}
