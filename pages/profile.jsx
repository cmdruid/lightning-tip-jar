import { useRouter }      from 'next/router';
import { useUserContext } from '@/context/UserContext'
import UserProfile        from '@/components/User/Profile'

export default function ProfilePage() {
  const router = useRouter();
  const [ state, dispatch ] = useUserContext();

  console.log('profile', state)

  // if (!user.key) {
  //   router.push('/');
  // }

  return (
    <UserProfile state={ state } dispatch={ dispatch } />
  )
}