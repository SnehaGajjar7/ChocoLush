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
  <h2>Sweet Moments Start Here</h2>
  <p>
  Warm your heart with fresh-from-the-oven bakes crafted with love and the finest ingredients. 
  Whether you're craving the comforting taste of a classic chocolate brownie or the elegance of a layered mousse cake, 
  our bakery has something to make every moment a little sweeter. From timeless favorites to modern masterpieces, 
  we bring joy to every bite — because life is better with dessert.
</p>

  <button>
    <a href="#arrivals">Browse Goodies</a>
  </button>
</div>


    </div>
  );
};

export default Slide;
