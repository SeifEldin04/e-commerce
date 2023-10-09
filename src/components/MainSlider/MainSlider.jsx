import React from 'react'
import Style from './MainSlider.module.css';
import Slider from "react-slick";
import slider1 from '../../Assets/images/slider-image-1.jpeg';
import slider2 from '../../Assets/images/slider-image-2.jpeg';
import slider3 from '../../Assets/images/slider-image-3.jpeg';
import blog1 from '../../Assets/images/blog-img-1.jpeg';
import blog2 from '../../Assets/images/grocery-banner-2.jpeg';

export default function MainSlider() {

  const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return <>
    <div className="container pt-3">
      <div className="row gx-0">
        <div className="col-md-8">
        <Slider {...settings}>
          <div className='mainSlider'>
            <img height={400} className='w-100' src={slider1} alt="slider 1" />
          </div>
          <div>
            <img height={400} className='w-100' src={slider2} alt="slider 2" />
          </div>
          <div>
            <img height={400} className='w-100' src={slider3} alt="slider 3" />
          </div>
        </Slider>
        </div>
        <div className="col-md-4">
        <div>
            <img height={200} className='w-100' src={blog1} alt="slider 1" />
          </div>
          <div>
            <img height={200} className='w-100' src={blog2} alt="slider 2" />
          </div>
        </div>
      </div>
    </div>
  </>
}
