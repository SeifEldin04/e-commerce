import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Audio } from 'react-loader-spinner';
import { date } from 'yup';
import { Link } from 'react-router-dom';

// import { data } from 'jquery';

export default function Cart() {

  let { cartItems, setCartItems, setCartId } = useContext(CartContext);
  let { getLoggedUserCart, removeCartItem, ubdateProductQuantity, clearCartProducts } = useContext(CartContext);

  let [cartDetails, setCartDetails] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  async function getCart() {
    let { data, status } = await getLoggedUserCart();
    // console.log(data);
    setCartDetails(data);
    localStorage.setItem('cartId', data?.data._id);
    setCartId(data?.data._id);

    // if (data.message === 'success') {
    //   localStorage.removeItem('numberOfCartItems');
    //   setCartItems(null);
    // }
    // else {
    //   localStorage.setItem('numberOfCartItems', data.numOfCartItems);
    //   setCartItems(data?.numOfCartItems);
    // }
    // console.log(cartItems);
  }

  async function removeItem(productId) {
    setisLoading(true);
    let { data } = await removeCartItem(productId);
    setCartDetails(data);

    if (data.numOfCartItems === undefined) {
      localStorage.removeItem('numberOfCartItems');
      setCartItems(null);
    }
    else {
      localStorage.setItem('numberOfCartItems', data.numOfCartItems);
      setCartItems(data?.numOfCartItems);
    }

    setisLoading(false);
  }

  async function ubdateCount(productId, count) {
    setisLoading(true);
    let { data } = await ubdateProductQuantity(productId, count)
    setCartDetails(data);
    localStorage.setItem('numberOfCartItems', data.numOfCartItems);
    setCartItems(data?.numOfCartItems);
    setisLoading(false);
  }

  async function clearCart() {
    setisLoading(true);
    let { data } = await clearCartProducts();
    console.log(data);
    if (data.message === 'success') {
      setCartDetails(null);
      localStorage.removeItem('numberOfCartItems');
      setCartItems(null);
      getCart();
    }
    setisLoading(false)
  }

  useEffect(() => {
    getCart();
  }, [])


  return <>
    {isLoading ? <section id='loading' className='vh-100 w-100 myBg position-fixed d-flex justify-content-center align-items-center'>
      <Audio
        height="90"
        width="180"
        color="#0aad0a"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </section> : ''}
    <div className="w-75 mx-auto p-3 mt-3 bg-main-light rounded-5 my-5">
      <div className="d-flex justify-content-between my-4">
        <h1 className='h3 text-center bg-light w-50 py-3 rounded-5'>Shopping Cart :</h1>
        {cartDetails?.numOfCartItems === undefined ? '' : <button onClick={() => clearCart()} className='btn bg-main text-white font-sm py-0'>Clear All</button>}
      </div>

      <div className="mb-3">
        <h2 className='h6 fw-bolder'> Cart items : <span className='text-main'>{cartDetails?.numOfCartItems}</span></h2>
        <h2 className='h6 fw-bolder text-main'> Total cart price : {cartDetails?.data.totalCartPrice} EGP</h2>
      </div>

      {cartDetails?.data.products.map((product) => <div key={product.product.id} className='row my-2 border-bottom'>

        <div className="col-md-1">
          <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
        </div>
        <div className="col-md-11 my-3">
          <div className="d-flex justify-content-between align-items-center">

            <div>
              <h2 className='h6 fw-bolder'>{product.product.title.split(' ').slice(0, 2).join(' ')}</h2>
              <h6 className='text-main'>Price : {product.price}</h6>
            </div>

            <div>
              <button onClick={() => ubdateCount(product.product.id, product.count + 1)} className='borderMain'> + </button>
              <span className='mx-2'>{product.count}</span>
              <button onClick={() => ubdateCount(product.product.id, product.count - 1)} className='borderMain'> - </button>
            </div>

          </div>
          <button onClick={() => removeItem(product.product.id)} className='btn font-sm fw-bolder'><i className='fas fa-trash-can text-danger'></i> Remove</button>
        </div>
      </div>)}

      <div className='row text-center'>
        <div className="col-md-12">
          <Link to={'/address'} className='btn bg-main text-light font-sm m-2'>Online payment</Link>
        </div>
      </div>

    </div>
  </>
}
// 