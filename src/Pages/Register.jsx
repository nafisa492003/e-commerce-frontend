import React, { useState } from "react";
import Flex from "../component/Flex";
import Container from "../component/Container";
import image from "../assets/banner_img.png";
import { useDispatch } from "react-redux";
import { registerUser, verifyOtp } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");

  // handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // handle register submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await dispatch(registerUser(form)).unwrap();
      toast.success("Registration submitted — check your email for OTP");
      setShowOtpModal(true);
    } catch (err) {
      toast.error(err.error || "Registration failed");
    }
  };

  // handle OTP verify
  const handleVerify = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      await dispatch(verifyOtp({ email: form.email, otp })).unwrap();
      toast.success("Verified! You can now login");
      setShowOtpModal(false);

      // ✅ redirect to login after verification
      navigate("/login");
    } catch (err) {
      toast.error(err.error || "OTP verification failed");
    }
  };

  return (
    <section className="pt-8 bg-[#f2f0f1]">
      <Container>
        <Flex className="gap-20">
          <div className="w-full lg:w-1/2 py-3">
            <h1 className="text-[34px] md:text-[50px] font-inter font-bold mb-3">
              REGISTER
            </h1>
            <p className="font-open_sans font-semibold text-[16px] text-[#979696]">
              You can register your account here for better experience
            </p>

            {/* Register Form */}
            <form onSubmit={handleSubmit}>
              <input
                className="w-full lg:w-[400px] py-4 px-3 font-inter text-[18px] bg-white outline-[#979696] rounded-2xl my-8"
                placeholder="First name"
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />

              <input
                className="w-full lg:w-[400px] py-4 px-3 font-inter text-[18px] bg-white outline-[#979696] rounded-2xl"
                placeholder="Last name"
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />

              <input
                className="w-full lg:w-[400px] py-4 px-3 font-inter text-[18px] bg-white outline-[#979696] rounded-2xl my-8"
                placeholder="@ Enter your e-mail here"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <input
                className="w-full lg:w-[400px] py-4 px-3 font-inter text-[18px] bg-white outline-[#979696] rounded-2xl"
                placeholder="Enter your password here"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="block w-full lg:w-[400px] py-4 text-center rounded-3xl bg-black text-white font-open_sans font-semibold text-[20px] my-6"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="w-full md:w-1/2 hidden lg:block">
            <img className="w-full h-full" src={image} alt="" />
          </div>
        </Flex>
      </Container>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-3">
              Enter OTP sent to {form.email}
            </h3>
            <input
              className="w-full py-2 px-3 border rounded mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={handleVerify}
                className="px-4 py-2 bg-black text-white rounded"
              >
                Verify OTP
              </button>
              <button
                onClick={() => setShowOtpModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;