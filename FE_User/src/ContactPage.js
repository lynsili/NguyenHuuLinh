import React from "react";
import "./style/ContactPage.css";

const ContactPage = () => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Liên hệ với chúng tôi</h1>
        <p>Chúng tôi luôn sẵn sàng phục vụ bạn với những món ăn ngon nhất!</p>
      </header>
      <div className="contact-contenta">
        <div className="contact-info-section">
          <h2>Thông tin liên hệ</h2>
          <p>
            <strong>Địa chỉ:</strong> 123 Nhuế Dương, Khoái Châu, Hưng Yên
          </p>
          <p>
            <strong>Điện thoại:</strong> 0123 456 789
          </p>
          <p>
            <strong>Email:</strong> lienhe@foodstore.com
          </p>
          <p>
            <strong>Giờ mở cửa:</strong> 8:00 AM - 10:00 PM (Thứ 2 - Chủ nhật)
          </p>
          <div className="social-media">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="map-container">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.1234567890123!2d106.70000000000001!3d10.776000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1a2b3c4d5f%3A0x123456789abcdef!2zMTIzIMSQ4bqhaSDEkOG6oW0gQsOqbiAxLCBRdeG6rW4gMSwgVGjDoG4gSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1687000000000!5m2!1sen!2s"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">
                <i className="fas fa-user"></i> Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Nhập email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <i className="fas fa-phone"></i> Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">
                <i className="fas fa-tag"></i> Chủ đề
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Chủ đề liên hệ"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <i className="fas fa-comment-alt"></i> Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Nhập tin nhắn của bạn"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
      <footer className="contact-footer">
        <p>© 2024 LynFood. Mọi quyền được bảo lưu.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
