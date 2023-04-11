import { makeAutoObservable, runInAction } from 'mobx'
import { api } from '../api'
import { ModestProduct } from '../types/product'
import { PaginationLinks } from '../types/pagination'
import { Category } from '../types/category'
import { Brand } from '../types/brand'

class CatalogueStore {

  productsList = {
    result: [] as ModestProduct[],
    count: 0,
    page: 1,
    pages: 1,
    links: {} as PaginationLinks
  }

  filters = {
    categoryId: null as number | null,
    brandId: null as number | null,
    minPrice: null as number | null,
    maxPrice: null as number | null,
    search: '' as null | string
  }

  calcCategoryIdString(id: number | null) {
    return this.filters.categoryId === id ? 'null' : id
  }

  setCategoryId(id: number | null) {
    return this.filters.categoryId = id
  }

  calcBrandIdString(id: number) {
    return this.filters.brandId === id ? 'null' : id.toString()
  }

  setBrandId(id: number) {
    return this.filters.brandId = id
  }

  // setMinMaxPrice(min: number, max: number) {
  //   this.filters.minPrice = min
  //   this.filters.maxPrice = max
  // }
  setMinMaxPrice(min, max) {
    this.filters.minPrice = min === null ? 0 : min;
    this.filters.maxPrice = max === null ? Number.MAX_SAFE_INTEGER : max;
  }


  setSearch(search: string | null) {
    this.filters.search = search
  }

  isProductsListLoading = false
  productsListError = ''

  categoryList: Category[] = []
  isCategoryListLoading = false
  categoryListError = ''

  brandList: Brand[] = []
  isBrandListLoading = false
  brandListError = ''

  constructor() {
    makeAutoObservable(this)
  }

  loadCategoryList() {
    this.isCategoryListLoading = true
    api.get('/product/category/list/')
      .then(res => runInAction(() => this.categoryList = res.data))
      .catch(error => runInAction(() => {
        this.categoryListError = error.response
        console.dir(error)
      }))
      .finally(() => runInAction(() => this.isCategoryListLoading = false))
  }

  loadBrandList() {
    this.isBrandListLoading = true
    api.get('/product/brands/all/')
      .then(res => runInAction(() => this.brandList = res.data))
      .catch(error => runInAction(() => {
        this.brandListError = error.response
        console.dir(error)
      }))
      .finally(() => runInAction(() => this.isBrandListLoading = false))
  }

  loadAllProductsData(page) {
    this.isProductsListLoading = true
    const endpoint = '/product/all'

    const query = `?page=${page}
    ${this.filters.categoryId ? `&category_id=${this.filters.categoryId}` : ''}
    ${this.filters.brandId ? `&brand_id=${this.filters.brandId}` : ''} 
    ${this.filters.minPrice ? `&min_price=${this.filters.minPrice}` : ''} 
    ${this.filters.maxPrice ? `&max_price=${this.filters.maxPrice}` : ''}
    ${this.filters.search ? `&search=${this.filters.search}` : ''}
    `
    api.get(`${endpoint}/${query}`)
      .then(res => runInAction(() => this.productsList = res.data))
      .catch(error => runInAction(() => {
        this.productsListError = error.response
        console.dir(error)
      }))
      .finally(() => runInAction(() => this.isProductsListLoading = false))
  }

}

export const catalogueStore = new CatalogueStore()
