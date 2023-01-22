

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

