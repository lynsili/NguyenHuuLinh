import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./style/App.css";
import Header from "./header";
import Footer from "./footer";
import HomePage from "./HomePage";

import NotFound from "./NotFound";
import CartForm from "./CartForm";
import CheckoutPage from "./checkoutpage";
import LoginPage from "./Login";
import MyAccountPage from "./AccountPage";
import OrderHistoryPage from "./OrderHistoryPage"; // Import trang Order History
import ContactPage from "./ContactPage";
import DetailedHomePage from "./DetailedHomePage";
import AboutPage from "./AboutPage";
import Cookies from "js-cookie";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<DetailedHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/review" element={<AboutPage />} />
        <Route path="/products" element={<HomePage />} />
        <Route path="/cart" element={<CartForm />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/my-account" element={<MyAccountPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />{" "}
        {/* Thêm route cho Order History */}
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

     

      <Footer isAuthenticated={isAuthenticated} />
    </div>
  );
}

export default App;
