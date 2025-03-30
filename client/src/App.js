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
// 移除Home导入，只使用HomePage
// import Home from './pages/Home/Home';
import GameDetail from './pages/GameDetail/GameDetail';
import Category from './pages/Category/Category';
import AddGamePage from './pages/AdminPage/AddGamePage';
import HotPage from './pages/HotPage/HotPage';

// 懒加载页面组件
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));  
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const GamePage = lazy(() => import('./pages/GamePage/GamePage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
// 删除FeaturedPage的导入
const NewPage = lazy(() => import('./pages/NewPage/NewPage'));

// 加载中组件
const LoadingFallback = () => (
  <div className="page-loading">
    <div className="loading-spinner"></div>
    <p>加载中...</p>
  </div>
);

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
                  {/* 将主页路由改为使用HomePage组件 */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/game/:id" element={<GameDetail />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/games/:gameId" element={<GamePage />} />
                  <Route path="/admin/add-game" element={<AddGamePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/category/:categoryId" element={<Category />} />
                  {/* 删除FeaturedPage的路由 */}
                  <Route path="/hot" element={<HotPage />} />
                  <Route path="/new" element={<NewPage />} />
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