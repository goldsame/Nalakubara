import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>关于CrazyGames</h1>
        <p className="about-subtitle">免费在线游戏平台</p>
      </div>
      
      <div className="about-section">
        <h2>我们的使命</h2>
        <p>
          CrazyGames致力于为全球玩家提供高质量、免费的在线游戏体验。我们相信游戏不仅仅是娱乐，更是连接人与人之间的桥梁，是创造力和想象力的源泉。
        </p>
        <p>
          我们的目标是打造一个友好、安全、有趣的游戏社区，让每一位玩家都能找到自己喜爱的游戏，并与志同道合的朋友一起分享游戏的乐趣。
        </p>
      </div>
      
      <div className="about-section">
        <h2>我们的故事</h2>
        <p>
          CrazyGames成立于2023年，由一群热爱游戏的开发者和设计师共同创建。我们从小型的游戏分享网站起步，逐渐发展成为拥有数千款游戏的综合平台。
        </p>
        <p>
          在发展过程中，我们始终坚持"玩家第一"的原则，不断优化用户体验，提升游戏质量，为玩家提供最好的游戏服务。
        </p>
      </div>
      
      <div className="about-section">
        <h2>我们的特色</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon free-icon"></div>
            <h3>完全免费</h3>
            <p>所有游戏均可免费游玩，无需下载，直接在浏览器中运行。</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon quality-icon"></div>
            <h3>精选品质</h3>
            <p>每款游戏都经过精心挑选和测试，确保最佳的游戏体验。</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon variety-icon"></div>
            <h3>种类丰富</h3>
            <p>从动作、冒险到益智、策略，各种类型的游戏应有尽有。</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon community-icon"></div>
            <h3>活跃社区</h3>
            <p>加入我们的社区，与其他玩家交流，分享游戏心得。</p>
          </div>
        </div>
      </div>
      
      <div className="about-section">
        <h2>联系我们</h2>
        <p>
          如果您有任何问题、建议或合作意向，欢迎随时联系我们：
        </p>
        <div className="contact-info">
          <p><strong>电子邮件：</strong> contact@crazygames.com</p>
          <p><strong>地址：</strong> 中国北京市海淀区中关村科技园</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;