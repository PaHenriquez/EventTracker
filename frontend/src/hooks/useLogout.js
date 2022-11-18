import { useAuthContext } from './useAuthContext'
import { useEventsContext } from './useEventsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  //need to update the context below by setting payload to null
  const { dispatch: dispatchEvents } = useEventsContext()

  //don't need to send a request to the backend
  //just need to update global state and delete json web token from local storage
  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user')

    //dispatch logout action
    dispatch({ type: 'LOGOUT' })
    //during logout, we need to clear our global event state in the react application
    //otherwise, buggy frontend ui with previous users' events - they will be stored in global state
    //unless we clear it by setting payload to null 
    dispatchEvents({ type: 'SET_EVENTS', payload: null })
  }

  return { logout }
}