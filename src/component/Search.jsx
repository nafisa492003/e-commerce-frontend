import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
const Search = () => {
  return (
     <div className='w-full lg:w-[520px] relative'>
        <IoSearchOutline className='absolute text-[28px] font-semibold text-[#999999] top-[16px] left-[14px]' />
            <input className='w-full rounded-[60px] bg-[#F0F0F0] pl-[50px] py-4 font-open_sans text-[18px] text-black outline-none' placeholder='Search for products...' type="text" />
        </div>
  )
}

export default Search