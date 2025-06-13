import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./WishList.css";
import axios from "axios";
import Card from "../../components/card/Card";

const WishList = () => {
  const { url, token } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: { token },
        });

        if (res.data.success) {
          const userData = res.data.user;
          setUser(userData);

          const wishlistIds = userData.wishlist || [];

          if (wishlistIds.length > 0) {
            const res2 = await axios.post(`${url}/api/flower/multiple`, {
              ids: [...wishlistIds],
            });

            if (res2.data.success) {
              const products = res2.data.products;

              const wishlist = products.filter((p) =>
                wishlistIds.includes(p._id)
              );

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
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistItems.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          <div className="profile-wishlist">
            {wishlistItems.map((item) => (
              <Card key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishList;
