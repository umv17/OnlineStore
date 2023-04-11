import React from 'react'
import { Countries } from './countries'
import { SubmitHandler, useForm } from 'react-hook-form'
import { finalizeOrderStore } from '../../../store/finalize-order-store'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display'
import { observer } from 'mobx-react-lite'
import { useHistory } from 'react-router-dom'
import { cartStore } from '../../../store/cart-store'

export interface IFormInput {
  first_name: string,
  last_name: string,
  email: string,
  post_code: number,
  phone: number,
  country: string,
  city: string,
  address: string
}

export const OrderDeliveryForm = observer(() => {
  const history = useHistory()
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()

  const onSubmit: SubmitHandler<IFormInput> = data => {
    finalizeOrderStore.finalizeOrder(data).then(() => {
      cartStore.loadCart()
      history.push('/ordered/delivery')
    })
  }

  return (
    <div>
      <aside className="col-md-6 container" style={{ marginTop: 10, marginBottom: 10 }}>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Delivery info</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col form-group">
                  <label>First name</label>
                  <input
                    {
                      ...register('first_name',
                        {
                          required: 'This field is required',
                          maxLength: { value: 50, message: 'First name cannot exceed 50 characters' }
                        })
                    }
                    type="text" className="form-control" placeholder="First name"/>
                  {errors?.first_name && <p style={{ color: 'red' }}>{errors.first_name.message}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Last name</label>
                  <input
                    {
                      ...register('last_name',
                        {
                          required: 'This field is required',
                          maxLength: { value: 100, message: 'Last name cannot exceed 100 characters' }
                        })
                    }
                    type="text" className="form-control" placeholder="Last name"/>
                  {errors?.last_name && <p style={{ color: 'red' }}>{errors.last_name?.message}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Email</label>
                  <input
                    {
                      ...register('email', {
                        required: 'This field is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'The email is not in the correct format' }
                      })
                    }
                    type="email" className="form-control" placeholder="reciki5478@greenkic.com"/>
                  {errors?.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="col form-group">
                  <label>Postcode</label>
                  <input
                    {
                      ...register('post_code', { required: 'This field is required' })
                    }
                    type="text" className="form-control" placeholder="00210"/>
                  {errors?.post_code && <p style={{ color: 'red' }}>{errors.post_code.message}</p>}
                </div>
                <div className="col form-group">
                  <label>Phone</label>
                  <input
                    {...register('phone',
                      {
                        required: 'This field is required',
                        minLength: { value: 6, message: 'Phone cannot be less than 6 characters' },
                        maxLength: { value: 12, message: 'Phone cannot exceed 12 characters' },
                        pattern: {
                          value: /^\d{3}\d{3}\d{4}/i,
                          message: 'The number phone is not in the correct format'
                        }
                      })}
                    type="text" className="form-control" placeholder="1302461037"/>
                  {errors?.phone && <p style={{ color: 'red' }}>{errors.phone.message}</p>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Country</label>
                  <select className="form-control" {...register('country')}>
                    {
                      Countries.map(c =>
                        <option key={c.name} value={c.name}>
                          {c.name}
                        </option>
                      )
                    }
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label>City</label>
                  <input
                    {
                      ...register('city', { required: 'This field is required' })
                    }
                    type="text" className="form-control"/>
                  {errors?.city && <p style={{ color: 'red' }}>{errors.city.message}</p>}
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  {
                    ...register('address', { required: 'This field is required' })
                  }
                  type="text" className="form-control"/>
                {errors?.address && <p style={{ color: 'red' }}>{errors.address.message}</p>}
              </div>
              <div className="form-group mt-4">
                <div
                  style={{ width: '100%', color: 'red', fontSize: 20 }}
                  className='d-flex justify-content-center align-items-center mb-3'>
                  {
                    !finalizeOrderStore.isLoading && finalizeOrderStore.error &&
                    <ErrorDisplay error={finalizeOrderStore.error}/>
                  }
                </div>
                <div>
                  <button type="submit" className="btn btn-primary btn-block p-3" style={{ fontSize: 18 }}>Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </aside>
      {finalizeOrderStore.isLoading &&
      <div
        style={{ position: 'fixed', marginTop: '-62.5vh', paddingLeft: '48.3vw' }}>
        <Loader/>
      </div>}
    </div>
  )
})
