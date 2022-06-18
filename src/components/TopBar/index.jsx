import Link          from 'next/link'
import Typed         from 'react-typed';
import { useRouter } from 'next/router';
import { FaBolt }    from 'react-icons/fa'
import styles        from './styles.module.css'
import { useUserContext } from "@/context/UserContext";
import { useState, forwardRef } from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'

  
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

function MyLink() { 
  return forwardRef(function fref(props, ref) {
    let { href, children, ...rest } = props
    return (
      <Link href={href}>
        <a ref={ref} {...rest}>
          {children}
        </a>
      </Link>
    )
  })
}

function SearchBar({ router }) {
  const { pathname } = router;
  const [ inputData, setInputData ] = useState()

  const handleSubmit = e => {
    e.preventDefault()
    setInputData('')
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
  const [ user, setUser ] = useUserContext({});
  const [ drop, setDrop ] = useState(null);

  return (
    <div className={styles.dropdown}>
      <AiOutlineMenu 
        className={styles.menuIcon} 
        size={50} 
        onClick={() => { setDrop(!drop)} }
      />
      {drop !== null && <DropContent drop={ drop } user={ user } />}
    </div>
  )
}


function DropContent({ drop, user }) {
  return (
  <ul className={`${drop ? styles.show : styles.hide}`}>
    <li>
      {user.key && <p>{`Logged in as: ${user.key.slice(-6)}`}</p>}
    </li>
    <li>
      {user.key && <Link href='/user'><p>View Profile</p></Link>}
    </li>
    <li>
      <ConnectBtn user={ user } />
    </li>
  </ul>
  )
}

function ConnectBtn({ user }) {
  const btnText = user.key ? 'Logout' : 'Login'
  const btnHref = user.key ? '/api/auth/logout' : '/api/test/fakelogin'
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
