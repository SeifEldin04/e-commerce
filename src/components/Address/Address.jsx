import React, { useContext } from 'react'
import Style from './Address.module.css';
import { useFormik } from 'formik';
import { CartContext } from '../../Context/CartContext';

export default function Address() {

  let { onlinePayment, cartId } = useContext(CartContext);

  async function addressSubmit(values) {
    let response = await onlinePayment(cartId, values);
    console.log(response?.data.session.url);
    window.location.href = response?.data.session.url;
    // localStorage.removeItem('numberOfCartItems');
    // setCartItems(null);
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: addressSubmit,
  })

  return <>
    <div className="w-50 vh-50 mx-auto">
      <h1 className='text-main text-center'>Online Payment</h1>

      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="details"> Details : </label>
        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} name='details' id='details' />

        <label htmlFor="phone"> Phone : </label>
        <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} name='phone' id='phone' />

        <label htmlFor="city"> City : </label>
        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} name='city' id='city' />

        <button type='submit' className='btn bg-main text-light mt-3'>Pay now</button>
      </form>
    </div>
  </>
}
