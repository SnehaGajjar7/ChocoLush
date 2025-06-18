import React, { useEffect, useState } from "react";
import "./ProductGrid.css";
import axios from "axios";
import Card from "../card/Card";
import BakeryLoader from "../productdetail/Flower";

const ProductGrid = ({ url }) => {
  const [cake, setCake] = useState([]);
  const [activate, setActivate] = useState("new");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCake = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/api/cake/list`);
        if (res.data.success) setCake(res.data.data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCake();
  }, [url]);

  const newArrivals = cake.filter((item) => item.isNew);
  const trending = cake.filter((item) => item.isTrending);
  const dataToShow = activate === "new" ? newArrivals : trending;

  return (
    <div className="product-container" id="arrivals">
      <div className="productgrid-wrapper">
        {/* Left: Tabs */}
        <div className="productgrid-tabs">
          <h2 className="tab-heading">Bite Into ChocoLush</h2>
          <div
            className={activate === "new" ? "tab active" : "tab"}
            onClick={() => setActivate("new")}
          >
            Fresh Bakes
          </div>
          <div
            className={activate === "trending" ? "tab active" : "tab"}
            onClick={() => setActivate("trending")}
          >
            Bakes Gone Viral!
          </div>
        </div>

        <div className="productgrid-right">
          {/* Centered Title */}
          <div className="productgrid-title">
            Exquisite Bakes. Unforgettable Taste.
          </div>

          {/* Product Cards */}
          {loading ? (
            <div className="loading">
              <BakeryLoader />
            </div>
          ) : (
            <div className="product-grid">
              {dataToShow.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
