import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import PlanSection from '@/components/Services/PlanSection'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar/>
      <PlanSection/>
      <Footer/>
    </div>
  )
}
