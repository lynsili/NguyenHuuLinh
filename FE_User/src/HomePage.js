import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "./style/HomePage.css";
import HomeSlider from "./HomeSlider"; // nhớ chỉnh path nếu cần

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [sortOption, setSortOption] = useState(""); // "" | "asc" | "desc"

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategoryId) {
      filtered = filtered.filter((p) => p.category_id === selectedCategoryId);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (sortOption === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    products,
    selectedCategoryId,
    minPrice,
    maxPrice,
    sortOption,
  ]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/san_pham");
      if (response.status === 200) {
        setProducts(response.data);
        setFilteredProducts(response.data);
      }
    } catch (error) {
      alert(`Lỗi khi tải sản phẩm: ${error.message}`);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/danh_muc");
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      alert(`Lỗi khi tải danh mục: ${error.message}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCartToggle = () => {
    setShowCart(!showCart);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setNote("");
    setShowModal(true);
  };

  const increaseQuantity = () => setQuantity((q) => Math.min(q + 1, 100));
  const decreaseQuantity = () => setQuantity((q) => Math.max(q - 1, 1));

  // Mua ngay: chuyển sang trang Checkout với thông tin sản phẩm
  const orderNow = () => {
    const userId = localStorage.getItem("tai_khoan_id");
    const orderItems = [
      {
        product_id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity,
        note,
      },
    ];

    if (!userId) {
      // Nếu chưa đăng nhập, lưu thông tin vào localStorage
      localStorage.setItem("gio_hang", JSON.stringify(orderItems));
      console.log("Dữ liệu đã lưu vào localStorage.");
      navigate("/checkout", { state: { orderItems } });
    } else {
      // Nếu người dùng đã đăng nhập, gửi dữ liệu đơn hàng vào cơ sở dữ liệu và chuyển đến trang thanh toán
      const item = {
        user_id: parseInt(userId),
        product_id: selectedProduct.id,
        quantity,
        note,
      };

      axios
        .post("http://localhost:3000/api/gio_hang", item) // Đảm bảo API xử lý việc lưu vào giỏ hàng của người dùng
        .then((response) => {
          if (response.status === 200) {
            console.log("Đặt hàng thành công!");
            // Chuyển hướng đến trang Checkout, truyền dữ liệu đơn hàng
            navigate("/checkout", { state: { orderItems } });
          }
        })
        .catch((error) => {
          console.error("Lỗi khi đặt hàng:", error);
          alert("Đặt hàng thất bại, vui lòng thử lại.");
        });
    }

    setShowModal(false); // Đóng modal nếu cần
  };

  const addToCart = async () => {
    // Giữ nguyên logic thêm vào giỏ hàng (nếu cần login)
    const userId = localStorage.getItem("tai_khoan_id");
    if (!userId || isNaN(parseInt(userId))) {
      alert("Bạn cần đăng nhập để thêm vào giỏ hàng");
      return;
    }

    const item = {
      user_id: parseInt(userId),
      product_id: selectedProduct.id,
      quantity,
      note,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/gio_hang",
        item
      );
      if (response.status === 200) {
        alert("Đã thêm vào giỏ hàng!");
        setCart([...cart, { ...selectedProduct, quantity }]);
        setShowModal(false);
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Lỗi khi thêm vào giỏ hàng");
    }
  };

  // Phần tính trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const styles = {
    productImage: {
      width: "100%",
      height: "160px",
      objectFit: "cover",
      borderBottom: "2px solid #f1f1f1",
    },
  };

  return (
    <div className="grid">
      <HomeSlider /> {/* Thêm dòng này */}
      <div className="grid__row">
        <div className="grid__column-2">
          <div className="category-list">
            <h3 className="Dm">Tìm kiếm </h3>
            <InputText
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Tìm kiếm sản phẩm..."
              className="search-input"
            />
            <h3 className="Dm">Danh mục</h3>
            <ul style={{ listStyleType: "none" }}>
              <li
                onClick={() => setSelectedCategoryId(null)}
                className={!selectedCategoryId ? "active" : ""}
              >
                Tất cả
              </li>
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={selectedCategoryId === cat.id ? "active" : ""}
                >
                  {cat.name}
                </li>
              ))}
            </ul>

            {/* Lọc theo giá */}
            <div className="price-filter">
              <h4>Lọc theo giá</h4>
              <InputText
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Giá tối thiểu"
                className="price-input"
              />
              <InputText
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Giá tối đa"
                className="price-input"
              />
            </div>

            {/* Sắp xếp và tìm kiếm */}
            <div className="advanced-search-control">
              <button
                id="sort-ascending"
                onClick={() => setSortOption("asc")}
                className="sort-btn"
              >
                <i className="fa-solid fa-arrow-up-short-wide"></i>
              </button>

              <button
                id="sort-descending"
                onClick={() => setSortOption("desc")}
                className="sort-btn"
              >
                <i className="fa-solid fa-arrow-down-wide-short"></i>
              </button>

              <button
                id="reset-search"
                onClick={() => {
                  setSearchQuery(""); // Xóa tìm kiếm
                  setMinPrice(""); // Xóa giá tối thiểu
                  setMaxPrice(""); // Xóa giá tối đa
                  setSortOption(""); // Đặt lại sắp xếp
                  setSelectedCategoryId(null); // Đặt lại danh mục
                }}
                className="reset-btn"
              >
                <i className="fa-solid fa-arrow-rotate-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="grid__column-10">
          <div className="home-page">
            <div className="product-list">
              {currentProducts.map((product) => (
                <Card key={product.id} className="product-card">
                  <div className="product-image-wrapper">
                    <img
                      className="productImage"
                      src={"http://localhost:3000" + product.image_url}
                      alt={product.name}
                      style={styles.productImage}
                    />
                  </div>
                  <h3 className="product-title">{product.name}</h3>
                  <p>
                    <strong>Giá:</strong> {product.price} VND
                  </p>
                  <Button
                    label="Mua ngay"
                    icon="pi pi-shopping-cart"
                    className="buy-btn"
                    onClick={() => openModal(product)}
                  />
                </Card>
              ))}
            </div>

            <div className="hd_cart" style={{ display: "none" }}>
              <div className="hd_cart_wrap">
                <i
                  className="hd_cart-icon fa-solid fa-cart-shopping"
                  onClick={handleCartToggle}
                ></i>
                <span className="hd_cart-notice cartNo">{cart.length}</span>
              </div>
            </div>

            <div className="pagination">
              <Button
                label="Trang trước"
                icon="pi pi-arrow-left"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="page-btn"
              />

              <span>
                Trang {currentPage} / {totalPages}
              </span>

              <Button
                label="Trang sau"
                icon="pi pi-arrow-right"
                iconPos="right"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="page-btn"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Modal chi tiết sản phẩm */}
      {showModal && selectedProduct && (
        <div className="modal product-detail open">
          <button className="modal-close" onClick={() => setShowModal(false)}>
            <i className="fa fa-times"></i>
          </button>
          <div className="modal-container mdl-cnt" id="product-detail-content">
            <div className="modal-header">
              <img
                className="product-image"
                src={"http://localhost:3000" + selectedProduct.image_url}
                alt={selectedProduct.name}
              />
            </div>
            <div className="modal-body">
              <h2 className="product-title">{selectedProduct.name}</h2>
              <div className="product-control">
                <div className="priceBox">
                  <span className="current-price">
                    {selectedProduct.price.toLocaleString()} ₫
                  </span>
                </div>
                <div className="buttons_added">
                  <input
                    className="minus is-form"
                    type="button"
                    value="-"
                    onClick={decreaseQuantity}
                  />
                  <input
                    className="input-qty"
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <input
                    className="plus is-form"
                    type="button"
                    value="+"
                    onClick={increaseQuantity}
                  />
                </div>
              </div>
              <p className="product-description">
                {selectedProduct.description || "Mô tả đang cập nhật..."}
              </p>
            </div>
            <div className="notebox">
              <p className="notebox-title">Ghi chú</p>
              <textarea
                className="text-note"
                placeholder="Nhập thông tin cần lưu ý..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <div className="price-total">
                <span className="thanhtien">Thành tiền</span>
                <span className="price">
                  {(selectedProduct.price * quantity).toLocaleString()} ₫
                </span>
              </div>
              <div className="modal-footer-control">
                <button className="button-dathangngay" onClick={orderNow}>
                  Đặt hàng ngay
                </button>
                <button className="button-dat" onClick={addToCart}>
                  <span
                    className="p-button-icon p-c p-button-icon-left pi pi-shopping-cart"
                    data-pc-section="icon"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
