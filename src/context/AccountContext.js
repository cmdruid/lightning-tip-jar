import { useAccount } from '@/hooks/useAPI'

import { 
  createContext,
  useContext,
  useState, 
  useMemo 
} from 'react';

const AccountContext = createContext();

export function AccountWrapper({ children }) {
  const [ account, setAccount ] = useState({});

  const { data, isLoading, isError } = useAccount()

  if (data?.slug && data.slug !== account?.slug) setAccount(data)

  const contextValue = useMemo(() => {
    return [ account, setAccount ];
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