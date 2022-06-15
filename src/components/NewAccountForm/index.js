import styles from './styles.module.css'
import LogoHeader    from '@/components/LogoHeader'
import { useRouter } from 'next/router'
import { useUserContext } from "@/context/UserContext";

export default function NewAccountForm({slug}) {
  const [ user, setUser ] = useUserContext();
  const router = useRouter()

  async function submitForm(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target))
    formData.slug=slug
    console.log(formData)
    fetch('/api/account/createAccount', { 
      body: JSON.stringify(formData), 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
        if (res.status === 200) {
            window.location.reload();
        }
    })
    .catch(err => {
        console.log(err);
        router.push('/error');
    });
  }

  return (
    <div>
      <main>
        <LogoHeader />
        <h1 className={styles.title}>This space is available!</h1>
        <p className={styles.description}>Fill out the form below to claim this space and setup your tip jar.</p>
        <form onSubmit={submitForm} className={styles.form}>
          <label className={styles.label}>Title</label>
          <input className={styles.input} type="text" name="title" placeholder="Enter your tip jar page title" />
          <label className={styles.label}>Description</label>
          <input className={styles.input} type='text' name="description" placeholder="Enter your tip jar page description" />
          <input className={styles.input} type='hidden' name="adminKey" value={user.key}/>
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </main>
    </div>
  )
}
