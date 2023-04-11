import React from 'react'
import { NavLink } from 'react-router-dom'
import { SearchForm } from './search-form'
import { cartStore } from '../../../store/cart-store'
import { Observer } from 'mobx-react-lite'
import { authStore } from '../../../store/auth-store'
import { Loader } from '../../shared/loader/loader'

export const Header = () => {

  return (
    <>
      <header className="section-header">
        <section className="header-main border-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-lg-2">
                <NavLink to="/home" className="brand-wrap">
                  <img className="logo" alt="" src="/images/logo.png"/>
                </NavLink>
              </div>
              <div className="col-6 col-lg-1">
                <NavLink activeClassName="dark font-weight-bold" to="/products/page/1" className="brand-wrap">
                  Catalogue
                </NavLink>
              </div>
              <div className="col-6 offset-lg-1 col-lg-4">
                <SearchForm/>
              </div>
              <div className="col-6 col-lg-4">
                <div className="widgets-wrap float-md-right">
                  <div className="widget-header  mr-3">
                    <NavLink to="/cart" className="icon icon-sm rounded-circle border"><i
                      className="fa fa-shopping-cart"/></NavLink>
                    <Observer>
                      {() => <span className="badge badge-pill badge-danger notify">{cartStore.productsCount}</span>}
                    </Observer>
                  </div>
                  <div className="widget-header icontext">
                    <NavLink to="/login" className="icon icon-sm rounded-circle border">
                      <i className="fa fa-user"/>
                    </NavLink>
                    <div className="text">
                      <Observer>
                        {() => {
                          if (authStore.isLoading)
                            return <div><Loader/></div>

                          if (authStore.userData)
                            return <div>
                              <NavLink to={'/my-account'}>{authStore.userData.first_name}</NavLink> |
                              <a href="" onClick={e => {
                                e.preventDefault()
                                authStore.logout()
                              }}>Log out</a>
                            </div>

                          return <div>
                            <NavLink to="/login">Sign in</NavLink> |
                            <NavLink to="/registration"> Register</NavLink>
                          </div>
                        }}
                      </Observer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  )
}



