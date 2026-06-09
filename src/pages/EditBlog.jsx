import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext';
import axiosInstance from '../config/axios';
import { FiAlertCircle, FiCheckCircle, FiImage, FiUpload } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import LoadingSpinner from '../components/LoadingSpinner';

const EditBlog = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { updateBlog } = useBlogs();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axiosInstance.get(`/blogs/${id}`);
        const blogData = data.blog || data;
        setTitle(blogData.title);
        setContent(blogData.content);
        setExistingImage(blogData.image || '');
      } catch (error) {
        navigate('/');
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }
    setError('');
    setLoading(true);
    const result = await updateBlog(id, title, content, image);
    if (result.success) {
      setSuccess('Blog updated successfully!');
      setTimeout(() => navigate(`/blog/${id}`), 1500);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (fetching) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Edit Blog
        </h1>

        {error && (
          <motion.div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl flex items-center gap-2">
            <FiAlertCircle /> {error}
          </motion.div>
        )}
        {success && (
          <motion.div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl flex items-center gap-2">
            <FiCheckCircle /> {success}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Featured Image</label>
            <div className="flex items-center gap-4 flex-wrap">
              <label className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:shadow-lg transition-all">
                <FiUpload /> Change Image
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {(imagePreview || existingImage) && (
                <span className="text-sm text-green-600">New image will replace current</span>
              )}
            </div>
            {existingImage && !imagePreview && (
              <img src={existingImage} alt="Current" className="mt-3 h-32 w-32 object-cover rounded-xl shadow-md" />
            )}
            {imagePreview && (
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={imagePreview}
                alt="Preview"
                className="mt-3 h-32 w-32 object-cover rounded-xl shadow-md"
              />
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Content (Markdown supported)</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="12"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
              required
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold mb-2">Preview</h3>
            <div className="prose max-w-none">
              <ReactMarkdown>{content.substring(0, 300)}</ReactMarkdown>
              {content.length > 300 && <p className="text-gray-500">...</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Blog'}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => navigate(`/blog/${id}`)}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditBlog;