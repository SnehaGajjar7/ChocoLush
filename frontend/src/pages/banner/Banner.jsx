import React, { useEffect, useState, useContext } from "react";
import "./Banner.css";
import { CartContext } from "../../context/CartContext";
import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";

const SummerSpecials = () => {
  const { url } = useContext(CartContext);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const summerItemIds = [
    "684bea035202d714836ffab5",
    "684bfd0a5202d714836ffaef",
    "684c17871b64d7385757a340"
  ];

  useEffect(() => {
    const fetchSummerItems = async () => {
      try {
        const res = await fetch(`${url}/api/cake/multiple`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: summerItemIds }),
        });

        const data = await res.json();
        if (data.success) {
          setItems(data.products);
        }
      } catch (error) {
        console.error("Error fetching summer items:", error);
      }
    };

    fetchSummerItems();
  }, [url]);

  return (
    <div className="summer-specials-page">
      <div className="summer-header">
        <h1>Summer Bakery Specials ☀️</h1>
        <p>Delight in seasonal treats crafted just for summer!</p>
      </div>

      <div className="summer-cards-grid">
        {items.map((item) => (
          <Card key={item._id} product={item} />
        ))}
      </div>

      <button
        className="see-more-btn"
        onClick={() => navigate("/season")} 
      >
       Explore All Summer Treats
      </button>
    </div>
  );
};

export default SummerSpecials;
