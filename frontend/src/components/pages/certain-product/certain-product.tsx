import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { certainProductStore } from '../../../store/certain-product-store'
import { observer } from 'mobx-react-lite'
import { BreadCrumbsTop } from '../../layout/bread-crumbs-top'
import { Loader } from '../../shared/loader/loader'
import { catalogueStore } from '../../../store/catalogue-store'
import { CounterInput } from '../../shared/counter-input'
import { cartStore } from '../../../store/cart-store'
import { ErrorDisplay } from '../../shared/error-display'

type Params = { pk: string }
type Props = RouteComponentProps<Params>


export const CertainProduct = observer(({ match }: Props) => {
  const productKey = match.params.pk

  useEffect(() => {
    certainProductStore.loadProduct(productKey)
  }, [])

  const [buyAmount, setBuyAmount] = useState(1)

  return (
    <>
      <BreadCrumbsTop title="Product Page" crumbs={catalogueStore.filters.categoryId
        ?
        [
          { title: 'Products', link: '/products/page/1' },
          {
            title: catalogueStore.categoryList.find(c => c.id === catalogueStore.filters.categoryId)?.title || '',
            link: `/products/page/1?category_id=${catalogueStore.filters.categoryId}`
          }
        ]
        : [{ title: 'Products', link: '/products/page/1' }]
      } here={certainProductStore.product?.title || ''}/>
      {
        certainProductStore.isLoading
          ? <Loader/>
          :
          certainProductStore.error
            ? <ErrorDisplay error={certainProductStore.error}/>
            :
            <div className="card" style={{ margin: 25 }}>
              <div className="row no-gutters">
                <aside className="col-md-6 d-flex justify-content-center align-items-center">
                  <img
                    className="p-2 p-lg-5 py-md-5"
                    style={{ width: '100%', height: '100%' }}
                    src={certainProductStore.product?.photo || '/images/items/1.jpg'} alt=""/>
                </aside>
                <main className="col-md-6 border-left">
                  <article className="content-body">

                    <h2 className="title">{certainProductStore.product?.title}</h2>

                    <div className="mb-3">
                      <var className="price h4">{certainProductStore.product?.price}$</var>
                      <del className="price-old">{certainProductStore.product?.old_price}$</del>
                    </div>

                    <p>{certainProductStore.product?.description}</p>


                    <hr/>
                    Available quantity: {certainProductStore.product?.quantity}
                    <hr/>
                    <div className="form-row">
                      <div className="col-5 form-group col-md flex-grow-0">
                        <label>Quantity</label>
                        <CounterInput
                          value={buyAmount} setValue={setBuyAmount}
                          min={1} max={Math.min(10, certainProductStore.product?.quantity || 1)}/>
                      </div>
                      <button
                        onClick={async () => {
                          await cartStore.updateProduct(certainProductStore.product?.id || 0, buyAmount)
                          cartStore.loadCart()
                        }}
                        className="ml-3 align-self-center col-4 btn btn-outline-primary">
                        <span className="text">Add to cart</span> <i className="fas fa-shopping-cart"/>
                      </button>
                    </div>

                  </article>
                </main>
              </div>
            </div>
      }

    </>
  )
})
