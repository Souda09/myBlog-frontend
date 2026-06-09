import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/CreateBlog';
import EditBlog from './pages/EditBlog';
import BlogDetail from './pages/BlogDetail';
import MyBlogs from './pages/MyBlogs';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <Navbar />
            <main className="pt-20">
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
            </main>
          </div>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;