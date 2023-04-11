import React from 'react'
import { NavLink } from 'react-router-dom'
import { ModestProduct } from '../../../types/product'
import { cartStore } from '../../../store/cart-store'

type Props = {
  item: ModestProduct
}

export const ProductItem = ({ item }: Props) => {
  return (
    <div className="col-md-4">
      <figure className="card card-product-grid">
        <div className="img-wrap">
          <span className="badge badge-danger"> NEW </span>
          <img style={{ objectFit: 'contain' }} src={item.photo || '/images/items/1.jpg'} alt=""/>
        </div>
        <figcaption className="info-wrap">
          <div className="fix-height">
            <NavLink to={`/products/${item.id}`} className="title">{item.title}</NavLink>
            <div className="price-wrap mt-2">
              <span className="price">${item.price}</span>
              {(item.old_price) ?
                (
                  <del className="price-old">${item.old_price}</del>
                ) : null
              }

            </div>
          </div>
          <button onClick={() => cartStore.addToCart(item.id)} className="btn btn-block btn-primary">
            Add to cart
          </button>
        </figcaption>
      </figure>
    </div>
  )
}


