import React from 'react';
import ProductCard from '../components/ui/ProductCard';
import './Home.css';

// Mock data using the E-commerce Use Cases
const MOCK_PRODUCTS = [
  { id: 1, name: 'Wireless Noise-Canceling Headphones', price: 299.99, color: '#aa3bff' },
  { id: 2, name: 'Minimalist Mechanical Keyboard', price: 149.50, color: '#3b82f6' },
  { id: 3, name: 'Ultra-wide 4K Monitor', price: 699.00, color: '#f43f5e' },
  { id: 4, name: 'Ergonomic Office Chair', price: 450.00, color: '#10b981' },
  { id: 5, name: 'Smart Home Security Camera', price: 199.99, color: '#f59e0b' },
  { id: 6, name: 'Professional DSLR Lens', price: 1200.00, color: '#8b5cf6' },
];

const Home = ({ addToCart }) => {
  return (
    <main className="home-page animate-fade-in">
      <section className="hero container">
        <div className="hero-content">
          <h1 className="text-h1">Discover the next generation of tech.</h1>
          <p className="text-body hero-subtitle">
            Premium products curated for professionals and enthusiasts. Experience seamless shopping and cutting-edge design.
          </p>
        </div>
      </section>

      <section className="product-section container">
        <div className="section-header flex-between">
          <h2 className="text-h2">Featured Products</h2>
          <a href="#" className="view-all-link">View All →</a>
        </div>
        
        <div className="product-grid">
          {MOCK_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
