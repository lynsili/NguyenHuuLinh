const Chi_tiet_don_hang = require("../models/chi_tiet_don_hang");

module.exports = {
  getAll: (req, res) => {
    Chi_tiet_don_hang.getAll((err, result) => {
      if (err) {
        console.error("Lỗi lấy danh sách chi tiết:", err);
        return res.status(500).send("Lỗi server");
      }
      res.json(result);
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Chi_tiet_don_hang.getById(id, (err, result) => {
      if (err) {
        console.error("Lỗi lấy chi tiết đơn hàng theo ID:", err);
        return res.status(500).send("Lỗi server");
      }
      res.send(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Chi_tiet_don_hang.insert(data, (err, result) => {
      if (err) {
        console.error("Lỗi thêm chi tiết đơn hàng:", err);
        return res.status(500).send("Lỗi khi thêm chi tiết đơn hàng");
      }
      res.send(result);
    });
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    Chi_tiet_don_hang.update(data, id, (err, result) => {
      if (err) {
        console.error("Lỗi cập nhật chi tiết đơn hàng:", err);
        return res.status(500).send("Lỗi khi cập nhật chi tiết");
      }
      res.send(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Chi_tiet_don_hang.delete(id, (err, result) => {
      if (err) {
        console.error("Lỗi xoá chi tiết đơn hàng:", err);
        return res.status(500).send("Lỗi khi xoá chi tiết");
      }
      res.send(result);
    });
  },
};
