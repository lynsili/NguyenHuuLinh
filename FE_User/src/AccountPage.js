import React, { useState, useEffect } from "react";
import "./style/AccountPage.css";
import Cookies from "js-cookie";

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState({
    id: null,
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = Cookies.get("token");
      const taiKhoanId = localStorage.getItem("tai_khoan_id");

      if (!token || !taiKhoanId) {
        alert("Bạn cần đăng nhập để xem thông tin tài khoản!");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/khach_hang/by-account/${taiKhoanId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUserInfo({
            id: data.id, // 🟢 cần thiết để cập nhật sau
            name: data.name || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || "",
          });
        } else {
          alert(`Lỗi lấy thông tin: ${data.message}`);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    };

    fetchUserInfo();
  }, []);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const changeInformation = async () => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thay đổi thông tin tài khoản!");
      return;
    }

    const updatedUserInfo = {
      name: userInfo.name.trim() || null,
      phone: userInfo.phone.trim() || null,
      email: userInfo.email.trim() || null,
      address: userInfo.address.trim() || null,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/khach_hang/${userInfo.id}`, // ✅ đúng URL có id
        {
          method: "PUT", // ✅ dùng PUT để cập nhật
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedUserInfo),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Thông tin đã được thay đổi thành công!");
      } else {
        alert(`Thay đổi thông tin thất bại: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi thông tin:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  const changePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thay đổi mật khẩu!");
      return;
    }

    if (!passwords.currentPassword.trim() || !passwords.newPassword.trim()) {
      alert("Mật khẩu hiện tại và mật khẩu mới không được để trống!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Mật khẩu đã được thay đổi thành công!");
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        alert(`Thay đổi mật khẩu thất bại: ${data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="main-wrapper">
      <div className="container" id="account-user">
        <div className="main-account">
          <div className="main-account-header">
            <h3>Thông tin tài khoản của bạn</h3>
            <p>Quản lý thông tin để bảo mật tài khoản</p>
          </div>
          <div className="main-account-body">
            <div className="main-account-body-col">
              <form className="info-user">
                <div className="form-group">
                  <label htmlFor="infoname" className="form-label">
                    Họ và tên
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="infoname"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="infophone" className="form-label">
                    Số điện thoại
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="phone"
                    id="infophone"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="infoemail" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="infoemail"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="infoaddress" className="form-label">
                    Địa chỉ
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    id="infoaddress"
                    value={userInfo.address}
                    onChange={handleUserInfoChange}
                  />
                </div>
              </form>
            </div>
            <div className="main-account-body-col">
              <form className="change-password">
                <div className="form-group">
                  <label htmlFor="password-cur-info" className="form-label w60">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="currentPassword"
                    id="password-cur-info"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password-after-info"
                    className="form-label w60"
                  >
                    Mật khẩu mới
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="newPassword"
                    id="password-after-info"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="password-comfirm-info"
                    className="form-label w60"
                  >
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    name="confirmPassword"
                    id="password-comfirm-info"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
              </form>
            </div>
            <div className="main-account-body-row">
              <div>
                <button id="save-info-user" onClick={changeInformation}>
                  <i className="fa-regular fa-floppy-disk"></i> Lưu thay đổi
                </button>
              </div>
              <div>
                <button id="save-password" onClick={changePassword}>
                  <i className="fa-solid fa-key"></i> Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
