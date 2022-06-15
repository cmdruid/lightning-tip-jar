import useSWR from 'swr'
import { fetcher } from '@/lib/utils'

export default function UserPage() {

  const { data, error } = useSWR('/api/auth/user', fetcher)

  return (
    <div>
      <main style={{justifyContent:'normal'}}>
        <p>User Session Object (stored encrypted on client browser)</p>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <p>Use /api/auth/logout endpoint to clear session.</p>
      </main>
    </div>
  )
}