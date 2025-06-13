import React from "react";
import "./GlimpseGallery.css";

const GlimpseGallery = ({ flowers = [] }) => {
  if (!flowers.length) return null;

  return (
    <div className="glimpse-strip-section">
      <h2 className="glimpse-title">VelvetBloom Floral Showcase </h2>
      <div className="glimpse-strip-wrapper">
        <div className="glimpse-strip-scroll auto-scroll">
          {flowers.concat(flowers).map((flower, i) => (
            <div className="glimpse-item" key={i}>
              <img src={flower.image} alt={flower.name} />
              <div className="floating-badge">{flower.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 
export default GlimpseGallery;
