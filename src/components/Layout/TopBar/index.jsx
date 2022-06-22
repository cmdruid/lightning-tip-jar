import { useRouter } from 'next/router'
import { FaBolt }    from 'react-icons/fa'

import styles from './styles.module.css'
import SearchBar from './SearchBar'
import DropDown  from './DropDown'

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
        <SearchBar />
      </div>
      <div className={styles.end}>
        <DropDown />
      </div>
    </div>
  )
}


