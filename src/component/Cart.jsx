import React from 'react'
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
const Cart = () => {
  return (
    <div>
      <Link to={`/cart`}>
        <IoMdCart className='text-[28px] text-black font-semibold cursor-pointer' />

      </Link>
    </div>

  )
}

export default Cart