import { makeAutoObservable, runInAction } from 'mobx'
import { IFormInput } from '../components/pages/order-delivery-form'
import { api } from '../api'

class FinalizeOrderStore {
  isLoading = false
  error = ''

  constructor() {
    makeAutoObservable(this)
  }

  finalizeOrder(orderDetails: IFormInput){
    this.isLoading = true
    this.error = ''
    return api.put('/order/finalize/', {
      ...orderDetails,
      post_code: +orderDetails.post_code,
      phone: +orderDetails.phone,
      token: localStorage.getItem('customer_token')
    }).catch(error => {
      runInAction(() => this.error = error.response)
      console.dir(error)
      throw new Error('')
    }).finally(() => {
      runInAction(() => this.isLoading = false)
    })
  }
}

export const finalizeOrderStore = new FinalizeOrderStore()
