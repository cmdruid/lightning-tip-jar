import Link          from 'next/link'
import { useState }  from 'react';
import { useRouter } from 'next/router';
import { FaBolt }    from 'react-icons/fa'
import styles        from './styles.module.css'
import { useUserContext } from "@/context/UserContext";
import { AiOutlineMenu, AiOutlineSearch }  from 'react-icons/ai'
import { forwardRef }     from 'react'
  
export default function TopBar() {
  const router = useRouter();
  const { slug } = router.query;
  const [ user, setUser ] = useUserContext();

  return (
    <div className={styles.topbar}>
      <div className={styles.start}>
        <FaBolt 
          className={styles.logoIcon}
          onClick={() => router.push('/')}
          size={35}
        />
        {/* <p className={styles.loginText}>
        </p> */}
      </div>
      <div className={styles.mid}>
        {slug && <SearchBar router={ router }/>}
      </div>
      <div className={styles.end}>
        <AiOutlineMenu className={styles.menuIcon} size={50} />
        
        {/* <Menu>
          <Menu.Button>
            
          </Menu.Button>
          <Menu.Items>
            <Menu.Item>
              <MyLink href="/account-settings">Account Settings</MyLink>
            </Menu.Item>
            <Menu.Item>
              <MyLink href="/account-settings">Documentation</MyLink>
            </Menu.Item>
            <Menu.Item disabled>
              <span className="opacity-75">Invite a friend (coming soon!)</span>
            </Menu.Item>
          </Menu.Items>
        </Menu> */}
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

function ConnectBtn() {
  return (
    <Link href="/login" passHref>
      <button type='submit' className={styles.connectBtn}>Register / Login</button>
    </Link>
  )
}
