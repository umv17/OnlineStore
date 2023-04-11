import React from 'react'

export const PaymentForm = () => {
  return (
    <aside className="col-lg-3">
      <div className="card mb-3">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Have coupon?</label>
              <div className="input-group">
                <input type="text" className="form-control" name="" placeholder="Coupon code"/>
                <span className="input-group-append">
                  <button className="btn btn-primary">Apply</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <dl className="dlist-align">
            <dt>Total price:</dt>
            <dd className="text-right">$69.97</dd>
          </dl>
          <dl className="dlist-align">
            <dt>Discount:</dt>
            <dd className="text-right text-danger">- $10.00</dd>
          </dl>
          <dl className="dlist-align">
            <dt>Total:</dt>
            <dd className="text-right text-dark b"><strong>$59.97</strong></dd>
          </dl>
          <hr/>
          <p className="text-center mb-3">
            <img alt="" src="/images/misc/payments.png" height="26"/>
          </p>
          <a href="#" className="btn btn-primary btn-block"> Make Purchase </a>
          <a href="#" className="btn btn-light btn-block">Continue Shopping</a>
        </div>
      </div>
    </aside>
  )}