import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { FcShipped } from "react-icons/fc";

const MyOrders = () => {
  const { url, token } = useContext(CartContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-orders">
      
      <div className="container">
      <h2>My Orders</h2>
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <FcShipped fontSize="40px" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <p>₹ {order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {order.status}</b>
              </p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
  
};

export default MyOrders;
