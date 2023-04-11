import React, { useState } from 'react'
import { OrdersList } from './orders-list'
import { ProductsList } from './products-list'
import { useUsersOrders } from './use-users-orders'

export const MyAccount = () => {
  const { ordersList, isLoading, error } = useUsersOrders()
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null)

  return (
    <section className="section-content padding-y bg">
      <div className="container">
        <article className="card">
          <header className="card-header mb-4">
            <h5 className="text-muted">Orders list</h5>
          </header>
          <OrdersList
            setSelectedOrderId={setSelectedOrderId}
            ordersList={ordersList}
            isLoading={isLoading}
            error={error}/>
          <ProductsList order={ordersList.find(order => order.id === selectedOrderId)}/>
        </article>
      </div>
    </section>
  )
}
