import React, { useState } from "react";
import Home from "./components/home/home";
import Products from "./components/product/product";
import IndividualProduct from "./components/individualpage/individual";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import "./App.css";

// Sample camera data
const camerasData = [
  // Cameras
  {
    id: 1,
    name: "Canon EOS R5",
    brand: "Canon",
    category: "Mirrorless Camera",
    price: 3899,
    originalPrice: 4299,
    image:
      "https://i.pinimg.com/736x/04/de/a7/04dea73d283ea00c886befc309c3f2d1.jpg",
    rating: 4.8,
    reviews: 124,
    specs: {
      resolution: "45MP",
      iso: "100-51200",
      video: "8K/30fps",
      storage: "Dual Card Slots",
    },
    description:
      "Professional full-frame mirrorless camera with 8K video capabilities.",
    features: [
      "8K Video",
      "45MP Sensor",
      "In-Body Stabilization",
      "Dual Pixel AF",
    ],
  },
  {
    id: 2,
    name: "Sony A7 IV",
    brand: "Sony",
    category: "Mirrorless Camera",
    price: 2498,
    originalPrice: 2798,
    image:
      "https://i.pinimg.com/736x/63/5e/f7/635ef7fd96950178d7a1470fd75e3a9e.jpg",
    rating: 4.7,
    reviews: 89,
    specs: {
      resolution: "33MP",
      iso: "100-51200",
      video: "4K/60fps",
      storage: "Dual Card Slots",
    },
    description:
      "Versatile full-frame camera ideal for photography and videography.",
    features: [
      "4K 60fps Video",
      "33MP Sensor",
      "693-point AF System",
      "5-Axis Stabilization",
    ],
  },
  {
    id: 3,
    name: "Nikon Z9",
    brand: "Nikon",
    category: "Mirrorless Camera",
    price: 5499,
    originalPrice: 5999,
    image:
      "https://i.pinimg.com/736x/57/d9/8f/57d98f79053102bfc823440b9c7e6aa5.jpg",
    rating: 4.9,
    reviews: 67,
    specs: {
      resolution: "45.7MP",
      iso: "64-25600",
      video: "8K/30fps",
      storage: "Dual CFexpress/XQD",
    },
    description:
      "Flagship camera with no mechanical shutter and professional build quality.",
    features: [
      "No Mechanical Shutter",
      "8K Video",
      "493-point AF",
      "Weather Sealed Body",
    ],
  },
  {
    id: 4,
    name: "Fujifilm X-T5",
    brand: "Fujifilm",
    category: "Mirrorless Camera",
    price: 1699,
    originalPrice: 1899,
    image:
      "https://i.pinimg.com/736x/78/38/ac/7838ac5477ddb93d0929ae96e4771e58.jpg",
    rating: 4.6,
    reviews: 156,
    specs: {
      resolution: "40.2MP",
      iso: "125-12800",
      video: "6.2K/30fps",
      storage: "Dual SD Slots",
    },
    description: "APS-C mirrorless camera with film simulation modes.",
    features: [
      "Film Simulation Modes",
      "40.2MP APS-C Sensor",
      "6.2K Video",
      "In-Body Stabilization",
    ],
  },
  {
    id: 5,
    name: "Canon EOS R6 Mark II",
    brand: "Canon",
    category: "Mirrorless Camera",
    price: 2399,
    originalPrice: 2699,
    image:
      "https://i.pinimg.com/1200x/ce/f4/34/cef43418f820b24795265231927e1375.jpg",
    rating: 4.7,
    reviews: 203,
    specs: {
      resolution: "24.2MP",
      iso: "100-102400",
      video: "4K/60fps",
      storage: "Dual SD Slots",
    },
    description: "High-performance camera optimized for speed and low-light.",
    features: [
      "Exceptional Low Light",
      "4K 60fps Video",
      "40fps Burst Mode",
      "Dual Pixel CMOS AF II",
    ],
  },
  {
    id: 6,
    name: "Sony A7R V",
    brand: "Sony",
    category: "Mirrorless Camera",
    price: 3898,
    originalPrice: 4298,
    image:
      "https://i.pinimg.com/736x/8e/6e/bd/8e6ebd431004064d070cc1e69bc4e592.jpg",
    rating: 4.8,
    reviews: 91,
    specs: {
      resolution: "61MP",
      iso: "100-32000",
      video: "8K/24fps",
      storage: "Dual Card Slots",
    },
    description: "Ultra-high resolution camera for professional photography.",
    features: [
      "61MP Resolution",
      "8K Video",
      "AI-Based Recognition AF",
      "Pixel Shift Multi Shooting",
    ],
  },

  // Lenses
  {
    id: 7,
    name: "Canon RF 24-70mm f/2.8L",
    brand: "Canon",
    category: "Lens",
    price: 2299,
    originalPrice: 2499,
    image:
      "https://i.pinimg.com/736x/40/ae/1f/40ae1f77894a8f31dd41ff92f472dd06.jpg",
    rating: 4.8,
    reviews: 145,
    specs: {
      focalLength: "24-70mm",
      aperture: "f/2.8",
      mount: "RF",
      stabilization: "Yes",
    },
    description:
      "Professional standard zoom lens for Canon mirrorless cameras.",
    features: ["Wide Aperture", "Image Stabilization", "Weather Sealed"],
  },
  {
    id: 8,
    name: "Sony FE 70-200mm f/2.8 GM",
    brand: "Sony",
    category: "Lens",
    price: 2599,
    originalPrice: 2799,
    image:
      "https://i.pinimg.com/736x/9d/cd/a9/9dcda90a68c8101b92518766d16a100d.jpg",
    rating: 4.9,
    reviews: 102,
    specs: {
      focalLength: "70-200mm",
      aperture: "f/2.8",
      mount: "E",
      stabilization: "Yes",
    },
    description: "High-performance telephoto lens for sports and wildlife.",
    features: ["Fast Autofocus", "Weather Sealed", "Excellent Bokeh"],
  },
  {
    id: 9,
    name: "Nikon NIKKOR Z 50mm f/1.2 S",
    brand: "Nikon",
    category: "Lens",
    price: 1999,
    originalPrice: 2199,
    image:
      "https://i.pinimg.com/736x/98/37/9e/98379e207e2717523cd99a88abb1e152.jpg",
    rating: 4.9,
    reviews: 76,
    specs: {
      focalLength: "50mm",
      aperture: "f/1.2",
      mount: "Z",
      stabilization: "No",
    },
    description: "Premium fast prime lens for Nikon Z-series cameras.",
    features: ["Wide Aperture", "Sharp Optics", "Weather Sealed"],
  },

  // Tripods
  {
    id: 10,
    name: "Manfrotto Befree GT X",
    brand: "Manfrotto",
    category: "Tripod",
    price: 399,
    originalPrice: 449,
    image:
      "https://i.pinimg.com/736x/e8/72/91/e872912bc466bb29252999bd7ab9168d.jpg",
    rating: 4.6,
    reviews: 88,
    specs: { height: "150cm", loadCapacity: "10kg", material: "Aluminum" },
    description: "Compact travel tripod with excellent stability.",
    features: ["Lightweight", "Foldable", "Quick Release Plate"],
  },
  {
    id: 11,
    name: "Peak Design Travel Tripod",
    brand: "Peak Design",
    category: "Tripod",
    price: 599,
    originalPrice: 649,
    image:
      "https://i.pinimg.com/1200x/56/1d/3c/561d3c2f908e403b060c4db3ba3b3394.jpg",
    rating: 4.8,
    reviews: 75,
    specs: { height: "152cm", loadCapacity: "9kg", material: "Carbon Fiber" },
    description: "Ultra-compact tripod ideal for travel.",
    features: ["Carbon Fiber", "Fast Setup", "Versatile Mounting"],
  },

  // Gimbals
  {
    id: 12,
    name: "DJI Ronin-S",
    brand: "DJI",
    category: "Gimbal",
    price: 749,
    originalPrice: 799,
    image:
      "https://i.pinimg.com/736x/1f/26/08/1f260824b56b1538015801b3b8529b60.jpg",
    rating: 4.7,
    reviews: 92,
    specs: {
      maxPayload: "3.6kg",
      batteryLife: "12h",
      compatible: "DSLR & Mirrorless",
    },
    description: "Handheld 3-axis gimbal stabilizer.",
    features: ["3-Axis Stabilization", "Long Battery Life", "Multiple Modes"],
  },
  {
    id: 13,
    name: "Zhiyun Weebill 3",
    brand: "Zhiyun",
    category: "Gimbal",
    price: 599,
    originalPrice: 649,
    image:
      "https://i.pinimg.com/736x/a9/1f/42/a91f42bf6f0e430fd0594eed47361f62.jpg",
    rating: 4.6,
    reviews: 68,
    specs: {
      maxPayload: "3.2kg",
      batteryLife: "14h",
      compatible: "DSLR & Mirrorless",
    },
    description: "Compact gimbal for smooth handheld video.",
    features: ["Lightweight", "Smooth Motion", "Versatile Mounting"],
  },

  // Memory Cards
  {
    id: 14,
    name: "SanDisk Extreme Pro 128GB SDXC",
    brand: "SanDisk",
    category: "Memory Card",
    price: 49,
    originalPrice: 59,
    image:
      "https://i.pinimg.com/1200x/0d/84/8a/0d848ae934d672bacc2430eacafa66d6.jpg",
    rating: 4.9,
    reviews: 210,
    specs: { capacity: "128GB", speed: "170MB/s", type: "SDXC" },
    description: "High-speed memory card for 4K video.",
    features: ["High Speed", "Durable", "Reliable"],
  },
  {
    id: 15,
    name: "Lexar Professional 2000x 64GB CFexpress",
    brand: "Lexar",
    category: "Memory Card",
    price: 149,
    originalPrice: 169,
    image:
      "https://i.pinimg.com/1200x/35/13/16/351316fcfb4ea6fea9137e47f533b5cb.jpg",
    rating: 4.8,
    reviews: 95,
    specs: { capacity: "64GB", speed: "3000MB/s", type: "CFexpress" },
    description: "Professional CFexpress card.",
    features: ["Ultra Fast", "Reliable", "High Capacity"],
  },

  // Lighting
  {
    id: 16,
    name: "Godox SL60W LED",
    brand: "Godox",
    category: "Lighting",
    price: 134,
    originalPrice: 149,
    image:
      "https://i.pinimg.com/1200x/38/67/02/3867025ffe94b03b2fbbe99a4e40e36a.jpg",
    rating: 4.5,
    reviews: 78,
    specs: { power: "60W", colorTemp: "5600K", type: "LED" },
    description: "Continuous LED light for photography and videography.",
    features: [
      "Adjustable Brightness",
      "Daylight Balanced",
      "Quiet Fan Cooling",
    ],
  },
  {
    id: 17,
    name: 'Neewer Ring Light 18"',
    brand: "Neewer",
    category: "Lighting",
    price: 89,
    originalPrice: 99,
    image:
      "https://i.pinimg.com/736x/17/bb/d7/17bbd7cb34c20af66c0dc41163cb5f51.jpg",
    rating: 4.6,
    reviews: 120,
    specs: { diameter: "18 inches", colorTemp: "3200-5600K", type: "LED Ring" },
    description: "Versatile ring light perfect for portraits and video.",
    features: ["Adjustable Color", "Dimmable", "Stable Stand"],
  },

  // Camera Bags
  {
    id: 18,
    name: "Peak Design Everyday Backpack 20L",
    brand: "Peak Design",
    category: "Camera Bag",
    price: 269,
    originalPrice: 299,
    image:
      "https://i.pinimg.com/1200x/37/40/97/3740978fa67df5d9a6b1f9e1c6a456bc.jpg",
    rating: 4.8,
    reviews: 87,
    specs: { capacity: "20L", material: "Weatherproof Nylon" },
    description: "Stylish backpack for photographers.",
    features: ["Weatherproof", "Customizable Dividers", "Quick Access"],
  },
  {
    id: 19,
    name: "Lowepro ProTactic 450 AW II",
    brand: "Lowepro",
    category: "Camera Bag",
    price: 249,
    originalPrice: 279,
    image:
      "https://i.pinimg.com/736x/71/58/c2/7158c25e42c56d73efd5e934de8f8e2b.jpg",
    rating: 4.7,
    reviews: 65,
    specs: { capacity: "25L", material: "Nylon", protection: "All Weather" },
    description: "Durable backpack for professionals.",
    features: [
      "Modular Design",
      "All Weather Protection",
      "Multiple Compartments",
    ],
  },

  // Filters
  {
    id: 20,
    name: "Hoya Pro ND 1000 Filter",
    brand: "Hoya",
    category: "Filter",
    price: 79,
    originalPrice: 89,
    image:
      "https://i.pinimg.com/1200x/8e/91/c6/8e91c6ae0d7eff28ca0f73b90c059f11.jpg",
    rating: 4.7,
    reviews: 54,
    specs: { type: "ND", density: "10 Stops", size: "77mm" },
    description: "Neutral density filter for long exposure photography.",
    features: ["Reduces Light", "High Optical Quality", "Durable Glass"],
  },
  {
    id: 21,
    name: "PolarPro Circular Polarizer",
    brand: "PolarPro",
    category: "Filter",
    price: 129,
    originalPrice: 149,
    image:
      "https://i.pinimg.com/736x/55/99/90/5599900d3cb902fcb2326c83eb5a40ab.jpg",
    rating: 4.8,
    reviews: 61,
    specs: { type: "CPL", size: "82mm" },
    description: "Circular polarizer filter for glare and reflection control.",
    features: ["Enhances Colors", "Reduces Reflections", "High Quality Glass"],
  },

  // Flashes
  {
    id: 22,
    name: "Canon Speedlite 600EX II-RT",
    brand: "Canon",
    category: "Flash",
    price: 499,
    originalPrice: 549,
    image:
      "https://i.pinimg.com/736x/09/f6/93/09f693726b4c217154924b760d1764e9.jpg",
    rating: 4.9,
    reviews: 88,
    specs: { guideNumber: 60, wireless: "Yes", tiltSwivel: "Yes" },
    description: "High-performance speedlight for Canon DSLRs.",
    features: ["Wireless TTL", "Tilt & Swivel Head", "High Guide Number"],
  },
  {
    id: 23,
    name: "Godox V1 Flash",
    brand: "Godox",
    category: "Flash",
    price: 259,
    originalPrice: 289,
    image:
      "https://i.pinimg.com/1200x/97/09/d3/9709d3beed6b1bae3a735fb85a62c149.jpg",
    rating: 4.8,
    reviews: 77,
    specs: { guideNumber: 76, wireless: "Yes", tiltSwivel: "Yes" },
    description: "Round head speedlight for natural light effect.",
    features: ["High Guide Number", "Rechargeable Battery", "Wireless TTL"],
  },

  // Monitors
  {
    id: 24,
    name: "Atomos Ninja V",
    brand: "Atomos",
    category: "External Monitor",
    price: 399,
    originalPrice: 449,
    image:
      "https://i.pinimg.com/736x/6d/e8/5a/6de85aead04e5a5d73e22adc50efebc5.jpg",
    rating: 4.7,
    reviews: 65,
    specs: { size: '5"', resolution: "1920x1080", type: "HDR" },
    description: "Compact HDR monitor for video recording.",
    features: ["HDR Support", "Touchscreen", "AtomOS"],
  },
];

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Navigation handlers
  const handleViewProducts = () => {
    setCurrentView("products");
    setSelectedCamera(null);
    setShowCart(false);
  };

  const handleProductClick = (camera) => {
    setSelectedCamera(camera);
    setCurrentView("individual");
    setShowCart(false);
  };

  const handleBackToProducts = () => {
    setCurrentView("products");
    setSelectedCamera(null);
    setShowCart(false);
  };

  const handleHomeClick = () => {
    setCurrentView("home");
    setSelectedCamera(null);
    setShowCart(false);
  };

  const handleContactClick = () => {
    setCurrentView("contact");
    setSelectedCamera(null);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(!showCart);
  };

  // Cart handlers
  const addToCart = (camera, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === camera.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === camera.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...camera, quantity }];
      }
    });
  };

  const removeFromCart = (cameraId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cameraId)
    );
  };

  const updateCartQuantity = (cameraId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cameraId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === cameraId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="camera-store">
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
        <div className="container">
          <button
            className="navbar-brand btn btn-link p-0 border-0"
            onClick={handleHomeClick}
            style={{ textDecoration: "none" }}
          >
            CameraPro
          </button>

          <div className="navbar-nav ms-auto d-flex align-items-center">
            <button
              className={`nav-link btn btn-link ${
                currentView === "home" ? "active" : ""
              }`}
              onClick={handleHomeClick}
            >
              Home
            </button>
            <button
              className={`nav-link btn btn-link ${
                currentView === "products" ? "active" : ""
              }`}
              onClick={handleViewProducts}
            >
              Products
            </button>
            <button
              className={`nav-link btn btn-link ${
                currentView === "contact" ? "active" : ""
              }`}
              onClick={handleContactClick}
            >
              Contact
            </button>
            <button
              className="nav-link btn btn-link position-relative"
              onClick={handleCartClick}
            >
              Cart
              {getCartItemsCount() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {getCartItemsCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      {showCart && (
        <Cart
          cartItems={cartItems}
          onClose={() => setShowCart(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateCartQuantity}
          onClear={clearCart}
          total={getCartTotal()}
        />
      )}

      {/* Main Content */}
      <main style={{ paddingTop: "76px" }}>
        {currentView === "home" && (
          <Home
            onViewProducts={handleViewProducts}
            featuredCameras={camerasData}
          />
        )}

        {currentView === "products" && (
          <Products
            cameras={camerasData}
            onProductClick={handleProductClick}
            onAddToCart={addToCart}
          />
        )}

        {currentView === "individual" && (
          <IndividualProduct
            camera={selectedCamera}
            onBack={handleBackToProducts}
            onAddToCart={addToCart}
          />
        )}

        {currentView === "contact" && <Contact />}
      </main>
    </div>
  );
};

export default App;
