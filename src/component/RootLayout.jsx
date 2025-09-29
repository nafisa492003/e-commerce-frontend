import React from 'react'
import Nav_bar from './Nav_bar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Brows from './Brows'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RootLayout = () => {
  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
    <Nav_bar/>
   <Outlet/>
   <Brows/>
   <Footer/>
    </>
  )
}

export default RootLayout