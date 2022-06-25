import { useRouter } from 'next/router';
import { isRestrictedPath } from '@/lib/auth'

import { 
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';

const restrictedPaths = [ 'edit', 'withdraw' ];

const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const router = useRouter();
  const { query, asPath } = router;
  const { slug } = query
  const [ isAuth, setAuth ] = useState();

  useEffect(() => {
    if (slug) {
      checkUserAccess(slug, res => setAuth(res))
      if (!isAuth && restrictedPath(asPath)) {
        router.push('/')
      }
    } else { if (isAuth) setAuth(false) }
  }, [ isAuth, asPath, slug, router ])

  const contextValue = useMemo(() => {
    return [ isAuth, setAuth ]
  }, [ isAuth, setAuth ]);

  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
   return useContext(AuthContext);
}

async function checkUserAccess(slug, callback) {
  if (!slug) return false;

  try {
    const res  = await fetch(`/api/auth/check?slug=${slug}`)
    return callback((res.status === 200))
  } catch { return callback(false) }
}

function restrictedPath(path) {
  try {
    const endpoint = path.split('/').pop()
    return restrictedPaths.includes(endpoint)
  } catch(e) { console.error(e); return false }
}