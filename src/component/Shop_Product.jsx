import React, { useEffect, useState } from 'react'
import Container from './Container'
import Flex from './Flex'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Shop_Product = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  // Fetch products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("https://backend-api-1-m4ak.onrender.com/api/v1/Product/getallproduct");
        setProducts(res.data);
        const uniqueCategories = [
          ...new Set(res.data.map((product) => product.category?.name || product.category))
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProduct();
  }, []);

  // Filter products based on category
  const filteredProducts =
    selectedCategory === "ALL"
      ? products
      : products.filter((p) => (p.category?.name || p.category) === selectedCategory);

  // add to cart
  const handleAddToCart = (product) => {
    if (!user) {
      toast.info("Please login to buy items");
      navigate("/login"); // redirect user to login
      return;
    }

    // sanitize price (convert to number)
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
    <section className="py-[40px]">
      <Container>
        {/* categories */}
        <Flex className="items-center gap-5 flex-wrap mb-6">
          <h2
            onClick={() => setSelectedCategory("ALL")}
            className={`px-4 py-2 rounded-xl cursor-pointer font-open_sans ${selectedCategory === "ALL" ? "bg-black text-white" : "bg-slate-200 text-black"
              }`}
          >
            ALL
          </h2>
          {categories.map((cat, index) => (
            <h2
              key={index}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl cursor-pointer font-open_sans ${selectedCategory === cat ? "bg-black text-white" : "bg-slate-200 text-black"
                }`}
            >
              {cat}
            </h2>
          ))}
        </Flex>

        {/* products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            console.log("Product from backend:", product);

            return (
              <div
                key={product._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-[#f0eeed]"
              >
                <Link key={product._id} to={`/product/${product._id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover rounded"
                  />
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
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Shop_Product