import React, { useEffect, useState } from "react";
import "./style/Cart.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  const userId = JSON.parse(localStorage.getItem("tai_khoan_id")); // lưu ý key là "tai_khoan.id"

  useEffect(() => {
    console.log("✅ Cart useEffect chạy");
    console.log("➡️ userId:", userId);

    if (userId) {
      axios
        .get(`http://localhost:3000/api/gio_hang/user/${userId}`) // dùng domain rõ ràng
        .then((res) => {
          console.log("📦 Dữ liệu giỏ hàng:", res.data);
          setCartItems(res.data);
          calculateTotal(res.data);
        })
        .catch((err) => {
          console.error("❌ Lỗi lấy giỏ hàng:", err);
        });
    }
  }, [isOpen, userId]);

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
  };

  const handleCheckout = () => {
    onClose(); // 👉 Đóng modal giỏ hàng trước
    navigate("/checkout", {
      state: {
        cartItems,
        total,
      },
    });
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`http://localhost:3000/api/gio_hang/${id}`)
      .then(() => {
        const updated = cartItems.filter((item) => item.id !== id);
        setCartItems(updated);
        calculateTotal(updated);
      })
      .catch((err) => console.error("❌ Xóa sản phẩm thất bại:", err));
  };

  const handleChangeQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);

    axios
      .put(`http://localhost:3000/api/gio_hang/${id}`, { quantity })
      .catch((err) => console.error("❌ Lỗi cập nhật số lượng sản phẩm:", err));
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-cart ${isOpen ? "open" : ""}`}>
      <div className="cart-container">
        <div className="cart-header">
          <span style={{ fontSize: "24px" }}>🧺</span>
          <h3 className="titlegh">Giỏ hàng</h3>
          <button className="cart-close" onClick={onClose}>
            <span style={{ fontSize: "20px" }}>🞩</span>
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="gio-hang-trong">
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Không có sản phẩm nào trong giỏ hàng của bạn</p>
            </div>
          ) : (
            <ul className="cart-list">
              {cartItems.map((item) => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item-row">
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.name}</p>
                      <span className="cart-item-price">
                        {item.price.toLocaleString()}đ
                      </span>
                    </div>
                  </div>

                  <div className="cart-item-note">
                    <span className="note-icon">✏️</span>
                    <span>{item.note || "Không có ghi chú"}</span>
                  </div>

                  <div className="cart-item-bottom">
                    <button
                      className="cart-item-delete"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      🗑️Xóa
                    </button>
                    <div className="cart-item-qty">
                      <button
                        onClick={() =>
                          handleChangeQuantity(
                            item.id,
                            Math.max(item.quantity - 1, 1)
                          )
                        }
                        className="qty-btn is-form"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleChangeQuantity(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="qty-input"
                      />
                      <button
                        onClick={() =>
                          handleChangeQuantity(item.id, item.quantity + 1)
                        }
                        className="qty-btn is-form"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total-price">
            <p className="text-tt">Tổng tiền:</p>
            <p className="text-price">{total.toLocaleString()}đ</p>
          </div>
          <div className="cart-footer-payment">
            <button className="them-mon" onClick={onClose}>
              ➕ Thêm sản phẩm
            </button>
            <button className="thanh-toan" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
