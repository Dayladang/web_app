import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = MOCK_PRODUCTS.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when loading
  }, []);

  if (!product) {
    return (
      <div className="product-detail-page container">
        <h2>Product not found!</h2>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-detail-page container animate-fade-in">
      <button className="back-btn" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>

      <div className="product-detail-content glass">
        <div className="product-detail-image" style={{ backgroundColor: product.color }}>
          <span className="img-icon-large">📦</span>
        </div>
        
        <div className="product-detail-info">
          <h1 className="text-h2">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          
          <div className="divider"></div>
          
          <div className="product-detail-description">
            <h3>Description</h3>
            <p className="text-body">{product.description}</p>
          </div>

          <div className="product-detail-actions">
            <Button variant="primary" className="add-to-cart-large" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
