import React from 'react'
import Container from './Container'
import Flex from './Flex'
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
const Footer = () => {
    return (
        <section className='py-[80px]'>
            <Container>
                <Flex className={`md:items-center gap-[55px] lg:gap-[130px]  md:flex-row flex-wrap`}>
                    <div className='flex flex-col gap-6'>
                        <Link to='/'>
                            <img src={logo} alt="" />
                        </Link>
                        <p className='font-open_sans text-[18px] font-normal text-[#969696] w-full md:w-[240px]'>We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
                        <Flex className={`items-center gap-4`}>
                            <FaFacebook className='text-[24px] text-slate-700 cursor-pointer' />
                            <FaInstagram className='text-[24px] text-slate-700 cursor-pointer' />
                            <FaTwitter className='text-[24px] text-slate-700 cursor-pointer' />
                            <FaPinterest className='text-[24px] text-slate-700 cursor-pointer' />
                        </Flex>
                    </div>
                    <div className='w-[100px]'>
                        <h1 className='font-inter font-medium text-[18px] text-black mb-4 leading-3'>COMPANY</h1>
                        <ul className='flex flex-col gap-4'>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>About</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Features</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Work</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Carrer</li>
                        </ul>
                    </div>
                    {/* ........... */}
                     <div className='w-[140px]'>
                        <h1 className='font-inter font-medium text-[18px] text-black mb-4 leading-3'>Help</h1>
                        <ul className='flex flex-col gap-4'>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Customer Support</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Delevery Details</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Terms & Condition</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Privecy & Policy</li>
                        </ul>
                    </div>
                    {/* ......... */}
                     <div className='w-[100px]'>
                        <h1 className='font-inter font-medium text-[18px] text-black mb-4 leading-3'>FAQ</h1>
                        <ul className='flex flex-col gap-4'>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Management</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Account</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Orders</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Payments</li>
                        </ul>
                    </div>
                    {/* ....... */}
                     <div className='w-[100px]'>
                        <h1 className='font-inter font-medium text-[18px] text-black mb-4 leading-3'>Resources</h1>
                        <ul className='flex flex-col gap-4'>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Figma</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Development</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>Backend API</li>
                            <li className='font-open_sans font-normal tex-[16px] text-[#7b7b7b]'>VS Code</li>
                        </ul>
                    </div>
                </Flex>
            </Container>
        </section>
    )
}

export default Footer