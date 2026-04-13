import React, { useState } from 'react';
import { flowerData } from './data/flowers';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (flower, saleType, quantity) => {
    const existingItemIndex = cart.findIndex(
      item => item.id === flower.id && item.selectedType === saleType
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      const itemToAdd = {
        ...flower,
        selectedType: saleType,
        quantity: quantity,
        cartId: `${flower.id}-${saleType}-${Date.now()}`
      };
      setCart([...cart, itemToAdd]);
    }
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(cartId);
      return;
    }
    
    setCart(cart.map(item => 
      item.cartId === cartId 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCart([]);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  // Filter flowers based on search term
  const filteredFlowers = flowerData.filter(flower => 
    flower.name.toLowerCase().includes(searchTerm) ||
    flower.description.toLowerCase().includes(searchTerm)
  );

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="App">
      {/* Navbar Component */}
      <Navbar 
        cartCount={totalCartItems}
        onSearch={handleSearch}
      />

      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="header-text">
            <h2 className="welcome-text">Welcome to</h2>
            <h1 className="main-title">Sacred Wedding Garlands</h1>
            <p className="header-description">
              Fresh, handcrafted maalai for your special moments
            </p>
            <div className="header-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Happy Weddings</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Fresh Delivery</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <div className="filter-section">
        <button 
          className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All Products
        </button>
        <button 
          className={`filter-btn ${filterType === 'retail' ? 'active' : ''}`}
          onClick={() => setFilterType('retail')}
        >
          🛍️ Retail Only
        </button>
        <button 
          className={`filter-btn ${filterType === 'wholesale' ? 'active' : ''}`}
          onClick={() => setFilterType('wholesale')}
        >
          🏪 Wholesale Only
        </button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Products Grid */}
        <div className="products-section">
          <div className="section-header">
            <h2 className="section-title">
              {searchTerm ? `🔍 Search Results for "${searchTerm}"` : 
                filterType === 'all' ? '✨ Our Collection' :
                filterType === 'retail' ? '🛍️ Retail Garlands' : '🏪 Wholesale Bulk Orders'}
            </h2>
            {searchTerm && filteredFlowers.length === 0 && (
              <p className="no-results">No maalai found matching "{searchTerm}"</p>
            )}
          </div>
          
          <div className="products-grid">
            {filteredFlowers.map((flower) => (
              <React.Fragment key={flower.id}>
                {(filterType === 'all' || filterType === 'retail') && (
                  <ProductCard 
                    flower={flower} 
                    type="retail" 
                    onAddToCart={addToCart} 
                  />
                )}
                {(filterType === 'all' || filterType === 'wholesale') && (
                  <ProductCard 
                    flower={flower} 
                    type="wholesale" 
                    onAddToCart={addToCart} 
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="cart-section">
          <Cart 
            cart={cart}
            onRemoveItem={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClearCart={clearCart}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🌺 Maalai Mandir</h3>
            <p>Bringing sacred traditions to your doorstep</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#about">About Us</a>
            <a href="#delivery">Delivery Info</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📞 +91 98765 43210</p>
            <p>✉️ hello@maalaimandir.com</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Maalai Mandir. Fresh flowers, pure traditions.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;