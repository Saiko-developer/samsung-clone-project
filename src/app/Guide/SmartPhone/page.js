import SmartphoneGuideSection from '@/components/guide/SmartphoneGuideSection'
import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <SmartphoneGuideSection/>
      <Footer/>
    </div>
  )
}