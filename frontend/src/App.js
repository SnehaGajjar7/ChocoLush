import React, { useState } from "react";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/placeOrder/PlaceOrder";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Contact from "./components/contact/Contact";
import Collection from "./components/collection/Collection";
import ProductDetail from "./components/productdetail/ProductDetail";
import Login from "./pages/login/Login";
import Blogs from "./components/Blogs/Blogs";
import BlogDetails from "./components/Blogs/BlogDetails";
import ProductGrid from "./components/product/ProductGrid";
import WishList from "./pages/wishlist/WishList";
import Varify from "./pages/varify/Varify";
import MyOrders from "./pages/myOrders/MyOrders";
import Bottom from "./components/Navbar/Bottom";
import Profile from "./pages/profile/Profile";
import About from "./components/About/About";
import SummerSpecialPage from "./pages/banner/SeasonalSpecial";
import Gallery from "./pages/Glimpse/GlimpseGallery";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Bottom/>
        <Routes>
          <Route path="/bottom" element={<Bottom />} />
          <Route path="/" element={<Home />} />
          <Route path="/arrival" element={<ProductGrid />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About/>} />
          <Route
            path="/collection/:filterType/:filterValue"
            element={<Collection />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/wishlist" element={<WishList />} />
          
          <Route path="/verify" element={<Varify />} />
          <Route path="/myorders" element={<MyOrders />}/> 
         <Route path="/profile" element={<Profile/>} />
         <Route path="/season" element={<SummerSpecialPage/>} />
         <Route path="/gallery" element={<Gallery/>} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
