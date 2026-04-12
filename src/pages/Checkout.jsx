import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearSelectedItems } = useCart();
  
  const selectedItems = cartItems.filter(item => item.selected);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 && subtotal < 500 ? 15.00 : 0;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert("Please fill in all shipping information!");
      return;
    }
    
    alert(`Checkout successful!\nThank you ${formData.fullName} for your order.\nTotal amount: $${total.toFixed(2)}`);
    clearSelectedItems();
    navigate('/');
  };

  if (selectedItems.length === 0) {
    return (
      <main className="checkout-page container animate-fade-in">
        <h1 className="text-h2">No items to checkout</h1>
        <p className="text-body mt-2">Please select products in your cart before checking out.</p>
        <Link to="/cart" className="base-btn btn-primary mt-4" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Back to Cart
        </Link>
      </main>
    );
  }

  return (
    <main className="checkout-page container animate-fade-in">
      <div className="checkout-header">
        <h1 className="text-h2">Checkout</h1>
        <Link to="/cart" className="checkout-back-btn" style={{ textDecoration: 'none' }}>
          ← Back to Cart
        </Link>
      </div>

      <div className="checkout-layout">
        <section className="checkout-form-section glass">
          <h2 className="checkout-section-title">Shipping Information</h2>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input 
                className="form-input" 
                type="text" 
                id="fullName" 
                name="fullName" 
                placeholder="Enter your full name" 
                value={formData.fullName}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input 
                className="form-input" 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="e.g., 0912345678" 
                value={formData.phone}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">Shipping Address</label>
              <textarea 
                className="form-input" 
                id="address" 
                name="address" 
                placeholder="Street, City, State, ZIP" 
                value={formData.address}
                onChange={handleChange}
                required 
              />
            </div>
          </form>
        </section>

        <section className="checkout-summary-section glass">
          <h2 className="checkout-section-title">Your Order</h2>
          
          <div className="checkout-items-list">
            {selectedItems.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-details">
                  <h3 className="checkout-item-name">{item.name}</h3>
                  <span className="checkout-item-qty">Qty: {item.quantity}</span>
                </div>
                <div className="checkout-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping Fee</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="summary-row total-row">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button 
            type="submit" 
            className="base-btn btn-primary place-order-btn"
            onClick={handleCheckout}
          >
            Place Order
          </button>
        </section>
      </div>
    </main>
  );
};

export default Checkout;
