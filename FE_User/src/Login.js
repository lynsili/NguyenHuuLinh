import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "./style/Login.css";

function Login({ isOpen, onClose, isRegister }) {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("callbackUrl") || "/"
      : "/";

  useEffect(() => {
    setIsSignUp(isRegister);
  }, [isRegister]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate(callbackUrl);
    }
  }, [callbackUrl, navigate]);

  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { username, password } = formData;
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, user } = response.data;

      if (!token) throw new Error("Token không hợp lệ");
      Cookies.set("token", token, { expires: 1, path: "/" });
      localStorage.setItem("tai_khoan_id", user.id);
      localStorage.setItem("username", user.username);

      onClose();
      navigate(callbackUrl);
      window.location.reload();
    } catch (err) {
      console.error("Error during login:", err.response?.data || err);
      setError(err.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsSignUp(false);
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal signup-login">
      <div className={`modal-container ${isSignUp ? "active" : ""}`}>
        <button className="form-close" onClick={onClose}>
          &times;
        </button>
        <div className="forms">
          {/* Đăng nhập */}
          <div className="form-content login-form">
            <h2 className="form-title">Đăng nhập</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  className="f-login"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  className="f-login"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? <div className="spinner"></div> : "Đăng nhập"}
              </button>
            </form>
            <div className="change-login">
              <span>Bạn chưa có tài khoản?</span>{" "}
              <button onClick={toggleForm} className="change-form-btn">
                Đăng ký
              </button>
            </div>
          </div>

          {/* Đăng ký */}
          <div className="form-content sign-up">
            <h2 className="form-title">Đăng ký</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  className="f-login"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="f-login"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  className="f-login"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? <div className="spinner"></div> : "Đăng ký"}
              </button>
            </form>
            <div className="change-login">
              <span>Đã có tài khoản?</span>{" "}
              <button onClick={toggleForm} className="change-form-btn">
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
