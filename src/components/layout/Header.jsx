import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { cartCount } = useCart();

  return (
    <header className="header glass">
      <div className="container header-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span className="logo-accent">Dang's </span>Store
        </Link>

        <div className="search-bar">
          <input type="text" placeholder="Search products, brands and categories..." />
          <button className="search-btn">
            🔍
          </button>
        </div>

        <nav className="header-nav">
          <button className="nav-icon-btn">
            👤
          </button>
          <button className="nav-icon-btn cart-btn">
            🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
