import React, { useState, useEffect } from 'react';

const OptimizedImage = ({ src, alt, className, fallbackSrc }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultFallback = 'https://via.placeholder.com/300x200?text=加载失败';
  
  useEffect(() => {
    // 重置状态
    setLoading(true);
    setImgSrc(null);
    
    // 创建新图片对象进行预加载
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setLoading(false);
    };
    
    img.onerror = () => {
      setImgSrc(fallbackSrc || defaultFallback);
      setLoading(false);
    };
    
    // 清理函数
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, fallbackSrc, defaultFallback]);
  
  if (loading) {
    return <div className={`image-placeholder ${className || ''}`}></div>;
  }
  
  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      className={className} 
      loading="lazy"
    />
  );
};

export default React.memo(OptimizedImage);