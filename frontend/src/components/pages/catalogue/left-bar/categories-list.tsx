import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { catalogueStore } from '../../../../store/catalogue-store'
import { useHistory } from 'react-router-dom'
import { Loader } from '../../../shared/loader/loader'
import { useQuery } from '../../../../hooks/useQuery'
import { ErrorDisplay } from '../../../shared/error-display'

export const CategoriesList = observer(() => {

  const history = useHistory()
  const query = useQuery()

  useEffect(() => {
    catalogueStore.loadCategoryList()
  }, [])

  if (catalogueStore.isCategoryListLoading)
    return <Loader/>

  if (catalogueStore.categoryListError)
    return <ErrorDisplay error={catalogueStore.categoryListError}/>

  return (
    <ul className="list-menu">
      {
        catalogueStore.categoryList.map(category =>
          <li key={category.id}>
            <button
              onClick={() => {
                query.set('category_id', `${catalogueStore.calcCategoryIdString(category.id)}`)
                history.push({ pathname: '/products/page/1', search: query.toString() })
              }}
              style={{ textDecoration: 'none', padding: '1px 12px' }}
              className={`btn btn-link ${category.id === catalogueStore.filters.categoryId ? 'dark font-weight-bold' : ''}`}
            >
              {category.title}
            </button>
          </li>
        )
      }
    </ul>
  )
})

