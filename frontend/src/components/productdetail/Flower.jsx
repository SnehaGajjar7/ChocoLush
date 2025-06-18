import React from "react";
import "./Flower.css";
import { GiCupcake, GiWhisk } from "react-icons/gi";

const BakeryLoader = () => {
  return (
    <div className="bakery-loader">
      <div className="icon-wrapper">
        <GiCupcake className="cupcake-icon" />
        <GiWhisk className="whisk-icon" />
      </div>
      <p className="loader-text">Whipping up sweetness just for you...</p>
    </div>
  );
};

export default BakeryLoader;
