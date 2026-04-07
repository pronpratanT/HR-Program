"use client"
import React from 'react'
import { FiLogOut } from "react-icons/fi";

function Header() {
  return (
    <div className='flex justify-center'>
      <div className='w-6xl px-5 py-3 bg-[#051f20] rounded-4xl shadow-lg shadow-gray-300'>
        <div className='flex justify-between items-center w-full px-4 md:px-6 xl:px-10'>
            <div>
                <button className='text-xl font-bold text-white cursor-pointer hover:text-2xl'>NYC Dashboard</button>
            </div>
            <div className='flex gap-3'>
                <button className='text-white hover:bg-[#235347] px-4 py-2 rounded cursor-pointer'>Dashboard</button>
                <button className='text-white hover:bg-[#235347] px-4 py-2 rounded cursor-pointer'>Export</button>
                <button className='text-white hover:text-red-500 px-4 py-2 rounded-4xl -mr-10 cursor-pointer border flex items-center gap-2'><FiLogOut /> Logout</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Header
