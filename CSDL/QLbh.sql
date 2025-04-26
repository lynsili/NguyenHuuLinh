CREATE DATABASE QLbh;
USE QLbh;

-- 1. Bảng vai_tro – Quản lý các vai trò của người dùng
CREATE TABLE vai_tro (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);
ALTER TABLE san_pham
ADD COLUMN description TEXT;
-- 2. Bảng quyen_han - Quyền hạn
CREATE TABLE quyen_han (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT
);

-- 3. Bảng vai_tro_quyen_han – Quản lý quyền của vai trò
CREATE TABLE vai_tro_quyen_han (
    role_id INT,
    permission_id INT,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES vai_tro(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES quyen_han(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- 4. Bảng tai_khoan – Quản lý thông tin tài khoản người dùng
CREATE TABLE tai_khoan (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES vai_tro(id)
);

-- 5. Bảng khach_hang – Quản lý thông tin khách hàng
CREATE TABLE khach_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Bảng danh_muc – Quản lý danh mục sản phẩm
CREATE TABLE danh_muc (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 7. Bảng trang_thai_san_pham – Quản lý trạng thái sản phẩm
CREATE TABLE trang_thai_san_pham (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status_name VARCHAR(50) UNIQUE NOT NULL
);

-- 8. Bảng san_pham – Quản lý sản phẩm
CREATE TABLE san_pham (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category_id INT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    status_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES danh_muc(id),
    FOREIGN KEY (status_id) REFERENCES trang_thai_san_pham(id)
);
ALTER TABLE san_pham ADD COLUMN image VARCHAR(255);
ALTER TABLE san_pham
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


-- 9. Bảng nha_cung_cap – Quản lý nhà cung cấp
CREATE TABLE nha_cung_cap (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    phone VARCHAR(20),
    address TEXT
);

-- 10. Bảng nhan_vien – Quản lý thông tin nhân viên
CREATE TABLE nhan_vien (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 11. Bảng don_nhap_hang – Quản lý các đơn nhập hàng
CREATE TABLE don_nhap_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    supplier_id INT,
    employee_id INT,
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES nha_cung_cap(id),
    FOREIGN KEY (employee_id) REFERENCES nhan_vien(id)
);

-- 12. Bảng chi_tiet_nhap_hang – Chi tiết nhập hàng
CREATE TABLE chi_tiet_nhap_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    import_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (import_id) REFERENCES don_nhap_hang(id),
    FOREIGN KEY (product_id) REFERENCES san_pham(id)
);

-- 13. Bảng don_hang – Quản lý đơn hàng
CREATE TABLE don_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    client_id INT,
    employee_id INT,
    total_price DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES khach_hang(id),
    FOREIGN KEY (employee_id) REFERENCES nhan_vien(id)
);

-- 14. Bảng chi_tiet_don_hang – Chi tiết đơn hàng
CREATE TABLE chi_tiet_don_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES don_hang(id),
    FOREIGN KEY (product_id) REFERENCES san_pham(id)
);

-- 15. Bảng hoa_don – Quản lý hóa đơn
CREATE TABLE hoa_don (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    client_id INT,
    total_price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES don_hang(id),
    FOREIGN KEY (client_id) REFERENCES khach_hang(id)
);
-- 16. Bảng gio_hang
CREATE TABLE gio_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tai_khoan_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id)
);

-- 17. Bảng gio_hang_chi_tiet
CREATE TABLE gio_hang_chi_tiet (
    id INT PRIMARY KEY AUTO_INCREMENT,
    gio_hang_id INT,
    product_id INT,
    quantity INT NOT NULL,
    da_thanh_toan BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (gio_hang_id) REFERENCES gio_hang(id),
    FOREIGN KEY (product_id) REFERENCES san_pham(id)
);

-- 18. Bảng lich_su_ban_hang – Phục vụ thống kê
CREATE TABLE lich_su_ban_hang (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) AS (quantity * price) STORED,
    sold_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id INT,
    FOREIGN KEY (product_id) REFERENCES san_pham(id),
    FOREIGN KEY (order_id) REFERENCES don_hang(id)
);
DELIMITER //

DELIMITER $$

CREATE TRIGGER trg_after_insert_order_detail
AFTER INSERT ON chi_tiet_don_hang
FOR EACH ROW
BEGIN
    -- Trừ tồn kho
    UPDATE san_pham	
    SET stock = stock - NEW.quantity
    WHERE id = NEW.product_id;
END $$

DELIMITER ;
ALTER TABLE khach_hang
ADD COLUMN tai_khoan_id INT UNIQUE,
ADD CONSTRAINT fk_khach_tai_khoan FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id)
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE gio_hang
  ADD COLUMN product_id INT,
  ADD COLUMN quantity INT DEFAULT 1,
  ADD COLUMN note TEXT;
ALTER TABLE don_hang
ADD COLUMN delivery_type VARCHAR(50),          -- Hình thức nhận hàng
ADD COLUMN delivery_time VARCHAR(50),          -- Thời gian giao hàng (sáng/chiều/tối)
ADD COLUMN delivery_date DATE,                 -- Ngày giao hàng
ADD COLUMN note TEXT;                          -- Ghi chú đơn hàng
-- Xóa chỉ mục trùng lặp
DROP INDEX email_2 ON khach_hang;

