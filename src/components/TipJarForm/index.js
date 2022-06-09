import styles from './styles.module.css'

export default function TipJarForm() {

    async function submitForm(e) {
        // Set status to 100 - loading.
        e.preventDefault();
        setStatus(100);
          
        // Post form data to server.
        fetch('/api/submit', { 
          body: JSON.stringify(Object.fromEntries(new FormData(e.target))), 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
        .then(res => setStatus(res.status))
        .catch(err => setStatus(400));
      }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>You have succesfully claimed your tip jar!</h1>
            <p className={styles.description}>Fill out the form below to customize your public tipping page</p>
            <form onSubmit={submitForm} className={styles.form}>
                <label className={styles.label}>Title</label>
                <input className={styles.input} type="text" name="title" placeholder="Enter your tip jar page title" />
                <label className={styles.label}>Description</label>
                <input className={styles.input} type='text' name="description" placeholder="Enter your tip jar page description" />
                <button type="submit" className={styles.submitButton}>Submit</button>
            </form>
        </div>
    )
}