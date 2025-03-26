import React, { useState, useEffect } from 'react';
import './AddGamePage.css';

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

  // 游戏分类列表 - 使用中文名称
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
    { id: 'strategy', name: '策略' }
  ];

  // 根据游戏标题和描述自动判断分类
  useEffect(() => {
    if (gameTitle && gameDescription) {
      const text = (gameTitle + ' ' + gameDescription).toLowerCase();
      
      if (text.includes('射击') || text.includes('枪') || text.includes('shoot')) {
        setCategory('shooting');
      } else if (text.includes('赛车') || text.includes('驾驶') || text.includes('racing') || text.includes('car')) {
        setCategory('racing');
      } else if (text.includes('解谜') || text.includes('puzzle') || text.includes('谜题')) {
        setCategory('puzzle');
      } else if (text.includes('冒险') || text.includes('adventure')) {
        setCategory('adventure');
      } else if (text.includes('策略') || text.includes('strategy')) {
        setCategory('strategy');
      } else if (text.includes('多人') || text.includes('multiplayer') || text.includes('pvp')) {
        setCategory('multiplayer');
      } else if (text.includes('io') || text.includes('.io')) {
        setCategory('io');
      } else if (text.includes('运动') || text.includes('sports')) {
        setCategory('sports');
      } else if (text.includes('街机') || text.includes('arcade')) {
        setCategory('arcade');
      } else {
        setCategory('action'); // 默认分类
      }
    }
  }, [gameTitle, gameDescription]);

  // 生成随机评分和游玩次数
  useEffect(() => {
    if (gameTitle) {
      // 生成4.0-5.0之间的随机评分
      const randomRating = (4 + Math.random()).toFixed(1);
      setRating(randomRating);
      
      // 生成100以上的随机游玩次数
      const randomPlayCount = Math.floor(100 + Math.random() * 9900);
      setPlayCount(randomPlayCount);
    }
  }, [gameTitle]);

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

  // 生成游戏JSON
  const generateGameJson = () => {
    if (!gameTitle || !gameDescription || !gameUrl || !thumbnailUrl) {
      setError('请填写游戏标题、描述、URL和图片URL');
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
        addedDate: new Date().toISOString().split('T')[0]
      };

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
  };

  return (
    <div className="add-game-page">
      <div className="game-input-section">
        <h2>输入游戏信息</h2>
        <div className="game-form">
          <div className="form-group">
            <label>游戏标题</label>
            <input
              type="text"
              value={gameTitle}
              onChange={(e) => setGameTitle(e.target.value)}
              placeholder="输入游戏名称"
            />
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
            <label>游戏URL</label>
            <input
              type="text"
              value={gameUrl}
              onChange={handleGameUrlChange}
              placeholder="粘贴游戏URL或iframe代码"
            />
          </div>
          
          <div className="form-group">
            <label>游戏图片URL</label>
            <input
              type="text"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="游戏缩略图URL"
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
          
          {/* 添加精选和热门选项 */}
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
            disabled={loading}
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