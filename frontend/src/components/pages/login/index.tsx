import React from 'react'
import { observer } from 'mobx-react-lite'
import { NavLink, useHistory } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useLogin } from './use-login'
import { ErrorDisplay } from '../../shared/error-display'
import { Loader } from '../../shared/loader/loader'

export interface ILoginForm {
  username: string,
  password: string
}

export const Login = observer(() => {
  const history = useHistory()
  const { error, isLoading, submitLogin } = useLogin()
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginForm>()

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    submitLogin(data).then(success => success && history.push('/home')).catch()
  }

  return (
    <div>
      <aside className="col-md-4 container mt-5">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-4">Sign in</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-user"/> </span>
                  </div>
                  <input
                    {
                      ...register('username',
                        {
                          required: 'This field is required',
                          maxLength: { value: 50, message: 'Username cannot exceed 50 characters' }
                        })
                    }
                    className="form-control" placeholder="Username" type="text"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"> <i className="fa fa-lock"/> </span>
                  </div>
                  <input
                    {...register('password', { required: 'This field is required' })}
                    className="form-control" placeholder="Password" type="password"/>
                  {errors?.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                </div>
              </div>
              <div className="form-group">
                <div
                  style={{ width: '100%', color: 'red', fontSize: 20 }}
                  className='d-flex justify-content-center align-items-center mb-3'>
                  {
                    !isLoading && error &&
                    <ErrorDisplay error={error}/>
                  }
                </div>
                <div>
                  <button type="submit" className="btn btn-primary btn-block">Login</button>
                </div>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">Don&apos;t have an account? <NavLink to="registration">Sign up</NavLink>
          </div>
        </div>
      </aside>
      {isLoading && <div style={{ position: 'fixed', marginTop: '-50vh', paddingLeft: '50vw' }}><Loader/></div>}
    </div>
  )
})
