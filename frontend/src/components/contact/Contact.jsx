import React, { useState } from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    contact: '',
    message: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Your grievance has been submitted successfully!');
  };

  return (
    <div className="contact-wrapper">
      <div className="form-section">
        <h2>Feedback Form</h2>
        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Contact No:</label>
              <input type="tel" name="contact" value={formData.contact} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Message:</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>

          <div className="form-group file-upload">
            <label>Attach File:</label>
            <input type="file" name="file" onChange={handleChange} />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>

      <div className="info-section">
      <img src={assets.feedback} alt="Website Logo" className="info-sectionlogo" />
        <h3> Registered Office</h3>
        <p>
          Chocolush Pvt Ltd<br />
          127 Dreamy Avenue, Town City<br />
          Gujarat, India - 110001<br />
          +91-9876543210<br />
          happy@chocolush.com
        </p>

      </div>
    </div>
  );
};

export default ContactForm;
