import React from 'react'
import Style from './CategorySlider.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { isError, data, isLoading } = useQuery('categorySlider', getCategories)
  console.log(data?.data.data);

  return <>

    <div className="py-5">
      <h2 className='h4 fw-bolder mb-3 text-center'>Shop popular categories</h2>
      {data?.data.data ? <div>
        <Slider {...settings}>
          {data?.data.data.map((category) => <div className='categorySlider' key={category._id}>
            <img src={category.image} height={220} alt={data?.data.data.name} className='w-100' />
            <span className='text-main'>{category.name}</span>
          </div>

          )}
        </Slider>
      </div> : ''}
    </div>



  </>
}
