import React from 'react'
import { useHistory } from 'react-router-dom'

export const OrderedDeliveryForm = () => {
  const history = useHistory()

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="alert alert-success" role="alert">
        <button onClick={() => history.push('/home')} type="button" className="close" style={{ outline: 'none' }}>
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 className="alert-heading">The order has been successfully created!</h4>
        <p>
          Please note that the final cost of the order, as well as
          the number of services, goods and gifts will be confirmed after processing
          order. Before leaving for your order, make sure that the goods have arrived at the warehouse
          store or point of issue.
        </p>
        <hr/>
        <div className="d-flex justify-content-sm-between">
          <p className="mb-0"> You can get additional information by phone <strong>1352481237</strong></p>
          <button onClick={() => history.push('/products/page/1')} className="btn btn-outline-success">Continue shopping</button>
        </div>
      </div>
    </div>
  )
}