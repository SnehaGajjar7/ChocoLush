import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>Welcome to ChocoLush Bakery</h1>
        <p>Where every bite is a memory in the making.</p>
      </section>

      {/* Our Story */}
      <section className="about-section">
        <h2>Our Story</h2>
        <p>
          ChocoLush Bakery started as a humble home oven experiment. Fueled by a
          passion for homemade goodness, we grew into a warm, welcoming
          neighborhood bakery. Our goal is simple: deliver joy through every
          loaf, cookie, and croissant.
        </p>
      </section>

      {/* Values */}
      <section className="about-section about-values">
        <h2>What We Believe In</h2>
        <ul className="values-grid">
          <li>
            <img
              src="https://media.istockphoto.com/id/1295338024/photo/baker-putting-bread-in-the-bakery-oven-cowering-on-the-floor-of-the-bakery.jpg?s=612x612&w=0&k=20&c=7AvwYUhe-vbWDaRChABn5uBmdXwZRPoOXUeuq5cqHcE="
              alt="baked img"
            />
            <p>Freshly baked daily</p>
          </li>
          <li>
            <img
              src="https://media.istockphoto.com/id/844107292/photo/hands-preparing-dough.jpg?s=612x612&w=0&k=20&c=14Fn8kidLZH-JuvIOhFnA3ipU1-2r6VZGi8wpCH_Kk8="
              alt="ingredients"
            />
            <p>Locally sourced ingredients</p>
          </li>
          <li>
            <img
              src="https://us.123rf.com/450wm/puhhha/puhhha1809/puhhha180901453/108328738-confiter%C3%ADa-mujer-que-vende-dulces-de-chocolate-en-la-tienda-vendedor-poniendo-dulces-y-golosinas.jpg?ver=6"
              alt="handcrafted"
            />
            <p>Handcrafted with love</p>
          </li>
          <li>
            <img
              src="https://www.thebutteredtin.com/wp-content/uploads/2025/03/multi-cakes-scaled.jpg"
              alt="natural"
            />
            <p>All-natural, no preservatives</p>
          </li>
        </ul>
      </section>

      <section className="about-cta">
        <h2>Visit Us or Order Online</h2>
        <Link to="/#arrivals" className="btn-primary">
          Explore Our Menu
        </Link>
      </section>
    </div>
  );
};

export default About;
