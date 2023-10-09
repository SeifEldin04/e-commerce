import React, { useContext, useState } from 'react'
import Style from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Register() {

  let { setUserToken , setUserData} = useContext(UserContext);

  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function submitLogin(values) {
    setisLoading(true);
    let response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
      .catch((error) => {
        setisLoading(false);
        setError(error.response.data.message);
        console.log(error.response.data.errors.msg);
      })
    console.log(response);
    if (response.data.message === 'success') {
      setisLoading(false);
      console.log(response.data.token);
      localStorage.setItem('userToken', response.data.token);
      setUserToken(response.data.token);


      setUserData(response.data.user);

      
      navigate('/');
    }
  }

  let myLoginValidate = yup.object({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password start with upper case').required('Password is required'),
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema: myLoginValidate,

    onSubmit: submitLogin
  })

  return <>

    <Helmet>
      <meta name="description" content='Login page of fresh cart' />
      <title>Fresh Cart Log-in</title>
    </Helmet>

    <div className="w-75 mx-auto my-5">
      <h2 className='my-3'>Log-in</h2>
      <form onSubmit={formik.handleSubmit}>
        {error !== null ? <div className="alert alert-danger w-75 text-center mx-auto mt-2">{error}</div> : ''}

        <label htmlFor="email" className='mb-2'>Email :</label>
        <input type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='' name='email' id='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.email}</div> : ''}

        <label htmlFor="password" className='mb-2'>Password :</label>
        <input type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='' name='password' id='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger w-50 text-center mx-auto mt-2 p-2">{formik.errors.password}</div> : ''}

        {isLoading ? <button type='button' className='btn bg-main text-white mt-3 ms-2 py-2'> <i className='fas fa-spinner fa-spin'></i> </button>
          : <>
            <div className='d-flex align-items-center mt-2'>
              <button type='submit' className='btn bg-main text-white mx-2 py-2 px-4'>Log-in</button>
              <Link className='btn' to='/Register'>Register now</Link>
              <Link to={'/forgotpassword'}>Forgot you password</Link>
            </div>
          </>
        }
      </form>
    </div>
  </>
}
