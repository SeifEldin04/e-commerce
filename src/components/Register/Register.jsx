import React, { useState } from 'react'
import Style from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {

  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function submitRegister(values) {
    setisLoading(true);
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .catch((error) => {
        setisLoading(false);
        setError(error.response.data.message);
        // console.log(error.response.data.message);
      })
    console.log(response);
    if (response.data.message === 'success') {
      setisLoading(false);
      navigate('/Login');
    }
  }

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  let myRegisterValidate = yup.object({
    name: yup.string().min(3, 'Name min length is 3').max(10, 'Name max length is 10').required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password start with upper case').required('Password is required'),
    rePassword: yup.string().oneOf([yup.ref('password')], 'Re-password must equal password').required('Re-Password is required'),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required')
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, validationSchema: myRegisterValidate,

    onSubmit: submitRegister
  })

  return <>

    <Helmet>
      <meta name="description" content="Register page of fresh cart" />
      <title>Fresh Cart Register</title>
    </Helmet>

    <div className="w-75 mx-auto my-5">
      <h2 className='my-3'>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        {error !== null ? <div className="alert alert-danger w-75 text-center mx-auto mt-2">{error}</div> : ''}

        <label htmlFor="name" className='mb-2'>Name :</label>
        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className='' name='name' id='name' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.name}</div> : ''}

        <label htmlFor="email" className='mb-2'>Email :</label>
        <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='' name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.email}</div> : ''}

        <label htmlFor="password" className='mb-2'>Password :</label>
        <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='' name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.password}</div> : ''}

        <label htmlFor="rePassword" className='mb-2'>Re-Password :</label>
        <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className='' name='rePassword' id='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.rePassword}</div> : ''}

        <label htmlFor="phone" className='mb-2'>Phone :</label>
        <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className='' name='phone' id='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.phone}</div> : ''}

        {isLoading ? <button type='button' className='btn bg-main text-white mt-3 ms-2 py-2'> <i className='fas fa-spinner fa-spin'></i> </button>
          : <button type='submit' className='btn bg-main text-white mt-3 py-2 px-4'>Register</button>}
      </form>
    </div>
  </>
}
