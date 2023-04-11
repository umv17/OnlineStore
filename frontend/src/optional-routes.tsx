import React from 'react'
import { Observer } from 'mobx-react-lite'
import { Redirect, Route } from 'react-router-dom'
import { cartStore } from './store/cart-store'
import { OrderDeliveryForm } from './components/pages/order-delivery-form'
import { authStore } from './store/auth-store'
import { MyAccount } from './components/pages/my-account/my-account'

export const OptionalRoutes = () => {
  return (
    <Observer>
      {
        () => {
          if (cartStore.productsCount && authStore.userData)
            return <>
              <Route path="/order/delivery" exact component={OrderDeliveryForm}/>
              <Route path="/my-account" exact component={MyAccount}/>
            </>

          if (cartStore.productsCount)
            return <Route path="/order/delivery" exact component={OrderDeliveryForm}/>

          if (authStore.userData)
            return <Route path="/my-account" exact component={MyAccount}/>

          return <Redirect to={'/home'}/>
        }
      }
    </Observer>
  )
}


