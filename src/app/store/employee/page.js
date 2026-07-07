import Footer from '@/components/layout/pages/Footer'
import Navbar from '@/components/layout/pages/Navbar'
import EmployeeSection from '@/components/store/EmployeeSection'
import React from 'react'

export default function Page() {
  return (
    <div>
      <Navbar/>
      <EmployeeSection/>
      <Footer/>
    </div>
  )
}