import React from "react";
import "./style/HomeSlider.css"; // Đường dẫn đến file CSS của bạn
function HomeSlider() {
  return (
    <div className="main-wrapper">
      <div className="home-slider">
        <img src="./img/LynTag.png" alt="Banner 1" />
        {/* 
            <img src="./assets/img/banner-2.png" alt="Banner 2" />
            <img src="./assets/img/banner-3.png" alt="Banner 3" />
            <img src="./assets/img/banner-4.png" alt="Banner 4" />
            <img src="./assets/img/banner-5.png" alt="Banner 5" />
          */}
      </div>

      {/* Home Service Section */}
      <div className="home-service" id="home-service">
        <div className="home-service-item">
          <div className="home-service-item-icon">
            <i className="fa-solid fa-truck-fast"></i>
          </div>
          <div className="home-service-item-content">
            <h4 className="home-service-item-content-h">GIAO HÀNG NHANH</h4>
            <p className="home-service-item-content-desc">
              Cho tất cả đơn hàng
            </p>
          </div>
        </div>
        <div className="home-service-item">
          <div className="home-service-item-icon">
            <i className="fa-solid fa-shield-heart"></i>
          </div>
          <div className="home-service-item-content">
            <h4 className="home-service-item-content-h">SẢN PHẨM AN TOÀN</h4>
            <p className="home-service-item-content-desc">Cam kết chất lượng</p>
          </div>
        </div>
        <div className="home-service-item">
          <div className="home-service-item-icon">
            <i className="fa-solid fa-headset"></i>
          </div>
          <div className="home-service-item-content">
            <h4 className="home-service-item-content-h">HỖ TRỢ 24/7</h4>
            <p className="home-service-item-content-desc">
              Tất cả ngày trong tuần
            </p>
          </div>
        </div>
        <div className="home-service-item">
          <div className="home-service-item-icon">
            <i className="fa-solid fa-money-bill-wave"></i>
          </div>
          <div className="home-service-item-content">
            <h4 className="home-service-item-content-h">HOÀN LẠI TIỀN</h4>
            <p className="home-service-item-content-desc">Nếu không hài lòng</p>
          </div>
        </div>
      </div>
      <div
        className="home-title-block"
        id="home-title"
        style={{ display: "block" }}
      >
        <h2 className="home-title">Khám phá thực đơn của chúng tôi</h2>
      </div>
    </div>
  );
}

export default HomeSlider;
