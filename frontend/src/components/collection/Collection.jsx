import React, { useContext,useEffect } from "react";
import "./Collection.css";
import { useParams} from "react-router-dom";
import { CartContext } from "../../context/CartContext";

import Card from "../card/Card";

import BakeryLoader from "../productdetail/Flower";

const Collection = () => {
  const { filterType, filterValue } = useParams();
  
  const { collections } =
    useContext(CartContext);
  const filtered = collections.filter((item) => {
    const value = item[filterType];
    return (
      typeof value === "string" &&
      value.toLowerCase() === filterValue.toLowerCase()
    );
  });


  return (
    <div className="collection-container">
      <h2 className="section-title">
        {filterValue?.toUpperCase()}
      </h2>
      <div className="collection-grid">
        {filtered.length > 0 ? (
           filtered.map((product) => <Card key={product._id} product={product} />)

        ) : (
          <BakeryLoader/>
        )}
      </div>
    </div>
  );
};

export default Collection;
