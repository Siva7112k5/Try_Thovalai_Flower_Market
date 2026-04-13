import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ cartCount, onSearch, categories }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // You can pass this to parent if needed
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <span className="logo-icon">🌺</span>
          <span className="logo-text">Maalai Mandir</span>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#home" className="nav-link active">Home</a>
          <a href="#shop" className="nav-link">Shop</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#offers" className="nav-link">
            Offers
            <span className="hot-badge">HOT</span>
          </a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        {/* Search Bar */}
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search maalai..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="search-btn">🔍</button>
        </div>

        {/* Right Section - Icons */}
        <div className="navbar-actions">
          <button className="action-btn" title="Wishlist">
            <span className="action-icon">❤️</span>
            <span className="action-badge">3</span>
          </button>
          
          <button className="action-btn cart-btn" title="Cart">
            <span className="action-icon">🛒</span>
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
          
          <button className="action-btn user-btn" title="Account">
            <span className="action-icon">👤</span>
          </button>
        </div>
      </div>

      {/* Category Bar (Secondary Navigation) */}
      <div className="category-bar">
        <div className="category-container">
          <button 
            className={`category-item ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            All Flowers
          </button>
          <button 
            className={`category-item ${activeCategory === 'wedding' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('wedding')}
          >
            💑 Wedding Maalai
          </button>
          <button 
            className={`category-item ${activeCategory === 'temple' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('temple')}
          >
            🛕 Temple Garlands
          </button>
          <button 
            className={`category-item ${activeCategory === 'jasmine' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('jasmine')}
          >
            🌼 Jasmine Strings
          </button>
          <button 
            className={`category-item ${activeCategory === 'rose' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('rose')}
          >
            🌹 Rose Specials
          </button>
          <button 
            className={`category-item ${activeCategory === 'bulk' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('bulk')}
          >
            📦 Bulk Orders
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;