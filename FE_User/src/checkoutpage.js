import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style/CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    deliveryDate: "Hôm nay",
    deliveryType: "Giao tận nơi",
    deliveryTime: "Giao ngay khi xong",
    branch: "",
  });

  const userId = JSON.parse(localStorage.getItem("tai_khoan_id"));

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/api/gio_hang/user/${userId}`)
        .then((res) => {
          setCartItems(res.data);
          calculateTotal(res.data);
          if (res.data.length > 0) {
            setFormData((prev) => ({
              ...prev,
              note: res.data[0].note || "",
            }));
          }
        })
        .catch((err) => console.error("Lỗi lấy giỏ hàng:", err));

      axios
        .get(`http://localhost:3000/api/khach_hang/by-account/${userId}`)
        .then((res) => {
          const data = res.data;
          setFormData((prev) => ({
            ...prev,
            name: data.name || "",
            phone: data.phone || "",
            address: data.address || "",
          }));
        })
        .catch((err) => console.error("Lỗi lấy thông tin khách:", err));
    } else {
      // Dữ liệu giỏ hàng và thông tin mặc định nếu chưa login
      const defaultCartItems =
        JSON.parse(localStorage.getItem("gio_hang")) || [];
      setCartItems(defaultCartItems);
      calculateTotal(defaultCartItems);
      const defaultFormData = {
        name: "",
        phone: "",
        address: "",
        note: "",
        deliveryDate: "Hôm nay",
        deliveryType: "Giao tận nơi",
        deliveryTime: "Giao ngay khi xong",
        branch: "",
      };
      setFormData(defaultFormData);
    }
  }, [userId]);

  const calculateTotal = (items) => {
    const sum = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum);
  };

  const handleGoBack = () => navigate(-1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckout = async () => {
    // Kiểm tra thông tin người dùng
    if (!userId && cartItems.length === 0) {
      alert("Không thể đặt hàng vì thiếu thông tin!");
      return;
    }

    if (!formData.name || !formData.phone || !formData.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10,12}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Số điện thoại phải có từ 10 đến 12 chữ số!");
      return;
    }

    const shippingFee = formData.deliveryType === "Giao tận nơi" ? 30000 : 0;

    const orderData = {
      user_id: userId,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      delivery_date:
        formData.deliveryType === "Giao tận nơi" ? formData.deliveryDate : null,
      delivery_type: formData.deliveryType,
      delivery_time:
        formData.deliveryType === "Giao tận nơi" ? formData.deliveryTime : null,
      branch: formData.deliveryType === "Tự đến lấy" ? formData.branch : null,
      total_price: total + shippingFee,
      status: "Đang xử lý", // Đang xử lý
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      // Nếu người dùng chưa có khách hàng trong hệ thống, tạo mới
      if (!userId) {
        const newCustomerData = {
          name: formData.name,
          email: "", // Nếu không có email có thể để trống
          phone: formData.phone,
          address: formData.address,
          tai_khoan_id: null, // Nếu khách chưa đăng nhập, để null
        };

        // Thêm khách hàng mới vào bảng khách hàng
        const newCustomerResponse = await axios.post(
          "http://localhost:3000/api/khach_hang",
          newCustomerData
        );
        const newCustomerId = newCustomerResponse.data.id; // Lấy id của khách hàng mới

        // Cập nhật thông tin khách hàng và lưu đơn hàng với client_id
        orderData.user_id = newCustomerId; // Cập nhật user_id bằng client_id của khách hàng mới

        console.log("Dữ liệu khách hàng mới:", newCustomerData);
      }

      // Lưu đơn hàng vào bảng don_hang
      await axios.post("http://localhost:3000/api/don_hang", orderData);
      console.log("Dữ liệu gửi lên đơn hàng:", orderData);

      alert("Đặt hàng thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      alert("Đặt hàng thất bại. Vui lòng thử lại.");
    }
  };

  const shippingFee = formData.deliveryType === "Giao tận nơi" ? 30000 : 0;

  return (
    <div className="checkout-page active">
      <div className="checkout-header">
        <div className="checkout-return">
          <button onClick={handleGoBack}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        </div>
        <h2 className="checkout-title">Thanh toán</h2>
      </div>

      <main className="checkout-section container">
        <div className="checkout-col-left">
          <div className="checkout-row">
            <div className="checkout-col-title">Thông tin đơn hàng</div>
            <div className="checkout-col-content">
              <div className="content-group">
                <p className="checkout-content-label">Hình thức giao nhận</p>
                <div className="checkout-type-order">
                  <button
                    className={`type-order-btn ${
                      formData.deliveryType === "Giao tận nơi" ? "active" : ""
                    }`}
                    onClick={() => handleSelect("deliveryType", "Giao tận nơi")}
                  >
                    🛵 Giao tận nơi
                  </button>
                  <button
                    className={`type-order-btn ${
                      formData.deliveryType === "Tự đến lấy" ? "active" : ""
                    }`}
                    onClick={() => handleSelect("deliveryType", "Tự đến lấy")}
                  >
                    🏪 Tự đến lấy
                  </button>
                </div>
              </div>

              {/* Ngày giao và thời gian giao chỉ hiển thị khi giao tận nơi */}
              {formData.deliveryType === "Giao tận nơi" && (
                <>
                  <div className="content-group">
                    <p className="checkout-content-label">Ngày giao hàng</p>
                    <div className="date-order">
                      {["Hôm nay", "Ngày mai", "Ngày kia"].map((label, idx) => (
                        <button
                          key={label}
                          type="button"
                          className={`pick-date ${
                            formData.deliveryDate === label ? "active" : ""
                          }`}
                          onClick={() => handleSelect("deliveryDate", label)}
                        >
                          <span className="text">{label}</span>
                          <span className="date">
                            {new Date(
                              Date.now() + idx * 86400000
                            ).toLocaleDateString("vi-VN")}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="content-group chk-ship">
                    <p className="checkout-content-label">
                      Thời gian giao hàng
                    </p>
                    <div className="delivery-time">
                      <input
                        type="radio"
                        name="deliveryTime"
                        id="giaongay"
                        checked={formData.deliveryTime === "Giao ngay khi xong"}
                        onChange={() =>
                          handleSelect("deliveryTime", "Giao ngay khi xong")
                        }
                      />
                      <label htmlFor="giaongay">Giao ngay khi xong</label>
                    </div>
                    <div className="delivery-time">
                      <input
                        type="radio"
                        name="deliveryTime"
                        id="deliverytime"
                        checked={formData.deliveryTime !== "Giao ngay khi xong"}
                        onChange={() =>
                          handleSelect("deliveryTime", "08:00 - 09:00")
                        }
                      />
                      <label htmlFor="deliverytime">Giao vào giờ</label>
                      <select
                        className="choise-time"
                        value={formData.deliveryTime}
                        onChange={(e) =>
                          handleSelect("deliveryTime", e.target.value)
                        }
                      >
                        {[
                          "08:00 - 09:00",
                          "09:00 - 10:00",
                          "10:00 - 11:00",
                          "11:00 - 12:00",
                        ].map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Chọn chi nhánh khi tự đến lấy */}
              {formData.deliveryType === "Tự đến lấy" && (
                <div className="content-group" id="tudenlay-group">
                  <p className="checkout-content-label">
                    Lấy hàng tại chi nhánh
                  </p>
                  <div className="delivery-time">
                    <input
                      type="radio"
                      name="branch"
                      id="chinhanh-1"
                      value="273 An Dương Vương, Phường 3, Quận 5"
                      checked={
                        formData.branch ===
                        "273 An Dương Vương, Phường 3, Quận 5"
                      }
                      onChange={handleChange}
                    />
                    <label htmlFor="chinhanh-1">
                      273 An Dương Vương, Phường 3, Quận 5
                    </label>
                  </div>
                  <div className="delivery-time">
                    <input
                      type="radio"
                      name="branch"
                      id="chinhanh-2"
                      value="04 Tôn Đức Thắng, Phường Bến Nghé, Quận 1"
                      checked={
                        formData.branch ===
                        "04 Tôn Đức Thắng, Phường Bến Nghé, Quận 1"
                      }
                      onChange={handleChange}
                    />
                    <label htmlFor="chinhanh-2">
                      04 Tôn Đức Thắng, Phường Bến Nghé, Quận 1
                    </label>
                  </div>
                </div>
              )}

              <div className="content-group">
                <p className="checkout-content-label">Ghi chú đơn hàng</p>
                <textarea
                  className="note-order"
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  placeholder="Nhập ghi chú"
                />
              </div>
            </div>
          </div>

          <div className="checkout-row">
            <div className="checkout-col-title">Thông tin người nhận</div>
            <div className="checkout-col-content">
              <form className="info-nhan-hang">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Tên người nhận"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Số điện thoại nhận hàng"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Địa chỉ nhận hàng"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control chk-ship"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="checkout-col-right">
          <p className="checkout-content-label">Đơn hàng</p>
          <div className="bill-total">
            {cartItems.map((item, index) => (
              <div className="food-total" key={`${item.product_id}-${index}`}>
                {" "}
                {/* Kết hợp product_id và index làm key */}
                <div className="count">{item.quantity}x</div>
                <div className="info-food">
                  <div className="name-food">{item.name}</div>
                </div>
              </div>
            ))}
            {formData.note && (
              <div className="food-note">
                <strong>Ghi chú:</strong> {formData.note}
              </div>
            )}
          </div>

          <div className="bill-payment">
            <div className="total-bill-order">
              <div className="priceFlx">
                <div className="text">
                  Tiền hàng{" "}
                  <span className="count">{cartItems.length} món</span>
                </div>
                <div className="price-detail">
                  <span id="checkout-cart-total">
                    {total.toLocaleString()} ₫
                  </span>
                </div>
              </div>
              <div className="priceFlx chk-ship">
                <div className="text">Phí vận chuyển</div>
                <div className="price-detail chk-free-ship">
                  <span>
                    {shippingFee > 0
                      ? `${shippingFee.toLocaleString()} ₫`
                      : "Miễn phí"}
                  </span>
                </div>
              </div>
            </div>
            <div className="policy-note">
              Bằng việc bấm vào nút “Đặt hàng”, tôi đồng ý với
              <a href="/chinh-sach" target="_blank" rel="noopener noreferrer">
                {" "}
                chính sách hoạt động{" "}
              </a>
              của chúng tôi.
            </div>
          </div>

          <div className="total-checkout">
            <div className="text">Tổng tiền</div>
            <div className="price-bill">
              <div className="price-final" id="checkout-cart-price-final">
                {(total + shippingFee).toLocaleString()} ₫
              </div>
            </div>
          </div>

          <button className="complete-checkout-btn" onClick={handleCheckout}>
            Đặt hàng
          </button>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
