import React, { useContext, useEffect } from 'react'
import Style from './Orders.module.css';
import { CartContext } from '../../Context/CartContext';

export default function Orders() {

  return <>
    <section className='orders'>
      <div className="ordersBrdr iconUser my-2">
        <i className="fa-solid fa-circle-check text-main mx-2"></i>
        <h1 className='h5 my-3'>Your order will be arrived soon</h1>
      </div>
    </section>
  </>
}
