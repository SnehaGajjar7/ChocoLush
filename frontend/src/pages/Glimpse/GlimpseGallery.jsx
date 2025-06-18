import React from "react";
import "./GlimpseGallery.css";
import { galleryData } from "../../assets/assets"; 

const Gallery = () => {
  const categories = Object.keys(galleryData);

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">Our Sweet Showcase</h1>
      <p className="gallery-subtitle">A bite of beauty in every bake!</p>

      {categories.map((category) => (
        <div className="gallery-category" key={category}>
          <h2>{category}</h2>
          <div className="gallery-grid">
            {galleryData[category].map((item, index) => (
              <div className="gallery-item" key={index}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
