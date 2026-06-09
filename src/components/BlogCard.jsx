import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiCalendar, FiUser, FiImage, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useBlogs } from '../context/BlogContext';

const BlogCard = ({ blog, showEditDelete = false }) => {
  const [imgError, setImgError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { user } = useAuth();
  const { deleteBlog } = useBlogs();
  const navigate = useNavigate();

  const getImageUrl = () => {
    if (!blog?.image) return null;
    // Agar Cloudinary URL hai
    if (blog.image.startsWith('http')) return blog.image;
    // Local image
    return `http://localhost:5000${blog.image}`;
  };

  const imageUrl = getImageUrl();
  const isOwner = user && blog.author && user._id === blog.author._id;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const result = await deleteBlog(blog._id);
      if (result.success) {
        navigate('/my-blogs');
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/edit/${blog._id}`);
  };

  // Get preview text (remove markdown)
  const getPreviewText = () => {
    if (!blog.content) return '';
    // Remove markdown syntax for preview
    let text = blog.content
      .replace(/[#*`>_~\[\]()!]/g, '')
      .replace(/\n/g, ' ')
      .substring(0, 120);
    return text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      {/* ✅ Clickable link wrapper */}
      <Link to={`/blog/${blog._id}`} className="block cursor-pointer">
        {/* Image Container - Fixed Size, No Cut */}
        <div className="w-full bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
          {imageUrl && !imgError ? (
            <div className="relative">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={imageUrl}
                alt={blog.title}
                className={`w-full transition-all duration-500 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  height: '220px',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  backgroundColor: '#f3f4f6'
                }}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div 
              className="w-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100"
              style={{ height: '220px' }}
            >
              <FiImage className="text-5xl text-purple-300 mb-2" />
              <span className="text-sm text-gray-400">No Image</span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2 text-sm leading-relaxed">
            {getPreviewText()}...
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {blog.author?.name?.charAt(0) || 'A'}
              </div>
              <span className="truncate max-w-[100px]">{blog.author?.name?.split(' ')[0] || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar className="text-purple-500" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Edit/Delete Buttons - Only for owner */}
      {isOwner && showEditDelete && (
        <div className="px-5 pb-5 pt-0 flex gap-2 border-t border-gray-100 mx-5 mt-2">
          <button
            onClick={handleEdit}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-all"
          >
            <FiEdit size={14} /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-all"
          >
            <FiTrash2 size={14} /> Delete
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default BlogCard;