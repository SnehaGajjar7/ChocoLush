import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../../components/card/Card";
import { CartContext } from "../../context/CartContext";

const SummerSpecialPage = () => {
  const [items, setItems] = useState([]);
  const { url } = useContext(CartContext);

  // 🧁 Replace these with your actual summer item IDs from MongoDB
  const summerItemIds = [
   "684bea035202d714836ffab5",
    "684bfd0a5202d714836ffaef",
  ];

  useEffect(() => {
    const fetchSummerItems = async () => {
      try {
        const res = await axios.post(`${url}/api/cake/multiple`, {
          ids: summerItemIds,
        });

        if (res.data.success) {
          setItems(res.data.products); // adjust key if needed
        }
      } catch (err) {
        console.log("Error fetching summer items:", err);
      }
    };

    fetchSummerItems();
  }, [url]);

  return (
    <div className="summer-page">
      <h2 className="summer-title">Summer Special Treats </h2>
      <div className="summer-page-grid">
        {items.map((item) => (
          <Card key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default SummerSpecialPage;
