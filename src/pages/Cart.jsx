import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, toggleSelection, toggleSelectAll } = useCart();

  // Calculations
  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 && subtotal < 500 ? 15.00 : 0; // Free shipping over $500
  const total = subtotal + shipping;

  const allSelected = cartItems.length > 0 && cartItems.every(i => i.selected);

  if (cartItems.length === 0) {
    return (
      <main className="cart-page container animate-fade-in empty-cart">
        <h1 className="text-h2">Your Cart is Empty</h1>
        <p className="text-body mt-2">Looks like you haven't added anything yet.</p>
        <Link to="/" className="base-btn btn-primary mt-4" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page container animate-fade-in">
      <div className="cart-header">
        <h1 className="text-h2">Shopping Cart</h1>
        <Link to="/" className="cart-back-btn" style={{ textDecoration: 'none' }}>
          ← Back to Shop
        </Link>
      </div>

      <div className="cart-layout">
        {/* Left Column: Cart Items */}
        <section className="cart-items-section glass">
          <div className="cart-items-header">
            <label className="checkbox-container select-all-lbl">
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={(e) => toggleSelectAll(e.target.checked)} 
              />
              <span className="checkmark"></span>
              <strong>Select All ({cartItems.length} items)</strong>
            </label>
          </div>

          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={item.selected} 
                    onChange={() => toggleSelection(item.id)} 
                  />
                  <span className="checkmark"></span>
                </label>

                <div className="cart-item-image-placeholder" style={{ backgroundColor: item.color }}>
                   <span className="img-icon">📦</span>
                </div>

                <div className="cart-item-details">
                  <div className="cart-item-meta">
                    <span className="cart-item-category">{item.category}</span>
                    <h3 className="cart-item-name">{item.name}</h3>
                  </div>
                  
                  <div className="cart-item-controls">
                    <div className="quantity-selector">
                      <button 
                        className="qty-btn" 
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      🗑️ Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-price-column">
                  <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                  {item.quantity > 1 && (
                    <span className="cart-item-unit-price">${item.price.toFixed(2)} each</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Order Summary */}
        <section className="cart-summary-section glass">
          <h2 className="summary-title">Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal ({selectedItems.length} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping estimate</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <hr className="summary-divider" />
          
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <button 
            className="base-btn btn-primary checkout-btn" 
            disabled={selectedItems.length === 0}
            onClick={() => alert(`Proceeding to checkout with $${total.toFixed(2)}`)}
          >
            Proceed to Checkout
          </button>
          
          {selectedItems.length === 0 && (
            <p className="no-items-warning">Please select at least one item to checkout.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default Cart;
