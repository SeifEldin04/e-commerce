import React, { useState } from 'react'
import Style from './Brands.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Audio } from 'react-loader-spinner';
import $ from 'jquery';

export default function Brands() {

  const [brandDetails, setBrandDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data, isError, isLoading } = useQuery('getBrands', getBrands);
  // console.log(data);

  async function getSpecificBrand(id) {
    setLoading(true);
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    console.log(data);
    setBrandDetails(data);
    setLoading(false);
  }

  function handleBrandClick() {
    $('.specBrand').css('top', '10%');
  }

  function handleCloseBrandClick() {
    $('.specBrand').css('top', '-120%');
  }

  return <>
    <section>
      <div className="container">
        <div className="row">
        {isLoading ? <>
          <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
            <Audio
              height="90"
              width="180"
              color="#0aad0a"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        </> : <>
          {data?.data.data.map((brand) => <div key={brand._id} onClick={() => {
            getSpecificBrand(brand._id);
            handleBrandClick();
          }} className='col-md-4 col-lg-3 my-4 brand'>
            <div className="brand border cursor-pointer">
              <img src={brand.image} className='w-100' height={220} alt="" />
              <h2 className='h6 fw-bolder text-center text-main my-2'>{brand.name}</h2>
            </div>
          </div>)}
        </>}

        {loading ? <>
          <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
            <Audio
              height="90"
              width="180"
              color="#0aad0a"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        </> : <>
          <div className='specBrand w-50'>
            <div className='position-relative'>
              <i className='fas fa-close iconBtn' onClick={() => handleCloseBrandClick()}></i>
            </div>

            <div className="row border my-5">
              <div className="col-md-6">
                <div className='m-5'>
                  <h1 className='text-main fw-bolder'>{brandDetails?.data.name}</h1>
                  <h2 className=' fw-bolder'>{brandDetails?.data.slug}</h2>
                </div>
              </div>
              <div className="col-md-6">
                <div className='m-5'>
                  <img src={brandDetails?.data.image} className='w-100' alt="" />
                </div>
              </div>
            </div>

            <div className='position-relative py-2'>
              <button className='btn bg-main text-light closeBtn' onClick={() => handleCloseBrandClick()}>close</button>
            </div>
          </div>
        </>}
      </div>
      </div>
    </section>
  </>
}
