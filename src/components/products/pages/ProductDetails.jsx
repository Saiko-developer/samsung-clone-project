import React from 'react'
import ProductDetailSection from '../components/ProductDetailSection'
import Navbar from '@/components/layout/pages/Navbar'

const ProductDetails = ({ productId }) => {
  return (
    <div>
      <Navbar/>
      <ProductDetailSection productId={productId}/>
    </div>
  )
}

export default ProductDetails