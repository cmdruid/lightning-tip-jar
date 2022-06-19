
export const initialState = {
  data   : {},
  status : '',
  err    : false,
  init   : false
};

export function dataReducer(state, action) {
  switch (action.type) {

    case 'init':
      return { ...state, init: true }

    case 'set_data': {
      console.log('set_data', state, action.value)
      return {
        ...state,
        ...action.value
      }
    };
  }
};
