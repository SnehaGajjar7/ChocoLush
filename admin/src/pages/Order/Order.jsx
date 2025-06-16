import React, { useEffect, useState } from "react";
import "./Order.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FcShipped } from "react-icons/fc";

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("error to fetch orders");
      console.log("failed");
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <FcShipped fontSize="40px" />
              <div>
                <p className="order-item-flower">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + " , ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ","}</p>
                  <p>
                    {order.address.city +
                      "," +
                      order.address.state +
                      "," +
                      order.address.country +
                      "," +
                      order.address.pincode}
                  </p>
                 </div>
              </div>
              <p>Total Items: {order.items.length}</p>
              <p>₹ {order.amount}</p>
              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Preparing Batter">Preparing Batter</option>
                <option value="Baking in Progress">Baking in Progress</option>
                <option value="Frosting and Decorating">
                  Frosting and Decorating
                </option>
                <option value="Ready for Pickup/Delivery">
                  Ready for Pickup/Delivery
                </option>
                <option value="Delivered Sweetly">Delivered Sweetly</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
