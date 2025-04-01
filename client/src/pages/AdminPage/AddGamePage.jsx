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
        setUrlError(`游戏URL重复: "${gameUrl}" 已存在于games.json中！`);
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
        setImageError(`游戏图片URL重复: "${thumbnailUrl}" 已存在于games.json中！`);
      } else {
        setImageError('');
      }
    } else {
      setImageError('');
    }
  }, [thumbnailUrl, addedGames]);

  // 更新自动判断分类的逻辑
  useEffect(() => {
    if (gameTitle && gameDescription) {
      const title = gameTitle.toLowerCase();
      const description = gameDescription.toLowerCase();
      const text = title + ' ' + description;
      
      // 创建分类得分系统
      let scores = {};
      
      // 初始化所有分类得分为0
      categories.forEach(cat => {
        scores[cat.id] = 0;
      });
      
      // 关键词映射表 - 每个分类的相关关键词及其权重
      const categoryKeywords = {
        'action': {
          keywords: ['action', 'fight', 'combat', 'battle', 'warrior', 'ninja', 'soldier', '动作', '战斗', '格斗', '武士'],
          titleWeight: 8,
          descWeight: 4
        },
        'adventure': {
          keywords: ['adventure', 'explore', 'journey', 'quest', 'discover', 'story', '冒险', '探索', '旅程', '任务', '发现'],
          titleWeight: 7,
          descWeight: 4
        },
        'arcade': {
          keywords: ['arcade', 'classic', 'retro', '街机', '经典', '复古'],
          titleWeight: 7,
          descWeight: 3
        },
        'io': {
          keywords: ['io', '.io', 'multiplayer arena', 'grow and survive'],
          titleWeight: 10,
          descWeight: 5
        },
        'multiplayer': {
          keywords: ['multiplayer', 'online', 'pvp', 'versus', 'team', 'coop', 'cooperative', '多人', '在线', '团队', '合作'],
          titleWeight: 8,
          descWeight: 4
        },
        'puzzle': {
          keywords: ['puzzle', 'solve', 'logic', 'brain', 'match', 'matching', 'connect', 'block', '解谜', '逻辑', '脑力', '匹配', '连接', '方块'],
          titleWeight: 8,
          descWeight: 4
        },
        'racing': {
          keywords: ['racing', 'race', 'speed', 'fast', 'car', 'vehicle', 'drive', 'driving', 'drift', '赛车', '竞速', '速度', '汽车', '驾驶', '漂移'],
          titleWeight: 9,
          descWeight: 4
        },
        'sports': {
          keywords: ['sports', 'athletic', 'olympics', 'competition', 'tournament', '体育', '运动', '奥运', '比赛', '锦标赛'],
          titleWeight: 7,
          descWeight: 3
        },
        'shooting': {
          keywords: ['shooting', 'shooter', 'gun', 'sniper', 'aim', 'target', 'fire', '射击', '枪', '狙击', '瞄准', '目标', '开火'],
          titleWeight: 9,
          descWeight: 4
        },
        'strategy': {
          keywords: ['strategy', 'tactical', 'command', 'plan', 'build', 'manage', 'resource', 'defense', '策略', '战术', '指挥', '计划', '建造', '管理', '资源', '防御'],
          titleWeight: 8,
          descWeight: 4
        },
        '2player': {
          keywords: ['2 player', 'two player', '2p', 'versus', 'dual', 'duel', '双人', '对战', '双打'],
          titleWeight: 9,
          descWeight: 4
        },
        'basketball': {
          keywords: ['basketball', 'nba', 'hoop', 'dunk', 'ball', '篮球', '投篮', '扣篮'],
          titleWeight: 10,
          descWeight: 5
        },
        'beauty': {
          keywords: ['beauty', 'makeup', 'fashion', 'dress', 'style', 'salon', '美容', '化妆', '时尚', '装扮', '风格', '沙龙'],
          titleWeight: 10,
          descWeight: 5
        },
        'bike': {
          keywords: ['bike', 'bicycle', 'cycling', 'bmx', 'mountain bike', '自行车', '单车', '骑行', '山地车'],
          titleWeight: 10,
          descWeight: 5
        },
        'car': {
          keywords: ['car', 'vehicle', 'automobile', 'parking', 'garage', '汽车', '车辆', '停车', '车库'],
          titleWeight: 8,
          descWeight: 4
        },
        'card': {
          keywords: ['card', 'cards', 'deck', 'poker', 'solitaire', 'blackjack', '卡牌', '纸牌', '扑克', '接龙', '二十一点'],
          titleWeight: 9,
          descWeight: 4
        },
        'casual': {
          keywords: ['casual', 'simple', 'easy', 'relax', 'idle', '休闲', '简单', '轻松', '放置'],
          titleWeight: 6,
          descWeight: 3
        },
        'clicker': {
          keywords: ['clicker', 'click', 'tap', 'idle', 'incremental', '点击', '敲击', '放置', '增量'],
          titleWeight: 9,
          descWeight: 4
        },
        'controller': {
          keywords: ['controller', 'gamepad', 'joystick', '控制器', '手柄', '摇杆'],
          titleWeight: 8,
          descWeight: 4
        },
        'dressup': {
          keywords: ['dress up', 'dressup', 'fashion', 'clothes', 'outfit', 'style', 'makeover', '装扮', '时装', '服装', '造型', '改造'],
          titleWeight: 10,
          descWeight: 5
        },
        'driving': {
          keywords: ['driving', 'driver', 'road', 'traffic', 'highway', 'truck', 'bus', '驾驶', '司机', '道路', '交通', '高速', '卡车', '巴士'],
          titleWeight: 9,
          descWeight: 4
        },
        'escape': {
          keywords: ['escape', 'room', 'exit', 'find', 'hidden', 'mystery', 'puzzle', '逃脱', '密室', '出口', '寻找', '隐藏', '神秘', '谜题'],
          titleWeight: 9,
          descWeight: 4
        },
        'flash': {
          keywords: ['flash', 'swf', 'adobe', '闪客'],
          titleWeight: 10,
          descWeight: 5
        },
        'fps': {
          keywords: ['fps', 'first person shooter', 'first-person', '第一人称射击', '第一人称', '枪战'],
          titleWeight: 10,
          descWeight: 5
        },
        'horror': {
          keywords: ['horror', 'scary', 'fear', 'terror', 'dark', 'zombie', 'monster', 'survival', '恐怖', '可怕', '恐惧', '黑暗', '僵尸', '怪物', '生存'],
          titleWeight: 9,
          descWeight: 4
        },
        'mahjong': {
          keywords: ['mahjong', 'mah jong', 'mahjongg', 'tiles', 'match', 'pair', 'solitaire', '麻将', '麻雀', '牌', '配对', '连连看'],
          titleWeight: 10,
          descWeight: 5
        },
        'minecraft': {
          keywords: ['minecraft', 'mine', 'craft', 'block', 'pixel', 'sandbox', 'build', 'voxel', '我的世界', '挖矿', '像素', '沙盒', '建造', '方块'],
          titleWeight: 10,
          descWeight: 5
        },
        'pool': {
          keywords: ['pool', 'billiard', 'billiards', 'snooker', '8 ball', '9 ball', 'cue', '台球', '桌球', '斯诺克', '8球', '9球', '球杆'],
          titleWeight: 9,
          descWeight: 4
        },
        'soccer': {
          keywords: ['soccer', 'football', 'goal', 'kick', 'fifa', 'world cup', '足球', '进球', '踢', '世界杯'],
          titleWeight: 9,
          descWeight: 4
        },
        'stickman': {
          keywords: ['stickman', 'stick figure', 'stick man', '火柴人', '棍棒人'],
          titleWeight: 10,
          descWeight: 5
        },
        'tower-defense': {
          keywords: ['tower defense', 'tower-defense', 'td', 'defend', 'wave', 'enemy', '塔防', '防御', '波次', '敌人'],
          titleWeight: 10,
          descWeight: 5
        }
      };
      
      // 计算每个分类的得分
      for (const [category, data] of Object.entries(categoryKeywords)) {
        // 检查标题中的关键词
        for (const keyword of data.keywords) {
          if (title.includes(keyword)) {
            scores[category] += data.titleWeight;
          }
        }
        
        // 检查描述中的关键词
        for (const keyword of data.keywords) {
          if (description.includes(keyword)) {
            scores[category] += data.descWeight;
          }
        }
        
        // 特殊情况处理
        // 1. 标题和描述都包含同一个关键词，额外加分
        for (const keyword of data.keywords) {
          if (title.includes(keyword) && description.includes(keyword)) {
            scores[category] += 3;
          }
        }
      }
      
      // 上下文分析 - 根据游戏描述的上下文给予额外分数
      
      // 解谜游戏上下文
      if ((text.includes('match') && text.includes('three')) || 
          (text.includes('match') && text.includes('color')) ||
          (text.includes('连接') && text.includes('相同')) ||
          (text.includes('消除') && text.includes('方块'))) {
        scores['puzzle'] += 5;
      }
      
      // 麻将游戏上下文
      if ((text.includes('tiles') && text.includes('match')) ||
          (text.includes('tiles') && text.includes('pair')) ||
          (text.includes('mahjong') && text.includes('solitaire'))) {
        scores['mahjong'] += 5;
      }
      
      // 赛车游戏上下文
      if ((text.includes('race') && text.includes('track')) ||
          (text.includes('speed') && text.includes('car')) ||
          (text.includes('drift') && text.includes('vehicle'))) {
        scores['racing'] += 5;
      }
      
      // 射击游戏上下文
      if ((text.includes('aim') && text.includes('shoot')) ||
          (text.includes('gun') && text.includes('enemy')) ||
          (text.includes('target') && text.includes('fire'))) {
        scores['shooting'] += 5;
      }
      
      // 找出得分最高的分类
      let highestScore = 0;
      let bestCategory = 'action'; // 默认分类
      
      for (const [cat, score] of Object.entries(scores)) {
        if (score > highestScore) {
          highestScore = score;
          bestCategory = cat;
        }
      }
      
      // 如果没有任何分类得分，使用默认分类
      setCategory(highestScore > 0 ? bestCategory : 'action');
    }
  }, [gameTitle, gameDescription, categories]);

  // 生成随机评分和游玩次数 - 只在标题首次输入时生成
  useEffect(() => {
    if (gameTitle && !rating) {
      // 生成4.0-5.0之间的随机评分
      const randomRating = (4 + Math.random()).toFixed(1);
      setRating(randomRating);
    }
    
    if (gameTitle && !playCount) {
      // 生成100以上的随机游玩次数
      const randomPlayCount = Math.floor(100 + Math.random() * 9900);
      setPlayCount(randomPlayCount);
    }
  }, [gameTitle, rating, playCount]);

  // 从iframe中提取游戏URL
  const extractGameUrl = (input) => {
    if (input.includes('<iframe')) {
      const srcMatch = input.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1]) {
        return srcMatch[1];
      }
    }
    return input;
  };
  
  // 处理游戏URL输入变化
  const handleGameUrlChange = (e) => {
    const input = e.target.value;
    const extractedUrl = extractGameUrl(input);
    setGameUrl(extractedUrl);
    
    // 不再自动生成缩略图URL
  };
  
  // 生成唯一ID
  const generateUniqueId = () => {
    return 'game_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
  };
  
  // 检查游戏是否重复
  const checkDuplicate = () => {
    // 检查标题重复
    const titleDuplicate = addedGames.find(game => 
      game.title.toLowerCase() === gameTitle.toLowerCase()
    );
    if (titleDuplicate) {
      alert(`标题重复: "${gameTitle}" 已存在于games.json中！`);
      return true;
    }
  
    // 检查游戏URL重复
    const urlDuplicate = addedGames.find(game => 
      game.gameUrl === gameUrl || game.embedUrl === gameUrl
    );
    if (urlDuplicate) {
      alert(`游戏URL重复: "${gameUrl}" 已存在于games.json中！`);
      return true;
    }
  
    // 检查图片URL重复
    const imageDuplicate = addedGames.find(game => 
      game.imageUrl === thumbnailUrl
    );
    if (imageDuplicate) {
      alert(`游戏图片URL重复: "${thumbnailUrl}" 已存在于games.json中！`);
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
    navigator.clipboard.writeText(jsonOutput).then(() => {
      alert('JSON代码已复制到剪贴板');
    }, (err) => {
      console.error('无法复制: ', err);
    });
  };
  
  // 清空JSON输出
  const clearJsonOutput = () => {
    setJsonOutput('');
    // 不清空addedGames，因为它包含games.json中的数据
  };
  
  return (
    <div className="add-game-page">
      <div className="game-input-section">
        <h2>输入游戏信息</h2>
        <div className="game-form">
          {/* 表单内容保持不变 */}
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
            <label>游戏操作说明</label>
            <textarea
              value={gameInstructions}
              onChange={(e) => setGameInstructions(e.target.value)}
              placeholder="例如: 使用WASD或箭头键移动，空格键开始游戏"
              rows="3"
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
            <small className="form-text">系统已自动识别分类，您可以手动修改</small>
          </div>
          
          {/* 添加游戏评分输入框 */}
          <div className="form-group">
            <label>游戏评分 (4.0-5.0)</label>
            <input
              type="number"
              min="4.0"
              max="5.0"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              placeholder="游戏评分"
            />
            <small className="form-text">系统已随机生成评分，您可以手动修改</small>
          </div>
          
          {/* 添加游玩次数输入框 */}
          <div className="form-group">
            <label>游玩次数</label>
            <input
              type="number"
              min="0"
              value={playCount}
              onChange={(e) => setPlayCount(e.target.value)}
              placeholder="游玩次数"
            />
            <small className="form-text">系统已随机生成游玩次数，您可以手动修改</small>
          </div>
          
          <div className="form-group checkbox-group">
            <label>游戏特性</label>
            <div className="checkbox-container">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                />
                精选游戏
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                />
                热门游戏
              </label>
            </div>
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