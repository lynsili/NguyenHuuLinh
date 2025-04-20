const Khach_hang = require("../models/khach_hang");

module.exports = {
  getAll: (req, res) => {
    Khach_hang.getAll((err, result) => {
      console.log(result);
      res.json(result);
    });
  },
  getByTaiKhoanId: (req, res) => {
    const tai_khoan_id = req.params.tai_khoan_id;
    Khach_hang.getByTaiKhoanId(tai_khoan_id, (err, result) => {
      if (err) {
        res.status(500).json({ error: "Lỗi truy vấn CSDL" });
      } else if (!result || result.length === 0) {
        res.status(404).json({ message: "Không tìm thấy khách hàng" });
      } else {
        res.json(result[0]); // chỉ lấy bản ghi đầu tiên
      }
    });
  },

  getById: (req, res) => {
    const id = req.params.id;
    Khach_hang.getById(id, (err, result) => {
      res.json(result);
    });
  },

  insert: (req, res) => {
    const data = req.body;
    Khach_hang.insert(data, (err, result) => {
      res.json(result);
    });
  },

  update: (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Khach_hang.update(data, id, (err, result) => {
      res.json(result);
    });
  },

  delete: (req, res) => {
    const id = req.params.id;
    Khach_hang.delete(id, (err, result) => {
      res.json(result);
    });
  },
};
