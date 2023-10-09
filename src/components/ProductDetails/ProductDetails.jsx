import React, { useContext, useState } from 'react'
import Style from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';
import { Audio } from 'react-loader-spinner';

export default function getProductDetails() {

  let { addToCart, setCartItems } = useContext(CartContext);
  let { addToWish } = useContext(WishlistContext);

  const [loading, setLoading] = useState(false);

  async function addProductToCart(id) {
    setLoading(true);
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

    setLoading(false);
  }

  async function addProductToWish(id) {
    setLoading(true);
    let { data } = await addToWish(id);
    console.log(data);

    if (data.status === 'success') {
      toast.success('Product added successfully to your wish List', {
        duration: 1500,
        position: 'top-center',
      });
    }
    else {
      toast.error('Product not added to your wish List', {
        duration: 1500,
        position: 'top-center',
      })
    }

    setLoading(false);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 2500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  let params = useParams();
  console.log(params.id);

  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { isLoading, isError, isFetching, data } = useQuery('productDetails', () => getProductDetails(params.id));
  console.log(data?.data.data);

  return <>

    {loading ? <section id='loading' className='vh-100 w-100 myBg position-fixed d-flex justify-content-center align-items-center'>
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
      {data?.data.data ? <div className='container'>
        <Helmet>
          <meta name="description" content={data?.data.data.description} />
          <title>{data?.data.data.title}</title>
        </Helmet>
        <div className="row py-2 d-flex align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>
              {data?.data.data.images.map((image) => <img key={data?.data.data} src={image} alt={data?.data.data.title} className='w-100' />)}
            </Slider>
          </div>
          <div className="col-md-8">
            <h1 className='h5 fw-bolder mb-3 text-center'>{data?.data.data.title}</h1>
            <h2 className='text-muted font-sm text-center'>{data?.data.data.description}</h2>
            <span className='text-main fw-bolder'>{data?.data.data.category.name}</span>

            <div className='d-flex justify-content-between mt-2 fw-bolder'>
              <span>{data?.data.data.price}  EGP</span>
              <span><i className='fas fa-star rating-color'></i>  {data?.data.data.ratingsAverage}</span>
            </div>

            <div className="d-flex justify-content-between mt-3">
              <button onClick={() => addProductToCart(params.id)} className='btn bg-main text-white'><i className='fas fa-cart-shopping'></i> Add to cart</button>
              <button onClick={() => addProductToWish(params.id)} className='btn bg-danger text-white'><i className='fa-regular fa-heart'></i> Add to wish list</button>
            </div>
          </div>
        </div>
      </div> : ''}
    </section>}

  </>
}
