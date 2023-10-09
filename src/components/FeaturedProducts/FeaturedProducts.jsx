import React, { useContext, useEffect, useState } from 'react'
import Style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Audio } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function FeaturedProducts() {

  let { addToCart, setCartItems } = useContext(CartContext);
  let { addToWish } = useContext(WishlistContext);

  const [searchQuery, setSearchQuery] = useState('');

  async function addProductToCart(id) {
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
  }

  async function addProductToWish(id) {
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
  }

  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data, isFetching, isError } = useQuery('featuredProducts', getFeaturedProducts, {
    // cacheTime: 5000,
    // staleTime:5000,
    // refetchOnMount:false,
    // refetchInterval:2000
  });

  const filteredProducts = data?.data?.data.filter((product) => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
  });


  // console.log(data?.data.data);

  // const [Products, setProducts] = useState([]);
  // const [IsLoading, setIsLoading] = useState(false);

  // async function getFeaturedProducts() {
  //   setIsLoading(true)
  //   let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //   console.log(data.data);
  //   setProducts(data.data);
  //   setIsLoading(false);
  // }

  // useEffect(() => {

  //   getFeaturedProducts();

  // }, [])


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 my-2">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className={`vh-100 w-100 d-flex justify-content-center align-items-center ${Style.loader}`}>
              <Audio height="90" width="180" color="#0aad0a" ariaLabel="audio-loading" wrapperStyle={{}} wrapperClass="wrapper-class" visible={true} />
            </div>
          ) : (
            <>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product.id} className={`product col-md-4 col-lg-2 my-3 ${Style.product}`}>
                    <Link to={`/ProductDetails/${product.id}`}>
                      <img className={`w-100 ${Style.productImage}`} src={product.imageCover} alt={product.title} />
                      <span className={`text-main font-sm fw-bolder ${Style.productCategory}`}>{product.category.name}</span>
                      <h3 className={`h6 ${Style.productTitle}`}>{product.title.split(' ').slice(0, 4).join(' ')}</h3>

                      <div className={`d-flex justify-content-between ${Style.productInfo}`}>
                        <span>{product.price} EGP</span>
                        <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
                      </div>
                    </Link>
                    <div className={`d-flex justify-content-between align-items-center my-2 ${Style.productActions}`}>
                      <div>
                        <button onClick={() => addProductToCart(product.id)} className={`btn myBtn1 rounded-circle cursor-pointer font-md ${Style.cartButton}`}>
                          <i className="fas fa-cart-shopping" id="cartIcon"></i>
                        </button>
                      </div>
                      <div>
                        <button onClick={() => addProductToWish(product.id)} className={`btn myBtn2 rounded-circle cursor-pointer font-md ${Style.wishButton}`}>
                          <i className="fa-regular fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`col-md-12 mt-2 ${Style.noProducts}`}>
                  <p>No products found.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
};

//return <>
// <div className="container">
//   <div className="row">
//     <div className="col-md-12 my-2">
//       <input type="text" placeholder='search by name..' />
//     </div>

//     {isLoading ? <>
//       <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
//         <Audio
//           height="90"
//           width="180"
//           color="#0aad0a"
//           ariaLabel="audio-loading"
//           wrapperStyle={{}}
//           wrapperClass="wrapper-class"
//           visible={true}
//         />
//       </div>
//     </> : <>
//       {/* <h2 className='my-3 text-center'>Featured Products</h2> */}
//       {data?.data.data.map((product) => <div key={product.id} className='col-md-4 col-lg-2 my-3'>
//         <div className="product py-3 px-2">
//           <Link to={`/ProductDetails/${product.id}`}>
//             <img className='w-100' src={product.imageCover} alt={product.title} />
//             <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
//             <h3 className='h6'>{product.title.split(' ').slice(0, 4).join(' ')}</h3>

//             <div className='d-flex justify-content-between'>
//               <span>{product.price} EGP</span>
//               <span> <i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
//             </div>
//           </Link>
//           <div className="d-flex justify-content-between align-items-center my-2">
//             <div>
//               <button onClick={() => addProductToCart(product.id)} className='btn myBtn1 rounded-circle cursor-pointer font-md'><i className='fas fa-cart-shopping' id='cartIcon'></i></button>
//             </div>
//             <div>
//               <button onClick={() => addProductToWish(product.id)} className='btn myBtn2 rounded-circle cursor-pointer font-md'> <i className="fa-regular fa-heart"></i> </button>
//             </div>
//           </div>
//         </div>
//       </div>)}
//     </>}
//   </div>
// </div >
// </>
// }
