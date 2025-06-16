import React, { useContext } from "react";
import Slide from "../../components/slide/Slide";
import ProductGrid from "../../components/product/ProductGrid";
import Feedback from "../feedback/Feedback";
import { CartContext } from "../../context/CartContext";
import GlimpseSection from "../Glimpse/Glimpse";

import SummerSpecials from "../banner/Banner";

const Home = () => {
  const { url } = useContext(CartContext);
  return (
    <>
      <Slide />
      <section id="product-grid">
        <ProductGrid url={`${url}`} />
      </section>
    <SummerSpecials/>
      <section id="gallery">
        <GlimpseSection />
      </section>


      <section id="feedback">
        <Feedback />
      </section>
      
    </>
  );
};

export default Home;
