import React, { useState } from "react";
import "./individual.css";

const IndividualProduct = ({ camera, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  if (!camera) return null;

  // Mock additional images for gallery
  const images = [camera.image, camera.image, camera.image, camera.image];

  const handleAddToCart = () => {
    onAddToCart(camera, quantity);
    // Show success message or animation
    alert(`Added ${quantity} ${camera.name} to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  return (
    <div className="individual-product">
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button className="btn btn-link p-0" onClick={onBack}>
                Products
              </button>
            </li>
            <li className="breadcrumb-item">{camera.brand}</li>
            <li className="breadcrumb-item active" aria-current="page">
              {camera.name}
            </li>
          </ol>
        </nav>

        <div className="row">
          {/* Product Images */}
          <div className="col-md-6 mb-4">
            <div className="product-gallery">
              <div className="main-image-container">
                <img
                  src={images[selectedImage]}
                  alt={camera.name}
                  className="main-product-image"
                />
                {camera.originalPrice > camera.price && (
                  <div className="discount-badge-large">
                    {Math.round(
                      ((camera.originalPrice - camera.price) /
                        camera.originalPrice) *
                        100
                    )}
                    % OFF
                  </div>
                )}
              </div>

              <div className="image-thumbnails">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${camera.name} view ${index + 1}`}
                    className={`thumbnail ${
                      selectedImage === index ? "active" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-md-6">
            <div className="product-detail-info">
              <div className="product-detail-brand">{camera.brand}</div>
              <h1 className="product-detail-title">{camera.name}</h1>

              <div className="rating-section mb-3">
                <div className="d-flex align-items-center">
                  <span className="rating-stars-large">
                    {"★".repeat(Math.floor(camera.rating))}
                    {"☆".repeat(5 - Math.floor(camera.rating))}
                  </span>
                  <span className="rating-text ms-2">
                    {camera.rating} ({camera.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="price-section mb-4">
                <div className="current-price">
                  ${camera.price.toLocaleString()}
                </div>
                {camera.originalPrice > camera.price && (
                  <div className="price-comparison">
                    <span className="original-price">
                      ${camera.originalPrice.toLocaleString()}
                    </span>
                    <span className="savings">
                      Save $
                      {(camera.originalPrice - camera.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="product-description mb-4">
                <p className="lead">{camera.description}</p>
              </div>

              {/* Key Features */}
              <div className="key-features mb-4">
                <h5 className="features-title">Key Features</h5>
                <ul className="features-list">
                  {camera.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="purchase-section">
                <div className="quantity-section mb-3">
                  <label className="quantity-label">Quantity:</label>
                  <div className="quantity-controls">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{quantity}</span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    className="btn btn-primary btn-lg add-to-cart-btn"
                    onClick={handleAddToCart}
                  >
                    Add to Cart - ${(camera.price * quantity).toLocaleString()}
                  </button>
                  <button className="btn btn-outline-secondary btn-lg">
                    Add to Wishlist
                  </button>
                </div>

                <div className="product-info-badges mt-3">
                  <span className="badge bg-success me-2">✓ In Stock</span>
                  <span className="badge bg-info me-2">🚚 Free Shipping</span>
                  <span className="badge bg-warning">🛡️ 2 Year Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="row mt-5">
          <div className="col-12">
            <ul className="nav nav-tabs product-tabs" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "specifications" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("specifications")}
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeTab === "reviews" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews ({camera.reviews})
                </button>
              </li>
            </ul>

            <div className="tab-content mt-4">
              {activeTab === "description" && (
                <div className="tab-pane">
                  <div className="description-content">
                    <h4>About the {camera.name}</h4>
                    <p>{camera.description}</p>
                    <p>
                      This professional camera is designed for photographers who
                      demand the highest quality and performance. With its
                      advanced features and robust build quality, it's perfect
                      for both studio work and field photography.
                    </p>
                    <h5>What's in the Box</h5>
                    <ul>
                      <li>{camera.name} Camera Body</li>
                      <li>Battery Pack</li>
                      <li>Battery Charger</li>
                      <li>USB Cable</li>
                      <li>Neck Strap</li>
                      <li>User Manual</li>
                      <li>Software CD</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="tab-pane">
                  <div className="specifications-content">
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Image Quality</h5>
                        <table className="table table-sm specs-table">
                          <tbody>
                            <tr>
                              <td>Resolution</td>
                              <td>{camera.specs.resolution}</td>
                            </tr>
                            <tr>
                              <td>ISO Range</td>
                              <td>{camera.specs.iso}</td>
                            </tr>
                            <tr>
                              <td>Image Processor</td>
                              <td>Advanced DIGIC X</td>
                            </tr>
                            <tr>
                              <td>Color Depth</td>
                              <td>14-bit RAW</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-6">
                        <h5>Video & Storage</h5>
                        <table className="table table-sm specs-table">
                          <tbody>
                            <tr>
                              <td>Video Recording</td>
                              <td>{camera.specs.video}</td>
                            </tr>
                            <tr>
                              <td>Storage</td>
                              <td>{camera.specs.storage}</td>
                            </tr>
                            <tr>
                              <td>Connectivity</td>
                              <td>Wi-Fi, Bluetooth, USB-C</td>
                            </tr>
                            <tr>
                              <td>Weight</td>
                              <td>650g (body only)</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="tab-pane">
                  <div className="reviews-content">
                    <div className="reviews-summary mb-4">
                      <div className="row">
                        <div className="col-md-3 text-center">
                          <div className="average-rating">
                            <span className="rating-number">
                              {camera.rating}
                            </span>
                            <div className="rating-stars-large">
                              {"★".repeat(Math.floor(camera.rating))}
                              {"☆".repeat(5 - Math.floor(camera.rating))}
                            </div>
                            <p className="text-muted">
                              {camera.reviews} reviews
                            </p>
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="rating-breakdown">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <div key={star} className="rating-row">
                                <span>{star} ★</span>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    style={{
                                      width: `${
                                        star === 5
                                          ? 70
                                          : star === 4
                                          ? 20
                                          : star === 3
                                          ? 7
                                          : star === 2
                                          ? 2
                                          : 1
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="percentage">
                                  {star === 5
                                    ? 70
                                    : star === 4
                                    ? 20
                                    : star === 3
                                    ? 7
                                    : star === 2
                                    ? 2
                                    : 1}
                                  %
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sample Reviews */}
                    <div className="individual-reviews">
                      <div className="review-item">
                        <div className="reviewer-info">
                          <strong>John D.</strong>
                          <span className="review-rating">★★★★★</span>
                          <span className="review-date">2 weeks ago</span>
                        </div>
                        <p>
                          Excellent camera! The image quality is outstanding and
                          the autofocus is incredibly fast. Perfect for
                          professional photography.
                        </p>
                      </div>

                      <div className="review-item">
                        <div className="reviewer-info">
                          <strong>Sarah M.</strong>
                          <span className="review-rating">★★★★☆</span>
                          <span className="review-date">1 month ago</span>
                        </div>
                        <p>
                          Great camera overall. The video quality is amazing.
                          Only minor complaint is the battery life could be
                          better.
                        </p>
                      </div>

                      <div className="review-item">
                        <div className="reviewer-info">
                          <strong>Mike R.</strong>
                          <span className="review-rating">★★★★★</span>
                          <span className="review-date">2 months ago</span>
                        </div>
                        <p>
                          This camera exceeded my expectations. The build
                          quality is excellent and it performs well in low light
                          conditions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualProduct;
