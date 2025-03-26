import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// 导入页面组件
import HomePage from './pages/HomePage/HomePage';
import GamePage from './pages/GamePage/GamePage';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import SearchPage from './pages/SearchPage/SearchPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AdminPage from './pages/AdminPage/AdminPage';
import AddGamePage from './pages/AdminPage/AddGamePage';

// 导入布局组件
import MainLayout from './layouts/MainLayout/MainLayout';
import AdminLayout from './layouts/AdminLayout/AdminLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* 主布局路由 */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="games/:gameId" element={<GamePage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
          
          {/* 特殊分类页面 */}
          <Route path="hot" element={<CategoryPage fixedCategory="popular" />} />
          <Route path="new" element={<CategoryPage fixedCategory="new" />} />
          <Route path="featured" element={<CategoryPage fixedCategory="featured" />} />
          <Route path="categories" element={<CategoryPage fixedCategory="all" />} />
        </Route>
        
        {/* 管理员布局路由 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
          <Route path="add-game" element={<AddGamePage />} />
        </Route>
        
        {/* 404页面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;