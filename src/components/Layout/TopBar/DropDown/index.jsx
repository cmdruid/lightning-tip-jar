import Link          from 'next/link'
import { useRouter } from 'next/router'
import { useState }  from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import styles from './styles.module.css'
import { useUserContext }  from '@/context/UserContext'
import { useAuthContext }  from '@/context/AuthContext'
import { useEffect } from 'react'

export default function DropDown() {
  const [ drop, setDrop ] = useState(null)

  return (
    <div className={styles.dropdown}>
      <AiOutlineMenu 
        className={styles.menuIcon} 
        size={50} 
        onClick={() => { setDrop(!drop)} }
      />
      { drop !== null &&  <DropContent drop={ drop } setDrop={ setDrop } /> }
    </div>
  )
}

function DropContent({ drop, setDrop }) {
  const [ user ]   = useUserContext();
  const [ isAuth ] = useAuthContext();

  return (
    <ul 
      className={`${drop ? styles.show : styles.hide}`}
      onClick={() => setDrop(false)}
    >
      { user?.key && <UserLinks user={ user } /> }
      { isAuth && <AdminLinks /> }
      <ConnectBtn user={ user } />
    </ul>
  )
}

function UserLinks({ user }) {
  function getDisplayName(user) {
    return (user?.username)
      ? user.username
      : 'Anonymous'
  }
  return (
    <>
      <li>
        <div className={styles.userbox}>
          <p className={styles.userlabel}>Username</p>
          <p className={styles.username}>{getDisplayName(user)}</p>
        </div>
      </li>
      <Link href='/profile'><li><p>View Profile</p></li></Link>
    </>
  )
}

function AdminLinks() {
  const { query, pathname } = useRouter();
  const endpoint = pathname.split('/').pop()

  return (
    <>
      { endpoint !== 'edit' 
        && <Link href={`/${query.slug}/edit`}><li><p>Edit Page</p></li></Link>
      }
      { endpoint !== 'withdraw'
        && <Link href={`/${query.slug}/withdraw`}><li><p>Withdraw Funds</p></li></Link>
      }
      { query.slug && endpoint !== '[slug]'
        && <Link href={`/${query.slug}`}><li><p>Go Back</p></li></Link>
      }
    </>
  )
}

function ConnectBtn({ user }) {
  const btnText = user?.key ? 'Logout' : 'Login'
  const btnHref = user?.key ? '/api/auth/logout' : '/login'
  return (
    <li>
      <Link href={btnHref} passHref>
        <button type='submit' className={styles.connectBtn}>{btnText}</button>
      </Link>
    </li>
  )
}