import React from 'react'
import Style from './Notfound.module.css';
import logo from '../../Assets/images/error.svg';

export default function Notfound() {
  return <>
    <section className='d-flex justify-content-center align-items-center vh-50'>
      <div className="row">
        <div className='col-md-12 py-3'>
          <img src={logo} className='w-100' alt="" />
        </div>
      </div>
    </section>
  </>
}
