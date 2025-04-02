import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Features from "../components/Home/Features";
import Categories from "../components/Home/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Brands from "../components/Home/Brands";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <Features />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Brands />
        <Footer />
    </div>
  )
}

export default HomePage