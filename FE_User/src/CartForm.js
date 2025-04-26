import React from "react";

const CartForm = ({ onClose, cartItems = [], totalPrice = 0 }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96 shadow-lg transform transition-transform duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Giỏ hàng của bạn</h2>
        
        {/* Hiển thị danh sách sản phẩm trong giỏ */}
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1 ml-4">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                </div>
                <p className="font-semibold">{item.price * item.quantity}₫</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Giỏ hàng của bạn chưa có sản phẩm nào.</p>
        )}
        
        {/* Hiển thị tổng giá */}
        {cartItems.length > 0 && (
          <div className="mt-4 flex items-center justify-between font-semibold text-lg">
            <span>Tổng cộng:</span>
            <span>{totalPrice}₫</span>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          {/* Nút đóng form */}
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            Đóng
          </button>
          {/* Nút thanh toán */}
          {cartItems.length > 0 && (
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors">
              Thanh toán
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartForm;
