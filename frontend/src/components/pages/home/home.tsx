import React, { useEffect } from 'react'
import { ProductItem } from '../catalogue/product-item'
import { catalogueStore } from '../../../store/catalogue-store'
import { observer } from 'mobx-react-lite'
import { Loader } from '../../shared/loader/loader'
import { ErrorDisplay } from '../../shared/error-display'

export const Home = observer(() => {

  useEffect(() => {
    catalogueStore.loadAllProductsData(1)
  }, [])

  return (
    <div className="container">
      <img style={{ objectFit: 'cover', width: '100%', minHeight: 434 }} src="/images/banners/2.jpg" alt=""/>
      <div className="row pt-5">
        {
          catalogueStore.isProductsListLoading
            ? <div className="w-100 d-flex justify-content-center align-items-center"><Loader/></div>
            : (
              catalogueStore.productsListError
                ? <ErrorDisplay error={catalogueStore.productsListError}/>
                : catalogueStore.productsList.result.map(p => <ProductItem key={p.id} item={p}/>)
            )
        }
      </div>
    </div>

  )
})
