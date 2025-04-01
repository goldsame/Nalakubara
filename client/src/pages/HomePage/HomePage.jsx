import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4'; // 导入Google Analytics
import GameCard from '../../components/GameCard/GameCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './HomePage.css';
// 只保留游戏数据导入
import gamesData from '../../data/games.json';

// 导入所有分类信息
const allCategories = [
  { id: 'action', name: 'Action', icon: 'fas fa-bolt', className: 'action-icon' },
  { id: 'adventure', name: 'Adventure', icon: 'fas fa-compass', className: 'adventure-icon' },
  { id: 'puzzle', name: 'Puzzle', icon: 'fas fa-puzzle-piece', className: 'puzzle-icon' },
  { id: 'shooting', name: 'Shooting', icon: 'fas fa-crosshairs', className: 'shooting-icon' },
  { id: 'racing', name: 'Racing', icon: 'fas fa-car', className: 'racing-icon' },
  { id: 'strategy', name: 'Strategy', icon: 'fas fa-chess', className: 'strategy-icon' },
  { id: 'multiplayer', name: 'Multiplayer', icon: 'fas fa-users', className: 'multiplayer-icon' },
  { id: 'io', name: 'IO', icon: 'fas fa-globe', className: 'io-icon' },
  { id: 'sports', name: 'Sports', icon: 'fas fa-futbol', className: 'sports-icon' },
  { id: '2player', name: '2 Player', icon: 'fas fa-user-friends', className: 'player2-icon' },
  { id: 'basketball', name: 'Basketball', icon: 'fas fa-basketball-ball', className: 'basketball-icon' },
  { id: 'beauty', name: 'Beauty', icon: 'fas fa-magic', className: 'beauty-icon' },
  { id: 'bike', name: 'Bike', icon: 'fas fa-bicycle', className: 'bike-icon' },
  { id: 'car', name: 'Car', icon: 'fas fa-car-side', className: 'car-icon' },
  { id: 'card', name: 'Card', icon: 'fas fa-credit-card', className: 'card-icon' },
  { id: 'casual', name: 'Casual', icon: 'fas fa-gamepad', className: 'casual-icon' },
  { id: 'clicker', name: 'Clicker', icon: 'fas fa-mouse-pointer', className: 'clicker-icon' },
  { id: 'controller', name: 'Controller', icon: 'fas fa-gamepad', className: 'controller-icon' },
  { id: 'dressup', name: 'Dress Up', icon: 'fas fa-tshirt', className: 'dressup-icon' },
  { id: 'driving', name: 'Driving', icon: 'fas fa-truck', className: 'driving-icon' },
  { id: 'escape', name: 'Escape', icon: 'fas fa-door-open', className: 'escape-icon' },
  { id: 'flash', name: 'Flash', icon: 'fas fa-bolt', className: 'flash-icon' },
  { id: 'fps', name: 'FPS', icon: 'fas fa-crosshairs', className: 'fps-icon' },
  { id: 'horror', name: 'Horror', icon: 'fas fa-ghost', className: 'horror-icon' },
  { id: 'mahjong', name: 'Mahjong', icon: 'fas fa-th', className: 'mahjong-icon' },
  { id: 'minecraft', name: 'Minecraft', icon: 'fas fa-cubes', className: 'minecraft-icon' },
  { id: 'pool', name: 'Pool', icon: 'fas fa-circle', className: 'pool-icon' },
  { id: 'soccer', name: 'Soccer', icon: 'fas fa-futbol', className: 'soccer-icon' },
  { id: 'stickman', name: 'Stickman', icon: 'fas fa-running', className: 'stickman-icon' },
  { id: 'tower-defense', name: 'Tower Defense', icon: 'fas fa-chess-rook', className: 'tower-defense-icon' }
];

