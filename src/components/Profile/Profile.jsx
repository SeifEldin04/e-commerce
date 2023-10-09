import React, { useContext } from 'react'
import Style from './Profile.module.css';
import jwtDecode from 'jwt-decode';
import { UserContext } from '../../Context/UserContext';
import logo from '../../Assets/images/freshcart-logo.svg';
import { Link } from 'react-router-dom';

export default function Profile() {

  let encodedToken = localStorage.getItem('userToken');
  let decodedToken = jwtDecode(encodedToken);

  // let {userData} = useContext(UserContext);
  // console.log(userData);

  return <>
    <section className='profile'>
      <div className='profBrdr p-4'>
        <div className="text-center">
          <img src={logo} alt="" />
        </div>

        <div className="iconUser my-2">
          <i className='fas fa-user me-3 text-main'></i>
          <h1 className='h5 my-3'>Name : {decodedToken.name}</h1>
        </div>

      </div>
    </section>
    {/* <h1>Hello : {userData?.name}</h1> */}
  </>
}
