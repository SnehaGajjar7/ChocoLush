import React, { useEffect, useState, useContext } from "react";
import "./Profile.css";
import axios from "axios";
import { CartContext } from "../../context/CartContext";
import Card from "../../components/card/Card";
import { assets } from "../../assets/assets";

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
          if (res3.data.success) setOrders(res3.data.data);

          const cartIds = Object.keys(userData.cartData || {});
          const wishlistIds = userData.wishlist || [];

          if (cartIds.length > 0 || wishlistIds.length > 0) {
            const res2 = await axios.post(`${url}/api/cake/multiple`, {
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
        <img
          src="https://www.biggerbolderbaking.com/wp-content/uploads/2021/07/Baked-Doughnuts-thumbnail-scaled.jpg"
          alt="Bakery Banner"
        />
      </div>

      <div className="profile-bottom">
        {user && (
          <>
            <div className="profile-header">
              <h2 className="welcome-heading">Hi {user.name}!</h2>
              <p className="welcome-message">
                Sweet to see you back at ChocoLush 💕
              </p>
              <p className="welcome-message">
                You've made <strong>{orders.length}</strong> delicious orders!
              </p>

              <div className="profile-summary">
                <p className="welcome-email">📧 {user.email}</p>
                <p>
                  <strong>Joined:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Total Orders:</strong> {orders.length}
                </p>
              </div>
              <img
                src={assets.macroon}
                alt="Bakery"
                className="profile-side-img"
              />
            </div>

            <div className="profile-tab">
              <div className="tab-switcher">
                <button
                  className={
                    activeTab === "cart" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setActiveTab("cart")}
                >
                  Basket ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                </button>
                <button
                  className={
                    activeTab === "wishlist" ? "tab-btn active" : "tab-btn"
                  }
                  onClick={() => setActiveTab("wishlist")}
                >
                  Wishlist ({wishlistItems.length})
                </button>
              </div>

              {activeTab === "cart" && (
                <section>
                  {cartItems.length === 0 ? (
                    <p>Your basket is empty 🧁</p>
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

              {activeTab === "wishlist" && (
                <section>
                  {wishlistItems.length === 0 ? (
                    <p>No sweet treats in wishlist 🍰</p>
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
