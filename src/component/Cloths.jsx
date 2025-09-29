import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "./Container";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Cloths = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await axios.get("https://backend-api-1-m4ak.onrender.com/api/v1/Product/getallproduct")
      setProducts(data.data)
    }
    fetchProduct()
  }, []);
  console.log(products, "products");

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
        <h2 className="text-[40px] md:text-[60px] text-center font-bold font-inter mb-10">Clothes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-[#f0eeed]">
              <Link key={product._id} to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} className="w-full h-60 object-cover rounded" />
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-1">{product.price} Tk</p>
              </Link>
              <div className="w-full py-1 rounded-2xl bg-black text-center mt-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="text-white font-open_sans font-medium text-[18px] w-full"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Cloths;