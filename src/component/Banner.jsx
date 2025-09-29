import React from 'react'
import Container from './Container'
import Flex from './Flex'
import banner_img from '../assets/banner_img.png'
import { Link } from 'react-router-dom'
const Banner = () => {
  return (
    <section className='pt-10 lg:pt-[80px]  bg-[#f2f0f1]'>
    <Container>
        <Flex className={`items-center justify-between flex-col lg:flex-row`}>
        {/* title */}
        <div>
          <h1 className='md:text-[64px] text-[42px] font-bold font-inter w-full md:w-[577px]'>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
          <p className='font-open_sans text-[16px] font-normal w-full md:w-[544px] text-[#979696] my-[32px]'>Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.</p>
          {/* button for shop now */}
           <Link to='/Shop'>
          <button className='py-[18px] font-inter font-semibold text-[20px] px-[60px] rounded-2xl bg-black text-white'>
            Shop Now
          </button>
          </Link>
        </div>

        {/* title */}
        <div>
            <img src={banner_img} alt="" />
        </div>
        </Flex>
    </Container>
    </section>
  )
}

export default Banner