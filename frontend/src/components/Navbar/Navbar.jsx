import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { FaHeart } from "react-icons/fa6";
import { IoIosBasket } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { BsBoxSeamFill } from "react-icons/bs";
import LogoutModal from "../logout/Logout";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";

const Navbar = ({ setShowLogin }) => {
  const [cake, setCake] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(CartContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbar-logo">
          <img src={assets.logo} alt="logo" className="logo" />
        </Link>
        <ul className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          <Link to={"/"}>
            <li
              onClick={() => setCake("home")}
              className={cake === "home" ? "active" : ""}
            >
              Home
            </li>
          </Link>
          <li className="dropdown">
            <span
              onClick={() => setCake("collection")}
              className={cake === "collection" ? "active" : ""}
            >
              Collection
            </span>
            <div className="mega-menu">
              <div className="mega-menu-column">
                <h4>Cakes</h4>
                <Link to="/collection/category/cake">Birthday Cakes</Link>
                <Link to="/collection/category/wedding-cakes">
                  Wedding Cakes
                </Link>
                <Link to="/collection/category/photo-cakes">Photo Cakes</Link>
                <Link to="/collection/category/theme-cakes">Theme Cakes</Link>
                <Link to="/collection/category/mini-cakes">Mini Cakes</Link>
                <Link to="/collection/category/jar-cakes">Jar Cakes</Link>
                <Link
                  to="/collection/category/signature-cakes">
                  Signature Cakes
                </Link>
                <Link
                  to="/collection/category/classic-cakes">
                  Classic Cakes
                </Link>
              </div>
              <div className="mega-menu-column">
                <h4>Pastries</h4>
                <Link to="/collection/category/pastries">Pastries</Link>
                <Link to="/collection/category/muffins">Muffins</Link>
                <Link to="/collection/category/cupcakes">Cupcakes</Link>
                <Link to="/collection/category/brownies">Brownies & Fudge</Link>
                <Link to="/collection/category/cheesecakes">Cheesecakes</Link>
                <Link to="/collection/category/tarts">Tarts</Link>
              </div>
              <div className="mega-menu-column">
                <h4>Cookies & Biscuits</h4>
                <Link to="/collection/category/cookies">Cookies</Link>
                <Link to="/collection/category/macarons">Macarons</Link>
                <Link to="/collection/category/biscotti">Biscotti</Link>
              </div>
              <div className="mega-menu-column">
                <h4>Special Treats</h4>
                <Link to="/collection/category/doughnuts">Doughnuts</Link>
                <Link to="/collection/category/churros">Churros</Link>
                <Link to="/collection/category/eclairs">Éclairs</Link>
                <Link to="/collection/category/puffs">Puffs</Link>
                
              </div>
              <div className="mega-menu-column">
                <h4>Breads & Savory</h4>
                <Link to="/collection/category/croissants">Croissants</Link>
                <Link to="/collection/category/garlic-breads">
                  Garlic Breads
                </Link>
                <Link to="/collection/category/stuffed-buns">Stuffed Buns</Link>
                <Link to="/collection/category/rolls-loaves">
                  Rolls & Loaves
                </Link>
              </div>
              <div className="mega-menu-column">
                <h4>Gifting & Specials</h4>
                <Link to="/collection/category/dessert-boxes">
                  Dessert Boxes
                </Link>
                <Link to="/collection/category/custom-hampers">
                  Custom Hampers
                </Link>
                <Link to="/collection/category/festive-specials">
                  Festive Specials
                </Link>
                <Link to="/collection/category/vegan-glutenfree">
                  Vegan & Gluten-Free
                </Link>
              </div>
            </div>
          </li>
          <li className="dropdown">
            <span
              onClick={() => setCake("drinks")}
              className={cake === "drinks" ? "active" : ""}
            >
              Cafe Sips
            </span>
            <div className="mega-menu">
              <div className="mega-menu-column">
                <h4>Hot Beverages</h4>
                <Link to="/collection/category/coffee">Coffee</Link>
                <Link to="/collection/category/latte">Latte</Link>
                <Link to="/collection/category/cappuccino">Cappuccino</Link>
                <Link to="/collection/category/espresso">Espresso</Link>
                <Link to="/collection/category/hot-chocolate">
                  Hot Chocolate
                </Link>
             
              </div>
              <div className="mega-menu-column">
                <h4>Cold Beverages</h4>
                <Link to="/collection/category/iced-coffee">Iced Coffee</Link>
                <Link to="/collection/category/iced-latte">Iced Latte</Link>
                <Link to="/collection/category/frappes">Frappes</Link>
               
              </div>

              <div className="mega-menu-column">
                <h4>Seasonal Specials</h4>
                <Link to="/collection/category/winter-specials">
                  Winter Warmers
                </Link>
                <Link to="/collection/category/summer-drinks">
                  Summer Coolers
                </Link>
                <Link to="/collection/category/festive-drinks">
                  Festive Drinks
                </Link>
              </div>
              
            </div>
          </li>

          <Link to={"/blogs"}>
            <li
              onClick={() => setCake("blog")}
              className={cake === "blog" ? "active" : ""}
            >
              Blogs
            </li>
          </Link>
          <Link to={"/contact"}>
            <li
              onClick={() => setCake("contact")}
              className={cake === "contact" ? "active" : ""}
            >
              Feedback
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              onClick={() => setCake("about")}
              className={cake === "about" ? "active" : ""}
            >
              About
            </li>
          </Link>
          <Link to={"/gallery"}>
            <li
              onClick={() => setCake("gallery")}
              className={cake === "gallery" ? "active" : ""}
            >
              Gallery
            </li>
          </Link>
        </ul>
        <div className="navbar-right">
          <Link to={"/wishlist"}>
            <FaHeart color="#c27979" fontSize="25px" />
          </Link>
          <div className="navbar-search-icon">
            <Link to={"/cart"}>
              <FaShoppingBag color="gray" fontSize="25px" />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Sign In</button>
          ) : (
            <div className="navbar-profile">
              <FaHouseChimneyUser fontSize="30px" color="rgb(141, 139, 145)" />
              <ul className="nav-profile-dropdown">
                <li
                  onClick={() => {
                    navigate("/myorders");
                  }}
                >
                  <BsBoxSeamFill />
                  <p>Orders</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <FaUser />
                  <p>Profile</p>
                </li>
                <hr />
                <li
                  onClick={() => {
                    setShowLogoutModal(true);
                  }}
                >
                  <IoIosLogOut />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}

          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onConfirm={logout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Navbar;
