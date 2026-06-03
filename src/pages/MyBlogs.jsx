// frontend/src/pages/MyBlogs.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { FiLoader } from 'react-icons/fi';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserBlogs } = useBlogs();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      const blogs = await getUserBlogs();
      setMyBlogs(blogs);
      setLoading(false);
    };
    fetchMyBlogs();
  }, [getUserBlogs]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader className="text-5xl text-purple-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Blogs
        </h1>
        <p className="text-gray-600 mt-2">Manage and edit your published blogs</p>
      </motion.div>

      {myBlogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 text-xl">You haven't created any blogs yet.</p>
          <a href="/create" className="inline-block mt-4 text-purple-600 hover:underline">
            Create your first blog →
          </a>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBlogs;