import React, { useState } from 'react';
import './ProductCard.css';

function ProductCard({ flower, type, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [showAnimation, setShowAnimation] = useState(false);
  
  const data = flower[type];
  
  const handleAddToCart = () => {
    onAddToCart(flower, type, quantity);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 500);
  };
  
  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => q > 1 ? q - 1 : 1);
  
  return (
    <div className={`product-card ${type}-card ${showAnimation ? 'shake' : ''}`}>
      <div className="card-badge">
        {type === 'wholesale' ? '🏪 WHOLESALE' : '🛍️ RETAIL'}
      </div>
      
      <img 
        src={flower.image} 
        alt={flower.name} 
        className="product-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200?text=Flower';
        }}
      />
      
      <div className="product-info">
        <h3 className="product-name">{flower.name}</h3>
        <p className="product-description">{flower.description}</p>
        
        <div className="product-details">
          <div className="unit-info">
            <span className="unit-label">📦 Unit:</span>
            <span className="unit-value">{data.unit}</span>
          </div>
          
          <div className="price-container">
            <span className="currency">₹</span>
            <span className="price">{data.price}</span>
            {type === 'wholesale' && (
              <span className="savings-badge">
                Save ₹{Math.round((flower.retail.price * 10) - data.price)}
              </span>
            )}
          </div>
        </div>
        
        <div className="quantity-selector">
          <button 
            onClick={decrementQuantity} 
            className="qty-btn"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span className="quantity">{quantity}</span>
          <button 
            onClick={incrementQuantity} 
            className="qty-btn"
          >
            +
          </button>
        </div>
        
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;