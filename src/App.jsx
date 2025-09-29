import React, { useEffect } from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSession } from "./redux/slices/authSlice";
import RootLayout from './component/RootLayout';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Cart_page from './Pages/Cart_page';
import Product_detail_page from './Pages/Product_detail_page';
import Login from './Pages/Login';
import Register from './Pages/Register';
import AdminDashboard from './Pages/AdminDashboard';
import ProtectedRoute from './component/ProtectedRoute';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart_page />} />
      <Route path="/product/:id" element={<Product_detail_page />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* admin protected route */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSession()); // ✅ restore session on refresh
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
