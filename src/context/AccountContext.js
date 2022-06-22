import { useRouter } from 'next/router';

import { 
  checkUserAccess,
  isRestrictedPath
} from '@/lib/auth'

import { 
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';

const restrictedPaths = [ 'edit', 'withdraw' ];
const AccountContext  = createContext();

export function AccountWrapper({ children }) {
  const router = useRouter();
  const { query, events } = router;
  const [ account, setAccount ] = useState();
  const { slug } = query

  useEffect(() => {
    if (slug && slug !== account?.slug) {
      console.log('slug', slug)
      setAccount(null)
      getAccount(slug, setAccount)
    }
  }, [ slug, account?.slug ])

  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = url => {
      console.log('slugg', slug, account?.slug)
      if (slug && account?.slug) {
        if (isRestrictedPath(url, restrictedPaths)) {
          if (!checkUserAccess(slug)) {
            router.push(`/${slug}`)
          }
        }
      }
    }

    // Monitor routes
    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  })

  const contextValue = useMemo(() => {
    // Cache and serve custom account object.
    return { 
      account,
      setAccount,
      isError: account?.error,
      isLoading: !account
    }
  }, [ account, setAccount ]);

  return (
    <AccountContext.Provider value={contextValue}>
        {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
   return useContext(AccountContext);
}

async function getAccount(slug, callback) {
  try {
    const res  = await fetch(`/api/account/read?slug=${slug}`),
          json = await res.json();
    return callback(json)
  } catch(error) {
    console.error(error)
    callback({ error })
  }
}