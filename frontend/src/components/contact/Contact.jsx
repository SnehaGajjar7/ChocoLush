import React, { useState } from 'react';
import './Feedback.css'; // CSS file (next step)

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    satisfaction: '',
    like: '',
    improve: '',
    recommend: '',
    comments: '',
    contactPermission: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', formData);
    alert('Thank you for your feedback!');
    // Reset form
    setFormData({
      name: '',
      email: '',
      satisfaction: '',
      like: '',
      improve: '',
      recommend: '',
      comments: '',
      contactPermission: '',
    });
  };

  
   
};

export default FeedbackForm;
