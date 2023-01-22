const initialState = {
  formStatus: 'idle',
  serverMessage: ''
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FORM_FETCHING':
      return {
        ...state, 
        formStatus: 'loading'
      }
    case 'FORM_FETCHED':
      return {
        ...state,
        formStatus: 'fetched'
      }
      case 'FORM_FETCHING_ERROR':
        return {
          ...state,
          formStatus: 'error',
          serverMessage: action.payload
        }
    default: return state
  }
}

export default reducer;