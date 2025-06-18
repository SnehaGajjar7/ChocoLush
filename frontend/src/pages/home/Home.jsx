import React, { useContext } from "react";
import Slide from "../../components/slide/Slide";
import ProductGrid from "../../components/product/ProductGrid";
import Feedback from "../feedback/Feedback";
import { CartContext } from "../../context/CartContext"
import SummerSpecials from "../banner/Banner";
import Gallery from "../Glimpse/GlimpseGallery";

const Home = () => {
  const { url } = useContext(CartContext);
  return (
    <>
      <Slide />
      <section id="product-grid">
        <ProductGrid url={`${url}`} />
      </section>
    <SummerSpecials/>
  
      <section id="feedback">
        <Feedback />
      </section>
      
    </>
  );
};

export default Home;
