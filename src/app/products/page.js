"use client"
import Navbar from '@/components/layout/pages/Navbar'
import CategoriesSection from '@/components/all-products/categoriesSection'
import ProductsSection from '@/components/all-products/productsSection'
import Footer from '@/components/layout/pages/Footer'
import OurSevicesSection from '@/components/products/components/OurServiceSection'

export default function Page() {
  return (
    <>
      <Navbar/>
      <CategoriesSection/>
      <ProductsSection/>
      <OurSevicesSection/>
      <Footer/>
    </>
  )
}