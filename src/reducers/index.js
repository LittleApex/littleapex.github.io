const initialState = {
  popupState: 'closed',
  formStatus: 'idle',
  serverMessage: ''
}

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case 'OPEN_FORM':
      return {
        ...state,
        popupState: 'opened'
      }

    case 'CLOSE_FORM':
      return {
        ...state,
        popupState: 'closed'
      }

    case 'FORM_IDLE':
      return {
        ...state,
        formStatus: 'idle'
      }

    case 'FORM_INVALID':
      return {
        ...state,
        formStatus: 'invalid'
      }

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