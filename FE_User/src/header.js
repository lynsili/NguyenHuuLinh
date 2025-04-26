import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import Cookies from "js-cookie";
import axios from "axios";
import "./style/header.css";
import Login from "./Login";

function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [userName, setUserName] = useState("Tài khoản");
  const [isRegister, setIsRegister] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const storedName = localStorage.getItem("username");
    const storedTaiKhoanId = localStorage.getItem("tai_khoan_id");

    // Kiểm tra và cập nhật thông tin tài khoản
    if (storedName && storedTaiKhoanId) {
      setUserName(storedName);
    }

    if (storedTaiKhoanId && token && !storedName) {
      axios
        .get(`http://localhost:3000/api/users/${storedTaiKhoanId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const apiName = res.data?.username;
          if (apiName) {
            setUserName(apiName);
            localStorage.setItem("username", apiName);
          }
        })
        .catch((err) => console.error("Lỗi khi lấy thông tin tài khoản:", err));
    } else if (!token) {
      setUserName("Tài khoản");
    }

    // Lấy số lượng sản phẩm trong giỏ hàng
    if (storedTaiKhoanId && token) {
      axios
        .get(
          `http://localhost:3000/api/gio_hang/user/${storedTaiKhoanId}/quantity`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          const totalQuantity = parseInt(response.data.total_quantity, 10); // Chuyển đổi sang số nguyên
          setCartQuantity(isNaN(totalQuantity) ? 0 : totalQuantity); // Nếu không phải số hợp lệ, gán 0
        })
        .catch((error) => {
          console.error("Lỗi khi lấy số lượng giỏ hàng:", error);
        });
    }
  }, []);

  const myAccount = () => navigate("/my-account");
  const orderHistory = () => navigate("/orders");

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("tai_khoan_id");
    localStorage.removeItem("username");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container-header">
        {/* Logo */}
        <div className="logo">
          <img src="./img/LynTag.png" alt="LynFood" />
        </div>

        {/* Menu */}
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Trang chủ</Link>
            </li>
            <li>
              <Link to="/review">Giới thiệu</Link>
            </li>
            <li>
              <Link to="/contact">Liên hệ</Link>
            </li>
            <li>
              <Link to="/products">Sản phẩm</Link>
            </li>
            <li
              className="dropdown"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <span>Khác ▾</span>
              <ul className={`dropdown-menu ${showCategories ? "show" : ""}`}>
                <li>
                  <Link to="/orders">Tra cứu đơn hàng</Link>
                </li>
                {/* thêm link danh mục nếu cần */}
              </ul>
            </li>
          </ul>
        </nav>

        {/* Góc phải */}
        <div className="header-middle-right">
          <ul className="header-middle-right-list">
            {/* Tài khoản */}
            <li className="header-middle-right-item dropdown open">
              <i
                className="fa-regular fa-user"
                style={{ marginRight: "8px" }}
              ></i>
              <div className="auth-container">
                {Cookies.get("token") ? (
                  <>
                    <span className="text-dndk">Tài khoản</span>
                    <span className="text-tk">
                      {userName}{" "}
                      <i className="fa-sharp fa-solid fa-caret-down"></i>
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-dndk">Đăng nhập / Đăng ký</span>
                    <span className="text-tk">
                      Tài khoản{" "}
                      <i className="fa-sharp fa-solid fa-caret-down"></i>
                    </span>
                  </>
                )}
              </div>

              <ul className="header-middle-right-menu">
                {Cookies.get("token") ? (
                  <>
                    <li>
                      <button onClick={myAccount}>
                        <i className="fa-regular fa-user"></i> Tài khoản của tôi
                      </button>
                    </li>
                    <li>
                      <button onClick={orderHistory}>
                        <i className="fa-solid fa-bag-shopping"></i> Đơn hàng đã
                        mua
                      </button>
                    </li>
                    <li className="border">
                      <button onClick={logout}>
                        <i className="fa-solid fa-right-from-bracket"></i> Thoát
                        tài khoản
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setIsRegister(false);
                          setShowLoginModal(true);
                        }}
                      >
                        <i className="fa-solid fa-right-to-bracket"></i> Đăng
                        nhập
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setIsRegister(true);
                          setShowLoginModal(true);
                        }}
                      >
                        <i className="fa-solid fa-user-plus"></i> Đăng ký
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </li>

            {/* Giỏ hàng */}
            <li
              className="header-middle-right-item open"
              onClick={() => setShowCart(true)}
            >
              <div className="cart-icon-menu">
                <i className="fa-solid fa-cart-shopping"></i>
                <span className="count-product-cart">{cartQuantity}</span>
              </div>
              <span style={{ paddingLeft: "10px" }}>Giỏ hàng</span>
            </li>
          </ul>
        </div>

        {/* Modal giỏ hàng */}
        <Cart isOpen={showCart} onClose={() => setShowCart(false)} />
      </div>

      {/* Modal đăng nhập/đăng ký */}
      {showLoginModal && (
        <Login
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          isRegister={isRegister}
        />
      )}
    </header>
  );
}

export default Header;
