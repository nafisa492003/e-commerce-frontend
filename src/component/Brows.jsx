import React from 'react'
import Container from './Container'
import Flex from './Flex'

const Brows = () => {
  return (
    <section className='bg-black py-[80px]'>
   <Container>
    <Flex className={`items-center justify-between flex-col md:flex-row`}>
      <div className='w-full md:w-[550px]'>
        <h1 className='font-inter font-bold text-white text-[30px] lg:text-[40px] text-center'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
      </div>
     <div className='w-full md:w-[350px] mt-5 md:mt-0'>
        <input className='w-full rounded-lg px-3 py-4 text-[18px] mb-5' placeholder='@ Enter your e-mail address' type="text" />
        <button className='bg-white py-4 text-center rounded-lg text-[20px] font-open_sans font-medium text-black w-full block'>Subscribe to Newsletter</button>
     </div>
    </Flex>
   </Container>
    </section>
  )
}

export default Brows