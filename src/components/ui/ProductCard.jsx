import React from 'react';
import './ProductCard.css';
import Button from './Button';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card glass">
      <div className="product-image-container">
        {/* Placeholder for the image */}
        <div className="img-placeholder" style={{ backgroundColor: product.color || '#3b82f6' }}>
           <span className="img-icon">📦</span>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <Button variant="primary" className="add-to-cart-btn">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
