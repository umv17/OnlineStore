import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '../../../hooks/useQuery'

export const SearchForm = () => {

  const history = useHistory()
  const query = useQuery()
  const [search, setSearch] = useState(() => query.get('search') || '')

  return (
    <form onSubmit={e => {
      e.preventDefault()
      for (const key of query.keys()) {
        query.delete(key)
      }
      search ? query.set('search', search) : query.delete('search')
      history.push({ pathname: '/products/page/1', search: query.toString() })
    }} action="#" className="search">
      <div className="input-group w-100">
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          type="text" className="form-control" placeholder="Search"/>
        <div className="input-group-append">
          <button className="btn btn-primary" type="submit">
            <i className="fa fa-search"/> Search
          </button>
        </div>
      </div>
    </form>
  )
}
