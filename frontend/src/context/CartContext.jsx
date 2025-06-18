import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://chocolush-backend.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [collections, setCollection] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      updatedCart[itemId] = (updatedCart[itemId] || 0) + 1;
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId},
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to add item to backend cart:", error);
      }
    } else {
      alert("Please login to add items to your basket.");
      return;
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 0) {
        updatedCart[itemId] -= 1;
      }
      return updatedCart;
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = collections.find(
          (product) => String(product.id) === String(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[itemId];
        } else {
          console.warn("Product not found for cart item ID:", itemId);
        }
      }
    }
    return totalAmount;
  };

  const fetchCakeList = async () => {
    try {
      const response = await axios.get(url + "/api/cake/list");
      const products = response.data.data.map((product) => ({
        ...product,
        id: product._id,
      }));
      setCollection(products);
    } catch (error) {
      console.error("Error fetching cake list:", error);
    }
  };

  useEffect(() => {
    fetchCakeList();
  }, []);


  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(response.data.cartData || {});
      console.log("Cart items:", response.data.cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCartItems({});
    }
  };

  const addToWishlist = async (itemId) => {
    setWishlist((prev) => {
      const updatedWishlist = { ...prev };
      updatedWishlist[itemId] = (updatedWishlist[itemId] || 0) + 1;
      return updatedWishlist;
    });

    if (token) {
      await axios.post(
        url + "/api/wishlist/toggle",
        { itemId },
        { headers: { token } }
      );
    }
    console.log("wishlist", wishlist);
  };

  const loadWishlist = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/wishlist`,
        {},
        {
          headers: { token },
        }
      );
      setWishlist(response.data.wishlistData || []);
      console.log("Fetched wishlist:", response.data.wishlistData);
    } catch (error) {
      console.error("Error fetching wishlist data: ", error);
      setWishlist([]);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchCakeList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
        await loadWishlist(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    collections,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    addToWishlist,
    wishlist,
    setWishlist,
    loadWishlist,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
