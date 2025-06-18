import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";
import { CartContext } from "../../context/CartContext";
import NotificationBubble from "../notification/Notification";
import Card from "../card/Card";
import { LuCake } from "react-icons/lu";
import BakeryLoader from "./Flower";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart, token, url } = useContext(CartContext);
  const [cake, setCake] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState("");
  const [relatedCakes, setRelatedCakes] = useState([]);
  const [alert, setAlert] = useState(null);

  const handleAddToCart = async () => {
    try {
      await addToCart(cake._id);
      setAlert({ message: "Bloom added to your basket!" });
      setTimeout(() => setAlert(null), 3000);
    } catch (err) {
      console.error("Failed to add to cart with delivery info", err);
    }
  };

  useEffect(() => {
    const fetchRelated = async () => {
      if (!cake || !cake.category) return;

      try {
        const res = await axios.get(`${url}/api/cake/${id}/related`);
        if (res.data.success) {
          setRelatedCakes(res.data.data);
          console.log("Category of base item:", cake.category);
          console.log("Found related:", res.data.data);
        }
      } catch (err) {
        console.error("Error fetching related items", err);
      }
    };

    fetchRelated();
  }, [cake]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${url}/api/cake/${id}`);
        if (response.data.success) {
          setCake(response.data.data);
          setImage(response.data.data.image); // set default image
          console.log("Fetched cake:", response.data.data);
        } else {
          setCake(null);
        }
      } catch (error) {
        setCake(null);
      }
      setLoading(false);
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div>
        <BakeryLoader />
      </div>
    );
  if (!cake) return <div>Product not found.</div>;

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />

      <div className="product-detail-container">
        <div className="product-content">
          <div className="product-image-wrapper">
            <img
              src={`${url}/uploads/${image}`}
              alt={cake.name}
              className="main-product-image fade-in"
              loading="lazy"
            />
          </div>
          <div className="right-detail">
            <div className="product-info">
              <div className="title-rate">
                <h1 className="product-title">{cake.name}</h1>
                <p className="product-tagline">
                  Crafted with care, baked with love.
                </p>
              </div>
              <p className="product-price">₹{cake.price}</p>
              <p className="product-subtitle">Why You'll Love It:</p>

              <p className="product-description">{cake.description}</p>
              <div className="product-tags">
                <p>{cake.category}</p>
              </div>
              <p className="product-subtitle">This sweet treat contains:</p>
              <ul className="product-contains-list">
                {cake.contains.map((item, i) => (
                  <li key={i}>{item.replace(/^"|"$/g, "")}</li>
                ))}
              </ul>

              <p className="product-note-title"> Note from the Baker:</p>
              <p className="product-note-text">
                This cake is freshly baked upon order. Please refrigerate if not
                consumed within 6 hours. For best taste, allow the cake to sit
                at room temperature for 20 minutes before serving.
              </p>

              <div className="detail-button">
                <button
                  className="basket-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                    setAlert({ message: "added to your basket!" });
                    setTimeout(() => setAlert(null), 3000);
                  }}
                >
                  Add to My Box <LuCake fontSize="18px" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="product-title">You Might Also Love</h2>
        <div className="related-product">
          {relatedCakes.length > 0 ? (
            relatedCakes.map((product) => (
              <Card key={product._id} product={product} />
            ))
          ) : (
            <p>
              No matching treats found — but don’t worry, we’re baking more!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
