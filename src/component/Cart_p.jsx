import React from "react";
import Container from "./Container";
import Flex from "./Flex";
import { FaPlus } from "react-icons/fa6";
import { TiMinus } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQty, decreaseQty } from "../redux/slices/cartSlice";

const Cart_p = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + (Number(item.price) || 0) * item.quantity,
    0
  );
  const deliveryFee = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;
    console.log("Cart Items:", cartItems);
  return (
    <section className="py-8">
      <Container>
        <h1 className="text-center text-[40px] font-inter font-bold mb-4">
          YOUR CART
        </h1>

        <Flex className={`items-start gap-10 flex-col md:flex-row`}>
          {/* Left side: cart items */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            {cartItems.length === 0 ? (
              <h2 className="text-center text-[20px] text-gray-500">
                Your cart is empty
              </h2>
            ) : (
              cartItems.map((item) => (
                <Flex
                  key={item._id}
                  className={`w-full border border-blue-50 p-4 shadow-lg justify-between flex-col md:flex-row`}
                >
                  {/* image */}
                  <div className="w-full md:w-[250px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded"
                    />
                  </div>

                  {/* name + price */}
                  <Flex className={`flex-col justify-between`}>
                    <h1 className="text-[24px] text-black font-semibold font-open_sans">
                      {item.name}
                    </h1>
                    <p className="text-[18px] text-black font-medium font-open_sans">
                      {item.price} Tk
                    </p>
                  </Flex>

                  {/* actions */}
                  <Flex className={`flex-col gap-6 items-end`}>
                    <RiDeleteBin5Line
                      className="text-[20px] text-red-600 cursor-pointer"
                      onClick={() => dispatch(removeFromCart(item._id))}
                    />

                    <Flex
                      className={`items-center gap-3 px-5 py-2 bg-slate-200 rounded-lg w-[120px]`}
                    >
                      <span
                        className="text-[20px] text-slate-600 font-open_sans font-bold cursor-pointer"
                        onClick={() => dispatch(decreaseQty(item._id))}
                      >
                        <TiMinus />
                      </span>
                      <span className="text-[20px] text-slate-600 font-open_sans font-bold">
                        {item.quantity}
                      </span>
                      <span
                        className="text-[20px] text-slate-600 font-open_sans font-bold cursor-pointer"
                        onClick={() => dispatch(increaseQty(item._id))}
                      >
                        <FaPlus />
                      </span>
                    </Flex>
                  </Flex>
                </Flex>
              ))
            )}
          </div>

          {/* Right side: order summary */}
          <Flex
            className={`flex-col gap-4 border-[1px] border-stone-600 p-4 w-full md:w-1/2`}
          >
            <h1 className="text-[24px] text-black font-bold font-inter">
              Order Summary
            </h1>

            <Flex
              className={`items-center justify-between py-2 border-b border-[#7a7a7a]`}
            >
              <span className="text-[18px] text-[#7a7a7a] font-open_sans font-medium">
                Subtotal
              </span>
              <span className="text-[18px] text-black font-open_sans font-medium">
                {subtotal} Tk
              </span>
            </Flex>

            <Flex
              className={`items-center justify-between py-2 border-b border-[#7a7a7a]`}
            >
              <span className="text-[18px] text-[#7a7a7a] font-open_sans font-medium">
                Delivery Fee
              </span>
              <span className="text-[18px] text-black font-open_sans font-medium">
                {deliveryFee} Tk
              </span>
            </Flex>

            <Flex
              className={`items-center justify-between py-2 border-b border-[#7a7a7a]`}
            >
              <span className="text-[18px] text-[#7a7a7a] font-open_sans font-medium">
                Total
              </span>
              <span className="text-[18px] text-black font-open_sans font-medium">
                {total} Tk
              </span>
            </Flex>

            <div className="w-full py-3 text-center bg-black rounded-2xl cursor-pointer mt-6">
              <span className="text-white font-bold font-inter text-[24px]">
                Check Out
              </span>
            </div>
          </Flex>
        </Flex>
      </Container>
    </section>
  );
};

export default Cart_p;
