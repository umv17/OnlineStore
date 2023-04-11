import { FullProduct } from '../types/product'
import { api } from '../api'
import { useEffect, useState } from 'react'


export const useProduct = (productId: number) => {
  const [product, setProduct] = useState<FullProduct | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let unmounted = false

    const loadProduct = (productKey: number) => {
      setIsLoading(true)
      api.get('/product/get/' + productKey)
        .then(res => {
          !unmounted && setProduct(res.data)
        })
        .catch(error => {
          !unmounted && setError(error.response)
          console.dir(error)
        })
        .finally(() => !unmounted && setIsLoading(false))
    }

    loadProduct(productId)

    return () => {
      unmounted = true
    }
  }, [])

  return { product, isLoading, error }
}
