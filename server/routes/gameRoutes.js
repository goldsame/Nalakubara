const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const router = express.Router();

// 抓取游戏信息的API端点
router.get('/fetch-game-info', async (req, res) => {
  try {
    const { url } = req.query;
    
    if (!url || !url.includes('crazygames.com/game/')) {
      return res.status(400).json({ error: '请提供有效的CrazyGames游戏链接' });
    }
    
    // 发送请求获取网页内容
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    // 使用cheerio加载HTML
    const $ = cheerio.load(response.data);
    
    // 提取游戏标题
    const title = $('h1').text().trim();
    
    // 提取游戏完整描述
    const description = $('.game-description').text().trim();
    
    // 提取游戏特性
    const features = [];
    $('.features-list li').each((i, el) => {
      features.push($(el).text().trim());
    });
    
    // 提取操作说明
    const controls = $('.controls-section').text().trim();
    
    // 提取中央游戏图片
    let thumbnailUrl = '';
    // 尝试获取游戏主图片（红框中的图片）
    const mainImage = $('.game-thumbnail img').attr('src');
    if (mainImage) {
      thumbnailUrl = mainImage;
    } else {
      // 备选：尝试获取og:image元标签
      thumbnailUrl = $('meta[property="og:image"]').attr('content');
    }
    
    // 提取嵌入iframe链接
    let embedUrl = '';
    // 点击Embed按钮后显示的链接
    const embedButton = $('button:contains("Embed")');
    if (embedButton.length) {
      // 尝试从数据属性或相关元素获取嵌入链接
      const embedCode = embedButton.attr('data-embed-code') || 
                        embedButton.parent().find('code').text();
      
      if (embedCode) {
        const match = embedCode.match(/src=["']([^"']+)["']/);
        if (match && match[1]) {
          embedUrl = match[1];
        }
      }
    }
    
    // 如果没找到嵌入链接，构造一个
    if (!embedUrl) {
      const gameId = url.match(/\/game\/([^\/\?#]+)/)[1];
      embedUrl = `https://www.crazygames.com/embed/${gameId}`;
    }
    
    // 提取开发者信息
    const developer = $('.developer-info').text().trim();
    
    // 提取评分
    let rating = '';
    const ratingText = $('.rating-value').text().trim();
    if (ratingText) {
      rating = parseFloat(ratingText);
    }
    
    // 返回提取的信息
    res.json({
      title,
      description,
      features,
      controls,
      thumbnailUrl,
      embedUrl,
      developer,
      rating,
      gameUrl: url
    });
    
  } catch (error) {
    console.error('抓取游戏信息失败:', error);
    res.status(500).json({ error: '抓取游戏信息失败' });
  }
});

module.exports = router;