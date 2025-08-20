import React from "react";

const Home = ({ onViewProducts, featuredCameras }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center hero-content">
              <h1 className="hero-title">Capture Every Moment</h1>
              <p className="hero-subtitle">
                Discover professional cameras and equipment from the world's
                leading brands
              </p>
              <button
                className="btn btn-primary btn-lg btn-gradient"
                onClick={onViewProducts}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Cameras</h2>
          <div className="row">
            {featuredCameras.slice(0, 3).map((camera) => (
              <div key={camera.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card product-card h-100">
                  <img
                    src={camera.image}
                    alt={camera.name}
                    className="product-image"
                  />
                  <div className="card-body product-info d-flex flex-column">
                    <div className="product-brand">{camera.brand}</div>
                    <h5 className="product-name">{camera.name}</h5>
                    <div className="mb-2">
                      <span className="rating-stars">
                        {"★".repeat(Math.floor(camera.rating))}
                      </span>
                      <span className="rating-text">
                        ({camera.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-muted small mb-3">
                      {camera.description}
                    </p>
                    <div className="mt-auto">
                      <div className="product-price">
                        ${camera.price.toLocaleString()}
                        {camera.originalPrice > camera.price && (
                          <span className="product-original-price">
                            ${camera.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={onViewProducts}
            >
              View All Cameras
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title text-white">Why Choose CameraPro?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon">🚚</div>
                <h4>Free Shipping</h4>
                <p>
                  Free shipping on all orders over $500. Fast and secure
                  delivery worldwide.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon">🛡️</div>
                <h4>2-Year Warranty</h4>
                <p>
                  All cameras come with comprehensive 2-year warranty and
                  support.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card text-center">
                <div className="feature-icon">🏆</div>
                <h4>Expert Support</h4>
                <p>
                  Get professional advice from our team of photography experts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
