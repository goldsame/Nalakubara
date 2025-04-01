import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import gamesData from '../../data/games.json';
import { Link } from 'react-router-dom';
// 移除不存在的CSS文件导入
// import './CategoryPage.css';

// 使用固定ID而不是动态生成的ID
const CATEGORY_UNIQUE_ID = `category-page-container`;

const CategoryPage = ({ fixedCategory }) => {
  const { categoryId } = useParams();
  const [categoryGames, setCategoryGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // 监听窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 根据窗口宽度确定列数
  const getColumnCount = () => {
    if (windowWidth <= 768) return 1;
    if (windowWidth <= 992) return 2;
    if (windowWidth <= 1200) return 3;
    return 4;
  };
  
  // 确保所有分类名称都是英文
  const categoryNames = {
    'action': 'Action',
    'adventure': 'Adventure',
    'puzzle': 'Puzzle',
    'shooting': 'Shooting',
    'racing': 'Racing',
    'strategy': 'Strategy',
    'multiplayer': 'Multiplayer',
    'io': 'IO',
    'sports': 'Sports',
    '2player': '2 Player',
    'basketball': 'Basketball',
    'beauty': 'Beauty',
    'bike': 'Bike',
    'car': 'Car',
    'card': 'Card',
    'casual': 'Casual',
    'clicker': 'Clicker',
    'controller': 'Controller',
    'dressup': 'Dress Up',
    'driving': 'Driving',
    'escape': 'Escape',
    'flash': 'Flash',
    'fps': 'FPS',
    'horror': 'Horror',
    'mahjong': 'Mahjong',
    'minecraft': 'Minecraft',
    'pool': 'Pool',
    'soccer': 'Soccer',
    'stickman': 'Stickman',
    'tower-defense': 'Tower Defense',
    'popular': 'Hot Games',
    'new': 'New Games',
    'featured': 'Featured Games'
  };

  // 创建分类映射表，处理可能的别名
  const categoryMap = {
    // 直接匹配
    'action': ['action'],
    'adventure': ['adventure'],
    'puzzle': ['puzzle'],
    'shooting': ['shooting'],
    'racing': ['racing'],
    'strategy': ['strategy'],
    'multiplayer': ['multiplayer'],
    'io': ['io'],
    'sports': ['sports'],
    'card': ['card'],
    'beauty': ['beauty'],
    'driving': ['driving'],
    'escape': ['escape'],
    'pool': ['pool'],
    'clicker': ['clicker'],
    // 可能的别名或相关分类
    '2player': ['multiplayer', '2player'],
    'basketball': ['sports', 'basketball'],
    'bike': ['racing', 'bike'],
    'car': ['racing', 'car'],
    'casual': ['casual', 'puzzle'],
    'controller': ['controller', 'action'],
    'dressup': ['beauty', 'dressup'],
    'flash': ['flash', 'casual'],
    'fps': ['shooting', 'fps'],
    'horror': ['horror', 'adventure'],
    'mahjong': ['puzzle', 'mahjong'],
    'minecraft': ['minecraft', 'adventure'],
    'soccer': ['sports', 'soccer'],
    'stickman': ['action', 'stickman'],
    'tower-defense': ['strategy', 'tower-defense']
  };

  // 强制使用英文名称，不依赖于其他可能的映射
  const getCategoryName = (id) => {
    return categoryNames[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  useEffect(() => {
    const loadCategoryGames = () => {
      setLoading(true);
      try {
        let games = [...gamesData];
        
        // 使用fixedCategory或URL参数
        const currentCategory = fixedCategory || categoryId;
        
        console.log("当前分类:", currentCategory);
        console.log("游戏总数:", games.length);
        console.log("所有游戏分类:", games.map(game => game.category).filter((v, i, a) => a.indexOf(v) === i));
        
        // 根据不同分类筛选游戏
        if (currentCategory === 'popular') {
          // 热门游戏 - 按播放次数排序
          games = games.filter(game => game.isPopular || (game.playCount && game.playCount > 10000))
                      .sort((a, b) => (b.playCount || 0) - (a.playCount || 0));
        } else if (currentCategory === 'new') {
          // 新游戏 - 按添加日期排序
          games = games.filter(game => game.isNew || game.addedDate)
                      .sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0));
        } else if (currentCategory === 'featured') {
          // 精选游戏
          games = games.filter(game => game.isFeatured);
        } else if (currentCategory === 'all') {
          // 所有分类
          games = games;
        } else {
          // 获取当前分类的可能匹配
          const possibleCategories = categoryMap[currentCategory.toLowerCase()] || [currentCategory.toLowerCase()];
          
          // 特定分类 - 完全匹配
          const filteredGames = games.filter(game => 
            game.category && 
            possibleCategories.includes(game.category.toLowerCase())
          );
          
          console.log("完全匹配游戏数:", filteredGames.length); // 调试用
          
          if (filteredGames.length > 0) {
            games = filteredGames;
          } else {
            // 如果没有完全匹配，尝试部分匹配
            const partialMatches = games.filter(game => 
              game.category && 
              possibleCategories.some(cat => 
                game.category.toLowerCase().includes(cat) || 
                cat.includes(game.category.toLowerCase())
              )
            );
            
            console.log("部分匹配游戏数:", partialMatches.length); // 调试用
            
            if (partialMatches.length > 0) {
              games = partialMatches;
            } else {
              // 如果仍然没有匹配，尝试标签匹配
              const tagMatches = games.filter(game => 
                game.tags && 
                Array.isArray(game.tags) &&
                game.tags.some(tag => 
                  possibleCategories.some(cat => 
                    tag && tag.toLowerCase() === cat
                  )
                )
              );
              
              console.log("标签匹配游戏数:", tagMatches.length); // 调试用
              
              if (tagMatches.length > 0) {
                games = tagMatches;
              }
            }
          }
        }
        
        console.log("筛选后游戏数:", games.length); // 调试用
        setCategoryGames(games);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load category games:', error);
        setLoading(false);
      }
    };

    loadCategoryGames();
  }, [categoryId, fixedCategory]);

  // 注入自定义样式到页面头部，确保我们的样式优先级最高
  useEffect(() => {
    // 创建样式元素
    const styleEl = document.createElement('style');
    styleEl.id = `${CATEGORY_UNIQUE_ID}-styles`;
    
    // 定义样式内容，使用特定ID选择器确保高优先级
    styleEl.innerHTML = `
      #${CATEGORY_UNIQUE_ID} {
        padding: 20px !important;
        max-width: 1200px !important;
        margin: 0 auto !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-grid {
        display: grid !important;
        grid-template-columns: repeat(${getColumnCount()}, 1fr) !important;
        gap: 20px !important;
        margin-bottom: 30px !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-card {
        display: flex !important;
        flex-direction: column !important;
        background-color: #1e1f2b !important;
        border-radius: 8px !important;
        overflow: hidden !important;
        transition: transform 0.2s, box-shadow 0.2s !important;
        height: 100% !important;
        text-decoration: none !important;
        color: inherit !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-card:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3) !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-image-container {
        position: relative !important;
        width: 100% !important;
        padding-top: 75% !important; /* 4:3 比例，与GameCard.css保持一致 */
        overflow: hidden !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-image {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        transition: transform 0.3s !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-card:hover .category-image {
        transform: scale(1.05) !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-info {
        padding: 15px !important;
        flex-grow: 1 !important;
        display: flex !important;
        flex-direction: column !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-title {
        font-size: 16px !important;
        margin: 0 0 10px !important;
        color: #e1e2ea !important;
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
      
      #${CATEGORY_UNIQUE_ID} .category-meta {
        display: flex !important;
        justify-content: space-between !important;
        font-size: 12px !important;
        color: #8a8d98 !important;
        margin-top: auto !important;
      }
    `;
    
    // 添加到文档头部
    document.head.appendChild(styleEl);
    
    // 组件卸载时移除样式
    return () => {
      const existingStyle = document.getElementById(`${CATEGORY_UNIQUE_ID}-styles`);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [windowWidth]);

  // 渲染骨架屏
  const renderSkeletons = (count) => {
    return Array(count).fill().map((_, index) => (
      <div key={index} className="skeleton-card">
        <div className="skeleton-animation" style={{ height: '180px' }}></div>
        <div style={{ padding: '15px' }}>
          <div className="skeleton-animation" style={{ height: '20px', width: '70%', marginBottom: '10px' }}></div>
          <div className="skeleton-animation" style={{ height: '15px', width: '50%' }}></div>
        </div>
      </div>
    ));
  };

  // 自定义游戏卡片渲染函数
  // 修改renderGameCard函数，确保使用正确的类名
  const renderGameCard = (game) => {
  // 处理图片URL
  let imageSrc = '';
  if (game.imageUrl && !game.imageUrl.includes('placeholder.com')) {
    imageSrc = game.imageUrl.replace(/(\?|&)width=\d+/g, '');       
    imageSrc = imageSrc.replace(/\?$/g, '');
  } else {
    imageSrc = '/images/placeholder-game.jpg';
  }

  return (
    <Link to={`/game/${game.id}`} className="category-card" key={game.id}>
      <div className="category-image-container">
        <img 
          src={imageSrc} 
          alt={game.title} 
          className="category-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/placeholder-game.jpg';
          }}
        />
      </div>
      <div className="category-info">
        <h3 className="category-title">{game.title}</h3>
        <div className="category-meta">
          <span>{(game.playCount || 0).toLocaleString()} plays</span>
        </div>
      </div>
    </Link>
  );
};

  // 标题样式
  const headingStyle = {
    marginBottom: '20px',
    fontSize: '28px',
    color: '#333'
  };

  // 无游戏提示样式
  const noGamesStyle = {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
    gridColumn: '1 / -1'
  };

  return (
    <div id={CATEGORY_UNIQUE_ID}>
      <h1 style={headingStyle}>
        {getCategoryName(fixedCategory || categoryId)} Games
      </h1>

      <div className="category-grid">
        {loading ? renderSkeletons(12) :
          categoryGames.length > 0 ? categoryGames.map(game => renderGameCard(game)) : (
            <div style={noGamesStyle}>
              No games in this category
            </div>
          )
        }
      </div>
    </div>
  );
};

export default CategoryPage;