import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";
import NotificationBubble from "../../components/notification/Notification";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaRegFaceSadTear } from "react-icons/fa6";
import { GiCupcake } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { GiDonut } from "react-icons/gi";

const Cart = () => {
  const { cartItems, removeFromCart, getTotalCartAmount, collections, url } =
    useContext(CartContext);
  const [alert, setAlert] = useState(null);

  const navigate = useNavigate();
  const handleAddMoreLove = () => {
    navigate("/", { replace: false });
    setTimeout(() => {
      const section = document.getElementById("product-grid");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="cart-container">
        {Object.values(cartItems).some((qty) => qty > 0) ? (
          <div className="cart-content">
            {/* Left side: Cart items */}
            <div className="cart-items-section">
              <h2 className="cart-title">Your Shopping Cart</h2>
              <div className="cart-header">
                <span>Item</span>
                <span>Title</span>
                <span>Price</span>
                <span>Qty</span>
                <span>Total</span>
                <span>Remove</span>
              </div>
              <hr />
              {collections.map((item) => {
                if (cartItems[item.id] > 0) {
                  return (
                    <div key={item.id} className="cart-item-row">
                      <Link to={`/product/${item._id}`}>
                        <img
                          src={`${url}/uploads/${item.image}`}
                          alt={item.name}
                          className="cart-item-img"
                        />
                      </Link>
                      <span>{item.name}</span>
                      <span>₹ {item.price}</span>
                      <span>{cartItems[item.id]}</span>
                      <span>₹ {item.price * cartItems[item.id]}</span>
                      <span
                        className="remove-btn"
                        onClick={() => {
                          removeFromCart(item.id);
                          setAlert({
                            message: "This bake took a little break!",
                          });
                          setTimeout(() => setAlert(null), 3000);
                        }}
                      >
                        <RiDeleteBin5Fill />
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Right side: Totals */}
            <div className="cart-summary-section">
              <h3 className="cart-title">Cart Totals</h3>
              <div className="summary-row">
                <p>Subtotal</p>
                <p>₹ {getTotalCartAmount()}</p>
              </div>
              <div className="summary-row">
                <p>Delivery Fee</p>
                <p>₹ {getTotalCartAmount() === 0 ? 0 : 25}</p>
              </div>
              <hr />
              <div className="summary-row total">
                <p>Total</p>
                <p>
                  ₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 25}
                </p>
              </div>
              <button
                className="checkout-btn"
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-img">
              <img src="https://www.shutterstock.com/image-photo/muffins-basket-isolated-on-white-600nw-158146637.jpg" />
            </div>

            <div className="empty-cart-msg">
              <p>
                <strong>
                  Oh crumbs! Your cart is feeling a little empty{" "}
                  <FaRegFaceSadTear color="#D9777E" /> Add some sweetness?{" "}
                  <GiCupcake color="#F9A826" />
                </strong>
              </p>
              <p>
                It’s been patiently waiting for some treats — cupcakes, cookies,
                maybe a brownie?
              </p>
              <p>
                Fill it with joy and sprinkle a little happiness today!{" "}
                <GiDonut color="#F3A5B1" />
              </p>
              <p>
                Life’s short. Eat the pastry. Buy the cake.{" "}
                <FaShoppingCart color="#D9777E" />
              </p>
              <button className="continue-btn" onClick={handleAddMoreLove}>
                Browse Delicious Treats
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
