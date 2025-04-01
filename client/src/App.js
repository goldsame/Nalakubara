// 先导入React和样式
import React, { Suspense, lazy } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 导入布局组件
import Layout from './components/Layout/Layout';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Sidebar from './components/Sidebar/Sidebar';

// 直接导入组件
import GameDetail from './pages/GameDetail/GameDetail';
import AddGamePage from './pages/AdminPage/AddGamePage';
// 移除HotPage导入，因为我们将使用CategoryPage代替
// import HotPage from './pages/HotPage/HotPage';

// 懒加载页面组件
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));  
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const GamePage = lazy(() => import('./pages/GamePage/GamePage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));

// 加载中组件
const LoadingFallback = () => (
  <div className="page-loading">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// 在现有导入下添加
import LoginPage from './pages/AdminPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="app-container">
          <Sidebar />
          <div className="content-area">
            <main className="main-content">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/game/:id" element={<GameDetail />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/games/:gameId" element={<GamePage />} />
                  
                  {/* 添加登录路由 */}
                  <Route path="/admin/login" element={<LoginPage />} />
                  
                  {/* 保护管理页面路由 */}
                  <Route path="/admin/add-game" element={
                    <ProtectedRoute>
                      <AddGamePage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/hot" element={<CategoryPage fixedCategory="popular" />} />
                  <Route path="/new" element={<CategoryPage fixedCategory="new" />} />
                  <Route path="/featured" element={<CategoryPage fixedCategory="featured" />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;