import { useRouter } from 'next/router'

export default function LogoutPage() {
  const router = useRouter()
  router.push('/api/auth/logout')
  return
}