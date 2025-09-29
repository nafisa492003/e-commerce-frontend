import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import brand_1 from '../assets/brand_1.png'
import brand_2 from '../assets/brand_2.png'
import brand_3 from '../assets/brand_3.png'
import brand_4 from '../assets/brand_4.png'
import brand_5 from '../assets/brand_5.png'
import Container from './Container';

const Brand = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false
                }
            }
        ]
    };

    return (
        <section className='py-10 bg-black'>
            <Container>
                <Slider {...settings}>
                    <div className="px-2">
                        <img src={brand_1} alt="brand 1" className="w-40 mx-auto" />
                    </div>
                    <div className="px-2">
                        <img src={brand_2} alt="brand 2" className="w-40 mx-auto" />
                    </div>
                    <div className="px-2">
                        <img src={brand_3} alt="brand 3" className="w-40 mx-auto" />
                    </div>
                    <div className="px-2">
                        <img src={brand_4} alt="brand 4" className="w-40 mx-auto" />
                    </div>
                    <div className="px-2">
                        <img src={brand_5} alt="brand 5" />
                    </div>
                </Slider>
            </Container>
        </section>
    )
}

export default Brand
