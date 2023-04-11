import React from 'react'

export type Props = {
  error: string
}

export const ErrorDisplay = ({ error }: Props) => {
  return (
    <div>
      {error}
    </div>
  )
}
