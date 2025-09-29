import React, { useState } from 'react'
import Container from './Container';
import Flex from './Flex';
import logo from '../assets/Logo.png'
import Search from './Search';
import Cart from './Cart';
import User from './User';
import { CgMenuLeft } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
const Nav_bar = () => {
  const [nav, setNav] = useState(false);
  const user = useSelector((state) => state.auth?.user);
  return (
    <section className='lg:py-6 md:py-2 relative'>
      <Container>
        <Flex className={`items-center justify-between lg:hidden py-3`}>
          <Link to='/'><img src={logo} alt="" /></Link>
          <CgMenuLeft onClick={() => setNav(!nav)} className='text-[24px]' />
        </Flex>
        {nav && (
          <div className='absolute w-full p-3  bottom-[-288px] right-0 z-50 bg-slate-100'>
            <ul className='flex flex-col gap-4 mb-4'>
              <li className='font-open_sans font-normal text-[18px] text-black cursor-pointer'><Link to='/Shop'>Shop</Link></li>
              <li className='font-open_sans font-normal text-[18px] text-black cursor-pointer'>On Sale</li>
              <li className='font-open_sans font-normal text-[18px] text-black cursor-pointer'>New Arrivals</li>
            </ul>
            <Search />
            <div className='flex items-center gap-4 my-3'>
              <Cart />
              <User />
               {user?.role === "admin" && (
          <Link
            to="/admin"
            className="px-4 py-2 bg-black text-white rounded"
          >
            Admin Dashboard
          </Link>
        )}
            </div>
          </div>
        )}

        {/* for large screen */}
        <Flex className={`items-center justify-between hidden lg:flex`}>
          <div>
              <Link to='/'><img src={logo} alt="" /></Link>
          </div>
          <div>
            <ul className='flex items-center gap-5'>
              <li className='font-open_sans font-normal text-[18px] text-black cursor-pointer'><Link to='/Shop'>Shop</Link></li>
              <li className='font-open_sans font-normal text-[18px] text-black cursor-pointer'>On Sale</li>
              <li className='font-open_sans font-normal text-[18px] text-black cursor-pointer'>New Arrivals</li>
            </ul>
          </div>
          <Search />
          <div className='flex items-center gap-2'>
            <Cart />
            <User />

             {user?.role === "admin" && (
          <Link
            to="/admin"
            className="px-3 py-2 bg-black text-white rounded"
          >
            Admin Dashboard
          </Link>
        )}
          </div>
        </Flex>
      </Container>
    </section>
  )
}

export default Nav_bar