import React, { useEffect, useState } from 'react'
import Container from '../component/Container'
import Flex from '../component/Flex'
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Product_detail_page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
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


  const handleAddToCart = (product) => {
    if (!user) {
      toast.info("Please login to buy items");
      navigate("/login");
      return;
    }

    const sanitizedProduct = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: parseInt(product.price.replace(/[^\d]/g, ""), 10),
    };

    dispatch(addToCart(sanitizedProduct));
    toast.success(`${product.name} added to cart!`);
  };



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
               <button
                  onClick={() => handleAddToCart(product)}
                  className="text-white font-open_sans font-medium text-[18px] w-full"
                >
                  Add To Cart
                </button>
            </div>
          </div>
        </Flex>
      </Container>
    </section>
  );
};


export default Product_detail_page