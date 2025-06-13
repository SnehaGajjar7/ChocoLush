import React, { useEffect, useState } from "react";
import "./Slide.css";

const images = [
  
  "https://jooinn.com/images/purple-flower-lot.jpg",
  "https://cdn.pixabay.com/photo/2024/10/12/17/15/flowers-9115519_1280.jpg",
  "https://www.furman.edu/news/wp-content/uploads/sites/218/2025/05/irises-and-students-walking.jpg",
  "https://www.themaevastore.com/cdn/shop/files/278143561_1014199909226726_2864653040319058353_n_1014199912560059.jpg?v=1737020893",
  "https://assets.cntraveller.in/photos/6826b4f64010aa204e60eeb7/16:9/w_2992,h_1683,c_limit/the-hop-shop-at-castle-farm-kent-gettyimages-1149538741.jpg"
];

const Slide = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2500);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="header-contents">
        <h2>Bloom Where You're Planted</h2>
        <p>
          From delicate bouquets to bold floral arrangements, we bring
          nature's beauty right to your door. Celebrate love, life, and every
          little moment with flowers that speak from the heart.
        </p>
        <button>
          <a href="#arrivals">shop Collection</a>
        </button>
      </div>
    </div>
  );
};

export default Slide;
