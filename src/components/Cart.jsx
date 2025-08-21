import React, { useState } from "react";
import "./Cart.css";
const Cart = ({
  cartItems,
  onClose,
  onRemove,
  onUpdateQuantity,
  onClear,
  total,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);

      // Clear cart after successful checkout
      setTimeout(() => {
        onClear();
        setCheckoutComplete(false);
        onClose();
      }, 2000);
    }, 2000);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const shippingCost = total > 500 ? 0 : 29.99;
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax;

  return (
    <>
      {/* Backdrop */}
      <div className="cart-backdrop" onClick={onClose}></div>

      {/* Cart Sidebar */}
      <div className="cart-sidebar">
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="cart-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cart-content">
          {checkoutComplete ? (
            <div className="checkout-success">
              <div className="success-icon">✅</div>
              <h4>Order Confirmed!</h4>
              <p>
                Thank you for your purchase. Your order has been placed
                successfully.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <h4>Your cart is empty</h4>
              <p>Add some amazing cameras to get started!</p>
              <button className="btn btn-primary" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <h5 className="cart-item-name">{item.name}</h5>
                      <div className="cart-item-brand">{item.brand}</div>
                      <div className="cart-item-price">
                        {formatPrice(item.price)}
                      </div>

                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="btn btn-sm btn-outline-danger remove-btn"
                          onClick={() => onRemove(item.id)}
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="cart-summary">
                <div className="summary-row">
                  <span>
                    Subtotal (
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
                    items)
                  </span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="summary-row">
                  <span>
                    Shipping
                    {shippingCost === 0 && (
                      <small className="text-success"> (Free over $500)</small>
                    )}
                  </span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>

                <div className="summary-row">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <hr />

                <div className="summary-row total-row">
                  <strong>Total</strong>
                  <strong>{formatPrice(finalTotal)}</strong>
                </div>

                {/* Promo Code */}
                <div className="promo-section">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Promo code"
                    />
                    <button className="btn btn-outline-secondary btn-sm">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="cart-actions">
                  <button
                    className="btn btn-primary btn-lg checkout-btn"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Processing...
                      </>
                    ) : (
                      "Proceed to Checkout"
                    )}
                  </button>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </button>

                  <button
                    className="btn btn-link btn-sm clear-cart-btn"
                    onClick={onClear}
                  >
                    Clear Cart
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="trust-badges">
                  <div className="trust-badge">
                    <span className="badge-icon">🔒</span>
                    <span>Secure Checkout</span>
                  </div>
                  <div className="trust-badge">
                    <span className="badge-icon">🚚</span>
                    <span>Free Returns</span>
                  </div>
                  <div className="trust-badge">
                    <span className="badge-icon">⭐</span>
                    <span>5-Star Service</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="payment-methods">
                  <small className="text-muted">We accept:</small>
                  <div className="payment-icons">
                    <span className="payment-icon">💳 Visa</span>
                    <span className="payment-icon">💳 MC</span>
                    <span className="payment-icon">💳 Amex</span>
                    <span className="payment-icon">🅿️ PayPal</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
