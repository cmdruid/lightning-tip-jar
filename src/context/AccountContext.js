import { useRouter } from 'next/router';

import { 
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo
} from 'react';

import { useThemeContext } from './ThemeContext';

const AccountContext  = createContext();

export function AccountWrapper({ children }) {
  const router = useRouter();
  const { slug } = router.query;
  const { setStyles, setTheme } = useThemeContext();
  const [ account, setAccount ] = useState(null);

  

  useEffect(() => {
    function setAccountHandler(data) {
      const { styles, err } = data
      if (!err) setAccount(data)
      if (styles) setStyles(styles, setTheme)
    }

    if (slug) {
      if (slug !== account?.slug) {
        setAccount(null)
        getAccount(slug, setAccountHandler)
      }
    }
  }, [ slug, account?.slug, setStyles, setTheme ])

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
  } catch(err) { console.error(err); callback({ err }) }
}