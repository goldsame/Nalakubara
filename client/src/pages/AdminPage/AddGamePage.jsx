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
  // 添加新的状态变量
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  // 添加存储已添加游戏信息的状态
  const [addedGames, setAddedGames] = useState([]);
  // 添加重复检测提示状态
  const [titleError, setTitleError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [imageError, setImageError] = useState('');
  // 添加SEO标题状态
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

  // 检查游戏URL是否重复
  useEffect(() => {
    if (gameUrl) {
      const urlDuplicate = addedGames.find(game => 
        game.gameUrl === gameUrl || game.embedUrl === gameUrl
      );
      if (urlDuplicate) {
        setUrlError(`URL重复: "${gameUrl}" 已存在于games.json中！`);
      } else {
        setUrlError('');
      }
    } else {
      setUrlError('');
    }
  }, [gameUrl, addedGames]);

  // 检查图片URL是否重复
  useEffect(() => {
    if (thumbnailUrl) {
      const imageDuplicate = addedGames.find(game => 
        game.imageUrl === thumbnailUrl
      );
      if (imageDuplicate) {
        setImageError(`图片URL重复: "${thumbnailUrl}" 已存在于games.json中！`);
      } else {
        setImageError('');
      }
    } else {
      setImageError('');
    }
  }, [thumbnailUrl, addedGames]);

  // 更新自动判断分类的逻辑
  useEffect(() => {
    if (gameTitle || gameDescription) {
      // 根据标题和描述自动判断游戏分类
      const titleAndDesc = (gameTitle + ' ' + gameDescription).toLowerCase();
      
      // 定义关键词与分类的映射
      const keywordMap = {
        'action': ['action', 'fight', 'battle', '动作', '战斗'],
        'adventure': ['adventure', 'explore', '冒险', '探索'],
        'arcade': ['arcade', '街机'],
        'io': ['io', '.io'],
        'multiplayer': ['multiplayer', 'multi player', '多人'],
        'puzzle': ['puzzle', 'brain', '解谜', '益智'],
        'racing': ['racing', 'race', 'car', 'drive', '赛车', '驾驶'],
        'sports': ['sports', 'sport', 'ball', '体育', '运动'],
        'shooting': ['shooting', 'shoot', 'gun', '射击'],
        'strategy': ['strategy', 'tower', 'defense', '策略', '塔防'],
        '2player': ['2 player', 'two player', '双人'],
        'basketball': ['basketball', '篮球'],
        'beauty': ['beauty', 'makeup', 'dress', '美容', '化妆'],
        'bike': ['bike', 'bicycle', '自行车'],
        'car': ['car', 'vehicle', '汽车'],
        'card': ['card', 'cards', '卡牌'],
        'casual': ['casual', '休闲'],
        'clicker': ['clicker', 'click', '点击'],
        'controller': ['controller', 'control', '控制'],
        'dressup': ['dress up', 'dressup', '装扮'],
        'driving': ['driving', 'drive', '驾驶'],
        'escape': ['escape', 'room', '逃脱', '密室'],
        'flash': ['flash'],
        'fps': ['fps', 'first person', '第一人称'],
        'horror': ['horror', 'scary', 'zombie', '恐怖', '僵尸'],
        'mahjong': ['mahjong', '麻将'],
        'minecraft': ['minecraft', 'mine', 'craft', '我的世界', '挖矿'],
        'pool': ['pool', 'billiards', '台球', '桌球'],
        'soccer': ['soccer', 'football', '足球'],
        'stickman': ['stickman', 'stick', '火柴人'],
        'tower-defense': ['tower defense', 'tower-defense', '塔防']
      };
      
      // 检查标题和描述中是否包含关键词
      for (const [categoryId, keywords] of Object.entries(keywordMap)) {
        if (keywords.some(keyword => titleAndDesc.includes(keyword))) {
          setCategory(categoryId);
          break;
        }
      }
    }
  }, [gameTitle, gameDescription]);

  // 生成随机评分和游玩次数 - 只在标题首次输入时生成
  useEffect(() => {
    if (gameTitle && !rating) {
      // 生成4.0-5.0之间的随机评分
      setRating((4 + Math.random()).toFixed(1));
    }
    
    if (gameTitle && !playCount) {
      // 生成100-10000之间的随机游玩次数
      setPlayCount(Math.floor(100 + Math.random() * 9900));
    }
  }, [gameTitle, rating, playCount]);

  // 从iframe中提取游戏URL
  const extractGameUrl = (input) => {
    const srcMatch = input.match(/src=["'](.*?)["']/);
    return srcMatch ? srcMatch[1] : input;
  };
  
  // 处理游戏URL输入变化
  const handleGameUrlChange = (e) => {
    const input = e.target.value;
    if (input.includes('<iframe')) {
      setGameUrl(extractGameUrl(input));
    } else {
      setGameUrl(input);
    }
  };
  
  // 生成唯一ID
  const generateUniqueId = () => {
    return 'game_' + Math.random().toString(36).substr(2, 9);
  };
  
  // 检查游戏是否重复
  const checkDuplicate = () => {
    if (titleError || urlError || imageError) {
      setError('请修复表单中的错误后再添加游戏');
      return true;
    }
    return false;
  };
  
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
      setCategory('action');
      setIsFeatured(false);
      setIsPopular(false);
      setSeoTitle(''); // 重置SEO标题
      
      // 生成新的随机评分和游玩次数
      setRating((4 + Math.random()).toFixed(1));
      setPlayCount(Math.floor(100 + Math.random() * 9900));
    } catch (err) {
      setError('生成JSON失败: ' + err.message);
    }
  
    setLoading(false);
  };
  
  // 复制JSON到剪贴板
  const copyJsonToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput)
      .then(() => {
        alert('JSON已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败: ', err);
        alert('复制失败，请手动复制');
      });
  };
  
  // 清空JSON输出
  const clearJsonOutput = () => {
    setJsonOutput('');
  };
  
  return (
    <div className="add-game-page">
      <div className="game-input-section">
        <h2>输入游戏信息</h2>
        <div className="game-form">
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
          
          <div className="form-group">
            <label>游戏描述</label>
            <textarea
              value={gameDescription}
              onChange={(e) => setGameDescription(e.target.value)}
              placeholder="描述这个游戏..."
              rows="4"
            />
          </div>
          
          <div className="form-group">
            <label>游戏指南</label>
            <textarea
              value={gameInstructions}
              onChange={(e) => setGameInstructions(e.target.value)}
              placeholder="如何玩这个游戏..."
              rows="2"
            />
          </div>
          
          <div className="form-group">
            <label>游戏分类</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>评分 (4.0-5.0)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              step="0.1"
              min="4.0"
              max="5.0"
            />
          </div>
          
          <div className="form-group">
            <label>游玩次数</label>
            <input
              type="number"
              value={playCount}
              onChange={(e) => setPlayCount(e.target.value)}
              min="100"
            />
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              设为推荐游戏
            </label>
          </div>
          
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={isPopular}
                onChange={(e) => setIsPopular(e.target.checked)}
              />
              设为热门游戏
            </label>
          </div>
          
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