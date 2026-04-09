import React from 'react';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_PRODUCTS } from '../data/products';
import './Home.css';

const Home = () => {
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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
