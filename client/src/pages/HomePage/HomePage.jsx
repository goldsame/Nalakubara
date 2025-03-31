import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga4'; // 导入Google Analytics
import GameCard from '../../components/GameCard/GameCard';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import './HomePage.css';
// 只保留游戏数据导入
import gamesData from '../../data/games.json';

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
  const getNewGames = () => {
    // 筛选出标记为新游戏的游戏
    const newGamesData = gamesData.filter(game => game.isNew || game.addedDate);
    
    // 按添加日期倒序排序，确保最新添加的游戏显示在最前面
    return newGamesData.sort((a, b) => new Date(b.addedDate || 0) - new Date(a.addedDate || 0));
  };
  
  useEffect(() => {
    // 设置页面标题
    document.title = "Nalakubara - Free Online Gaming Platform";
    
    // 初始化Google Analytics
    ReactGA.initialize('G-WQQNBKTGRG');
    // 发送页面浏览事件
    ReactGA.send({ hitType: "pageview", page: "/home" });
    
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
      
      // 创建分类对象数组
      const categoriesData = uniqueCategories.map(categoryId => {
        // 获取该分类下的游戏数量
        const gamesInCategory = gamesData.filter(game => game.category === categoryId).length;
        
        return {
          id: categoryId,
          name: categoryNames[categoryId] || categoryId, // 使用映射的英文名称，如果没有则使用原始ID
          color: categoryColors[categoryId] || "#607d8b", // 使用映射的颜色，如果没有则使用默认颜色
          gamesCount: gamesInCategory
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

  // 计算当前显示的分类
  const categoriesPerPage = 8;
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

      {/* 新游戏部分 */}
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
            newGames.slice(0, 8).map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={() => trackGameClick(game.id, game.title, 'New')}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
