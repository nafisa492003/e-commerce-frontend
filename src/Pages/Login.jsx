import React, { useState } from "react";
import Flex from "../component/Flex";
import Container from "../component/Container";
import image from "../assets/banner_img.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logoutUser } from "../redux/slices/authSlice"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.auth);

  //  Login handler
  const handleLogin = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields!", { position: "top-center" });
      return;
    }

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then((res) => {
        toast.success("Login successful! Now you can buy", {
          position: "top-center",
        });
        navigate("/"); 
      })
      .catch((err) => {
        toast.error(err?.error || "Login failed", { position: "top-center" });
      });
  };

  //  Logout handler
  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        toast.info("You have logged out", { position: "top-center" });
        navigate("/login");
      })
      .catch(() => {
        toast.error("Logout failed", { position: "top-center" });
      });
  };

  return (
    <section className="pt-8 bg-[#f2f0f1]">
      <Container>
        <Flex className="gap-20">
          <div className="w-full lg:w-1/2 py-3">
            <h1 className="text-[34px] md:text-[50px] font-inter font-bold mb-3">
              Welcome Back
            </h1>

            {!user ? (
              <>
                <p className="font-open_sans font-semibold text-[14px] text-[#979696]">
                  You can login to your account here for better experience
                </p>

                <input
                  className="w-full lg:w-[400px] py-4 px-3 font-inter text-[18px] bg-white outline-[#979696] rounded-2xl my-8"
                  placeholder="@ Enter your e-mail here"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="w-full lg:w-[400px] py-4 px-3 font-inter text-[18px] bg-white outline-[#979696] rounded-2xl"
                  placeholder="Enter your password here"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  onClick={handleLogin}
                  className="block w-full lg:w-[400px] py-4 text-center rounded-3xl bg-black text-white font-open_sans font-semibold text-[20px] my-6"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Logging in..." : "Log In"}
                </button>

                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}

                <p className="font-open_sans font-semibold text-[14px] text-[#979696]">
                  If you don’t have an account
                  <Link
                    to="/register"
                    className="text-[18px] text-black font-inter font-bold px-2 cursor-pointer"
                  >
                    Sign Up
                  </Link>
                  here
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="block w-full lg:w-[400px] py-4 text-center rounded-3xl bg-black text-white font-open_sans font-semibold text-[20px] my-6"
                >
                  Log Out
                </button>
              </>
            )}
          </div>

          <div className="w-full md:w-1/2 hidden lg:block">
            <img className="w-full" src={image} alt="banner" />
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Login;
