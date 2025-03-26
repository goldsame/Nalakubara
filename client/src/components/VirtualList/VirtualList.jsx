import React, { useState, useEffect, useRef, memo } from 'react';
import { throttle } from '../../utils/performance';
import './VirtualList.css';

const VirtualList = memo(({ 
  items, 
  renderItem, 
  itemHeight = 300, 
  containerHeight = 800,
  overscan = 3
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(
    Math.ceil(containerHeight / itemHeight) + overscan * 2
  );
  const containerRef = useRef(null);
  
  // 计算可见项目
  const getVisibleItems = () => {
    const start = Math.max(0, startIndex - overscan);
    const end = Math.min(items.length, startIndex + visibleCount + overscan);
    return items.slice(start, end).map((item, index) => ({
      ...item,
      virtualIndex: start + index
    }));
  };
  
  // 处理滚动事件
  const handleScroll = throttle(() => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    
    if (newStartIndex !== startIndex) {
      setStartIndex(newStartIndex);
    }
  }, 100);
  
  // 设置滚动事件监听
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', handleScroll);
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // 更新可见项目数量
  useEffect(() => {
    setVisibleCount(Math.ceil(containerHeight / itemHeight) + overscan * 2);
  }, [containerHeight, itemHeight, overscan]);
  
  // 计算总高度
  const totalHeight = items.length * itemHeight;
  
  // 计算可见项目的偏移量
  const visibleItemsOffset = Math.max(0, startIndex - overscan) * itemHeight;
  
  return (
    <div 
      ref={containerRef}
      className="virtual-list-container"
      style={{ height: containerHeight, overflowY: 'auto' }}
    >
      <div 
        className="virtual-list-content"
        style={{ height: totalHeight, position: 'relative' }}
      >
        <div 
          className="virtual-list-items"
          style={{ 
            transform: `translateY(${visibleItemsOffset}px)`,
            position: 'absolute',
            width: '100%'
          }}
        >
          {getVisibleItems().map((item, index) => (
            <div 
              key={item.id || item.virtualIndex} 
              style={{ height: itemHeight }}
              className="virtual-list-item"
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

VirtualList.displayName = 'VirtualList';

export default VirtualList;