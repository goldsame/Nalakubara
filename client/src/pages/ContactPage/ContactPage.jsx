import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <h1>Contact</h1>
      <div className="contact-content">
        <p>If you have any questions or suggestions, please feel free to contact us.</p>
        
        <div className="contact-info">
          <h2>Email</h2>
          <p>support@example.com</p>
          
          <h2>Social Media</h2>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;