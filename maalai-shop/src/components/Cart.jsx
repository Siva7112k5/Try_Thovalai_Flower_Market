import React from 'react';
import './Cart.css';

function Cart({ cart, onRemoveItem, onUpdateQuantity, onClearCart }) {
  
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      return sum + (item[item.selectedType].price * item.quantity);
    }, 0);
  };
  
  const calculateSavings = () => {
    let savings = 0;
    cart.forEach(item => {
      if (item.selectedType === 'wholesale') {
        const retailPrice = item.retail.price * item.quantity;
        const wholesalePrice = item.wholesale.price * item.quantity;
        savings += retailPrice - wholesalePrice;
      }
    });
    return savings;
  };
  
  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-cart-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some beautiful maalai to get started!</p>
      </div>
    );
  }
  
  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>🛒 Shopping Cart</h2>
        <span className="item-count">{cart.length} items</span>
      </div>
      
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.cartId} className="cart-item">
            <img 
              src={item.image} 
              alt={item.name} 
              className="cart-item-image"
            />
            
            <div className="cart-item-details">
              <div className="cart-item-header">
                <h4 className="cart-item-name">{item.name}</h4>
                <button 
                  onClick={() => onRemoveItem(item.cartId)}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
              
              <span className={`cart-item-type ${item.selectedType}`}>
                {item.selectedType === 'wholesale' ? '🏪 Wholesale' : '🛍️ Retail'}
              </span>
              
              <p className="cart-item-unit">{item[item.selectedType].unit}</p>
              
              <div className="cart-item-footer">
                <div className="cart-quantity-selector">
                  <button 
                    onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                    className="cart-qty-btn"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="cart-quantity">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                    className="cart-qty-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-price">
                  ₹{item[item.selectedType].price * item.quantity}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        {calculateSavings() > 0 && (
          <div className="savings-row">
            <span>💰 Your Savings:</span>
            <span className="savings-amount">₹{calculateSavings()}</span>
          </div>
        )}
        
        <div className="total-row">
          <span>Total Amount:</span>
          <span className="total-amount">₹{calculateTotal()}</span>
        </div>
        
        <button className="checkout-btn">
          Proceed to Checkout 🎉
        </button>
        
        <button onClick={onClearCart} className="clear-cart-btn">
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;