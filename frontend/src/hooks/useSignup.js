import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (firstName, lastName, email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      //save the user to local storage
      //if window is closed and reopened, that json web token will still be stored, and the user will be kept logged in
      //email and token will be stored in localStorage in this case as the response
      localStorage.setItem('user', JSON.stringify(json))

      //update the auth context
      dispatch({type: 'LOGIN', payload: json})

      //update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}