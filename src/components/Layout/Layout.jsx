import React from 'react'
import Style from './Layout.module.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { Offline, Online } from "react-detect-offline";

export default function Layout() {

  return <>
    <Navbar />
    <div className='mt-5'>
      <Outlet></Outlet>
    </div>
    <div>
      <Offline>
        <div className="networkStatus">
          <i className='fas fa-wifi mx-2 text-main'></i>You are offline now , Please re-connect
        </div>
      </Offline>
    </div>
    <Footer />
  </>
}
