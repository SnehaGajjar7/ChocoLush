import React, { useEffect, useState } from "react";
import "./ProductGrid.css";
import axios from "axios";
import Card from "../card/Card";
import RealisticFlowerLoader from "../productdetail/Flower";

const ProductGrid = ({ url }) => {
  const [flowers, setFlowers] = useState([]);
  const [activate, setActivate] = useState("new");
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFlowers = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(`${url}/api/flower/list`);
        if (res.data.success) {
          setFlowers(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch flowers:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchFlowers();
  }, [url]);

  const newArrivals = flowers.filter((item) => item.isNew);
  const trending = flowers.filter((item) => item.isTrending);

  return (
    <div className="product-container" id="arrivals">
      <div className="productgrid-title">Unwrap Our Latest Floral Surprises</div>
      <div className="product-link">
        <li
          className={activate === "new" ? "product-tab active" : "product-tab"}
          onClick={() => setActivate("new")}
        >
          New Arrivals
        </li>
        <li
          className={activate === "trending" ? "product-tab active" : "product-tab"}
          onClick={() => setActivate("trending")}
        >
          Trending Now
        </li>
      </div>

      {loading ? (
        <div className="loading"><RealisticFlowerLoader/></div> 
      ) : (
        <>
          {activate === "new" && newArrivals.length > 0 && (
            <section>
              <div className="product-layout">
                <div className="product-grid">
                  {newArrivals.map((product) => (
                    <Card key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {activate === "trending" && trending.length > 0 && (
            <section>
              <div className="product-grid">
                {trending.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
