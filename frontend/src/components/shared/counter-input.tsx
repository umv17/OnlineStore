import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'

type Props = {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  min: number
  max: number
  onBlur?: () => void
}

export const CounterInput = ({ value, setValue, min, max, onBlur }: Props) => {

  useEffect(() => {
    if (value > max) {
      setValue(max)
    }
    if (value < min) {
      setValue(min)
    }
  }, [value])

  const thisRoot = useRef(null)

  return (
    <div ref={thisRoot} className="mt-1 input-group mb-3 input-spinner" onBlur={e => {
      if (!e.relatedTarget) return onBlur?.()

      if (thisRoot.current === (e.relatedTarget as Element).parentElement || thisRoot.current === (e.relatedTarget as Element).parentElement?.parentElement) {
        return
      }

      onBlur?.()
    }}>
      <div className="input-group-prepend">
        <button onClick={() => setValue(value - 1)} className="btn btn-light" type="button">-</button>
      </div>
      <input
        style={{ width: 60 }} type="text" className="form-control"
        min={min} max={max}
        value={value} onChange={e => !Number.isNaN(+e.target.value) && setValue(+e.target.value)}
        onFocus={e => e.target.select()}
      />
      <div className="input-group-append">
        <button onClick={() => setValue(value + 1)} className="btn btn-light" type="button">+</button>
      </div>
    </div>
  )
}
