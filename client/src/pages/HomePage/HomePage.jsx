import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  
  // 分类名称映射（英文到中文）
  const categoryNames = {
    action: "动作",
    adventure: "冒险",
    puzzle: "解谜",
    shooting: "射击",
    racing: "赛车",
    strategy: "策略",
    multiplayer: "多人",
    io: "IO",
    sports: "体育",
    beauty: "美妆",
    card: "卡牌",
    driving: "驾驶",
    escape: "密室逃脱",
    pool: "台球"
    // 可以根据需要添加更多分类名称
  };
  
  useEffect(() => {
    // 直接处理导入的数据
    try {
      // 删除精选游戏的过滤
      
      // 修改排序逻辑：按照添加日期排序，最新的在前面
      const popular = [...gamesData].sort((a, b) => {
        // 将日期字符串转换为Date对象进行比较
        const dateA = new Date(a.addedDate);
        const dateB = new Date(b.addedDate);
        // 降序排列，最新的日期在前
        return dateB - dateA;
      });
      
      // 过滤出新游戏
      const newGamesData = gamesData.filter(game => game.isNew);
      
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
      
      // 删除设置精选游戏
      setPopularGames(popular);
      setNewGames(newGamesData);
      setCategories(categoriesData);
      setLoading(false);
    } catch (error) {
      console.error('Error processing data:', error);
      setLoading(false);
    }
  }, []);
  
  // 确保热门游戏只显示两行（8个游戏）
  // 假设每行显示4个游戏，两行最多显示8个
  const maxPopularGames = 8;
  
  // 计算分类的总页数
  const categoriesPerPage = 10; // 每页显示10个分类（2行，每行5个）
  const totalCategoryPages = Math.ceil(categories.length / categoriesPerPage);
  
  // 获取当前页的分类
  const currentCategories = categories.slice(
    currentCategoryPage * categoriesPerPage,
    (currentCategoryPage + 1) * categoriesPerPage
  );
  
  // 切换到上一页
  const goToPrevCategoryPage = () => {
    setCurrentCategoryPage(prev => (prev > 0 ? prev - 1 : totalCategoryPages - 1));
  };
  
  // 切换到下一页
  const goToNextCategoryPage = () => {
    setCurrentCategoryPage(prev => (prev < totalCategoryPages - 1 ? prev + 1 : 0));
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="home-page">
      {/* 删除精选游戏部分，直接显示热门游戏 */}
      
      {/* 热门游戏部分 - 使用两行布局并强制限制数量 */}
      <section className="game-section">
        <div className="section-header">
          <h2>Popular Games</h2>
          <Link to="/popular" className="view-all">View All</Link>
        </div>
        
        {/* 使用单一容器并强制只渲染8个游戏 */}
        <div className="games-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '20px', 
          marginBottom: '30px',
          maxHeight: '650px',  // 设置足够高度容纳两行游戏
          overflow: 'hidden'   // 隐藏多余内容
        }}>
          {popularGames.slice(0, 8).map((game, index) => (
            <GameCard 
              key={game.id} 
              game={game}
            />
          ))}
        </div>
      </section>
      
      {/* 分类部分 - 添加左右切换功能，限制为两行（10个分类） */}
      <section className="categories-section">
        <div className="categories-header">
          <h2>Game Categories</h2>
          {totalCategoryPages > 1 && (
            <div className="categories-navigation">
              <button className="nav-button prev" onClick={goToPrevCategoryPage}>
                &lt;
              </button>
              <span className="page-indicator">{currentCategoryPage + 1}/{totalCategoryPages}</span>
              <button className="nav-button next" onClick={goToNextCategoryPage}>
                &gt;
              </button>
            </div>
          )}
        </div>
        <div className="categories-grid">
          {currentCategories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
      
      {/* 新游戏部分保持不变 */}
      <section className="new-games-section">
        <div className="section-header">
          <h2>New Games</h2>
          <Link to="/new" className="view-all">View All</Link>
        </div>
        <div className="games-grid">
          {newGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;