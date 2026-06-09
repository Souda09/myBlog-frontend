import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';
import { FiBookOpen, FiPlusCircle, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getUserBlogs } = useBlogs();
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        setLoading(true);
        const blogs = await getUserBlogs();
        console.log('Fetched my blogs:', blogs);
        setMyBlogs(blogs);
        setError('');
      } catch (err) {
        console.error('Error fetching my blogs:', err);
        setError('Failed to load your blogs. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    if (user) {
      fetchMyBlogs();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          My Blogs
        </h1>
        <p className="text-gray-600 mt-2">
          You have {myBlogs.length} blog{myBlogs.length !== 1 ? 's' : ''} published
        </p>
      </motion.div>

      {myBlogs.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiBookOpen className="text-4xl text-purple-500" />
          </div>
          <p className="text-gray-500 text-xl">You haven't created any blogs yet.</p>
          <Link to="/create">
            <button className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto">
              <FiPlusCircle /> Create Your First Blog
            </button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} showEditDelete={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;