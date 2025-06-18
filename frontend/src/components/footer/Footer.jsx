import React from "react";
import "./Footer.css";
import { HashLink as Link } from "react-router-hash-link";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="footer-new">
      <div className="footer-top">
        <div className="footer-brand-new">
          <img src={assets.logo} alt="ChocoLush Logo" />
          <p>Bringing nature’s elegance to every doorstep.</p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><Link smooth to="/#">Home</Link></li>
            <li><Link smooth to="/#product-grid">Collection</Link></li>
            <li><Link smooth to="/blogs">Blog</Link></li>
            <li><Link smooth to="/about">About</Link></li>
            <li><Link smooth to="/#feedback">Feedback</Link></li>
            <li><Link smooth to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: happy@chocolush.com</p>
          <p>Phone: +1 (234) 567-8901</p>
          <p>127 Dreamy Avenue, Town City</p>
        </div>
      </div>

      <div className="footer-bottom-new">
        <div className="footer-line-new" />
        <p>&copy; {new Date().getFullYear()} ChocoLush. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
