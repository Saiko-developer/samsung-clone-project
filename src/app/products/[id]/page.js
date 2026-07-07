import ProductDetails from '@/components/products/pages/ProductDetails'
import React from 'react'

export default async function Page({ params }) {
  const { id } = await params
  return (
    <div>
      <ProductDetails productId={id}/>
    </div>
  )
}