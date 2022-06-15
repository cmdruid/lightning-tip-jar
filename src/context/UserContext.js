import useSWR      from 'swr'
import { fetcher } from '@/lib/utils'

import { 
  createContext, 
  useContext, 
  useState, 
  useMemo 
} from "react";

const UserContext = createContext();

export function UserWrapper({ children }) {
   const [ user, setUser ] = useState({});

   const { data, error } = useSWR('/api/auth/user', fetcher)

   if (data?.user && data.user !== user) setUser(data.user)

   const contextValue = useMemo(() => {
      return [ user, setUser ];
   }, [ user, setUser ]);

   return (
    <UserContext.Provider value={contextValue}>
        {children}
    </UserContext.Provider>
   );
}

export function useUserContext() {
   return useContext(UserContext);
}