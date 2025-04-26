import React from "react";
import { Link } from "react-router-dom";
import "./style/DetailedHomePage.css";

const DetailedHomePage = () => {
  return (
    <div className="detailed-homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1>Chào mừng đến với Lyn Food</h1>
          <p>Khám phá những món ăn ngon tuyệt vời, giao hàng nhanh chóng</p>
          <Link
            to="/products"
            className="hero-btn"
            style={{ textDecoration: "none" }}
          >
            Xem thực đơn
          </Link>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="featured-dishes">
        <h2>Món ăn nổi bật</h2>
        <div className="dishes-grid">
          <div className="dish-card">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
              alt="Pizza"
            />
            <h3>Pizza Ý truyền thống</h3>
            <p>Đế mỏng giòn, phô mai tan chảy, topping tươi ngon</p>
          </div>
          <div className="dish-card">
            <img
              src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80"
              alt="Burger"
            />
            <h3>Burger bò Mỹ</h3>
            <p>Thịt bò tươi, rau củ tươi ngon, bánh mì mềm mịn</p>
          </div>

          <div className="dish-card">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="Salad"
            />
            <h3>Salad tươi mát</h3>
            <p>Rau củ hữu cơ, nước sốt đặc biệt, thanh mát</p>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="special-offers">
        <h2>Ưu đãi đặc biệt</h2>
        <div className="offers-grid">
          <div className="offer-card">
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
              alt="Discount Pizza"
            />
            <div className="offer-info">
              <h3>Giảm giá 20% cho Pizza</h3>
              <p>Chỉ áp dụng trong tuần này</p>
            </div>
          </div>
          <div className="offer-card">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
              alt="Free Delivery"
            />
            <div className="offer-info">
              <h3>Miễn phí giao hàng</h3>
              <p>Cho đơn hàng trên 200.000 VND</p>
            </div>
          </div>
          <div className="offer-card">
            <img
              src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80"
              alt="Combo Meal"
            />
            <div className="offer-info">
              <h3>Combo tiết kiệm</h3>
              <p>Gồm 3 món ăn yêu thích với giá ưu đãi</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Khách hàng nói gì về chúng tôi</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "Món ăn rất ngon, giao hàng nhanh và nhân viên thân thiện. Tôi sẽ
              quay lại!"
            </p>
            <h4>- Nguyễn Văn A</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Thực đơn đa dạng, chất lượng tuyệt vời. Giá cả hợp lý, rất hài
              lòng."
            </p>
            <h4>- Trần Thị B</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Dịch vụ chuyên nghiệp, món ăn được đóng gói cẩn thận. Rất đáng
              tin cậy!"
            </p>
            <h4>- Lê Văn C</h4>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery">
        <h2>Thư viện ảnh</h2>
        <div className="gallery-grid">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
            alt="Gallery 1"
          />

          <img
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80"
            alt="Gallery 3"
          />
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
            alt="Gallery 4"
          />
          <img
            src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=600&q=80"
            alt="Gallery 5"
          />
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
            alt="Gallery 6"
          />
        </div>
      </section>
    </div>
  );
};

export default DetailedHomePage;
