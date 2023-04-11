import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes'
import { Header } from './components/layout/header/header'


export const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes/>
    </BrowserRouter>
  )
}
