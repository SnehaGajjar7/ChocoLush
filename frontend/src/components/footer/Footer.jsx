import React from "react";
import "./Footer.css";
import { HashLink as Link } from "react-router-hash-link";
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className="page-container">
      <main className="content">
        <footer className="footer">
          <div className="footer-container">
            <div className="footer-brand">
              <img src={assets.logo} alt="velvetBloom" />
              <p>Bringing nature’s elegance to every doorstep.</p>
            </div>

            <div className="footer-links">
              <h4 className="footer-main">Quick Links</h4>
              <ul>
                <li>
                  <Link smooth to="/#">
                    Home
                  </Link>
                </li>
                <li>
                  <Link smooth to="/#product-grid">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link smooth to="/#gallery">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link smooth to="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link smooth to="/#feedback">
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link smooth to="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4 className="footer-main">Contact Us</h4>
              <p>Email: hello@velvetbloom.com</p>
              <p>Phone: +1 (234) 567-8901</p>
              <p>123 Blossom Avenue, Garden City</p>
            </div>
          </div>

          <div className="footer-bottom">
          <div className="footer-line"></div>
            &copy; {new Date().getFullYear()} Velvet Bloom. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Footer;
