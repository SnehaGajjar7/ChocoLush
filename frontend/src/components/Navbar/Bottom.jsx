import React, { useState, useEffect } from "react";
import "./Bottom.css";
import { FaSeedling, FaTruck, FaGift, FaHeart } from "react-icons/fa"; 

const Bottom = () => {
  const messages = [
    {
      text: "Experience the joy of fresh blooms — delivered to your doorstep daily.",
      icon: <FaSeedling />,
    },
    {
      text: "Turn everyday moments into memories with our handcrafted floral designs.",
      icon: <FaHeart />,
    },
    {
      text: "Enjoy 10% off your first order — because your story deserves a beautiful start.",
      icon: <FaGift />,
    },
    {
      text: "Complimentary delivery on all orders above ₹999 — because elegance should arrive effortlessly.",
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
        <span className="icon">{messages[currentMessageIndex].icon}</span>{" "}
        
      </p>
    </div>
  );
};

export default Bottom;
