import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';

// 懒加载页面组件
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage/CategoryPage'));
const GamePage = lazy(() => import('./pages/GamePage/GamePage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const AddGamePage = lazy(() => import('./pages/AdminPage/AddGamePage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const FeaturedPage = lazy(() => import('./pages/FeaturedPage/FeaturedPage'));
const HotPage = lazy(() => import('./pages/HotPage/HotPage'));
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
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* 路由配置 */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/games/:gameId" element={<GamePage />} />
            <Route path="/admin/add-game" element={<AddGamePage />} />
            <Route path="/search" element={<SearchPage />} />
            
            {/* 分类路由 */}
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/featured" element={<FeaturedPage />} />
            <Route path="/hot" element={<HotPage />} />
            <Route path="/new" element={<NewPage />} />
            
            {/* 捕获所有未匹配的路由 */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;