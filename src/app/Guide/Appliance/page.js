import ApplianceGuideSection from '@/components/guide/ApplianceGuideSection'
import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <ApplianceGuideSection/>
      <Footer/>
    </div>
  )
}