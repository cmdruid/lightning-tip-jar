import styles from './styles.module.css'
import { useUserContext } from "@/context/UserContext";
  
export default function TopBar() {

  const [ user, setUser ] = useUserContext();

  return (
    <>
      {
        user && user.key && (
          <div className={styles.topbar}>
            <menu>
              <p>{`Welcome ${user.key}`}</p>
            </menu>
          </div>
        )
      }
    </>
  )
}