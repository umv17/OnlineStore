import { useCallback, useEffect, useState } from 'react'
import { api } from '../../../api'
import { Order } from '../../../types/orders-list'

export const useUsersOrders = () => {
  const [ordersList, setOrdersList] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const loadUsersOrders = useCallback(() => {
    setIsLoading(true)
    return api.get<Order[]>('/customer/myorders/')
      .then(res => {
        setOrdersList(res.data)
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    loadUsersOrders().then()
  }, [])

  return {
    ordersList,
    isLoading,
    error
  }
}