import React, { useState } from 'react';
import './AddGamePage.css';

const AddGamePage = () => {
  // 游戏表单状态
  const [gameForm, setGameForm] = useState({
    id: '',
    title: '',
    description: '',
    instructions: '',
    category: 'action',
    tags: [],
    imageUrl: '',
    gameUrl: '',
    isFeatured: false,
    isPopular: false,
    isNew: true,
    rating: 4.0,
    plays: 0
  });

  // 批量JSON状态
  const [bulkJson, setBulkJson] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  // 自动识别游戏分类的函数
  const detectGameCategory = (title, description = '') => {
    const text = (title + ' ' + description).toLowerCase();
    
    // 分类关键词映射
    const categoryKeywords = {
      'action': ['动作', '射击', '格斗', 'action', 'shooting', 'fight', '战斗', '枪', 'gun'],
      'adventure': ['冒险', '探索', 'adventure', 'explore', 'quest', '任务', '旅程'],
      'arcade': ['街机', '经典', 'arcade', 'classic', 'retro', '复古', '老式'],
      'io': ['io', '多人在线', 'multiplayer online', '竞技场', 'arena'],
      'multiplayer': ['多人', '合作', 'multiplayer', 'coop', 'cooperative', '团队', 'team'],
      'puzzle': ['益智', '解谜', '谜题', 'puzzle', 'brain', '脑力', '思维', '逻辑'],
      'racing': ['赛车', '竞速', '驾驶', 'racing', 'drive', 'car', 'speed', '速度', '车'],
      'sports': ['体育', '运动', '足球', '篮球', 'sports', 'football', 'basketball', 'soccer'],
      'shooting': ['射击', '枪战', 'shooting', 'gun', 'sniper', '狙击', '射手'],
      'strategy': ['策略', '塔防', '防御', '建造', 'strategy', 'tower defense', 'build', '战略']
    };
    
    // 计算每个分类的匹配分数
    const scores = {};
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      scores[category] = keywords.reduce((score, keyword) => {
        return score + (text.includes(keyword) ? 1 : 0);
      }, 0);
    }
    
    // 找出得分最高的分类
    let bestCategory = 'action'; // 默认分类
    let highestScore = 0;
    
    for (const [category, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        bestCategory = category;
      }
    }
    
    return bestCategory;
  };

  // 处理表单输入变化并自动检测分类
  const handleInputChangeWithCategoryDetection = (e) => {
    const { name, value, type, checked } = e.target;
    
    setGameForm(prev => {
      const newForm = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // 如果标题或描述发生变化，尝试自动检测分类
      if ((name === 'title' || name === 'description') && value) {
        newForm.category = detectGameCategory(
          name === 'title' ? value : newForm.title, 
          name === 'description' ? value : newForm.description
        );
      }
      
      return newForm;
    });
  };

  // 将中文标点符号转换为英文标点符号
  const convertChinesePunctuationToEnglish = (text) => {
    if (!text) return text;
    return text
      .replace(/\uff0c/g, ',')  // 中文逗号
      .replace(/\u3002/g, '.')  // 中文句号
      .replace(/\uff1a/g, ':')  // 中文冒号
      .replace(/\uff1b/g, ';')  // 中文分号
      .replace(/\uff01/g, '!')  // 中文感叹号
      .replace(/\uff1f/g, '?')  // 中文问号
      .replace(/\uff08/g, '(')  // 中文左括号
      .replace(/\uff09/g, ')')  // 中文右括号
      .replace(/\u3010/g, '[')  // 中文左方括号
      .replace(/\u3011/g, ']')  // 中文右方括号
      .replace(/\u300c/g, '"')  // 中文左引号
      .replace(/\u300d/g, '"')  // 中文右引号
      .replace(/\u201c/g, '"')  // 中文左双引号
      .replace(/\u201d/g, '"')  // 中文右双引号
      .replace(/\u2018/g, "'")  // 中文左单引号
      .replace(/\u2019/g, "'")  // 中文右单引号
      .replace(/\u3001/g, ','); // 中文顿号
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // 生成唯一ID（如果没有提供）
      const gameId = gameForm.id || gameForm.title.toLowerCase().replace(/\s+/g, '-');
      
      // 生成随机评分 (4.0-5.0)
      const randomRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
      
      // 生成随机游玩次数 (100-100000)
      const randomPlays = Math.floor(Math.random() * 99900) + 100;
      
      // 转换所有文本字段中的中文标点符号
      const gameData = {
        ...gameForm,
        id: gameId,
        title: convertChinesePunctuationToEnglish(gameForm.title),
        description: convertChinesePunctuationToEnglish(gameForm.description),
        instructions: convertChinesePunctuationToEnglish(gameForm.instructions),
        rating: parseFloat(randomRating),
        plays: randomPlays,
        tags: gameForm.tags.map(tag => convertChinesePunctuationToEnglish(tag))
      };
      
      // 这里应该有保存游戏数据的逻辑
      console.log('游戏数据已提交:', gameData);
      
      // 生成游戏对象的JSON
      const gameJson = JSON.stringify(gameData, null, 2);
      
      // 将新游戏数据添加到批量JSON中
      if (bulkJson.trim()) {
        // 简单地添加到现有内容后面，不尝试解析或修改结构
        setBulkJson(bulkJson + ',\n' + gameJson);
      } else {
        setBulkJson(gameJson);
      }
      
      // 显示成功消息
      setMessage({ type: 'success', text: '游戏数据已添加' });
    } catch (error) {
      setMessage({ type: 'error', text: `添加游戏失败: ${error.message}` });
    }
  };
  // 复制JSON到剪贴板
  const handleCopyJson = () => {
    navigator.clipboard.writeText(bulkJson)
      .then(() => setMessage({ type: 'success', text: 'JSON已复制到剪贴板' }))
      .catch(err => setMessage({ type: 'error', text: `复制失败: ${err.message}` }));
  };

  // 清空JSON
  const handleClearJson = () => {
    setBulkJson('');
    setMessage({ type: 'success', text: 'JSON已清空' });
  };

  // 生成示例JSON模板
  const generateTemplate = () => {
    // 生成随机评分 (4.0-5.0)
    const randomRating = (Math.random() * (5.0 - 4.0) + 4.0).toFixed(1);
    
    // 生成随机游玩次数 (100-100000)
    const randomPlays = Math.floor(Math.random() * 99900) + 100;
    
    const template = {
      "id": "game-id-example",
      "title": "游戏标题",
      "description": "游戏描述内容...",
      "instructions": "游戏操作说明...",
      "category": "action", // 使用英文分类名: action, adventure, arcade, io, multiplayer, puzzle, racing, sports, shooting, strategy
      "tags": ["标签1", "标签2", "标签3"],
      "imageUrl": "https://example.com/game-image.jpg",
      "gameUrl": "https://example.com/embed/game",
      "isFeatured": false,
      "isPopular": false,
      "isNew": true,
      "rating": parseFloat(randomRating),
      "plays": randomPlays
    };
    
    setBulkJson(JSON.stringify(template, null, 2));
  };

  return (
    <div className="add-game-page">
      <h1>添加游戏</h1>
      
      <div className="add-game-container">
        {/* 单个游戏添加表单 */}
        <section className="add-game-section">
          <h2>输入游戏信息</h2>
          <form className="add-game-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">游戏标题</label>
              <input
                type="text"
                id="title"
                name="title"
                value={gameForm.title}
                onChange={handleInputChangeWithCategoryDetection}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">游戏描述</label>
              <textarea
                id="description"
                name="description"
                value={gameForm.description}
                onChange={handleInputChangeWithCategoryDetection}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="instructions">游戏操作说明</label>
              <textarea
                id="instructions"
                name="instructions"
                value={gameForm.instructions}
                onChange={handleInputChangeWithCategoryDetection}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="category">游戏分类 (自动检测)</label>
              <select
                id="category"
                name="category"
                value={gameForm.category}
                onChange={handleInputChangeWithCategoryDetection}
                required
              >
                <option value="action">动作</option>
                <option value="adventure">冒险</option>
                <option value="arcade">街机</option>
                <option value="io">IO游戏</option>
                <option value="multiplayer">多人</option>
                <option value="puzzle">益智</option>
                <option value="racing">赛车</option>
                <option value="sports">体育</option>
                <option value="shooting">射击</option>
                <option value="strategy">策略</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="imageUrl">游戏图片URL</label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={gameForm.imageUrl}
                onChange={handleInputChangeWithCategoryDetection}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="gameUrl">游戏URL</label>
              <input
                type="url"
                id="gameUrl"
                name="gameUrl"
                value={gameForm.gameUrl}
                onChange={handleInputChangeWithCategoryDetection}
                required
              />
            </div>
            
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={gameForm.isFeatured}
                  onChange={handleInputChangeWithCategoryDetection}
                />
                <label htmlFor="isFeatured">精选游戏</label>
              </div>
              
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="isPopular"
                  name="isPopular"
                  checked={gameForm.isPopular}
                  onChange={handleInputChangeWithCategoryDetection}
                />
                <label htmlFor="isPopular">热门游戏</label>
              </div>
              
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={gameForm.isNew}
                  onChange={handleInputChangeWithCategoryDetection}
                />
                <label htmlFor="isNew">新游戏</label>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="rating">评分 (1-5)</label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={gameForm.rating}
                onChange={handleInputChangeWithCategoryDetection}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="plays">游玩次数</label>
              <input
                type="number"
                id="plays"
                name="plays"
                min="0"
                value={gameForm.plays}
                onChange={handleInputChangeWithCategoryDetection}
              />
            </div>
            
            <button type="submit" className="submit-button">添加游戏</button>
          </form>
        </section>
        
        {/* 批量JSON区域 */}
        <section className="add-game-section">
          <h2>批量游戏JSON</h2>
          <div className="bulk-json-container">
            <textarea
              className="bulk-json-textarea"
              value={bulkJson}
              onChange={(e) => setBulkJson(e.target.value)}
              placeholder="游戏数据将显示在这里..."
            />
            <div className="bulk-json-actions">
              <button onClick={handleCopyJson} className="action-button">复制JSON</button>
              <button onClick={handleClearJson} className="action-button">清空</button>
              <button onClick={generateTemplate} className="action-button">生成模板</button>
            </div>
          </div>
        </section>
      </div>
      
      {/* 消息提示 */}
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default AddGamePage;