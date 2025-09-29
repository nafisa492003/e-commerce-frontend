import api from "../../api/axios";

const register = (data) =>
  api.post("/authencation/registration", data, { withCredentials: true })
     .then(r => r.data);

const verifyOtp = (payload) =>
  api.post("/authencation/otpValidation", payload, { withCredentials: true })
     .then(r => r.data);

const login = (data) =>
  api.post("/authencation/login", data, { withCredentials: true })
     .then(r => r.data);

const logout = () =>
  api.post("/authencation/logout", {}, { withCredentials: true })
     .then(r => r.data);


const fetchSession = () =>
  api.get("/authencation/me", { withCredentials: true })
     .then(r => r.data);

export default { register, verifyOtp, login, logout, fetchSession };
