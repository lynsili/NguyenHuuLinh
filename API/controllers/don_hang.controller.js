const Don_hang = require("../models/don_hang");

module.exports = {
  getAll: (req, res) => {
    Don_hang.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Don_hang.getById(id, (result) => {
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    const {
      user_id,
      total_price,
      delivery_type,
      delivery_time,
      delivery_date,
      note,
      items,
      status = "pending",
    } = data;

    const client_id = user_id;
    const employee_id = 1;

    if (!items || items.length === 0) {
      return res.status(400).send("Không có sản phẩm nào trong đơn hàng");
    }

    // 👉 Xử lý delivery_date nếu là "Hôm nay"
    let deliveryDateFormatted = delivery_date;
    if (delivery_date === "Hôm nay") {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      deliveryDateFormatted = `${yyyy}-${mm}-${dd}`;
    }

    const donHangData = {
      client_id,
      employee_id,
      total_price,
      delivery_type,
      delivery_time,
      delivery_date: deliveryDateFormatted,
      note,
      status,
    };

    Don_hang.insert(donHangData, (err, result) => {
      if (err) {
        console.error("Lỗi tạo đơn hàng:", err);
        return res.status(500).send("Lỗi khi tạo đơn hàng");
      }

      const orderId = result.insertId;

      const promises = items.map((item) => {
        return new Promise((resolve, reject) => {
          Don_hang.insertDetail(
            {
              order_id: orderId,
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.price,
            },
            (err, result) => {
              if (err) {
                reject(err);
              } else {
                resolve(result);
              }
            }
          );
        });
      });

      Promise.all(promises)
        .then(() => {
          // XÓA GIỎ HÀNG CỦA TÀI KHOẢN SAU KHI ĐẶT HÀNG
          const db = require("../common/db"); // Hoặc chỗ bạn đang dùng để kết nối MySQL
          db.query(
            "DELETE FROM gio_hang WHERE tai_khoan_id = ?",
            [user_id],
            (err, result) => {
              if (err) {
                console.error("Lỗi khi xóa giỏ hàng:", err);
                return res
                  .status(500)
                  .send("Lỗi khi xóa giỏ hàng sau khi đặt hàng");
              }
              res.send({ success: true, order_id: orderId });
            }
          );
        })

        .catch((err) => {
          console.error("Lỗi thêm chi tiết:", err);
          res.status(500).send("Lỗi khi thêm chi tiết đơn hàng");
        });
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Don_hang.update(data, id, (result) => {
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Don_hang.delete(id, (result) => {
      res.send(result);
    });
  },
};
