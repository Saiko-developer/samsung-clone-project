"use client"
import { fetchStudent, StudentApiUrl } from '@/data/store/student'
import React from 'react'
import useSWR from 'swr'

const StudentSection = () => {
  const{data:students,isLoading,error} = useSWR(StudentApiUrl,fetchStudent)
   if (isLoading) {
    return (
      <p className="text-center text-gray-500 py-10 text-lg">Loading....</p>
    );
  }
  if (error) {
    return (
      <p className="text-center text-red-500 py-10 text-lg">
        Failed to load products. Make sure the API server is running.
      </p>
    );
  }
  return (
    <main>
        <section className="flex flex-col items-center justify-center mb-10 ">
        <div className="mb-5 pb-2 text-center">
          <h1 className="font-bold text-4xl font-mono pb-2">
            Samsung advantage for students
          </h1>
          
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-0 mb-5">
          {students?.map((reward) => (
            <div
              key={reward.id}
              className="flex flex-col items-center text-center p-4 border border-gray-100 rounded-lg"
            >
              {/* Icon */}
              <img
                src={reward.icon_url}
                sizes="30"
                alt={reward.section_title}
                className=" h-30 mb-6 object-contain"
              />

              {/* Title */}
              <h2 className="text-xl font-bold mb-4 min-h-[56px] flex justify-center text-start">
                {reward.section_title}
              </h2>

              {/* Steps (Written inline) */}
              <div className="space-y-3 text-sm text-gray-600 mb-4 flex-grow">
                {reward.steps.map((step, idx) => (
                  <p key={idx}>{step}</p>
                ))}
              </div>

              {/* Additional Notes (Written inline with shortcut evaluation) */}
              {reward.additional_notes?.map((note, idx) => (
                <p
                  key={idx}
                  className="mt-2 text-xs text-gray-500 text-left w-full"
                >
                  * {note}
                </p>
              ))}
            </div>
          ))}
        </div>
        
      </section>
      <section className="relative xl:h-[50vh] md:h-[50vh] h-[10vh]  overflow-hidden w-full">
        <img
          src="https://images.samsung.com/is/image/samsung/assets/sg/students-offers/banner/b2b_global0001_government-epp_ft03_pc_1440x344_8.jpg?$1440_N_JPG$"
          alt="Samsung Monitor"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 ">
          
          <h1 className="text-l md:text-2xl lg:text-4xl font-bold text-black mb-4 leading-tight">
            Enjoy $20 off your first purchase.
          </h1>
          
          <button className="self-start bg-black text-white px-5 md:px-8 md:py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Sign Up
          </button>
        </div>
      </section>
    </main>
  )
}

export default StudentSection
