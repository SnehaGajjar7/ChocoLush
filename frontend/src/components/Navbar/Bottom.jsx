import React, { useState, useEffect } from "react";
import "./Bottom.css";
import { FaBirthdayCake, FaTruck, FaGift, FaCookieBite } from "react-icons/fa";

const Bottom = () => {
  const messages = [
    {
      text: "Freshly baked joy — delivered warm to your door.",
      icon: <FaBirthdayCake />,
    },
    {
      text: "Turn sweet cravings into special moments with our artisan treats.",
      icon: <FaCookieBite />,
    },
    {
      text: "Enjoy 10% off your first order — because sweetness should be shared.",
      icon: <FaGift />,
    },
    {
      text: "Free delivery on orders above ₹999 — from our oven to your home.",
      icon: <FaTruck />,
    },
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bottom-message-bar">
      <p>
        {messages[currentMessageIndex].text}
        <span className="icon">{messages[currentMessageIndex].icon}</span>
      </p>
    </div>
  );
};

export default Bottom;
