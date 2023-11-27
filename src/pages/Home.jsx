import React from 'react'
import Layout from "../components/Layout"
import HeroSection from '../components/heroSection/HeroSection'
import Filter from '../components/filter/Filter'
import ProductCard from '../components/productCard/ProductCard'
import Testimonial from '../components/testimonial/Testimonial'
import {useSelector, useDispatch} from "react-redux"
import { addToCart, deleteFromCart } from '../redux/CartSlice'

const Home = () => {
  const dispatch = useDispatch()
  const cartItem = useSelector((state) => state.cart)

  return (
    <Layout>
      <div className="flex">
      </div>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Testimonial />
    </Layout>
  )
}

export default Home