import React, { useState } from 'react'
import Style from './ResetPassword.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function resetPasswordSubmit(values) {
    setIsLoading(true);
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
    console.log(data);

    if(data?.token){
      navigate('/login');
    }

    setIsLoading(false);
  }

  let myResetValidation = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    newPassword: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'New password start with upper case').required('New password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    },
    validationSchema: myResetValidation,
    onSubmit: resetPasswordSubmit
  })

  return <>
    {isLoading ? <section id='loading' className='vh-100 myBg d-flex justify-content-center align-items-center'>
      <Audio
        height="90"
        width="180"
        color="#0aad0a"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </section> : <div className="w-75 mx-auto my-5">
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input className='my-2' type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' />
        {formik.touched.email && formik.errors.email ? <p className='alert alert-danger w-50 text-center mx-auto mt-2 p-2'>{formik.errors.email}</p> : ''}

        <label htmlFor="newPassword">New password :</label>
        <input className='my-2' type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} id='newPassword' name='newPassword' />
        {formik.touched.newPassword && formik.errors.newPassword ? <p className='alert alert-danger w-50 text-center mx-auto mt-2 p-2'>{formik.errors.newPassword}</p> : ''}

        <button type='submit' className='btn bg-main text-light mt-2'>send</button>
      </form>
    </div>}
  </>
}
