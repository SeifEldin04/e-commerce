import React, { useState } from 'react'
import Style from './VerifyCode.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { Audio } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

export default function VerifyCode() {

  let navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  async function verifyResetCode(values) {
    setIsLoading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
    console.log(data);

    if(data.status === 'Success'){
      navigate('/resetpassword');
    }

    setIsLoading(false);
  }

  let myVerifyValidation = yup.object({
    resetCode: yup.string().required('Code is required')
  })

  let formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: myVerifyValidation,
    onSubmit: verifyResetCode
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
        <label htmlFor="resetCode">Code :</label>
        <input className='my-2' type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.resetCode} id='resetCode' name='resetCode' />
        {formik.touched.resetCode && formik.errors.resetCode ? <p className='alert alert-danger w-50 text-center mx-auto mt-2 p-2'>{formik.errors.resetCode}</p> : ''}

        <button type='submit' className='btn bg-main text-light mt-2'>send code</button>
      </form>
    </div>}
  </>
} 
