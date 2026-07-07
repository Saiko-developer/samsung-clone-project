import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import DeliverySection from '@/components/Services/DeliverySection'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <DeliverySection/>
      <Footer/>
    </div>
  )
}
