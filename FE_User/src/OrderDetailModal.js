import React, { useEffect, useState } from "react";
import "./style/OrderDetailModal.css";

const OrderDetailModal = ({ order, onClose }) => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (order) {
      localStorage.setItem("selected_order", JSON.stringify(order));
      setOrderData(order);
    } else {
      const saved = localStorage.getItem("selected_order");
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    }
  }, [order]);

  if (!orderData) return null;

  return (
    <div className="modala detail-ordera opena">
      <div className="modal-containera mdl-cnta">
        <h3 className="modal-container-titlea">Thông tin đơn hàng</h3>
        <button className="form-closea" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div className="detail-order-contenta">
          <ul className="detail-order-groupa">
            <li className="detail-order-itema">
              <span className="detail-order-item-lefta">
                <i className="fa-solid fa-calendar-days"></i> Ngày đặt hàng
              </span>
              <span className="detail-order-item-righta">
                {new Date(orderData.created_at).toLocaleDateString("vi-VN")}
              </span>
            </li>
            <li className="detail-order-itema">
              <span className="detail-order-item-lefta">
                <i className="fa-solid fa-truck"></i> Hình thức giao
              </span>
              <span className="detail-order-item-righta">
                {orderData.delivery_type || "Chưa có thông tin"}
              </span>
            </li>
            <li className="detail-order-itema">
              <span className="detail-order-item-lefta">
                <i className="fa-solid fa-clock"></i> Ngày nhận hàng
              </span>
              <span className="detail-order-item-righta">
                {orderData.delivery_date
                  ? new Date(orderData.delivery_date).toLocaleDateString(
                      "vi-VN"
                    )
                  : "Chưa có thông tin"}
              </span>
            </li>
            <li className="detail-order-itema">
              <span className="detail-order-item-lefta">
                <i className="fa-solid fa-location-dota"></i> Địa điểm nhận
              </span>
              <span className="detail-order-item-righta">
                {orderData.client_address || "Chưa có thông tin"}
              </span>
            </li>
            <li className="detail-order-itema">
              <span className="detail-order-item-lefta">
                <i className="fa-solid fa-person"></i> Người nhận
              </span>
              <span className="detail-order-item-righta">
                {orderData.client_name || "Chưa có thông tin"}
              </span>
            </li>
            <li className="detail-order-itema">
              <span className="detail-order-item-left">
                <i className="fa-solid fa-phone"></i> Số điện thoại nhận
              </span>
              <span className="detail-order-item-righta">
                {orderData.client_phone || "Chưa có thông tin"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
