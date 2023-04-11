import React from 'react'
import { NavLink } from 'react-router-dom'
import { CartList } from './cart-list/cart-list'
import { observer } from 'mobx-react-lite'
import { cartStore } from '../../../store/cart-store'
import { ErrorDisplay } from '../../shared/error-display'

export const ShoppingCart = observer(() => {

  if (!cartStore.productsCount && !cartStore.isCartProductsListLoading) {
    return <div className="container pt-4">
      <h4 className="text-center">Cart is empty</h4>
      <ErrorDisplay error={cartStore.error}/>
    </div>
  }

  return (
    <div className="container" style={{ padding: 25 }}>
      <section>
        <article className="card row">
          <div className="table-responsive">
            <table className="table table-borderless table-shopping-cart">
              {/*eslint-disable*/}
              <thead className="text-muted">
              <tr className="small text-uppercase">
                <th scope="col">Product</th>
                <th scope="col" style={{ width: 120 }}>Quantity</th>
                <th scope="col" style={{ width: 120 }}>Price</th>
                <th scope="col" className="text-right d-none d-md-block" style={{ width: 200 }}/>
              </tr>
              </thead>
              <tbody>
              <CartList/>
              </tbody>
              {/* eslint-enable */}
            </table>
          </div>
        </article>
        <article className="row mt-5">
          <NavLink
            className="btn btn-outline-primary d-block w-100" to="/order/delivery">
            Order Delivery
          </NavLink>
        </article>
      </section>
    </div>
  )
})
