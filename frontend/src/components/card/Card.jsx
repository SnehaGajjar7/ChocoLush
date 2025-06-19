import React, { useContext, useState } from "react";
import "./Card.css";
import { useNavigate, Link } from "react-router-dom";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import NotificationBubble from "../notification/Notification";
import { FaArrowTrendUp } from "react-icons/fa6";
import { SiCodefresh } from "react-icons/si";

const Card = ({ product }) => {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const { addToWishlist, wishlist, url } = useContext(CartContext);

  const handleClick = () => {
    if (product._id) {
      navigate(`/product/${product._id}`);
    } else {
      console.error("Product ID is missing:", product);
    }
  };

  if (!product) return null;
  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="collection-card" onClick={handleClick}>
        {product.isNew && (
          <div className="badge new">
            New <SiCodefresh />
          </div>
        )}
        {product.isTrending && (
          <div className="badge trending">
            Trending <FaArrowTrendUp />
          </div>
        )}
        <div
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToWishlist(product._id);
            setAlert({ message: "Added to your sweet cravings collection!" });
            setTimeout(() => setAlert(null), 3000);
          }}
        >
          {(
            Array.isArray(wishlist)
              ? wishlist.includes(product._id)
              : wishlist?.[product._id]
          ) ? (
            <BsHeartFill color="#c27979" className="heart" />
          ) : (
            <BsHeart color="#c27979" className="heart" />
          )}
        </div>
        <Link to={`/product/${product._id}`}>
          {product.image && (
            <img
              src={`${url}/uploads/${product.image}`}
              alt={product.name}
              className="collection-image"
            />
          )}
        </Link>

        <div className="collection-info">
          <h3 className="collection-name">{product.name}</h3>

          <div className="price-rating">
            <p className="collection-price">₹{product.price}</p>
          
          </div>
      
        </div>
     
      </div>
    </>
  );
};

export default Card;
