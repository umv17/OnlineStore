import { useCallback, useState } from 'react'
import { IRegistrationForm } from '.'
import { api } from '../../../api'
import { CUSTOMER_TOKEN_KEY } from '../../../store/cart-store'

export const useRegistration = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const submitRegistration = useCallback((data:IRegistrationForm) => {
    setIsLoading(true)
    return api.post('/customer/registration/', { ...data, token: localStorage.getItem(CUSTOMER_TOKEN_KEY) })
      .catch(error => {
        setError(error?.response.data.username)
        return null
      })
      .finally(() => setIsLoading(false))
  }, [])
  return {
    submitRegistration,
    isLoading,
    error
  }
}
