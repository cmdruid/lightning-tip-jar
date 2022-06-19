import Link          from 'next/link'
import { useRouter } from 'next/router';
import { useState }  from 'react';
import { FaBolt }    from 'react-icons/fa'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'

import styles from './styles.module.css'
import { useUserContext }    from "@/context/UserContext";
import { useAccountContext } from "@/context/AccountContext";

export default function TopBar() {
  const router = useRouter();

  return (
    <div className={styles.topbar}>
      <div className={styles.start}>
        <FaBolt 
          className={styles.logoIcon}
          onClick={() => router.push('/')}
          size={35}
        />
      </div>
      <div className={styles.mid}>
        <SearchBar router={ router }/>
      </div>
      <div className={styles.end}>
        <Dropdown />
      </div>
    </div>
  )
}

function SearchBar({ router }) {
  const { pathname } = router;
  const [ account, setAccount ] = useAccountContext();
  const [ inputData, setInputData ] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    setInputData('')
    setAccount({})
    router.push(`/${inputData}`)
  }

  return (
    <form 
      className={styles.searchContainer}
      onSubmit={handleSubmit}
    >
      <input 
        className={styles.searchInput} 
        type="text" value={inputData} 
        onChange={(e) => setInputData(e.target.value)}
        placeholder={'search for a tips page ...'}
      />
      <button 
        className={styles.searchBtn}
        type='submit'
      >
        <AiOutlineSearch
          className={styles.searchIcon}
          size={25}
        />
      </button>
    </form>
  )
}

function Dropdown() {
  const [ drop, setDrop ] = useState(null);

  return (
    <div className={styles.dropdown}>
      <AiOutlineMenu 
        className={styles.menuIcon} 
        size={50} 
        onClick={() => { setDrop(!drop)} }
      />
      {drop !== null && <DropContent drop={ drop } setDrop={ setDrop }/>}
    </div>
  )
}

function DropContent({ drop, setDrop }) {
  const [ state ]   = useUserContext();
  const [ account ] = useAccountContext();

  const { data: user } = state || {};
  const isAcctAdmin = (account.adminKey && user.key === account.adminKey)

  let displayName;

  const getDisplayName = state => {
    let { data: user } = state;
    return (user && user.username) ? user.username : user.key.slice(-6)
  }

  return (
    <ul 
      className={`${drop ? styles.show : styles.hide}`}
      onClick={() => setDrop(false)}
    >
      { user.key 
        && <li><p>{`Logged in as: ${state.data.username}`}</p></li>
      }
      { user.key 
        && <li><Link href='/profile'><p>View Profile</p></Link></li>
      }
      { isAcctAdmin 
        && <li><Link href={`/${account.slug}/edit`}><p>Edit Page</p></Link></li>
      }
      { isAcctAdmin 
        && <li><Link href={`/${account.slug}/withdraw`}><p>Withdraw Funds</p></Link></li>
      }
      <li>
        <ConnectBtn user={ user } />
      </li>
    </ul>
  )
}

function ConnectBtn({ user }) {
  const btnText = user.key ? 'Logout' : 'Login'
  const btnHref = user.key ? '/logout' : '/login'
  return (
    <Link href={btnHref} passHref>
      <button type='submit' className={styles.connectBtn}>{btnText}</button>
    </Link>
  )
}

// function ProfileLink({ user }) {
//   const btnText = user.key ? 'Logout' : 'Login'
//   const btnHref = user.key ? '/api/auth/logout' : '/api/test/fakelogin'
//   return (
    
//   )
// }
