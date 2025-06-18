import React, { useContext, useState } from "react";
import "./Contact.css";
import { assets } from "../../assets/assets";
import NotificationBubble from "../notification/Notification";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CartContext } from "../../context/CartContext";


const ContactForm = () => {
  const {url} = useContext(CartContext)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    contact: "",
    message: "",
    file: null,
    rating: 0,
  });

  const [alert, setAlert] = useState(null); // ✅ add this line

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("city", formData.city);
    data.append("contact", formData.contact);
    data.append("message", formData.message);
    if (formData.file) {
      data.append("image", formData.file);
    }
    data.append("rating", formData.rating);

    try {
      const response = await fetch(`${url}/api/contact`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (response.ok) {
        setAlert({ message: "Thanks for the sweet feedback! " });
        setTimeout(() => setAlert(null), 3000);
        setFormData({
          name: "",
          email: "",
          city: "",
          contact: "",
          message: "",
          file: null,
          rating: 0,
        });
      } else {
        setAlert({ message: "Oops! Something went wrong. " });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setAlert({ message: "Server error. Please try again later." });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <>
      <NotificationBubble
        message={alert?.message}
        onClose={() => setAlert(null)}
      />
      <div className="contact-wrapper">
        <div className="form-section">
          <h2>Feedback Form</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Name & City */}
            <div className="form-row">
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email & Contact */}
            <div className="form-row">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact No:</label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Message */}
            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* File Upload */}
            <div className="form-group file-upload">
              <label>Attach File:</label>
              <input type="file" name="file" onChange={handleChange} />
            </div>

            {/* Rating */}
            <div className="form-group rating-group">
              <label>How Sweet Was Your Experience?</label>
              <div className="hearts">
                {[1, 2, 3, 4, 5].map((level) => (
                  <span
                    key={level}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: level }))
                    }
                    style={{
                      cursor: "pointer",
                      fontSize: "26px",
                      transition: "transform 0.2s",
                    }}
                    title={
                      level === 1
                        ? "Okay"
                        : level === 2
                        ? "Nice"
                        : level === 3
                        ? "Yummy!"
                        : level === 4
                        ? "So Sweet!"
                        : "ChocoLove Overload"
                    }
                  >
                    {formData.rating >= level ? <AiFillHeart color="#e2aaaa"  /> : <AiOutlineHeart  />}
                  </span>
                ))}
              </div>
              <p className="rating-label">
                {formData.rating === 0
                  ? "No rating yet"
                  : formData.rating === 1
                  ? "Okay"
                  : formData.rating === 2
                  ? "Nice"
                  : formData.rating === 3
                  ? "Yummy!"
                  : formData.rating === 4
                  ? "So Sweet!"
                  : "ChocoLove Overload 💖"}
              </p>
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="info-section">
          <img
            src={assets.feedback}
            alt="ChocoLush"
            className="info-sectionlogo"
          />
          <h3> Registered Office</h3>
          <p>
            Chocolush Pvt Ltd
            <br />
            127 Dreamy Avenue, Town City
            <br />
            Gujarat, India - 110001
            <br />
            +91-9876543210
            <br />
            happy@chocolush.com
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
