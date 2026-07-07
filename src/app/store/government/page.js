import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import GovernmentSection from '@/components/store/GovernmentSection'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <GovernmentSection/>
      <Footer/>
    </div>
  )
}
