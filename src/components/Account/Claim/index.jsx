import { useRouter } from 'next/router';

import styles      from './styles.module.css'
import ClaimForm   from './ClaimForm';
import LogoHeader  from '@/components/Widgets/LogoHeader'
import LoginWidget from '@/components/Widgets/LoginWidget';
import { useUserContext } from '@/context/UserContext';

export default function AccountClaim() {
  const { slug } = useRouter().query;
  const [ user ] = useUserContext();

  return (
    <div className={styles.container}>
      <LogoHeader slug={ slug }/>
      <h1 className={styles.title}>This space is available!</h1>
      { !user.key && 
        <>
          <p className={styles.description}>
            You need to login before claiming this space.
          </p>
          <LoginWidget redirect={ slug }/>
        </> 
      }
      { user.key &&
        <>
          <p className={styles.description}>
            Fill out the form below to claim this space and setup your tip jar.
          </p>
          <ClaimForm />
        </>
      }
    </div>
  )
}

