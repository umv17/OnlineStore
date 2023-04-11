import React from 'react'
import { CartListItem } from './cart-list-item'
import { cartStore } from '../../../../store/cart-store'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../../shared/loader/loader'
import { ErrorDisplay } from '../../../shared/error-display'

export const CartList = observer(() => {

  if (cartStore.isCartProductsListLoading)
    return <tr>
      <td style={{ width: '100%' }}><Loader/></td>
    </tr>

  if (cartStore.error)
    return <ErrorDisplay error={cartStore.error}/>

  return (
    <>
      {cartStore.cartProductsList.map(p => <CartListItem key={p.id} item={p}/>)}
    </>
  )
})
