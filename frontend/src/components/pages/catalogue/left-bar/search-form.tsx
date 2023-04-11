import React, { useState } from 'react'
import { useQuery } from '../../../../hooks/useQuery'
import { useHistory } from 'react-router-dom'

export const SearchForm = () => {

  const history = useHistory()
  const query = useQuery()
  const [search, setSearch] = useState(() => query.get('search') || '')

  return (
    <form onSubmit={e => {
      e.preventDefault()
      search ? query.set('search', search) : query.delete('search')
      history.push({ pathname: '/products/page/1', search: query.toString() })
    }} className="pb-3">
      <div className="input-group">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          type="text" className="form-control"
          placeholder="Search"/>
        <div className="input-group-append">
          <button className="btn btn-light" type="submit"><i
            className="fa fa-search"/>
          </button>
        </div>
      </div>
    </form>
  )
}
