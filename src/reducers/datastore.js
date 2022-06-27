
export const initialState = {
  data   : null,
  status : null,
  err    : null,
  init   : false
};

export function dataReducer(state, action) {
  switch (action.type) {

    case 'set_state':
      console.log('set_state', state, action.value)
      return {
        ...state,
        ...action.value
      }

    case 'set_init':
      return { 
        ...state, 
        init: action.value
      }
    
    case 'set_status':
      console.log('set_status', state, action.value)
      return {
        ...state,
        status: action.value
      }
  }
};

export async function fetchData({ endpoint, dispatch }) {

  let data   = null, 
      status = null, 
      err    = false;

  dispatch({
    type: 'set_state', 
    value: { data, status, err }
  })

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
      type: 'set_state', 
      value: { data, status, err }
    })
  }
}

// (/^\[\d+\]$/).test(data)
