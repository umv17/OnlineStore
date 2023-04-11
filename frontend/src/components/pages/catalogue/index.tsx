import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { PaginatorBlock } from './paginator-block'
import { BreadCrumbsTop } from '../../layout/bread-crumbs-top'
import { RouteComponentProps } from 'react-router-dom'
import { ProductItem } from './product-item'
import { catalogueStore } from '../../../store/catalogue-store'
import { useQuery } from '../../../hooks/useQuery'
import { LeftBar } from './left-bar/left-bar'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display'

type Params = { page: string }
type Props = RouteComponentProps<Params>


export const CataloguePage = observer(({ match }: Props) => {

  const page = Number(!match.params.page ? 1 : match.params.page)

  const query = useQuery()
  const categoryId = Number(query.get('category_id'))
  const brandId = Number(query.get('brand_id'))
  const min = Number(query.get('min_price'))
  const max = Number(query.get('max_price'))
  const search = query.get('search')

  useEffect(() => {
    catalogueStore.setCategoryId(categoryId)
  }, [categoryId])
  useEffect(() => {
    catalogueStore.setBrandId(brandId)
  }, [brandId])
  useEffect(() => {
    catalogueStore.setMinMaxPrice(min, max)
  }, [min, max])
  useEffect(() => {
    catalogueStore.setSearch(search)
  }, [search])


  useEffect(() => {
    catalogueStore.loadAllProductsData(page)
  }, [
    page,
    catalogueStore.filters.categoryId,
    catalogueStore.filters.brandId,
    catalogueStore.filters.maxPrice,
    catalogueStore.filters.minPrice,
    catalogueStore.filters.search
  ])

  let listItems

  const store = toJS(catalogueStore.productsList)

  if (!catalogueStore.isProductsListLoading) {
    listItems = catalogueStore.productsListError
      ? <ErrorDisplay error={catalogueStore.productsListError}/>
      : (
        !store.result.length
          ? <div>None of the things fit with these filters!</div>
          : store.result.map((item) => <ProductItem item={item} key={item.id}/>)
      )
  }

  return (
    <>
      {
        catalogueStore.filters.categoryId
          ? <BreadCrumbsTop
            title="Products Page"
            crumbs={[
              { title: 'Products', link: '/products/page/1' }
            ]}
            here={catalogueStore.categoryList.find(c => c.id === catalogueStore.filters.categoryId)?.title || ''}/>
          : <BreadCrumbsTop
            title="Products Page"
            crumbs={[]}
            here="Products"/>
      }

      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <LeftBar/>
            <main className="col-md-9">
              <header className="border-bottom mb-4 pb-3">
                <div className="form-inline">
                  <span className="mr-md-auto">{store.count} Items found </span>
                  <select className="mr-2 form-control">
                    <option>Latest items</option>
                    <option>Trending</option>
                    <option>Most Popular</option>
                    <option>Cheapest</option>
                  </select>
                  <div className="btn-group">
                    <a href="#" className="btn btn-outline-secondary" data-toggle="tooltip" title="List view">
                      <i className="fa fa-bars"/></a>
                    <a href="#" className="btn  btn-outline-secondary active" data-toggle="tooltip" title="Grid view">
                      <i className="fa fa-th"/></a>
                  </div>
                </div>
              </header>
              <div className="row">
                {catalogueStore.isProductsListLoading &&
                <div className="col-12 my-5 d-flex justify-content-center align-items-center"><Loader/></div>}
                {listItems}
              </div>
              <nav className="mt-4" aria-label="Page navigation sample">
                <PaginatorBlock
                  links={store.links}
                  pages={store.pages}
                  urlPage={page}
                />
              </nav>
            </main>
          </div>
        </div>
      </section>
    </>
  )
})

