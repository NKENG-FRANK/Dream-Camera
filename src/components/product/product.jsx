import React, { useState, useEffect } from "react";
import "./product.css";

const Products = ({ cameras, onProductClick, onAddToCart }) => {
  const [filteredCameras, setFilteredCameras] = useState(cameras);
  const [brandFilter, setBrandFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Get unique brands and categories
  const brands = [...new Set(cameras.map((camera) => camera.brand))];
  const categories = [...new Set(cameras.map((camera) => camera.category))];

  // Filter and sort cameras
  useEffect(() => {
    let filtered = cameras;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (camera) =>
          camera.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          camera.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply brand filter
    if (brandFilter) {
      filtered = filtered.filter((camera) => camera.brand === brandFilter);
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(
        (camera) => camera.category === categoryFilter
      );
    }

    // Apply price range filter
    if (priceRange.min !== "" || priceRange.max !== "") {
      filtered = filtered.filter((camera) => {
        const price = camera.price;
        const minPrice = priceRange.min === "" ? 0 : parseInt(priceRange.min);
        const maxPrice =
          priceRange.max === "" ? Infinity : parseInt(priceRange.max);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Apply price sorting
    if (priceSort === "low-high") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceSort === "high-low") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (priceSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (priceSort === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredCameras(filtered);
  }, [cameras, brandFilter, categoryFilter, priceSort, searchTerm, priceRange]);

  const handleAddToCart = (camera, e) => {
    e.stopPropagation();
    onAddToCart(camera);

    // Show a brief confirmation (you could use a toast library here)
    const button = e.target;
    const originalText = button.textContent;
    button.textContent = "Added!";
    button.classList.add("btn-success");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("btn-success");
    }, 1000);
  };

  const clearFilters = () => {
    setBrandFilter("");
    setCategoryFilter("");
    setPriceSort("");
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
  };

  return (
    <div className="products-page py-4">
      {/* Filters Section */}
      <section className="filters-section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search cameras..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-2 mb-3">
              <div className="filter-group">
                <label className="filter-label">Brand</label>
                <select
                  className="form-select"
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2 mb-3">
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select
                  className="form-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-2 mb-3">
              <div className="filter-group">
                <label className="filter-label">Sort by</label>
                <select
                  className="form-select"
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                >
                  <option value="">Default</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>
            <div className="col-md-2 mb-3">
              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control form-control-sm me-1"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="col-md-1 mb-3">
              <div className="filter-group">
                <label className="filter-label">&nbsp;</label>
                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={clearFilters}
                  title="Clear all filters"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <div className="container">
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="section-title mb-0">
                Our Cameras{" "}
                <small className="text-muted">
                  ({filteredCameras.length} products)
                </small>
              </h2>
              <div className="view-options">
                <button className="btn btn-outline-secondary btn-sm me-2 active">
                  <i className="fas fa-th"></i> Grid
                </button>
                <button className="btn btn-outline-secondary btn-sm">
                  <i className="fas fa-list"></i> List
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {filteredCameras.map((camera) => (
            <div key={camera.id} className="col-lg-4 col-md-6 mb-4">
              <div
                className="card product-card h-100"
                style={{ cursor: "pointer" }}
                onClick={() => onProductClick(camera)}
              >
                <div className="product-image-container">
                  <img
                    src={camera.image}
                    alt={camera.name}
                    className="product-image"
                  />
                  {camera.originalPrice > camera.price && (
                    <div className="discount-badge">
                      {Math.round(
                        ((camera.originalPrice - camera.price) /
                          camera.originalPrice) *
                          100
                      )}
                      % OFF
                    </div>
                  )}
                </div>
                <div className="card-body product-info d-flex flex-column">
                  <div className="product-brand">{camera.brand}</div>
                  <h5 className="product-name">{camera.name}</h5>
                  <div className="mb-2">
                    <span className="rating-stars">
                      {"★".repeat(Math.floor(camera.rating))}
                      {"☆".repeat(5 - Math.floor(camera.rating))}
                    </span>
                    <span className="rating-text">
                      {camera.rating} ({camera.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-muted small mb-3">
                    {camera.description.substring(0, 100)}...
                  </p>

                  {/* Quick specs */}
                  <div className="quick-specs mb-3">
                    <small className="text-muted">
                      <strong>Resolution:</strong> {camera.specs.resolution} |
                      <strong> Video:</strong> {camera.specs.video}
                    </small>
                  </div>

                  <div className="mt-auto">
                    <div className="product-price mb-3">
                      ${camera.price.toLocaleString()}
                      {camera.originalPrice > camera.price && (
                        <span className="product-original-price">
                          ${camera.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-primary btn-sm flex-grow-1"
                        onClick={(e) => handleAddToCart(camera, e)}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onProductClick(camera);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCameras.length === 0 && (
          <div className="row">
            <div className="col-12 text-center py-5">
              <div className="no-products">
                <h4>No cameras found</h4>
                <p className="text-muted">
                  Try adjusting your filters or search terms
                </p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
