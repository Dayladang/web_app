import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card glass" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className="product-image-container">
        {/* Placeholder for the image */}
        <div className="img-placeholder" style={{ backgroundColor: product.color || '#3b82f6' }}>
           <span className="img-icon">📦</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
