import { useCallback, useState } from 'react'
import { api } from '../../../api'
import { ILoginForm } from './index'
import { authStore } from '../../../store/auth-store'

type LoginResponse = {
  access: string
  refresh: string
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const submitLogin = useCallback((data: ILoginForm) => {
    setIsLoading(true)
    return api.post<LoginResponse>('/jwt/auth/', data)
      .then(res => {
        authStore.login(res.data.access, res.data.refresh)
        return true
      })
      .catch(error => {
        setError(error?.response?.data?.detail)
        return false
      })
      .finally(() => setIsLoading(false))
  }, [])

  return {
    submitLogin,
    isLoading,
    error
  }
}
