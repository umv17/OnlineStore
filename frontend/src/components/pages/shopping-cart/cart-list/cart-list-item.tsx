import React, { useState } from 'react'
import { CounterInput } from '../../../shared/counter-input'
import { CartProductInfo } from '../../../../types/cart'
import { cartStore } from '../../../../store/cart-store'
import { useProduct } from '../../../../hooks/useProduct'
import { Loader } from '../../../shared/loader/loader'
import { NavLink } from 'react-router-dom'
import { ErrorDisplay } from '../../../shared/error-display'

type Props = {
  item: CartProductInfo
}

export const CartListItem = ({ item }: Props) => {
  const { product, isLoading, error } = useProduct(item.product)

  const [buyQuantity, setBuyQuantity] = useState(item.quantity)

  if (isLoading)
    return <tr>
      <td style={{ width: '100%' }}><Loader/></td>
    </tr>

  if (error)
    return <ErrorDisplay error={error}/>

  return (
    <tr>
      <td>
        <figure className="itemside align-items-center">
          <div className="aside">
            <img
              alt="" src={product?.photo || ''}
              className="img-sm"
              style={{ objectFit: 'contain' }}/>
          </div>
          <figcaption className="info">
            <NavLink to={`/products/${product?.id}`} className="title text-dark">{product?.title}</NavLink>
            <p className="text-muted small">Brand: {product?.brand.title}</p>
          </figcaption>
        </figure>
      </td>
      <td>
        <CounterInput
          onBlur={async () => {
            await cartStore.updateProduct(item.product, buyQuantity)
            cartStore.loadCart()
          }}
          value={buyQuantity} setValue={setBuyQuantity}
          min={1} max={product?.quantity || 1}/>
      </td>
      <td>
        <div className="price-wrap">
          <var className="price">${(Number(product?.price) || 0) * buyQuantity}</var>
          <small className="text-muted">${product?.price} each</small>
        </div>
      </td>
      <td className="text-right d-none d-md-block">
        <a data-original-title="Save to Wishlist" title="" href="" className="btn btn-light" data-toggle="tooltip">
          Review
        </a>
        <button onClick={() => cartStore.removeProduct(item.product)} className="btn btn-light">Remove</button>
      </td>
    </tr>
  )
}
