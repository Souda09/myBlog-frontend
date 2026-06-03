// frontend/src/pages/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext.jsx';
import BlogCard from '../components/BlogCard.jsx';
import { FiLoader } from 'react-icons/fi';

const Home = () => {
  const { blogs, loading } = useBlogs();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

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

  const blogsArray = Array.isArray(blogs) ? blogs : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient">
          Welcome to BlogSphere
        </h1>
        <p className="text-gray-600 mt-4 text-lg">Discover amazing stories and insights from fellow bloggers</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogsArray.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </motion.div>

      {blogsArray.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 text-xl">No blogs yet. Be the first to create one!</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;