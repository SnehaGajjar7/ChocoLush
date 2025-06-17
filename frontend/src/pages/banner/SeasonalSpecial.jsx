import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Card from "../../components/card/Card";
import { CartContext } from "../../context/CartContext";
import "./Seasonal.css";

const SummerSpecialPage = () => {
  const [items, setItems] = useState([]);
  const { url } = useContext(CartContext);

  const summerItemIds = [
    "684fd939decdc24c255c6b28",
    "684fea5cdecdc24c255c6bb5",
    "684ff129decdc24c255c6bfb",
    "684ff691decdc24c255c6c29",
    "684feb72decdc24c255c6bb9",
    "684febc0decdc24c255c6bbe",
    "684fdb65decdc24c255c6b38",
    "684fed48decdc24c255c6bcd",
    "684fee2ddecdc24c255c6bd3",
    "684fedd2decdc24c255c6bd1",
    "684ff02bdecdc24c255c6bf2",
    "684ff1e2decdc24c255c6c02",
    "684ff129decdc24c255c6bfb",
    "684ff544decdc24c255c6c1b",
    "684ff598decdc24c255c6c1d",
    "684fd97adecdc24c255c6b2a",
    "684ff70edecdc24c255c6c32",
    "684ff48fdecdc24c255c6c14",
    "684ff781decdc24c255c6c36",
    "684ff8eedecdc24c255c6c47",
    "684ff999decdc24c255c6c57",
    "684ffaf3decdc24c255c6c65",
    "684ffca3decdc24c255c6c77",
    "684ffffadecdc24c255c6cab",
    "684fdc70decdc24c255c6b3a",
    "685000fcdecdc24c255c6cbd",
    "68500196decdc24c255c6cc1",
    "684fda3edecdc24c255c6b30",
    "68500252decdc24c255c6ccb",
    "685002eadecdc24c255c6cd2",
    "684fd9f5decdc24c255c6b2e",
    "685004c0decdc24c255c6cec",
    "6850051bdecdc24c255c6cf1",
    "685005d5decdc24c255c6cf7",
    "68510a675f16d0e14cbdf652",
    "68510bcc5f16d0e14cbdf662",
    "68510e205f16d0e14cbdf694",
    "685110225f16d0e14cbdf6a0",
    "6851143d5f16d0e14cbdf6c7",
    "685122925f16d0e14cbdf712",
    "68512bd95f16d0e14cbdf75a",
    "68512cd35f16d0e14cbdf768",
    "68512d455f16d0e14cbdf76d",
    "684fcf21decdc24c255c6b11",
    "6851547e5f16d0e14cbdf8f9",
    "685154cd5f16d0e14cbdf8fb",
    "685155425f16d0e14cbdf8fd",
    "685155805f16d0e14cbdf8ff",
    "685155db5f16d0e14cbdf904",
    "6851561f5f16d0e14cbdf906",
    "685156585f16d0e14cbdf908"
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
