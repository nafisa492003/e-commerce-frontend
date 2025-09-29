import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
const User = () => {
  return (
    <div>
      <Link to={`/login`}>
     <FaRegUserCircle className='text-[28px] text-black font-semibold cursor-pointer'/>
      </Link>
    </div>
  )
}

export default User