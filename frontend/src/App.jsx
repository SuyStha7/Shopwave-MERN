import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import BlogPage from "./pages/BlogPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import RegisterPage from "./pages/RegisterPage";
import SearchProductPage from "./pages/SearchProductPage";

import BlogDetails from "./components/BlogDetails";
import CategoryDetails from "./components/CategoryDetails";
import ProductDetails from "./components/ProductDetails";

import Users from "./pages/Admin/Users";
import Orders from "./pages/Admin/Orders";
import Products from "./pages/Admin/Products";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/AddProduct";
import Categories from "./pages/Admin/Categories";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UpdateCategory from "./pages/Admin/UpdateCategory";
import DashboardLayout from "./pages/Admin/DashboardLayout";

const isAuthenticated = true;
const isAdminUser = true;

const App = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  useEffect(() => {
    if (isAuthenticated && isAdminUser && location.pathname === "/login") {
      <Navigate
        to='/admin'
        replace
      />;
    }
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className='tracking-wider'>
      {!isAdmin && !isAuthPage && <Navbar />}

      {/* normal routes */}
      <Routes>
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/register'
          element={<RegisterPage />}
        />
        <Route
          path='/search'
          element={<SearchProductPage />}
        />
        <Route
          path='/'
          element={<HomePage />}
        />
        <Route
          path='/shop'
          element={<ShopPage />}
        />
        <Route
          path='/product/:productId'
          element={<ProductDetails />}
        />
        <Route
          path='/category/:slug'
          element={<CategoryDetails />}
        />
        <Route
          path='/blog'
          element={<BlogPage />}
        />
        <Route
          path='/blog-detail'
          element={<BlogDetails />}
        />
        <Route
          path='/cart'
          element={<CartPage />}
        />
        <Route
          path='/checkout'
          element={<CheckoutPage />}
        />
        <Route
          path='/contact'
          element={<ContactPage />}
        />
        <Route
          path='/profile'
          element={<ProfilePage />}
        />

        {/* admin route */}
        <Route
          path='/admin'
          element={<DashboardLayout />}>
          <Route
            index
            element={<Dashboard />}
          />
          <Route
            path='users'
            element={<Users />}
          />
          <Route
            path='products'
            element={<Products />}
          />
          <Route
            path='products/update/:productId'
            element={<UpdateProduct />}
          />
          <Route
            path='products/add'
            element={<AddProduct />}
          />
          <Route
            path='categories'
            element={<Categories />}
          />
          <Route
            path='categories/update/:slug'
            element={<UpdateCategory />}
          />
          <Route
            path='orders'
            element={<Orders />}
          />
        </Route>
      </Routes>

      {!isAdmin && !isAuthPage && <Footer />}

      <ToastContainer position='bottom-right' />
    </div>
  );
};

export default App;
