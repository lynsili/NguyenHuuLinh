import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import "./style/OrderHistoryPage.css";
import OrderDetailModal from "./OrderDetailModal"; // Import modal component

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store the selected order details

  // Fetch orders when component mounts
  useEffect(() => {
    const token = Cookies.get("token");
    const userId = localStorage.getItem("tai_khoan_id");
    console.log(userId); // Kiểm tra giá trị userId

    if (userId && token) {
      setIsLoggedIn(true);
      setLoading(true);

      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/don_hang/by-tai-khoan`,
            {
              headers: { Authorization: `Bearer ${token}` },
              params: { tai_khoan_id: userId },
            }
          );
          console.log(response.data); // Log dữ liệu trả về
          setOrders(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy đơn hàng:", error);
          if (error.response) {
            console.error("Chi tiết lỗi:", error.response.data);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Search orders by phone
  const handleSearchByPhone = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/don_hang/by-phone`,
        {
          params: { phone },
        }
      );
      console.log(res.data); // Log dữ liệu trả về
      setOrders(res.data);
    } catch (err) {
      console.error("Lỗi khi tìm đơn hàng theo số điện thoại:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = async (order) => {
    const token = Cookies.get("token");
    const userId = localStorage.getItem("tai_khoan_id");

    try {
      let response;

      if (userId && token) {
        // Nếu đã đăng nhập
        response = await axios.get(
          `http://localhost:3000/api/don_hang/by-tai-khoan`,
          {
            headers: { Authorization: `Bearer ${token}` },
            params: { tai_khoan_id: userId },
          }
        );
      } else {
        // Nếu chưa đăng nhập, dùng số điện thoại
        response = await axios.get(
          `http://localhost:3000/api/don_hang/by-phone`,
          {
            params: { phone },
          }
        );
      }

      // Tìm đơn hàng tương ứng theo ID (có thể response trả về mảng)
      const foundOrder = response.data.find((o) => o.id === order.id);

      if (foundOrder) {
        localStorage.setItem("selected_order", JSON.stringify(foundOrder));
        setSelectedOrder(foundOrder);
        setIsModalOpen(true);
      } else {
        console.error("Không tìm thấy đơn hàng.");
      }
    } catch (error) {
      console.error("Lỗi khi xem chi tiết đơn hàng:", error);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false); // Đóng modal
    setSelectedOrder(null); // Xóa dữ liệu đơn hàng đã chọn
    localStorage.removeItem("selected_order"); // Xóa dữ liệu trong localStorage
  };

  // Group products by order id
  const groupOrders = (orders) => {
    const groupedOrders = orders.reduce((acc, order) => {
      const existingOrder = acc.find((o) => o.id === order.id);
      if (existingOrder) {
        existingOrder.products.push(order);
      } else {
        acc.push({
          ...order,
          products: [order],
        });
      }
      return acc;
    }, []);
    return groupedOrders;
  };

  const renderOrderHistory = () => {
    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (orders.length === 0) return <p>Không có đơn hàng nào.</p>;

    const groupedOrders = groupOrders(orders);

    return groupedOrders.map((order) => (
      <div key={order.id} className="order-history-group">
        <div className="order-history">
          {order.products.map((product, index) => (
            <div
              className="order-history-item"
              key={`${order.id}-${product.id}-${index}`}
            >
              <div className="order-history-left">
                <img
                  src={`http://localhost:3000${product.product_image_url}`}
                  alt={product.product_name}
                />
                <div className="order-history-info">
                  <h4>{product.product_name}</h4>
                  <p className="order-history-note">
                    <i className="fa-solid fa-pen"></i>{" "}
                    {product.note || "Không có ghi chú"}
                  </p>
                  <p className="order-history-quantity">x{product.quantity}</p>
                </div>
              </div>
              <div className="order-history-right">
                <div className="order-history-price">
                  <span className="order-history-current-price">
                    Đơn giá:{" "}
                    {product.product_unit_price
                      ? Number(product.product_unit_price).toLocaleString() +
                        "₫"
                      : "Chưa có giá"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="order-history-control">
          <div className="order-history-status">
            <span
              className={`order-history-status-sp ${
                order.status === "Đang xử lý" ? "no-complete" : "complete"
              }`}
            >
              {order.status || "Đang xử lý"}
            </span>
            <button
              id="order-history-detail"
              onClick={() => handleViewOrderDetails(order)}
            >
              <i className="fa-solid fa-eye"></i> Xem chi tiết
            </button>
          </div>
          <div className="order-history-total">
            <span className="order-history-total-desc">Tổng tiền: </span>
            <span className="order-history-toltal-price">
              {order.total_price
                ? Number(order.total_price).toLocaleString() + "₫"
                : "Chưa có giá"}
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container open" id="order-history">
      <div className="main-account">
        <div className="main-account-header">
          <h3>Quản lý đơn hàng của bạn</h3>
          <p>Xem chi tiết, trạng thái của những đơn hàng đã đặt.</p>
        </div>

        {!isLoggedIn && (
          <div className="search-by-phone">
            <input
              type="tel"
              placeholder="Nhập số điện thoại của bạn"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-search-phone"
            />
            <button
              onClick={handleSearchByPhone}
              className="input-button-phone"
            >
              🔍
            </button>
          </div>
        )}

        <div className="main-account-body">
          <div className="order-history-section">{renderOrderHistory()}</div>
        </div>
      </div>

      {/* Render modal when isModalOpen is true */}
      {isModalOpen && (
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default OrderHistoryPage;
