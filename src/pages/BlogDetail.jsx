import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../config/axios';
import ReactMarkdown from 'react-markdown';
import { 
  FiCalendar, FiUser, FiEdit, FiTrash2, FiArrowLeft, 
  FiMaximize2, FiMinimize2, FiShare2, FiHeart, FiBookmark,
  FiClock
} from 'react-icons/fi';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const { deleteBlog } = useBlogs();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log('Fetching blog with id:', id);
        const { data } = await axiosInstance.get(`/blogs/${id}`);
        console.log('Blog data:', data);
        setBlog(data.blog || data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const result = await deleteBlog(id);
      if (result.success) navigate('/');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const getImageUrl = () => {
    if (!blog?.image) return null;
    if (blog.image.startsWith('http')) return blog.image;
    return `http://localhost:5000${blog.image}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.split(/\s/g).length || 0;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog not found</h2>
          <Link to="/" className="text-purple-600 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const imageUrl = getImageUrl();
  const readingTime = getReadingTime(blog.content);
  const isOwner = user && blog.author && user._id === blog.author._id;

  return (
    <>
      {/* Fullscreen Image Modal */}
      {fullscreenImage && imageUrl && !imageError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setFullscreenImage(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl p-3 hover:bg-white/20 rounded-full transition-all"
            onClick={() => setFullscreenImage(false)}
          >
            <FiMinimize2 />
          </button>
          <img
            src={imageUrl}
            alt={blog.title}
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />
        </motion.div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Header Section */}
        <div className="relative w-full bg-gradient-to-r from-purple-900 to-pink-900 overflow-hidden py-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full mb-4">
                Blog Post
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                    {blog.author?.name?.charAt(0) || 'A'}
                  </div>
                  <span>{blog.author?.name || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar />
                  <span>{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiClock />
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all">
                <FiHeart /> Like
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all">
                <FiBookmark /> Save
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all"
              >
                <FiShare2 /> Share
              </button>
            </div>

            {isOwner && (
              <div className="flex items-center gap-3">
                <Link to={`/edit/${blog._id}`}>
                  <button className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all">
                    <FiEdit /> Edit
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {imageUrl && !imageError && (
            <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl bg-gray-100">
              {!imageLoaded && (
                <div className="w-full h-96 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={blog.title}
                  className={`w-full transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    maxHeight: '500px',
                    width: '100%',
                    objectFit: 'contain',
                    backgroundColor: '#1a1a2e'
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                <button
                  onClick={() => setFullscreenImage(true)}
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
                >
                  <FiMaximize2 className="text-xl" />
                </button>
              </div>
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg prose-purple max-w-none">
            <ReactMarkdown
              components={{
                img: ({ node, src, alt, ...props }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-xl shadow-lg my-6 max-w-full h-auto"
                    style={{ objectFit: 'contain' }}
                    {...props}
                  />
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                {blog.author?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{blog.author?.name || 'Anonymous'}</h3>
                <p className="text-sm text-gray-500">Blogger at BlogSphere</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-all"
            >
              <FiArrowLeft /> Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;