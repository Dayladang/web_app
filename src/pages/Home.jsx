import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import { MOCK_PRODUCTS } from '../data/products';
import './Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredProducts = useMemo(() => {
    if (!query) return MOCK_PRODUCTS;
    const lowerQuery = query.toLowerCase();
    return MOCK_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(lowerQuery)
    );
  }, [query]);

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
          <h2 className="text-h2">
            {query ? `Kết quả tìm kiếm cho: "${query}"` : "Featured Products"}
          </h2>
          {!query && <span className="view-all-link">View All →</span>}
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products" style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
            <h3 className="text-h3">Không có sản phẩm nào trùng khớp</h3>
            <p className="text-body" style={{ marginTop: '0.5rem' }}>Vui lòng thử lại với từ khóa khác.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
