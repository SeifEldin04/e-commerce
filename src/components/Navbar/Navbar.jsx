import React, { useContext, useEffect } from 'react'
import Style from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg';
import { UserContext } from '../../Context/UserContext';
import jwtDecode from 'jwt-decode';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {

  let { cartItems, setCartItems } = useContext(CartContext);
  let items = localStorage.getItem('numberOfCartItems');


  let { userToken, setUserToken, userData } = useContext(UserContext);
  let navigate = useNavigate();

  // let encodedToken = localStorage.getItem('userToken');
  // let decodedToken = jwtDecode(encodedToken);
  // console.log(decodedToken);

  function logout() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/Login');
  }

  return <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand mx-2" href="/"> <img src={logo} alt="" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav mx-auto text-center mb-2 mb-lg-0">

            {userToken !== null ? <>
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">Brands</Link>
              </li>
              <li className="nav-item me-2">
                <Link className="nav-link font-md" to="wishlist"><i className='fa-regular fa-heart'>
                </i></Link>
              </li>
              <li className="nav-item me-2">
                <Link className="nav-link font-md" to="cart"><i className='fas fa-cart-shopping' id='NumberProductsCart'>
                  <h6 className='cartSpan'> {items} </h6>
                </i></Link>
              </li>
            </> : ''}

          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            {/* <li className="nav-item d-flex align-items-center">
              <i className='fab fa-facebook mx-2 cursor-pointer'></i>
              <i className='fab fa-twitter mx-2 cursor-pointer'></i>
              <i className='fab fa-instagram mx-2 cursor-pointer'></i>
              <i className='fab fa-tiktok mx-2 cursor-pointer'></i>
              <i className='fab fa-youtube mx-2 cursor-pointer'></i>
            </li> */}

            {userToken !== null ? <>
              {/* {<span className='text-uppercase fw-bolder text-main'> {decodedToken.name} </span>} */}
              <li className="nav-item">
                <Link className="nav-link mx-2 user" to="profile"><i className='fas fa-user'></i></Link>
              </li>
              <li className="nav-item">
                <span className="nav-link cursor-pointer" onClick={() => logout()}>Logout</span>
              </li>
            </> : <>
              <li className="nav-item">
                <Link className="nav-link" to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="register">Register</Link>
              </li>
            </>}

          </ul>

        </div>
      </div>
    </nav>
  </>
}
