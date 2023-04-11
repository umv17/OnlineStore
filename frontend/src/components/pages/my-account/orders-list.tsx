import React, { Dispatch, SetStateAction } from 'react'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display'
import { Order } from '../../../types/orders-list'

type Props = {
  setSelectedOrderId: Dispatch<SetStateAction<number | null>>
  ordersList: Order[]
  isLoading: boolean
  error: string
}

export const OrdersList = ({ setSelectedOrderId, ordersList, isLoading, error }: Props) => {

  if (isLoading) return <Loader/>
  if (error) return <ErrorDisplay error={error}/>

  return (
    <>
      {
        ordersList.map(order => <div key={order.id} className="d-flex justify-content-sm-between mr-3 ml-3 mb-3">
          <div>Created data: {new Date(order.time_created).toLocaleString()}
          </div>
          <div>Checkout data: {new Date(order.time_checkout).toLocaleString()}</div>
          <div>
            <button onClick={() => setSelectedOrderId(order.id)} className="btn btn-light">Show details</button>
          </div>
        </div>)
      }
    </>
  )
}