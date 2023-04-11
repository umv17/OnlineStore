import React from 'react'
import { NavLink } from 'react-router-dom'

type Crumb = {
  title: string,
  link: string
}

type Props = {
  title: string,
  crumbs: Crumb[]
  here: string
}

export const BreadCrumbsTop = ({ title, crumbs, here }: Props) => {
  return (
    <>
      <section className="section-pagetop bg">
        <div className="container">
          <h2 className="title-page">{title}</h2>
          <nav>
            <ol className="breadcrumb text-white">
              {
                crumbs.map((crumb, i) =>
                  <li key={i} className="breadcrumb-item"><NavLink to={crumb.link}>{crumb.title}</NavLink></li>
                )
              }
              <li className="breadcrumb-item active">{here}</li>
            </ol>
          </nav>
        </div>
      </section>
    </>
  )
}

