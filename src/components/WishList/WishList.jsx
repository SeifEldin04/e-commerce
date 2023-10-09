import React, { useContext, useEffect, useState } from 'react'
import Style from './WishList.module.css';
import { WishlistContext } from '../../Context/WishlistContext';
import { Audio } from 'react-loader-spinner';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function WishList() {

  let { getLoggedUserWish, removeWishItem } = useContext(WishlistContext);
  let { addToCart, cartItems, setCartItems } = useContext(CartContext);

  const [isLoading, setisLoading] = useState(false);
  const [wishDetails, setWishDetails] = useState(null);

  async function getWish() {
    let { data } = await getLoggedUserWish();
    console.log(data);
    setWishDetails(data);
  }

  async function addProductToCart(id) {
    setisLoading(true);
    let { data } = await addToCart(id);

    localStorage.setItem('numberOfCartItems', data.numOfCartItems);
    setCartItems(data?.numOfCartItems);

    if (data.status === 'success') {
      toast.success('Product added successfully to your cart', {
        duration: 1500,
        position: 'top-center',
      });
    }
    else {
      toast.error('Product not added to your cart', {
        duration: 1500,
        position: 'top-center',
      })
    }

    setisLoading(false);
  }

  async function removeItem(id) {
    setisLoading(true);
    let { data } = await removeWishItem(id);
    setWishDetails(data);

    // if (data.numOfCartItems === undefined) {
    //   localStorage.removeItem('numberOfCartItems');
    //   setCartItems(null);
    // }
    // else {
    //   localStorage.setItem('numberOfCartItems', data.numOfCartItems);
    //   setCartItems(data?.numOfCartItems);
    // }

    setisLoading(false);
  }

  useEffect(() => {
    getWish();
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
    </section> : <section>
      <div className="w-75 mx-auto p-3 mt-3 bg-main-light rounded-5 my-5">
        <h1 className='h3 text-center bg-light w-50 my-3 py-2 mx-auto rounded-5'>Wish List :</h1>

        {wishDetails?.data.map((product) => <div key={product.id} className='row my-2 border-bottom'>

          <div className="col-md-1">
            <img src={product.imageCover} className='w-100' alt={product.title} />
          </div>
          <div className="col-md-11 my-3">
            <div className="d-flex justify-content-between align-items-center">

              <div>
                <h2 className='h6 fw-bolder'>{product.title}</h2>
                <h6 className='text-main'>Price : {product.price}</h6>
              </div>

              <div>
                <button onClick={() => addProductToCart(product.id)} className='btn bg-main text-light font-sm'><i className='fas fa-cart-shopping'></i> Add to cart</button>
              </div>

            </div>
            <button onClick={() => removeItem(product.id)} className='btn font-sm fw-bolder'><i className='fas fa-trash-can text-danger'></i> Remove</button>
          </div>
        </div>)}

        {/* <div className='row text-center'>
          <div className="col-md-5">
            <Link to={'/address'} className='btn bg-main text-light font-sm m-2'>Online payment</Link>
          </div>

          <div className="col-md-5">
            <Link className='btn bg-main text-light font-sm m-2'>Cash on delievry</Link>

          </div>
        </div> */}

      </div>
    </section>}
  </>
}
