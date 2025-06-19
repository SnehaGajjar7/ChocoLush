import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationBubble from "../../components/notification/Notification";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, collections, cartItems, url } =
    useContext(CartContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [isFirstOrder, setIsFirstOrder] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    contact: "",
  });
  const subtotal = getTotalCartAmount();
  const discount = isFirstOrder ? subtotal * 0.1 : 0;
  const deliveryFee = subtotal === 0 ? 0 : 25;
  const finalTotal = subtotal - discount + deliveryFee;

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    collections.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item };
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: finalTotal,

      userName: `${data.firstName} ${data.lastName}`,
      userEmail: data.email,
      userPhone: data.contact,
    };

    if (!data.firstName || !data.email || !data.street || !data.contact) {
      setAlert({
        message: "Please Fill all the field !",
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }
    if (getTotalCartAmount() === 0) {
      setAlert({
        message: "Your Cart is empty",
      });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });
      if (response.data.success) {
        window.location.href = response.data.session_url;
      } else {
        alert("Error placing order: " + response.data.message);
      }
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    } else {
      const checkFirstOrder = async () => {
        try {
          const response = await axios.get(url + "/api/order/userorders", {
            headers: { token },
          });
          if (response.data.data.length === 0) 
            {
            setIsFirstOrder(true);
          }
        } catch (error) {
          console.error("Error checking order history", error);
        }
      };

      checkFirstOrder();
    }
  }, [token]);

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>

          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email Address"
          />
          <input
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            type="text"
            placeholder="Street"
          />

          <div className="multi-fields">
            <input
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              type="text"
              placeholder="City"
            />
            <input
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              type="text"
              placeholder="State"
            />
          </div>
          <div className="multi-fields">
            <input
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              type="text"
              placeholder="Country"
            />
            <input
              name="pincode"
              onChange={onChangeHandler}
              value={data.pincode}
              type="number"
              placeholder="Pincode"
            />
          </div>
          <input
            name="contact"
            onChange={onChangeHandler}
            value={data.contact}
            type="number"
            placeholder="Contact Number"
          />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2 className="title">Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>₹ {subtotal}</p>
              </div>
              {isFirstOrder && (
                <>
                  <hr />
                  <div className="cart-total-details">
                    <p>First Order Discount (10%)</p>
                    <p>- ₹ {discount.toFixed(2)}</p>
                  </div>
                </>
              )}
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>₹ {deliveryFee}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Total</p>
                <p>₹ {finalTotal.toFixed(2)}</p>
              </div>
            </div>

            <button type="submit">Pay Online</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