-- Sửa cột email để cho phép NULL
ALTER TABLE khach_hang
MODIFY COLUMN email VARCHAR(100) DEFAULT NULL;

-- Tạo lại chỉ mục duy nhất cho email
CREATE UNIQUE INDEX email ON khach_hang(email);
ALTER TABLE khach_hang DROP INDEX email;

SHOW INDEX FROM khach_hang WHERE Column_name = 'email';

SHOW INDEXES FROM khach_hang;
SELECT don_hang.* 
    FROM don_hang
    JOIN khach_hang ON don_hang.client_id = khach_hang.id
    WHERE khach_hang.phone = 0384317729;
SHOW CREATE TABLE chi_tiet_don_hang;
SHOW CREATE TABLE chi_tiet_nhap_hang;
ALTER TABLE chi_tiet_don_hang
DROP FOREIGN KEY chi_tiet_don_hang_ibfk_2,
ADD CONSTRAINT chi_tiet_don_hang_ibfk_2
FOREIGN KEY (product_id) REFERENCES san_pham(id) ON DELETE CASCADE;

ALTER TABLE chi_tiet_nhap_hang
DROP FOREIGN KEY chi_tiet_nhap_hang_ibfk_2;
ALTER TABLE chi_tiet_nhap_hang
ADD CONSTRAINT chi_tiet_nhap_hang_ibfk_2
FOREIGN KEY (product_id) REFERENCES san_pham(id) ON DELETE CASCADE;

SELECT 
    don_hang.id AS order_id, 
    don_hang.client_id, 
    don_hang.employee_id, 
    don_hang.total_price, 
    don_hang.status AS order_status, 
    don_hang.created_at AS order_created_at, 
    don_hang.delivery_type, 
    don_hang.delivery_time, 
    don_hang.delivery_date, 
    don_hang.note, 
    khach_hang.name AS client_name, 
    khach_hang.email AS client_email, 
    khach_hang.phone AS client_phone, 
    khach_hang.address AS client_address, 
    chi_tiet_don_hang.product_id, 
    chi_tiet_don_hang.quantity, 
    chi_tiet_don_hang.price AS product_price, 
    san_pham.name AS product_name, 
    san_pham.price AS product_unit_price, 
    san_pham.image_url AS product_image_url,
    san_pham.description AS product_description
FROM don_hang
JOIN khach_hang ON don_hang.client_id = khach_hang.id
LEFT JOIN chi_tiet_don_hang ON don_hang.id = chi_tiet_don_hang.order_id
LEFT JOIN san_pham ON chi_tiet_don_hang.product_id = san_pham.id
LIMIT 0, 1000;

  SELECT don_hang.*, 
           khach_hang.id AS client_id, 
           khach_hang.name AS client_name, 
           khach_hang.email AS client_email, 
           khach_hang.phone AS client_phone,
           khach_hang.address AS client_address, 
           chi_tiet_don_hang.product_id, 
           chi_tiet_don_hang.quantity, 
           chi_tiet_don_hang.price AS product_price,
           san_pham.name AS product_name,
           san_pham.price AS product_unit_price,
           san_pham.image_url AS product_image_url  
    FROM don_hang
    JOIN khach_hang ON don_hang.client_id = khach_hang.id
    LEFT JOIN chi_tiet_don_hang ON don_hang.id = chi_tiet_don_hang.order_id
    LEFT JOIN san_pham ON chi_tiet_don_hang.product_id = san_pham.id
    WHERE khach_hang.tai_khoan_id = 1;
    
     SELECT 
      don_hang.id AS order_id, 
      don_hang.client_id, 
      don_hang.employee_id, 
      don_hang.total_price, 
      don_hang.status AS order_status, 
      don_hang.created_at AS order_created_at, 
      don_hang.delivery_type, 
      don_hang.delivery_time, 
      don_hang.delivery_date, 
      don_hang.note, 
      khach_hang.name AS client_name, 
      khach_hang.email AS client_email, 
      khach_hang.phone AS client_phone, 
      khach_hang.address AS client_address, 
      chi_tiet_don_hang.product_id, 
      chi_tiet_don_hang.quantity, 
      chi_tiet_don_hang.price AS product_price, 
      san_pham.name AS product_name, 
      san_pham.price AS product_unit_price, 
      san_pham.image_url AS product_image_url,
      san_pham.description AS product_description
    FROM don_hang
    JOIN khach_hang ON don_hang.client_id = khach_hang.id
    LEFT JOIN chi_tiet_don_hang ON don_hang.id = chi_tiet_don_hang.order_id
    LEFT JOIN san_pham ON chi_tiet_don_hang.product_id = san_pham.id
    WHERE chi_tiet_don_hang.order_id = 34;
    
    SELECT chi_tiet_don_hang.product_id, chi_tiet_don_hang.quantity
      FROM chi_tiet_don_hang
      WHERE chi_tiet_don_hang.order_id = 35