import { FullProduct } from '../types/product'
import { api } from '../api'
import { makeAutoObservable, runInAction } from 'mobx'

export class CertainProductStore {
  product: FullProduct | null = null
  isLoading = false
  error = ''

  constructor() {
    makeAutoObservable(this)
  }

  loadProduct(productKey: string) {
    this.isLoading = true
    api.get(
      '/product/get/' + productKey)
      .then(res => {
        runInAction(() => {
          this.product = res.data
        })
      })
      .catch(error => {
        runInAction(() => this.error = error.response)
        console.dir(error)
      })
      .finally(() => runInAction(() => this.isLoading = false))
  }
}

export const certainProductStore = new CertainProductStore()
