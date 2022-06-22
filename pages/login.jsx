import { useRouter } from 'next/router'

import styles      from '@/styles/page.module.css'
import LogoHeader  from '@/components/Widgets/LogoHeader'
import LoginWidget from '@/components/Widgets/LoginWidget'
import { useUserContext } from '@/context/UserContext'

export default function LoginPage() {
  const router   = useRouter();
  const { user } = useUserContext();

  if (user?.key) router.push('/profile');

  return (
    <div className={styles.container}>
      <LogoHeader />
      <LoginWidget user={ user }/>
    </div>
  )
}