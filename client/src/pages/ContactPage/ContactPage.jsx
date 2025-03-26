import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // 清除该字段的错误
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入您的电子邮件';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的电子邮件地址';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = '请输入主题';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = '请输入您的留言';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // 模拟API调用
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // 5秒后重置成功消息
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }, 1500);
    }
  };
  
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>联系我们</h1>
        <p>如果您有任何问题、建议或合作意向，请随时与我们联系。</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon email-icon"></div>
            <div className="info-text">
              <h3>电子邮件</h3>
              <p>contact@crazygames.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon location-icon"></div>
            <div className="info-text">
              <h3>地址</h3>
              <p>中国北京市海淀区中关村科技园</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon phone-icon"></div>
            <div className="info-text">
              <h3>电话</h3>
              <p>+86 10 1234 5678</p>
            </div>
          </div>
          
          <div className="social-links">
            <h3>关注我们</h3>
            <div className="social-icons">
              <a href="https://facebook.com" className="social-icon facebook-icon" aria-label="Facebook"></a>
              <a href="https://twitter.com" className="social-icon twitter-icon" aria-label="Twitter"></a>
              <a href="https://instagram.com" className="social-icon instagram-icon" aria-label="Instagram"></a>
              <a href="https://youtube.com" className="social-icon youtube-icon" aria-label="YouTube"></a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          {submitSuccess ? (
            <div className="success-message">
              <div className="success-icon"></div>
              <h3>消息已发送！</h3>
              <p>感谢您的留言，我们会尽快回复您。</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">电子邮件</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">主题</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">留言</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? '发送中...' : '发送留言'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;