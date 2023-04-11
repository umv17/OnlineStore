import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { catalogueStore } from '../../../../store/catalogue-store'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../../../../hooks/useQuery'

export const PriceRangeForm = observer(() => {

  const query = useQuery()
  const history = useHistory()
  const [min, setMin] = useState<number | null>(() => Number(query.get('min_price')) || null)
  const [max, setMax] = useState<number | null>(() => Number(query.get('max_price')) || null)

  return (
    <form className="card-body" onSubmit={e => {
      e.preventDefault()
      catalogueStore.setMinMaxPrice(min, max)
      query.set('min_price', min?.toString() || '')
      query.set('max_price', max?.toString() || '')
      history.push({ pathname: '/products/page/1', search: query.toString() })
    }}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label>Min</label>
          <input
            value={min || ''}
            onChange={e => setMin(e.target.value ? +e.target.value : null)}
            className="form-control" placeholder="$0"
            type="number" max={Number.MAX_SAFE_INTEGER} />
        </div>
        <div className="form-group text-right col-md-6">
          <label>Max</label>
          <input
            value={max || ''}
            onChange={e => setMax(e.target.value ? +e.target.value : null)}
            className="form-control" placeholder="$1,0000"
            type="number" max={Number.MAX_SAFE_INTEGER} />
        </div>
      </div>
      <button type="submit" className="btn btn-block btn-primary">Apply</button>
    </form>
  )
})
