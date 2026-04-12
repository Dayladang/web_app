import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { MOCK_PRODUCTS } from '../../data/products';
import './Header.css';

const Header = () => {
  const { cartCount } = useCart();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    
    const startsWith = [];
    const contains = [];
    
    for (const p of MOCK_PRODUCTS) {
      const name = p.name.toLowerCase();
      if (name.startsWith(q)) {
        startsWith.push(p);
      } else if (name.includes(q)) {
        contains.push(p);
      }
    }
    
    return [...startsWith, ...contains].slice(0, 5);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header className="header glass">
      <div className="container header-container">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="logo-accent">Dang's </span>Store
        </Link>

        <div className="search-wrapper">
          <form className="search-bar" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search products, brands and categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
          
          {isFocused && searchQuery.trim() && suggestions.length > 0 && (
            <div className="search-suggestions animate-fade-in">
              {suggestions.map(product => (
                <div 
                  key={product.id} 
                  className="suggestion-item"
                  onClick={() => {
                    setSearchQuery(product.name);
                    navigate(`/?q=${encodeURIComponent(product.name)}`);
                  }}
                >
                  <span className="suggestion-name">{product.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <nav className="header-nav">
          <button className="nav-icon-btn">
            👤
          </button>
          <Link to="/cart" className="nav-icon-btn cart-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
            🛒 {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
