import React from 'react';
import './Header.css';

const Header = ({ setCurrentPage, cartItemCount = 0 }) => {
  return (
    <header className="header glass">
      <div className="container header-container">
        <div 
          className="logo" 
          onClick={() => setCurrentPage('home')}
          style={{ cursor: 'pointer' }}
        >
          <span className="logo-accent">Dang's </span>Store
        </div>

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
          <button 
            className="nav-icon-btn cart-btn"
            onClick={() => setCurrentPage('cart')}
          >
            🛒 {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
