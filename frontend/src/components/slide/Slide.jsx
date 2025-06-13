import React, { useEffect, useState } from "react";
import "./Slide.css";

const images = [
  
  "https://images7.alphacoders.com/111/1114133.jpg",
  "https://wallpapercat.com/w/full/2/f/d/589660-3840x2160-desktop-4k-cupcake-wallpaper.jpg",
  "https://images7.alphacoders.com/129/1295118.jpg",
  "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGJha2VyeXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images4.alphacoders.com/126/1260487.jpg"
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
