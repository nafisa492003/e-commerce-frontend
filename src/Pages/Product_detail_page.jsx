import React, { useEffect, useState } from 'react'
import Container from '../component/Container'
import Flex from '../component/Flex'
import { useParams, Link } from "react-router-dom";
import axios from "axios";
const Product_detail_page = () => {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://backend-api-1-m4ak.onrender.com/api/v1/Product/getsingleproduct/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <section className="py-10">
      <Container>
        <Flex className={`items-center gap-10 flex-col md:flex-row`}>
          <div className="w-full md:w-1/2">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4 items-start">
            <h1 className="font-open_sans font-semibold text-[40px]">
              {product.name}
            </h1>
            <p className="font-open_sans text-[18px] font-normal text-[#969696] w-full">
              {product.description}
            </p>
            <p className="text-blue-600 font-bold text-xl">{product.price} Tk</p>
            <div className="w-full py-1 rounded-2xl bg-black text-center mt-3">
              <Link
                to="/cart"
                className="text-white font-open_sans font-medium text-[18px]"
              >
                Add To Cart
              </Link>
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  );
};


export default Product_detail_page