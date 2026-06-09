import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../config/axios';

const BlogContext = createContext();

export const useBlogs = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const { data } = await axiosInstance.get('/blogs');
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Fetch blogs error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const createBlog = async (title, content, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const { data } = await axiosInstance.post('/blogs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setBlogs(prev => [data.blog, ...prev]);
      return { success: true, blog: data.blog };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const updateBlog = async (id, title, content, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const { data } = await axiosInstance.put(`/blogs/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setBlogs(prev => prev.map(blog => blog._id === id ? data.blog : blog));
      return { success: true, blog: data.blog };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message };
    }
  };

  // ✅ Sirf current user ke blogs fetch karega
  const getUserBlogs = async () => {
    try {
      const { data } = await axiosInstance.get('/blogs/my-blogs');
      console.log('My blogs response:', data);
      return data.blogs || [];
    } catch (error) {
      console.error('Get user blogs error:', error);
      return [];
    }
  };

  return (
    <BlogContext.Provider value={{ 
      blogs, loading, createBlog, updateBlog, deleteBlog, getUserBlogs, fetchBlogs 
    }}>
      {children}
    </BlogContext.Provider>
  );
};