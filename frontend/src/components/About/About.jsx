import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";


const About = () => {
  const navigate = useNavigate();
  const ExploreMoreLove = () => {
    navigate("/", { replace: false });
    setTimeout(() => {
      const section = document.getElementById("product-grid");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); // slight delay to ensure page renders
  };
  return (
    <div className="about" id="about">
      <div className="about-content">
        <section className="about-hero">
          <section className="about-hero-split">
            <div className="about-text">
              <h1>Welcome to Velvet Bloom</h1>
              <p>
                At Velvet Bloom, we believe flowers are more than just beautiful
                arrangements — they’re heartfelt messages wrapped in petals.
                Every bouquet we craft is a blend of art and emotion, designed
                to capture life’s most tender moments. Whether you're
                celebrating love, offering comfort, or simply sharing a smile,
                our blooms help you speak when words fall short. Rooted in care
                and delivered with grace, Velvet Bloom brings joy, one blossom
                at a time.
              </p>
              <p>
              We understand that flowers aren’t just gifts — they’re memories waiting to unfold. That’s why we’re committed to freshness, fast delivery, and elegant presentation. When you choose Velvet Bloom, you choose meaning.
              </p>
            </div>
            <div className="about-image">
              <img
                src="https://www.flowerbx.com/media/wysiwyg/Group_183_1.jpg"
                alt="Florist arranging flowers"
              />
            </div>
          </section>
 
          <section className="about-banner">
            <img
              src="https://assets.eflorist.com/site/EF-403/Homepage/Spring%20Banner%20(1).jpg"
              alt="Spring flowers banner"
            />
            <div className="banner-text">
              <h2>Every Petal Holds a Promise</h2>
              <p>
                Crafted with care, delivered with heart — from Velvet Bloom to
                you.
              </p>
            </div>
          </section>
        </section>

        <div className="about-features">
          <div className="feature-two">
            <div className="feature-card">
              <img
                src="https://img.freepik.com/premium-photo/florist-work-female-hands-woman-making-fashion-modern-bouquet-different-flowers_489646-13988.jpg?semt=ais_hybrid&w=740"
                alt="Curated"
              />
              <h3>Curated Collections</h3>
              <p>Every flower is hand-selected with care and purpose.</p>
            </div>
            <div className="feature-card">
              <img
                src="https://fiorellaindia.com/admin/images/posts/1731908006_Fiorella%20Website%20Blog%202%20(Nov)%20-%20Top%205%20Reasons%20To%20Choose%20Online%20Flower%20Bouquet%20Delivery%20In%20Kolkata.jpg"
                alt="Delivery"
              />
              <h3>Same-Day Delivery</h3>
              <p>Surprise your loved ones right on time—always fresh.</p>
            </div>
          </div>
          <div className="feature-card">
            <img
              src="https://www.wildnorthflowers.com/cdn/shop/articles/Studio_Flowers_2048x2048.jpg?v=1698169922"
              alt="Freshness"
            />
            <h3>7-Day Freshness</h3>
            <p>
              Our blooms are guaranteed to stay beautiful or we’ll replace them.
            </p>
          </div>
        </div>

        <div className="why-choose">
          <h2>Why Choose Velvet Bloom?</h2>
          <div className="choose-grid">
            <div className="choose-card">
              <h3>Freshness First</h3>
              <p>7-Day bloom guarantee on all arrangements.</p>
            </div>
            <div className="choose-card">
              <h3>Same-Day Love</h3>
              <p>Order by 2 PM and we’ll deliver today!</p>
            </div>
            <div className="choose-card">
              <h3>Heartfelt Curation</h3>
              <p>Every bouquet is a handcrafted piece of emotion.</p>
            </div>
            <div className="choose-card">
              <h3>Trusted by Thousands</h3>
              <p>Top-rated floral delivery with 24/7 support.</p>
            </div>
            <div className="choose-card">
              <h3>Locally Sourced</h3>
              <p>
                We partner with regional florists to bring you the freshest
                seasonal blooms.
              </p>
            </div>
            <div className="choose-card">
              <h3>Sustainable Touch</h3>
              <p>
                Eco-friendly packaging and minimal waste practices in every
                delivery.
              </p>
            </div>
            <div className="choose-card">
              <h3>Custom Notes & Gift Add-ons</h3>
              <p>
                Include a handwritten note or extra goodies to make it extra
                special.
              </p>
            </div>
            <div className="choose-card">
              <h3>Beautifully Wrapped</h3>
              <p>
                Each bouquet is wrapped with care, elegance, and a signature
                Velvet Bloom charm.
              </p>
            </div>
          </div>
        </div>

        <section className="cta-banner">
          <h2>Let Your Feelings Bloom Today </h2>
          <p className="cta-subtext">
            Surprise someone you love with a handcrafted bouquet full of warmth
            and elegance.
          </p>
          <button onClick={ExploreMoreLove}>Explore Collections</button>
        </section>
      </div>
    </div>
  );
};

export default About;
