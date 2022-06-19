import { initialState, dataReducer } from '@/reducers/dataReducer'

import { 
  createContext, 
  useContext, 
  useReducer, 
  useMemo, 
  useEffect
} from 'react';

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [ state, dispatch ] = useReducer(dataReducer, initialState);

  console.log('UserContext', state)

  useEffect(() => {
    if (!state?.init) {
      dispatch({ type: 'init' })
      getData({ 
        endpoint:'/api/user/read',
        dispatch 
      })
    }
  }, [ state?.init ])

  const contextValue = useMemo(() => {
    return [ state, dispatch ];
  }, [ state, dispatch ]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
   return useContext(UserContext);
}

export async function getData({ endpoint, dispatch }) {
  let data, status, err = false;

  try {
    if (!(endpoint && dispatch)) {
      throw new Error('Missing params!')
    }
    const response = await fetch(endpoint)
    status = response.status
    data   = await response.json()
  }

  catch(e) { err = e }

  finally { 
    dispatch({ 
      type: 'set_data', 
      value: { data, status, err }
    })
  }
}