// src/components/Footer.js
import React from "react";
import "./style/footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const preventDefault = (e) => e.preventDefault();

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-top-content">
              <div className="footer-top-img">
                <img src="./img/lyn-food.png" alt="LynFood" />
              </div>
              <div className="footer-top-subbox">
                <div className="footer-top-subs">
                  <h2 className="footer-top-subs-title">Đăng ký nhận tin</h2>
                  <p className="footer-top-subs-text">
                    Nhận thông tin mới nhất từ chúng tôi
                  </p>
                </div>
                <form className="form-ground">
                  <input
                    type="email"
                    className="form-ground-input"
                    placeholder="Nhập email của bạn"
                  />
                  <button className="form-ground-btn" type="submit">
                    <span>ĐĂNG KÝ</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="widget-area">
          <div className="container">
            <div className="widget-row">
              <div className="widget-row-col-1">
                <h3 className="widget-title">Về chúng tôi</h3>
                <div className="widget-row-col-content">
                  <p>
                    LynFood là thương hiệu được thành lập vào năm 2022 với tiêu
                    chí đặt chất lượng sản phẩm lên hàng đầu.
                  </p>
                </div>
                <div className="widget-social">
                  <button
                    className="widget-social-item"
                    onClick={preventDefault}
                  >
                    <i className="fab fa-facebook-f"></i>
                  </button>
                  <button
                    className="widget-social-item"
                    onClick={preventDefault}
                  >
                    <i className="fab fa-twitter"></i>
                  </button>
                  <button
                    className="widget-social-item"
                    onClick={preventDefault}
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </button>
                  <button
                    className="widget-social-item"
                    onClick={preventDefault}
                  >
                    <i className="fab fa-whatsapp"></i>
                  </button>
                </div>
              </div>

              <div className="widget-row-col">
                <h3 className="widget-title">Liên kết</h3>
                <ul className="widget-contact">
                  {[
                    "Về chúng tôi",
                    "Thực đơn",
                    "Điều khoản",
                    "Liên hệ",
                    "Tin tức",
                  ].map((text, index) => (
                    <li key={index} className="widget-contact-item">
                      <button className="link-button" onClick={preventDefault}>
                        <i className="fa-solid fa-arrow-right"></i>
                        <span>{text}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget-row-col">
                <h3 className="widget-title">Thực đơn</h3>
                <ul className="widget-contact">
                  {[
                    "Điểm tâm",
                    "Món chay",
                    "Món mặn",
                    "Nước uống",
                    "Tráng miệng",
                  ].map((item, index) => (
                    <li key={index} className="widget-contact-item">
                      <button className="link-button" onClick={preventDefault}>
                        <i className="fa-solid fa-arrow-right"></i>

                        <span>{item}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget-row-col-1">
                <h3 className="widget-title">Liên hệ</h3>
                <div className="contact">
                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <i className="fa-solid fa-location-dot"></i>
                    </div>
                    <div className="contact-content">
                      <span>
                        25 Xã Nhuế Dương, Huyện Khoái Châu, Tình Hưng Yên
                      </span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="contact-content contact-item-phone">
                      <span>0123 456 789</span>
                      <br />
                      <span>0987 654 321</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-item-icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="contact-content contact-item-email">
                      <span>adpc2k4hy@gmail.com</span>
                      <br />
                      <span>lyn25092004@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-wrap">
        <div className="container">
          <div className="copyright-content">
            <p>© 2025 LynFood. Cảm ơn bạn đã đồng hành cùng chúng tôi!</p>
          </div>
        </div>
      </div>

      <div className="back-to-top active">
        <button onClick={scrollToTop}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      </div>
    </>
  );
}

export default Footer;