const HomePage = () => {
  const [popularGames, setPopularGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  // 添加分类页码状态
  const [currentCategoryPage, setCurrentCategoryPage] = useState(0);
  
  // 分类颜色映射
  const categoryColors = {
    action: "#ff9800",
    adventure: "#4caf50",
    puzzle: "#9c27b0",
    shooting: "#f44336",
    racing: "#e91e63",
    strategy: "#795548",
    multiplayer: "#5c6bc0",
    io: "#00bcd4",
    sports: "#4caf50",
    beauty: "#9c27b0",
    card: "#ff5722",
    driving: "#795548",
    escape: "#009688",
    pool: "#2196f3"
    // 可以根据需要添加更多分类颜色
  };
  
  // 分类名称映射（英文到英文，保持原样或使用更友好的显示名称）
  const categoryNames = {
    action: "Action",
    adventure: "Adventure",
    puzzle: "Puzzle",
    shooting: "Shooting",
    racing: "Racing",
    strategy: "Strategy",
    multiplayer: "Multiplayer",
    io: "IO",
    sports: "Sports",
    beauty: "Beauty",
    card: "Card",
    driving: "Driving",
    escape: "Escape",
    pool: "Pool"
    // 可以根据需要添加更多分类名称
  };
  
  // 添加事件跟踪函数
  const trackGameClick = (gameId, gameTitle, section) => {
    ReactGA.event({
      category: 'Game',
      action: 'Click',
      label: `${section} - ${gameTitle}`,
      value: 1
    });
  };

  const trackCategoryClick = (categoryId, categoryName) => {
    ReactGA.event({
      category: 'Category',
      action: 'Click',
      label: categoryName,
      value: 1
    });
  };

  const trackViewAllClick = (section) => {
    ReactGA.event({
      category: 'Navigation',
      action: 'View All Click',
      label: section,
      value: 1
    });
  };
  
  // 获取新游戏的函数，按添加日期倒序排序
  // 获取新游戏
  const getNewGames = () => {
  // 筛选新游戏
  const newGames = [...gamesData].filter(game => game.isNew || game.addedDate);
  // 反转数组顺序，使得在JSON文件中靠后的游戏（最新添加的）显示在前面
  return newGames.reverse().slice(0, 12); // 只显示前12个
  };
  
  useEffect(() => {
    // 初始化Google Analytics
    ReactGA.initialize('G-WQQNBKTGRG');
    // 发送页面浏览事件
    ReactGA.send({ hitType: "pageview", page: "/home" });
    
    // 设置页面标题
    document.title = "Nalakubara - Free Online Gaming Platform";
    
    // 直接处理导入的数据
    try {
      // 修改热门游戏的筛选逻辑：筛选出标记为热门的游戏
      const popular = gamesData
        .filter(game => game.isPopular === true)
        .sort((a, b) => (b.playCount || 0) - (a.playCount || 0)); // 按播放次数排序
      
      // 使用getNewGames函数获取新游戏，确保排序一致
      const newGamesData = getNewGames();
      
      // 从游戏数据中提取所有唯一的分类
      const uniqueCategories = [...new Set(gamesData.map(game => game.category))];
      
      // 创建分类对象数组，使用allCategories中的图标信息
      const categoriesData = uniqueCategories.map(categoryId => {
        // 获取该分类下的游戏数量
        const gamesInCategory = gamesData.filter(game => game.category === categoryId).length;
        
        // 查找分类的图标信息
        const categoryInfo = allCategories.find(c => c.id === categoryId);
        
        return {
          id: categoryId,
          name: categoryNames[categoryId] || categoryId, // 使用映射的英文名称，如果没有则使用原始ID
          color: categoryColors[categoryId] || "#607d8b", // 使用映射的颜色，如果没有则使用默认颜色
          gamesCount: gamesInCategory,
          icon: categoryInfo ? categoryInfo.icon : 'fas fa-gamepad', // 使用找到的图标或默认图标
          className: categoryInfo ? categoryInfo.className : '' // 使用找到的类名或空字符串
        };
      });
      
      setPopularGames(popular);
      setNewGames(newGamesData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error('Error processing data:', error);
      setLoading(false);
    }
  }, []);

  // 添加一个新的 useEffect 来修改分类网格为5列
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .category-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr) !important;
        gap: 20px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 计算当前显示的分类
  const categoriesPerPage = 10; // 修改为10个，适应5列布局
  const displayedCategories = categories.slice(
    currentCategoryPage * categoriesPerPage,
    (currentCategoryPage + 1) * categoriesPerPage
  );

  // 处理分类页面切换
  const handleNextCategoryPage = () => {
    if ((currentCategoryPage + 1) * categoriesPerPage < categories.length) {
      setCurrentCategoryPage(currentCategoryPage + 1);
    }
  };

  const handlePrevCategoryPage = () => {
    if (currentCategoryPage > 0) {
      setCurrentCategoryPage(currentCategoryPage - 1);
    }
  };

  return (
    <div className="home-page">
      {/* 热门游戏部分 */}
      <section className="section popular-games">
        <div className="section-header">
          <h2>Popular Games</h2>
          <Link 
            to="/hot" 
            className="view-all"
            onClick={() => trackViewAllClick('Popular Games')}
          >
            View All <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div className="game-grid">
          {loading ? (
            // 加载中显示骨架屏
            Array(4).fill().map((_, index) => (
              <div key={index} className="game-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </div>
            ))
          ) : (
            popularGames.slice(0, 8).map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={() => trackGameClick(game.id, game.title, 'Popular')}
              />
            ))
          )}
        </div>
      </section>

      {/* 分类部分 */}
      <section className="section categories">
        <div className="section-header">
          <h2>Categories</h2>
          <div className="category-navigation">
            <button 
              className="nav-button" 
              onClick={handlePrevCategoryPage}
              disabled={currentCategoryPage === 0}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="nav-button" 
              onClick={handleNextCategoryPage}
              disabled={(currentCategoryPage + 1) * categoriesPerPage >= categories.length}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div className="category-grid">
          {loading ? (
            // 加载中显示骨架屏
            Array(8).fill().map((_, index) => (
              <div key={index} className="category-card skeleton">
                <div className="skeleton-icon"></div>
                <div className="skeleton-title"></div>
              </div>
            ))
          ) : (
            displayedCategories.map(category => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                onClick={() => trackCategoryClick(category.id, category.name)}
              />
            ))
          )}
        </div>
      </section>

      {/* 新游戏部分 - 不限制显示数量 */}
      <section className="section new-games">
        <div className="section-header">
          <h2>New Games</h2>
          <Link 
            to="/new" 
            className="view-all"
            onClick={() => trackViewAllClick('New Games')}
          >
            View All <i className="fas fa-chevron-right"></i>
          </Link>
        </div>
        <div className="game-grid">
          {loading ? (
            // 加载中显示骨架屏
            Array(4).fill().map((_, index) => (
              <div key={index} className="game-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-meta"></div>
              </div>
            ))
          ) : (
            // 添加样式确保所有游戏卡片高度一致
            newGames.map(game => (
              <div key={game.id} className="game-card-wrapper" style={{ height: '100%' }}>
                <GameCard 
                  game={game} 
                  onClick={() => trackGameClick(game.id, game.title, 'New')}
                />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
