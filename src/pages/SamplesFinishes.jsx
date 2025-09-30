import React, { useState, useEffect } from "react";
import finishes from "../data/finishes.js";
import "../styles/SamplesFinishes.css";
import { Link } from "react-router-dom";

export default function SamplesFinishes() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [likedItems, setLikedItems] = useState(new Set());
  const [cartItems, setCartItems] = useState(new Set());
  const [showNotification, setShowNotification] = useState(null);

  useEffect(() => {
    // Staggered animation for items appearing
    const allItems = finishes.flatMap(group => group.items.map(item => item.code));
    allItems.forEach((code, index) => {
      setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, code]));
      }, 100 + index * 50);
    });

    // Load saved likes and cart from memory (simulating localStorage)
    const savedLikes = JSON.parse(sessionStorage.getItem('likedFinishes') || '[]');
    const savedCart = JSON.parse(sessionStorage.getItem('cartFinishes') || '[]');
    setLikedItems(new Set(savedLikes));
    setCartItems(new Set(savedCart));
  }, []);

  const handleImageError = (itemCode) => {
    setImageErrors(prev => new Set([...prev, itemCode]));
  };

  const handleImageLoad = (itemCode) => {
    setImageErrors(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemCode);
      return newSet;
    });
  };

  const handleLike = (e, itemCode, itemName) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLikedItems(prev => {
      const newLiked = new Set(prev);
      const isLiked = newLiked.has(itemCode);
      
      if (isLiked) {
        newLiked.delete(itemCode);
        showNotificationMessage(`Removed ${itemName} from favorites`, 'unlike');
      } else {
        newLiked.add(itemCode);
        showNotificationMessage(`Added ${itemName} to favorites`, 'like');
      }
      
      // Save to sessionStorage
      sessionStorage.setItem('likedFinishes', JSON.stringify([...newLiked]));
      return newLiked;
    });
  };

  const handleAddToCart = (e, itemCode, itemName) => {
    e.preventDefault();
    e.stopPropagation();
    
    setCartItems(prev => {
      const newCart = new Set(prev);
      const isInCart = newCart.has(itemCode);
      
      if (isInCart) {
        newCart.delete(itemCode);
        showNotificationMessage(`Removed ${itemName} from cart`, 'remove');
      } else {
        newCart.add(itemCode);
        showNotificationMessage(`Added ${itemName} to cart`, 'add');
      }
      
      // Save to sessionStorage
      sessionStorage.setItem('cartFinishes', JSON.stringify([...newCart]));
      return newCart;
    });
  };

  const showNotificationMessage = (message, type) => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3000);
  };

  return (
    <section className="samples-section">
      <div className="container">
        {/* Enhanced Header */}
        <header className="finishes__header">
          <div className="header-content">
            <h1 className="section-heading">
              <span className="heading-text">Samples & Finishes</span>
              <div className="heading-underline"></div>
            </h1>
            <p className="section-sub">
              Explore our wide range of premium aluminum composite finishes
            </p>
            <div className="stats-bar">
              <div className="stat-item">
                <span className="stat-number">{likedItems.size}</span>
                <span className="favcart-stat">Favorites</span>
              </div>
              <div className="stat-divider"></div>
              <Link
                to="/cart"
                className="stat-item stat-clickable"
                aria-label="Open cart"
                title="Open cart"
              >
                <span className="stat-number">{cartItems.size}</span>
                <span className="favcart-stat">In Cart</span>
              </Link>
            </div>
            <div className="decorative-line"></div>
          </div>
        </header>

        {/* Notification */}
        {showNotification && (
          <div className={`notification ${showNotification.type}`}>
            <div className="notification-content">
              <span className="notification-icon">
                {showNotification.type === 'like' && '❤️'}
                {showNotification.type === 'unlike' && '💔'}
                {showNotification.type === 'add' && '🛒'}
                {showNotification.type === 'remove' && '🗑️'}
              </span>
              <span className="notification-message">{showNotification.message}</span>
            </div>
            <div className="notification-progress"></div>
          </div>
        )}

        {/* Finish Groups */}
        {finishes.map((group, groupIndex) => (
          <div 
            key={group.category} 
            className="finishGroup"
            style={{ '--group-index': groupIndex }}
          >
            <h2 className="finishGroup__title">
              <span className="category-accent"></span>
              <span className="category-text">{group.category}</span>
            </h2>
            
            <div className="finishGrid">
              {group.items.map((item, itemIndex) => (
                <Link 
                  to={`/finishes/${item.code}`} 
                  key={item.code}
                  className="finish-link"
                  onMouseEnter={() => setHoveredCard(item.code)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div 
                    className={`finishCard ${visibleItems.has(item.code) ? 'visible' : ''} ${hoveredCard === item.code ? 'hovered' : ''}`}
                    style={{ '--item-index': itemIndex }}
                  >
                    {/* Hover overlay */}
                    <div className="card-overlay"></div>
                    
                    {/* Action buttons */}
                    <div className="card-actions">
                      <button 
                        className={`action-btn like-btn ${likedItems.has(item.code) ? 'liked' : ''}`}
                        onClick={(e) => handleLike(e, item.code, item.name)}
                        title={likedItems.has(item.code) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                      
                      <button 
                        className={`action-btn cart-btn ${cartItems.has(item.code) ? 'in-cart' : ''}`}
                        onClick={(e) => handleAddToCart(e, item.code, item.name)}
                        title={cartItems.has(item.code) ? 'Remove from cart' : 'Add to cart'}
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          {cartItems.has(item.code) ? (
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          ) : (
                            <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                          )}
                        </svg>
                      </button>
                    </div>
                    
                    {/* Status badges */}
                    <div className="status-badges">
                      {likedItems.has(item.code) && (
                        <span className="status-badge liked-badge">Favorite</span>
                      )}
                      {cartItems.has(item.code) && (
                        <span className="status-badge cart-badge">In Cart</span>
                      )}
                    </div>
                    
                    {/* Image container */}
                    <div className="finishCard__img">
                      <div className="img-wrapper">
                        <img 
                          src={item.img} 
                          alt={`${item.code} ${item.name}`}
                          onError={() => handleImageError(item.code)}
                          onLoad={() => handleImageLoad(item.code)}
                          className={imageErrors.has(item.code) ? 'error' : ''}
                        />
                        {imageErrors.has(item.code) && (
                          <div className="image-placeholder">
                            <div className="placeholder-icon">🎨</div>
                          </div>
                        )}
                        <div className="image-shine"></div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="finishCard__content">
                      <h3 className="finish-code">{item.code}</h3>
                      <p className="finish-name">{item.name}</p>
                    </div>
                    
                    {/* Hover indicator */}
                    <div className="hover-indicator">
                      <span>View Details</span>
                      <div className="arrow">→</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        
        {/* Loading animation for when no items */}
        {visibleItems.size === 0 && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading finishes...</p>
          </div>
        )}
      </div>
    </section>
  );
}