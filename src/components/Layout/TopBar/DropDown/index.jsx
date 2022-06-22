import Link          from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'

import styles from './styles.module.css'
import { useUserContext }  from '@/context/UserContext'
import { checkUserAccess } from '@/lib/auth'

export default function DropDown() {
  const { slug } = useRouter().query;
  const [ user ] = useUserContext();
  const [ drop, setDrop ] = useState(null)
  const [ isAdmin, setAdmin ] = useState(false);

  useEffect(() => {
    if (slug) {
      checkUserAccess(slug, res => setAdmin(res))
    } else { setAdmin(false) }
  }, [ slug ])

  return (
    <div className={styles.dropdown}>
      <AiOutlineMenu 
        className={styles.menuIcon} 
        size={50} 
        onClick={() => { setDrop(!drop)} }
      />
      { drop !== null 
        &&  <DropContent 
              drop={ drop } 
              setDrop={ setDrop }
              user={ user }
              slug={ slug }
              isAdmin={ isAdmin }
            />
      }
    </div>
  )
}

function DropContent({ drop, setDrop, user, slug, isAdmin }) {

  function getDisplayName(user) {
    return (user?.username)
      ? user.username
      : user.key.slice(-6)
  }

  return (
    <ul 
      className={`${drop ? styles.show : styles.hide}`}
      onClick={() => setDrop(false)}
    >
      { user?.key 
        && <li><p>{`Logged in as: ${getDisplayName(user)}`}</p></li>
      }
      { user?.key 
        && <li><Link href='/profile'><p>View Profile</p></Link></li>
      }
      { isAdmin 
        && <li><Link href={`/${slug}/edit`}><p>Edit Page</p></Link></li>
      }
      { isAdmin 
        && <li><Link href={`/${slug}/withdraw`}><p>Withdraw Funds</p></Link></li>
      }
      <li>
        <ConnectBtn user={ user } />
      </li>
    </ul>
  )
}

function ConnectBtn({ user }) {
  const btnText = user?.key ? 'Logout' : 'Login'
  const btnHref = user?.key ? '/api/auth/logout' : '/login'
  return (
    <Link href={btnHref} passHref>
      <button type='submit' className={styles.connectBtn}>{btnText}</button>
    </Link>
  )
}