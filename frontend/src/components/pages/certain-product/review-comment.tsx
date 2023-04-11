import React from 'react'

type Props = {
  userName: string,
  userAvatar: string,
  date: Date,
  message: string
}

export const ReviewComment = (props: Props) => {
  return (
    <article className="box mb-3">
      <div className="icontext w-100">
        <img src="/images/avatars/avatar1.jpg" alt="" className="img-xs icon rounded-circle"/>
        <div className="text">
          <span className="date text-muted float-md-right">{props.date}</span>
          <h6 className="mb-1">{props.userName}</h6>
          <ul className="rating-stars">
            <li style={{ width: '80%' }} className="stars-active">
              <img src="/images/icons/stars-active.svg" alt=""/>
            </li>
            <li>
              <img src="/images/icons/starts-disable.svg" alt=""/>
            </li>
          </ul>
          <span className="label-rating text-warning">Good</span>
        </div>
      </div>
      <div className="mt-3">
        <p>{props.message}</p>
      </div>
    </article>
  )}