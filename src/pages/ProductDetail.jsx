import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Mimic API fetch based on ID logic
    const foundProduct = MOCK_PRODUCTS.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <Link to="/" className="back-link">Return to Home</Link>
      </div>
    );
  }

  return (
    <main className="product-detail-page container animate-fade-in">
      <div className="detail-navigation">
        <Link to="/" className="back-link">← Back to Products</Link>
      </div>

      <section className="detail-layout">
        {/* Left: Product Image */}
        <div className="detail-image-section glass">
          <div className="detail-img-placeholder" style={{ backgroundColor: product.color }}>
            <span className="detail-img-icon">📦</span>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="detail-info-section">
          <span className="detail-category">{product.category || 'Premium Gear'}</span>
          <h1 className="detail-title">{product.name}</h1>
          <p className="detail-price">${product.price.toFixed(2)}</p>

          <div className="detail-description">
            <h3 className="section-label">Product Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="detail-actions">
            <button 
              className="base-btn btn-primary add-detail-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          
          <div className="detail-perks">
            <div className="perk-item">
              <span>🚚</span> Free shipping over $500
            </div>
            <div className="perk-item">
              <span>🛡️</span> 1-Year Warranty
            </div>
            <div className="perk-item">
              <span>🔄</span> 30-Day Returns
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
