export const openForm = () => {
  return {
    type: 'OPEN_FORM'
  }
}

export const closeForm = () => {
  return {
    type: 'CLOSE_FORM'
  }
}

export const formIdle = () => {
  return {
    type: 'FORM_IDLE'
  }
}

export const formInvalid = () => {
  return {
    type: 'FORM_INVALID'
  }
}

export const formFetching = () => {
  return {
    type: 'FORM_FETCHING'
  }
}

export const formFetched = () => {
  return {
    type: 'FORM_FETCHED'
  }
}

export const formFetchingError = (message) => {
  return {
    type: 'FORM_FETCHING_ERROR',
    payload: message
  }
}

