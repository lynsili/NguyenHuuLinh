import React from "react";
import "./style/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-overlay">
          <h1>Về LynFood - Hành trình ẩm thực đỉnh cao</h1>
          <p>
            Tận hưởng trải nghiệm ẩm thực tuyệt vời với LynFood - nơi hội tụ
            những món ăn ngon, dịch vụ tận tâm và chất lượng hàng đầu.
          </p>
          <a
            href="/products"
            className="about-hero-btn"
            style={{ textDecoration: "none" }}
          >
            Khám phá ngay
          </a>
        </div>
      </section>

      {/* Our History */}
      <section className="our-history">
        <h2>Lịch sử phát triển</h2>
        <div className="history-timeline">
          <div className="timeline-item">
            <h3>2022</h3>
            <p>
              Thành lập LynFood với sứ mệnh mang đến ẩm thực chất lượng cho mọi
              nhà.
            </p>
          </div>
          <div className="timeline-item">
            <h3>2023</h3>
            <p>Mở rộng mạng lưới giao hàng và phát triển thực đơn đa dạng.</p>
          </div>
          <div className="timeline-item">
            <h3>2024</h3>
            <p>
              Đạt giải thưởng "Thương hiệu ẩm thực uy tín" và nhận được sự tin
              yêu từ khách hàng.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mission">
          <h3>Sứ mệnh</h3>
          <p>
            Cung cấp thực phẩm chất lượng cao, dịch vụ nhanh chóng và thân
            thiện, góp phần nâng cao chất lượng cuộc sống của cộng đồng.
          </p>
        </div>
        <div className="vision">
          <h3>Tầm nhìn</h3>
          <p>
            Trở thành thương hiệu ẩm thực hàng đầu Việt Nam, được khách hàng tin
            tưởng và yêu mến.
          </p>
        </div>
        <div className="values">
          <h3>Giá trị cốt lõi</h3>
          <ul>
            <li>Chất lượng: Luôn đặt chất lượng sản phẩm lên hàng đầu.</li>
            <li>
              Đổi mới: Liên tục cải tiến và sáng tạo trong ẩm thực và dịch vụ.
            </li>
            <li>Trách nhiệm: Cam kết với cộng đồng và môi trường.</li>
            <li>Khách hàng: Luôn lắng nghe và phục vụ tận tâm.</li>
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="team">
        <h2>Đội ngũ của chúng tôi</h2>
        <div className="team-grid">
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Nguyễn Văn A"
            />
            <h4>Nguyễn Văn A</h4>
            <p>Giám đốc điều hành</p>
            <p>
              Với hơn 15 năm kinh nghiệm trong ngành ẩm thực, anh Nguyễn Văn A
              dẫn dắt LynFood phát triển bền vững và sáng tạo.
            </p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Trần Thị B"
            />
            <h4>Trần Thị B</h4>
            <p>Quản lý chất lượng</p>
            <p>
              Chị Trần Thị B đảm bảo mọi sản phẩm đến tay khách hàng đều đạt
              chuẩn chất lượng cao nhất.
            </p>
          </div>
          <div className="team-member">
            <img
              src="https://randomuser.me/api/portraits/men/56.jpg"
              alt="Lê Văn C"
            />
            <h4>Lê Văn C</h4>
            <p>Đầu bếp trưởng</p>
            <p>
              Đầu bếp Lê Văn C với tài năng và đam mê tạo ra những món ăn độc
              đáo, hấp dẫn và chuẩn vị.
            </p>
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="awards">
        <h2>Giải thưởng & Thành tựu</h2>
        <ul>
          <li>Giải thưởng "Thương hiệu ẩm thực uy tín" năm 2024</li>
          <li>Top 10 nhà cung cấp dịch vụ giao hàng nhanh nhất 2023</li>
          <li>Chứng nhận an toàn thực phẩm ISO 22000</li>
        </ul>
      </section>

      {/* Community Involvement */}
      <section className="community">
        <h2>Hoạt động cộng đồng</h2>
        <p>
          LynFood luôn tích cực tham gia các hoạt động từ thiện, hỗ trợ cộng
          đồng và bảo vệ môi trường nhằm góp phần xây dựng xã hội tốt đẹp hơn.
        </p>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Community"
        />
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>Khách hàng nói gì về chúng tôi</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>
              "Dịch vụ tuyệt vời, món ăn ngon và giao hàng nhanh chóng. Tôi rất
              hài lòng!"
            </p>
            <h4>- Nguyễn Văn A</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "Chất lượng sản phẩm luôn được đảm bảo, nhân viên thân thiện và
              nhiệt tình."
            </p>
            <h4>- Trần Thị B</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "LynFood là lựa chọn hàng đầu của tôi khi muốn thưởng thức món ăn
              ngon tại nhà."
            </p>
            <h4>- Lê Văn C</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
