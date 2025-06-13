import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import Card from "../../components/card/Card";
import {assets} from '../../assets/assets'

const Profile = () => {
  const { token, url } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [activeTab, setActiveTab] = useState("cart");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (res.data.success) {
          const userData = res.data.user;
          setUser(userData);
          const res3 = await axios.post(
            `${url}/api/order/userorders`,
            {},
            { headers: { token } }
          );
          if (res3.data.success) {
            setOrders(res3.data.data); // This will store all orders
          }

          const cartIds = Object.keys(userData.cartData || {});
          const wishlistIds = userData.wishlist || [];

          if (cartIds.length > 0 || wishlistIds.length > 0) {
            const res2 = await axios.post(`${url}/api/flower/multiple`, {
              ids: [...cartIds, ...wishlistIds],
            });

            if (res2.data.success) {
              const products = res2.data.products;

              const cart = products
                .filter((p) => cartIds.includes(p._id))
                .map((p) => ({
                  ...p,
                  qty: userData.cartData[p._id],
                }));

              const wishlist = products.filter((p) =>
                wishlistIds.includes(p._id)
              );

              setCartItems(cart);
              setWishlistItems(wishlist);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [token, url]);

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <img src="https://images.squarespace-cdn.com/content/v1/61c476370474f51fd2957e48/62a5606d-4926-416b-b606-53c0ddfff0ec/DSC00414.jpg" alt="velvetBloom"/>
      </div>
      <div className="profile-bottom">
      {user && (
        <>
          <div className="profile-header">
  
            <h2 className="welcome-heading">Welcome, {user.name}!</h2>
            <p className="welcome-message">
              Thanks for being a part of the VelvetBloom family..!{" "}
            </p>
            <p className="welcome-message">
              You’ve placed <strong>{orders.length}</strong> orders so far – we
              appreciate you!
            </p>
            
            <div className="profile-summary">
            <p className="welcome-email">Email: {user.email}</p>
              <p>
                <strong>Member Since:</strong>{" "}
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "Unknown"}
              </p>

              <p>
                <strong>Total Orders:</strong> {orders.length}
              </p>
            </div>
            <img src={assets.about} alt="velvetBloom" />
          </div>
         
          <div className="profile-tab">
          <div className="tab-links">
            <li
              className={activeTab === "cart" ? "tab active" : "tab"}
              onClick={() => setActiveTab("cart")}
            >
              Your Cart ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </li>
            <li
              className={activeTab === "wishlist" ? "tab active" : "tab"}
              onClick={() => setActiveTab("wishlist")}
            >
              Your Wishlist ({wishlistItems.length})
            </li>
          </div>

          {/* Cart Tab */}
          {activeTab === "cart" && (
            <section>
              {cartItems.length === 0 ? (
                <p>No items in cart.</p>
              ) : (
                <div className="profile-cart">
                  {cartItems.map((item) => (
                    <div key={item._id} className="cart-item-wrapper">
                      <Card product={item} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Wishlist Tab */}
          {activeTab === "wishlist" && (
            <section>
              {wishlistItems.length === 0 ? (
                <p>No items in wishlist.</p>
              ) : (
                <div className="profile-wishlist">
                  {wishlistItems.map((item) => (
                    <Card key={item._id} product={item} />
                  ))}
                </div>
              )}
            </section>
          )}
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Profile;
