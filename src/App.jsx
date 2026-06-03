// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { BlogProvider } from './context/BlogContext.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import EditBlog from './pages/EditBlog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import MyBlogs from './pages/MyBlogs.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/create" element={<CreateBlog />} />
              <Route path="/edit/:id" element={<EditBlog />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;