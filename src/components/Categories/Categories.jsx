import React from 'react'
import Style from './Categories.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Audio } from 'react-loader-spinner';

export default function Categories() {

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading, isError } = useQuery('getCategories', getCategories);
  console.log(data);

  return <>
    <section className='container'>
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
          {data?.data.data.map((category) => <div key={category._id} className='col-md-4 col-lg-3 my-4'>
            <div className="category border cursor-pointer">
              <img src={category.image} className='w-100' height={220} alt="" />
              <h2 className='h6 fw-bolder text-center text-main my-2'>{category.name}</h2>
            </div>
          </div>)}
        </>}
      </div>
    </section>
  </>
}
