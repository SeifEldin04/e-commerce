import React, { useContext } from 'react'
import Style from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {

  return <>

    <Helmet>
      <meta name="description" content="Home page of fresh cart" />
      <title>Fresh Cart</title>
    </Helmet>

    <MainSlider />
    <CategorySlider />
    <FeaturedProducts />
  </>
}
