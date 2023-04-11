import React from 'react'
import { useProduct } from '../../../hooks/useProduct'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display'

type Props = {
  productId: number
}

export const Product = ({ productId }: Props) => {
  const { product, error, isLoading } = useProduct(productId)

  if (isLoading) return <Loader/>
  if (error) return <ErrorDisplay error={error}/>

  return (
    <li className="col-md-4 mb-3">
      <figure className="itemside  mb-3">
        <div className="aside">
          <img src={product?.photo || ''} style={{ objectFit: 'contain' }} className="img-md border" alt="Photo"/>
        </div>
        <figcaption className="info align-self-center">
          <p className="title">{product?.title}</p>
          <p className="title">{product?.brand?.title}</p>
          <p className="title">Quantity: {product?.quantity}</p>
          <span className="text-muted">${product?.price}</span>
        </figcaption>
      </figure>
    </li>
  )
}