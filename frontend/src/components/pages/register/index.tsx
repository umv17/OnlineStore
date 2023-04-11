import React from 'react'
import { observer } from 'mobx-react-lite'
import { useHistory, NavLink } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRegistration } from './use-registration'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display'

export interface IRegistrationForm {
  username: string,
  first_name: string,
  last_name: string,
  password: string,
  email: string
}

export const Registration = observer(() => {
  const history = useHistory()
  const { error, isLoading, submitRegistration } = useRegistration()
  const { register, handleSubmit, formState: { errors } } = useForm<IRegistrationForm>()

  const onSubmit: SubmitHandler<IRegistrationForm> = data => {
    submitRegistration(data).then(result => result && history.push('/login')).catch()
  }

  return (
    <div>
      <aside className="col-md-6 container">
        <div className="card mt-5">
          <article className="card-body">
            <header className="mb-4">
              <h4 className="card-title">Sign up</h4>
            </header>
            <form className="block-register" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group form-row">
                <label className="col-md-3 col-form-label">Username</label>
                <div className="col">
                  <input
                    {
                      ...register('username',
                        {
                          required: 'This field is required',
                          maxLength: { value: 50, message: 'Username cannot exceed 50 characters' }
                        })
                    }
                    type="text" className="form-control" placeholder="Username"/>
                  {errors?.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-md-3 col-form-label">First name</label>
                <div className="col">
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
              <div className="form-group form-row">
                <label className="col-md-3 col-form-label">Last name</label>
                <div className="col">
                  <input
                    {
                      ...register('last_name',
                        {
                          required: 'This field is required',
                          maxLength: { value: 100, message: 'Last name cannot exceed 100 characters' }
                        })
                    }
                    type="text" className="form-control" placeholder="Last name"/>
                  {errors?.last_name && <p style={{ color: 'red' }}>{errors.last_name.message}</p>}
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-md-3 col-form-label">Email</label>
                <div className="col-sm-9">
                  <input
                    {
                      ...register('email', {
                        required: 'This field is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'The email is not in the correct format' }
                      })
                    }
                    type="email" className="form-control" placeholder="john@gmail.com"/>
                  {errors?.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                </div>
              </div>
              <div className="form-group form-row">
                <label className="col-md-3 col-form-label">Password</label>
                <div className="col-9">
                  <input
                    {
                      ...register('password', { required: 'This field is required' })
                    }
                    type="password" className="form-control mb-3" placeholder="Create password"/>
                  {errors?.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
              </div>
              <div className="form-group mt-3">
                <div
                  style={{ width: '100%', color: 'red', fontSize: 20 }}
                  className='d-flex justify-content-center align-items-center mb-3'>
                  {
                    !isLoading && error &&
                    <ErrorDisplay error={error}/>
                  }
                </div>
                <div>
                  <button type="submit" className="btn btn-primary btn-block"> Register</button>
                </div>
              </div>
            </form>
          </article>
          <div className="card-footer text-center">Have an account? <NavLink to="/login">Log In</NavLink></div>
        </div>
      </aside>
      {isLoading && <div style={{ position: 'fixed', marginTop: '-50vh', paddingLeft: '50vw' }}><Loader/></div>}
    </div>
  )
})