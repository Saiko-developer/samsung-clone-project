import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import BusinessSection from '@/components/store/BusinessSection'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <BusinessSection/>
      <Footer/>

    </div>
  )
}
