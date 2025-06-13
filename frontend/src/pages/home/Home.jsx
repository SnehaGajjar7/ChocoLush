import React, { useContext } from "react";
import Slide from "../../components/slide/Slide";
import ProductGrid from "../../components/product/ProductGrid";
import About from "../../components/About/About";
import Feedback from "../feedback/Feedback";
import { CartContext } from "../../context/CartContext";
import GlimpseSection from "../Glimpse/Glimpse";
import "./Home.css";

const Home = () => {
  const { url } = useContext(CartContext);
  return (
    <>
      <Slide />
      <section id="product-grid">
        <ProductGrid url={`${url}`} />
      </section>
      <div className="seasonal-banner">
        <div className="season-text">
        <h2 className="season-title">Summer Blooms Are Here !!</h2>
        <p className="season-subtext">
          Brighten up your days with our fresh summer collection – sunflowers,
          daisies, and tropical blooms !
        </p>

        <ul className="seasonal-highlights">
          <li> Sun-Kissed Sunflowers – Perfect for summer gifting</li>
          <li>
             Exotic Tropical Arrangements – Add a vacation vibe to any space
          </li>
          <li> Cheerful Daisies – Bring instant smiles</li>
          <li> Free Summer-themed Gift Wrap with every order!</li>
        </ul>
        </div>
      </div>
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
