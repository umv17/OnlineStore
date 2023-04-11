import React from 'react'
import { Product } from './product'
import { Order } from '../../../types/orders-list'

type Props = {
  order: Order | undefined
}

export const ProductsList = ({ order }: Props) => {
  return (
    <>
      <div className="card-body mb-0 pb-0">
        <h5 className="text-muted">Products list</h5>
      </div>
      <div className="card-body mt-0 pt-0">
        <hr/>
        <ul className="row">
          {order?.products.map(product => <Product key={product.product_id} productId={product.product_id}/>)}
        </ul>
      </div>
    </>
  )
}