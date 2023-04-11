import { makeAutoObservable, runInAction } from 'mobx'
import { ACCESS_TOKEN_KEY, api, REFRESH_TOKEN_KEY } from '../api'

type UserData = {
  email: string
  first_name: string
  last_name: string
  token: string
}

class AuthStore {

  userData: UserData | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
    this.loadIsAuth()
  }

  // loadIsAuth() {
  //   this.isLoading = true
  //   api.get<UserData>('/customer/getuser/')
  //     .then(res => runInAction(() => this.userData = res.data))
  //     .catch(() => console.log('Something wrong with auth!'))
  //     .finally(() => runInAction(() => this.isLoading = false))
  // }

  loadIsAuth() {
    const access = localStorage.getItem(ACCESS_TOKEN_KEY)
    if (access) {
      this.isLoading = true
      api.get<UserData>('/customer/getuser/')
        .then(res => runInAction(() => this.userData = res.data))
        .catch(() => console.log('Something wrong with auth!'))
        .finally(() => runInAction(() => this.isLoading = false))
    } else {
      this.userData = null
    }
  }


  login(access: string, refresh: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access)
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    this.loadIsAuth()
  }

  logout() {
    this.userData = null
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  }
}

export const authStore = new AuthStore()
