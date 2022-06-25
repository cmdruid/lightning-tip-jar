import { useRouter } from 'next/router';

import { 
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';

const AccountContext  = createContext();

export function AccountWrapper({ children }) {
  const router = useRouter();
  const { slug } = router.query;
  const [ account, setAccount ] = useState();

  useEffect(() => {
    if (slug) {
      if (slug !== account?.slug) {
        setAccount(null)
        getAccount(slug, setAccount)
      }
    }
  }, [ slug, account?.slug ])

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