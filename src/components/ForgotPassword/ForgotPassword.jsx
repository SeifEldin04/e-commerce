import React, { useState } from 'react'
import Style from './ForgotPassword.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function sendCode(values) {
    setIsLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
    console.log(data);

    if(data.statusMsg === 'success'){
      navigate('/verifycode');
    }

    setIsLoading(false);
  }

  let sendCodeValidation = yup.object({
    email: yup.string().email('Enter your valid email').required('Your email is required')
  })

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: sendCodeValidation
    ,
    onSubmit: sendCode
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

        <button type='submit' className='btn bg-main text-light mt-2'>Send</button>
      </form>
    </div>}
  </>
}
