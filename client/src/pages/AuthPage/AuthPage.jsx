import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

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
    
    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空';
    }
    
    if (!isLogin) {
      if (!formData.email.trim()) {
        newErrors.email = '邮箱不能为空';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = '邮箱格式不正确';
      }
    }
    
    if (!formData.password) {
      newErrors.password = '密码不能为空';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度不能少于6位';
    }
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // 这里应该调用实际的API
      console.log('提交表单:', formData);
      
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 登录成功后重定向到首页
      navigate('/');
    } catch (error) {
      console.error('认证错误:', error);
      setErrors({
        form: '认证失败，请稍后再试'
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">{isLogin ? '登录' : '注册'}</h1>
        
        {errors.form && <div className="error-message">{errors.form}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">用户名</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password">密码</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">确认密码</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>
          )}
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? '处理中...' : isLogin ? '登录' : '注册'}
          </button>
        </form>
        
        <div className="auth-switch">
          {isLogin ? '还没有账号？' : '已有账号？'}
          <button type="button" className="switch-button" onClick={toggleAuthMode}>
            {isLogin ? '立即注册' : '立即登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;