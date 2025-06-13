import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Feedback.css";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { CartContext } from "../../context/CartContext";
import RealisticFlowerLoader from "../../components/productdetail/Flower";

const Feedback = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { url } = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${url}/api/contact`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [url]);

  const prev = () => setCurrentIndex((prev) => Math.max(prev - 3, 0));
  const next = () =>
    setCurrentIndex((prev) => (prev + 3 >= messages.length ? prev : prev + 3));

  const visibleMessages = messages.slice(currentIndex, currentIndex + 3);

  if (loading) return <RealisticFlowerLoader />;
  if (messages.length === 0)
    return <p className="no-feedback">No feedback yet.</p>;

  return (
    <div className="feedback-container">
      <h2 className="feedback-title"> What Our Customers Say </h2>

      <div className="feedback-grid-wrapper">
        {currentIndex > 0 && (
          <button className="arrow left" onClick={prev}>
            <MdOutlineKeyboardDoubleArrowLeft />
          </button>
        )}

        <div className="feedback-grid">
          {visibleMessages.map((msg) => (
            <div className="feedback-card" key={msg._id}>
              <div className="card-header">
                {msg.imagePath && (
                  <img
                    src={`${url}/${msg.imagePath}`}
                    alt="User"
                    className="avatar"
                  />
                )}
                <div className="user-info">
                  <p className="name">{msg.name}</p>
                  <p className="date">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={i < msg.rating ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="message">“{msg.message}”</p>
            </div>
          ))}
        </div>

        {currentIndex + 3 < messages.length && (
          <button className="arrow right" onClick={next}>
            <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </div>
    </div>
  );
};

export default Feedback;
