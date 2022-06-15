import styles from './styles.module.css'
import { FaBolt } from 'react-icons/fa'
import { useUserContext } from "@/context/UserContext";

// import { Menu } from '@headlessui/react'
import { AiOutlineMenu }  from 'react-icons/ai'
import { forwardRef } from 'react'
import Link from 'next/link'
  
export default function TopBar() {

  const [ user, setUser ] = useUserContext();

  if (!(user && user.key)) return

  return (
    <div className={styles.topbar}>
      <div className={styles.start}>
        <FaBolt className={styles.logoIcon} size={35} />
        <p className={styles.loginText}>
          {`Logged in as ${user.key.slice(-6)}`}
        </p>
      </div>
      <div className={styles.mid}></div>
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

const MyLink = forwardRef(function fref(props, ref) {
  let { href, children, ...rest } = props
  return (
    <Link href={href}>
      <a ref={ref} {...rest}>
        {children}
      </a>
    </Link>
  )
})