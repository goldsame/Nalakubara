import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GameCard from '../../components/GameCard/GameCard';
import './ProfilePage.css';

const ProfilePage = () => {
  // 模拟用户数据
  const [user, setUser] = useState({
    id: '1',
    username: '游戏玩家',
    email: 'player@example.com',
    avatar: 'https://via.placeholder.com/150',
    joinDate: '2023-01-15',
    favoriteGames: [],
    recentlyPlayed: []
  });
  
  const [activeTab, setActiveTab] = useState('favorites');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API调用获取用户数据
    const fetchUserData = async () => {
      try {
        setLoading(true);
        // 模拟延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 模拟从API获取的数据
        setUser({
          id: '1',
          username: '游戏玩家',
          email: 'player@example.com',
          avatar: 'https://via.placeholder.com/150',
          joinDate: '2023-01-15',
          favoriteGames: [
            {
              _id: '1',
              title: '像素冒险',
              category: 'adventure',
              thumbnail: 'https://via.placeholder.com/300x200/7b68ee/ffffff?text=像素冒险',
              rating: 4.8
            },
            {
              _id: '4',
              title: '僵尸射击',
              category: 'shooting',
              thumbnail: 'https://via.placeholder.com/300x200/f7b731/ffffff?text=僵尸射击',
              rating: 4.7
            }
          ],
          recentlyPlayed: [
            {
              _id: '2',
              title: '赛车狂飙',
              category: 'racing',
              thumbnail: 'https://via.placeholder.com/300x200/ff6b6b/ffffff?text=赛车狂飙',
              rating: 4.5
            },
            {
              _id: '3',
              title: '方块消除',
              category: 'puzzle',
              thumbnail: 'https://via.placeholder.com/300x200/4ecdc4/ffffff?text=方块消除',
              rating: 4.2
            },
            {
              _id: '8',
              title: '多人对战',
              category: 'multiplayer',
              thumbnail: 'https://via.placeholder.com/300x200/45aaf2/ffffff?text=多人对战',
              rating: 4.9
            }
          ]
        });
        
        setLoading(false);
      } catch (error) {
        console.error('获取用户数据错误:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="loading-spinner"></div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <img src={user.avatar} alt={user.username} />
        </div>
        <div className="profile-info">
          <h1>{user.username}</h1>
          <p className="join-date">加入时间: {new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
        <div className="profile-actions">
          <button className="edit-profile-btn">编辑资料</button>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          收藏游戏
        </button>
        <button 
          className={`tab-btn ${activeTab === 'recent' ? 'active' : ''}`}
          onClick={() => setActiveTab('recent')}
        >
          最近游玩
        </button>
      </div>
      
      <div className="profile-content">
        {activeTab === 'favorites' && (
          <div className="favorites-section">
            <h2 className="section-title">收藏游戏</h2>
            {user.favoriteGames.length > 0 ? (
              <div className="games-grid">
                {user.favoriteGames.map(game => (
                  <GameCard key={game._id} game={game} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>您还没有收藏任何游戏</p>
                <Link to="/" className="browse-games-btn">浏览游戏</Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'recent' && (
          <div className="recent-section">
            <h2 className="section-title">最近游玩</h2>
            {user.recentlyPlayed.length > 0 ? (
              <div className="games-grid">
                {user.recentlyPlayed.map(game => (
                  <GameCard key={game._id} game={game} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>您最近没有游玩任何游戏</p>
                <Link to="/" className="browse-games-btn">浏览游戏</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;