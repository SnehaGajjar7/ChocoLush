import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "cake",
    contains: "",
    isNew: false,
    isTrending: false,
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);

    try {
      const formData = new FormData();

      // Append main fields
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("contains", JSON.stringify(data.contains.split(",").map(item => item.trim()))); // ✅ Correct


      formData.append("isNew", data.isNew);
      formData.append("isTrending", data.isTrending);

      // Append main image
      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post(`${url}/api/cake/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (!data.contains.trim()) {
        toast.error("Please enter what the product contains.");
        return;
      }
      
      if (response.data.success) {
        // Reset the form
        setData({
          name: "",
          description: "",
          price: "",
          category: "cake",
          contains: "",
          isNew: false,
          isTrending: false,
        });
        
        setImage(null);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="add-form" onSubmit={submitHandler}>
        <h2>Add a New Delight</h2>
        <div className="add-img-upload">
          <label htmlFor="image">
            Image
            <img
              src={
                image instanceof Blob
                  ? URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            hidden
            required
          />
        </div>

        <div className="add-grid">
          <div className="input-block">
            <label>Product Name</label>
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="e.g. Black Forest Cake"
              required
            />
          </div>

          <div className="input-block">
            <label>Product Price (₹)</label>
            <input
              name="price"
              type="number"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="e.g. 599"
              required
            />
          </div>

          <div className="input-block">
  <label>Category</label>
  <select
    name="category"
    onChange={onChangeHandler}
    value={data.category}
    required
  >
    <option value="" disabled>Select Category</option>

    {/* Cakes */}
    <optgroup label="Cakes">
      <option value="birthday-cakes">Birthday Cakes</option>
      <option value="wedding-cakes">Wedding Cakes</option>
      <option value="photo-cakes">Photo Cakes</option>
      <option value="theme-cakes">Theme Cakes</option>
      <option value="mini-cakes">Mini Cakes</option>
      <option value="jar-cakes">Jar Cakes</option>
      <option value="signature-cakes">Signature Cakes</option>
    </optgroup>

    {/* Pastries */}
    <optgroup label="Pastries">
      <option value="pastries">Pastries</option>
      <option value="muffins">Muffins</option>
      <option value="cupcakes">Cupcakes</option>
      <option value="brownies">Brownies</option>
      <option value="cheesecakes">Cheesecakes</option>
      <option value="tarts">Tarts</option>
    </optgroup>

    {/* Cookies & Biscuits */}
    <optgroup label="Cookies & Biscuits">
      <option value="cookies">Cookies</option>
      <option value="macarons">Macarons</option>
      <option value="biscotti">Biscotti</option>
    </optgroup>

    {/* Special Treats */}
    <optgroup label="Special Treats">
      <option value="doughnuts">Doughnuts</option>
      <option value="churros">Churros</option>
      <option value="eclairs">Éclairs</option>
      <option value="puffs">Puffs</option>
    </optgroup>

    {/* Breads & Savory */}
    <optgroup label="Breads & Savory">
      <option value="croissants">Croissants</option>
      <option value="garlic-breads">Garlic Breads</option>
      <option value="stuffed-buns">Stuffed Buns</option>
      <option value="rolls-loaves">Rolls & Loaves</option>
    </optgroup>

    {/* Gifting & Specials */}
    <optgroup label="Gifting & Specials">
      <option value="dessert-boxes">Dessert Boxes</option>
      <option value="custom-hampers">Custom Hampers</option>
      <option value="festive-specials">Festive Specials</option>
      <option value="vegan-glutenfree">Vegan & Gluten-Free</option>
    </optgroup>

    {/* Cafe Sips */}
    <optgroup label="Cafe Sips - Hot Beverages">
      <option value="coffee">Coffee</option>
      <option value="latte">Latte</option>
      <option value="cappuccino">Cappuccino</option>
      <option value="espresso">Espresso</option>
      <option value="hot-chocolate">Hot Chocolate</option>
      <option value="tea">Assorted Teas</option>
    </optgroup>

    <optgroup label="Cafe Sips - Cold Beverages">
      <option value="iced-coffee">Iced Coffee</option>
      <option value="iced-latte">Iced Latte</option>
      <option value="frappes">Frappes</option>
      <option value="cold-brew">Cold Brew</option>
      <option value="iced-tea">Iced Tea</option>
    </optgroup>

    <optgroup label="Seasonal Specials">
      <option value="winter-specials">Winter Warmers</option>
      <option value="summer-drinks">Summer Coolers</option>
      <option value="festive-drinks">Festive Drinks</option>
      <option value="limited-edition">Limited Editions</option>
    </optgroup>

    <optgroup label="Health & Detox">
      <option value="herbal-tea">Herbal Tea</option>
      <option value="kombucha">Kombucha</option>
      <option value="detox-water">Detox Water</option>
      <option value="green-smoothies">Green Smoothies</option>
    </optgroup>
  </select>
</div>

        </div>

        <div className="input-block wide">
          <label>Product Description</label>
          <textarea
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            rows="4"
            placeholder="Describe this product..."
            required
          />
        </div>

        <div className="input-block wide">
          <label>Contains</label>
          <input
            name="contains"
            value={data.contains}
            onChange={onChangeHandler}
            placeholder="e.g. 🍫 Chocolate, 🍓 Strawberry, 🌿 Mint"
          />
        </div>
        <div className="input-block">
          <label>
            <input
              type="checkbox"
              name="isNew"
              onChange={(e) =>
                setData((prev) => ({ ...prev, isNew: e.target.checked }))
              }
              checked={data.isNew || false}
            />
            Mark as New Arrival
          </label>
        </div>

        <div className="input-block">
          <label>
            <input
              type="checkbox"
              name="isTrending"
              onChange={(e) =>
                setData((prev) => ({ ...prev, isTrending: e.target.checked }))
              }
              checked={data.isTrending || false}
            />
            Mark as Trending
          </label>
        </div>

        <button className="add-btn" type="submit">
          Add Delight
        </button>
      </form>
    </div>
  );
};

export default Add;
