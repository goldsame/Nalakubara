import React, { useState, useEffect } from 'react';
import './AddGamePage.css';
import gamesData from '../../data/games.json'; // 导入games.json数据
import { useNavigate } from 'react-router-dom';

const AddGamePage = () => {
  const [gameTitle, setGameTitle] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [gameInstructions, setGameInstructions] = useState('');
  const [gameUrl, setGameUrl] = useState('');
  const [category, setCategory] = useState('action');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [rating, setRating] = useState('');
  const [playCount, setPlayCount] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [addedGames, setAddedGames] = useState([]);
  const [titleError, setTitleError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [imageError, setImageError] = useState('');
  const [seoTitle, setSeoTitle] = useState('');

  // 修改游戏分类列表，保持中文显示
  const categories = [
    { id: 'action', name: '动作' },
    { id: 'adventure', name: '冒险' },
    { id: 'arcade', name: '街机' },
    { id: 'io', name: 'IO' },
    { id: 'multiplayer', name: '多人' },
    { id: 'puzzle', name: '解谜' },
    { id: 'racing', name: '赛车' },
    { id: 'sports', name: '体育' },
    { id: 'shooting', name: '射击' },
    { id: 'strategy', name: '策略' },
    // 添加新分类
    { id: '2player', name: '双人' },
    { id: 'basketball', name: '篮球' },
    { id: 'beauty', name: '美容' },
    { id: 'bike', name: '自行车' },
    { id: 'car', name: '汽车' },
    { id: 'card', name: '卡牌' },
    { id: 'casual', name: '休闲' },
    { id: 'clicker', name: '点击' },
    { id: 'controller', name: '控制器' },
    { id: 'dressup', name: '装扮' },
    { id: 'driving', name: '驾驶' },
    { id: 'escape', name: '逃脱' },
    { id: 'flash', name: 'Flash' },
    { id: 'fps', name: '第一人称射击' },
    { id: 'horror', name: '恐怖' },
    { id: 'mahjong', name: '麻将' },
    { id: 'minecraft', name: '我的世界' },
    { id: 'pool', name: '台球' },
    { id: 'soccer', name: '足球' },
    { id: 'stickman', name: '火柴人' },
    { id: 'tower-defense', name: '塔防' }
  ];
  
  // 初始化时从games.json加载已有游戏数据
  useEffect(() => {
    // 将games.json中的游戏数据添加到addedGames中
    setAddedGames(gamesData);
  }, []);

  // 检查标题是否重复
  useEffect(() => {
    if (gameTitle) {
      const titleDuplicate = addedGames.find(game => 
        game.title.toLowerCase() === gameTitle.toLowerCase()
      );
      if (titleDuplicate) {
        setTitleError(`标题重复: "${gameTitle}" 已存在于games.json中！`);
      } else {
        setTitleError('');
      }
      
      // 自动生成英文SEO标题
      const categoryEnglishName = getCategoryEnglishName(category);
      const seoTitleText = `Play ${gameTitle} Online - Free ${categoryEnglishName} Game | Nalakubara`;
      setSeoTitle(seoTitleText);
    } else {
      setTitleError('');
    }
  }, [gameTitle, addedGames, category]);

  // 获取分类的英文名称
  const getCategoryEnglishName = (categoryId) => {
    const categoryMap = {
      'action': 'Action',
      'adventure': 'Adventure',
      'arcade': 'Arcade',
      'io': 'IO',
      'multiplayer': 'Multiplayer',
      'puzzle': 'Puzzle',
      'racing': 'Racing',
      'sports': 'Sports',
      'shooting': 'Shooting',
      'strategy': 'Strategy',
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
      'tower-defense': 'Tower Defense'
    };
    
    return categoryMap[categoryId] || 'Game';
  };

  // 其他现有的useEffect保持不变
  // ...

  // 生成游戏JSON
  const generateGameJson = () => {
    if (!gameTitle || !gameDescription || !gameUrl || !thumbnailUrl) {
      setError('请填写游戏标题、描述、URL和图片URL');
      return;
    }
  
    // 检查重复
    if (checkDuplicate()) {
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const gameData = {
        id: generateUniqueId(),
        title: gameTitle,
        description: gameDescription,
        instructions: gameInstructions || '使用WASD或箭头键移动，空格键开始游戏',
        category: category,
        imageUrl: thumbnailUrl,
        gameUrl: gameUrl,
        embedUrl: gameUrl,
        isFeatured: isFeatured,
        isPopular: isPopular,
        isNew: true,
        rating: rating,
        playCount: playCount,
        addedDate: new Date().toISOString().split('T')[0],
        seoTitle: seoTitle // 添加SEO标题字段
      };
  
      // 添加到已添加游戏列表中
      setAddedGames(prevGames => [...prevGames, gameData]);
  
      // 添加到现有JSON输出
      const newJsonOutput = jsonOutput 
        ? jsonOutput + ',\n' + JSON.stringify(gameData, null, 2)
        : JSON.stringify(gameData, null, 2);
      
      setJsonOutput(newJsonOutput);
      
      // 重置表单但保留JSON输出
      setGameTitle('');
      setGameDescription('');
      setGameInstructions('');
      setGameUrl('');
      setThumbnailUrl('');
      setSeoTitle(''); // 重置SEO标题
      
      // 生成新的随机评分和游玩次数
      setRating((4 + Math.random()).toFixed(1));
      setPlayCount(Math.floor(100 + Math.random() * 9900));
    } catch (err) {
      setError('生成JSON失败: ' + err.message);
    }
  
    setLoading(false);
  };
  
  // 其他现有函数保持不变
  // ...
  
  return (
    <div className="add-game-page">
      <div className="game-input-section">
        <h2>输入游戏信息</h2>
        <div className="game-form">
          {/* 现有表单字段 */}
          <div className="form-group">
            <label>游戏图片URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="游戏缩略图URL"
              className={imageError ? 'input-error' : ''}
            />
            {imageError && <div className="field-error-message">{imageError}</div>}
          </div>
          
          <div className="form-group">
            <label>游戏URL</label>
            <input
              type="text"
              value={gameUrl}
              onChange={handleGameUrlChange}
              placeholder="粘贴游戏URL或iframe代码"
              className={urlError ? 'input-error' : ''}
            />
            {urlError && <div className="field-error-message">{urlError}</div>}
          </div>
          
          <div className="form-group">
            <label>游戏标题</label>
            <input
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              placeholder="输入游戏名称"
              className={titleError ? 'input-error' : ''}
            />
            {titleError && <div className="field-error-message">{titleError}</div>}
          </div>
          
          {/* 添加SEO标题字段 */}
          <div className="form-group">
            <label>SEO标题 (用于搜索引擎优化)</label>
            <input
              type="text"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="SEO标题，例如：Play Game Name Online - Free Game | Nalakubara"
            />
            <small className="form-text">系统已自动生成英文SEO标题，您可以手动修改</small>
          </div>
          
          {/* 其余表单字段保持不变 */}
          <div className="form-group">
            <label>游戏描述</label>
            <textarea
              value={gameDescription}
              onChange={(e) => setGameDescription(e.target.value)}
              placeholder="描述这个游戏..."
              rows="4"
            />
          </div>
          
          {/* 其他表单字段... */}
          
          <button 
            onClick={generateGameJson} 
            className="generate-button"
            disabled={loading || titleError || urlError || imageError}
          >
            {loading ? '处理中...' : '添加游戏'}
          </button>
          
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
      
      <div className="json-output-section">
        <h2>批量游戏JSON</h2>
        {jsonOutput && (
          <div className="json-output">
            <pre>{jsonOutput}</pre>
            <div className="json-actions">
              <button onClick={copyJsonToClipboard} className="copy-button">
                复制JSON代码
              </button>
              <button onClick={clearJsonOutput} className="clear-button">
                清空
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGamePage;