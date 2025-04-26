import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    cover_image: ''
  });

  // Lấy danh sách sách
  useEffect(() => {
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        setBooks(response.data);
      }).catch(error => {
        console.log(error);
      });
  }, []);

  // Xử lý thay đổi dữ liệu form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Thêm sách mới
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/books', formData)
      .then(response => {
        setBooks([...books, response.data]);
        setFormData({
          title: '',
          description: '',
          price: '',
          stock: '',
          category_id: '',
          cover_image: ''
        });
      }).catch(error => {
        console.log(error);
      });
  };

  // Xóa sách
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/books/${id}`)
      .then(response => {
        setBooks(books.filter(book => book.id !== id));
      }).catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-5">Quản lý Sản phẩm</h1>
      
      <form onSubmit={handleSubmit} className="mb-5">
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="Tiêu đề sách" 
          className="p-2 border border-gray-300 mb-2 w-full" 
        />
        <textarea 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="Mô tả" 
          className="p-2 border border-gray-300 mb-2 w-full" 
        />
        <input 
          type="number" 
          name="price" 
          value={formData.price} 
          onChange={handleChange} 
          placeholder="Giá" 
          className="p-2 border border-gray-300 mb-2 w-full" 
        />
        <input 
          type="number" 
          name="stock" 
          value={formData.stock} 
          onChange={handleChange} 
          placeholder="Số lượng" 
          className="p-2 border border-gray-300 mb-2 w-full" 
        />
        <input 
          type="text" 
          name="category_id" 
          value={formData.category_id} 
          onChange={handleChange} 
          placeholder="ID danh mục" 
          className="p-2 border border-gray-300 mb-2 w-full" 
        />
        <input 
          type="text" 
          name="cover_image" 
          value={formData.cover_image} 
          onChange={handleChange} 
          placeholder="URL ảnh bìa" 
          className="p-2 border border-gray-300 mb-2 w-full" 
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Thêm Sách</button>
      </form>

      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Tiêu đề</th>
            <th className="border px-4 py-2">Giá</th>
            <th className="border px-4 py-2">Số lượng</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="border px-4 py-2">{book.title}</td>
              <td className="border px-4 py-2">{book.price}</td>
              <td className="border px-4 py-2">{book.stock}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white p-2">Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookManagement;
