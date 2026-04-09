import React, { useState } from 'react';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      if (existing) {
        return prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { 
        id: product.id, 
        name: product.name, 
        category: 'Product', 
        price: product.price, 
        color: product.color, 
        quantity: 1, 
        selected: true 
      }];
    });
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header setCurrentPage={setCurrentPage} cartItemCount={cartItemCount} />
      {currentPage === 'home' && <Home addToCart={addToCart} />}
      {currentPage === 'cart' && <Cart cartItems={cartItems} setCartItems={setCartItems} setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
