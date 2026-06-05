// // frontend/src/pages/BlogDetail.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useBlogs } from '../context/BlogContext.jsx';
// import { useAuth } from '../context/AuthContext.jsx';
// import axiosInstance from '../config/axios.js';
// import ReactMarkdown from 'react-markdown';
// import { FiCalendar, FiUser, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { deleteBlog } = useBlogs();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/blogs/${id}`);
//         setBlog(data.blog || data);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         navigate('/');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id, navigate]);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       const result = await deleteBlog(id);
//       if (result.success) {
//         navigate('/');
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   if (!blog) return null;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="container mx-auto px-4 py-8 max-w-4xl"
//     >
//       <motion.button
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//         onClick={() => navigate('/')}
//         className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800"
//       >
//         <FiArrowLeft /> Back to Home
//       </motion.button>

//       <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//         {blog.image && (
//           <motion.img
//             initial={{ scale: 1.1, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             src={`http://localhost:5000${blog.image}`}
//             alt={blog.title}
//             className="w-full h-96 object-cover"
//             onError={(e) => {
//               e.target.src = 'https://via.placeholder.com/1200x400?text=Blog+Image';
//             }}
//           />
//         )}
        
//         <div className="p-8">
//           <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
          
//           <div className="flex items-center gap-6 mb-6 text-gray-500">
//             <div className="flex items-center gap-2">
//               <FiUser className="text-purple-500" />
//               <span>{blog.author?.name || 'Anonymous'}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiCalendar className="text-purple-500" />
//               <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//             </div>
//           </div>

//           {user && blog.author && user._id === blog.author._id && (
//             <div className="flex gap-3 mb-6">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate(`/edit/${blog._id}`)}
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 <FiEdit /> Edit
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleDelete}
//                 className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 <FiTrash2 /> Delete
//               </motion.button>
//             </div>
//           )}

//           <div className="prose prose-lg max-w-none">
//             <ReactMarkdown>{blog.content}</ReactMarkdown>
//           </div>
//         </div>
//       </div>
//     </motion.div>
// //   );
// // };

// // export default BlogDetail;


// // frontend/src/pages/BlogDetail.jsx (Full image section)
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useBlogs } from '../context/BlogContext.jsx';
// import { useAuth } from '../context/AuthContext.jsx';
// import axiosInstance from '../config/axios.js';
// import ReactMarkdown from 'react-markdown';
// import { FiCalendar, FiUser, FiEdit, FiTrash2, FiArrowLeft, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

// const BlogDetail = () => {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);
//   const [fullscreenImage, setFullscreenImage] = useState(false);
//   const { deleteBlog } = useBlogs();
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const { data } = await axiosInstance.get(`/blogs/${id}`);
//         setBlog(data.blog || data);
//       } catch (error) {
//         console.error('Error fetching blog:', error);
//         navigate('/');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id, navigate]);

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       const result = await deleteBlog(id);
//       if (result.success) {
//         navigate('/');
//       }
//     }
//   };

//   const getImageUrl = () => {
//     if (!blog?.image) return null;
//     if (blog.image.startsWith('http')) return blog.image;
    
//     let imagePath = blog.image;
//     if (!imagePath.startsWith('/uploads/') && !imagePath.startsWith('uploads/')) {
//       imagePath = '/uploads/' + imagePath;
//     }
//     if (!imagePath.startsWith('/')) {
//       imagePath = '/' + imagePath;
//     }
//     return `http://localhost:5000${imagePath}`;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   if (!blog) return null;

//   const imageUrl = getImageUrl();

//   return (
//     <>
//       {/* Fullscreen Image Modal */}
//       {fullscreenImage && imageUrl && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer"
//           onClick={() => setFullscreenImage(false)}
//         >
//           <button
//             className="absolute top-4 right-4 text-white text-2xl p-2 hover:bg-white/20 rounded-full transition"
//             onClick={() => setFullscreenImage(false)}
//           >
//             <FiMinimize2 />
//           </button>
//           <img
//             src={imageUrl}
//             alt={blog.title}
//             className="max-w-[95vw] max-h-[95vh] object-contain"
//           />
//         </motion.div>
//       )}

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="container mx-auto px-4 py-8 max-w-5xl"
//       >
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate('/')}
//           className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
//         >
//           <FiArrowLeft /> Back to Home
//         </motion.button>

//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Full Width Image Section */}
//           {imageUrl && !imageError && (
//             <div className="relative w-full bg-gray-900">
//               {!imageLoaded && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//                 </div>
//               )}
//               <div className="relative">
//                 <img
//                   src={imageUrl}
//                   alt={blog.title}
//                   className={`w-full max-h-[600px] object-contain bg-gray-900 transition-opacity duration-500 ${
//                     imageLoaded ? 'opacity-100' : 'opacity-0'
//                   }`}
//                   style={{ objectPosition: 'top' }}
//                   onLoad={() => setImageLoaded(true)}
//                   onError={() => setImageError(true)}
//                 />
//                 <button
//                   onClick={() => setFullscreenImage(true)}
//                   className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
//                 >
//                   <FiMaximize2 className="text-xl" />
//                 </button>
//               </div>
//             </div>
//           )}
          
//           <div className="p-8 md:p-12">
//             <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
//               {blog.title}
//             </h1>
            
//             <div className="flex items-center gap-6 mb-8 pb-4 border-b border-gray-200">
//               <div className="flex items-center gap-2">
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
//                   {blog.author?.name?.charAt(0) || 'U'}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-gray-800">{blog.author?.name || 'Anonymous'}</p>
//                   <p className="text-xs text-gray-500">Author</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 text-gray-500">
//                 <FiCalendar className="text-purple-500" />
//                 <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
//                   year: 'numeric',
//                   month: 'long',
//                   day: 'numeric'
//                 })}</span>
//               </div>
//             </div>

//             {user && blog.author && user._id === blog.author._id && (
//               <div className="flex gap-3 mb-8">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate(`/edit/${blog._id}`)}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <FiEdit /> Edit Blog
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleDelete}
//                   className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all"
//                 >
//                   <FiTrash2 /> Delete Blog
//                 </motion.button>
//               </div>
//             )}

//             <div className="prose prose-lg max-w-none">
//               <ReactMarkdown>{blog.content}</ReactMarkdown>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default BlogDetail;








// frontend/src/pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import axiosInstance from '../config/axios.js';
import ReactMarkdown from 'react-markdown';
import { FiCalendar, FiUser, FiEdit, FiTrash2, FiArrowLeft, FiMaximize2, FiMinimize2 } from 'react-icons/fi';

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
        const { data } = await axiosInstance.get(`/blogs/${id}`);
        setBlog(data.blog || data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const result = await deleteBlog(id);
      if (result.success) {
        navigate('/');
      }
    }
  };

  const getImageUrl = () => {
    if (!blog?.image) return null;
    if (blog.image.startsWith('http')) return blog.image;
    
    let imagePath = blog.image;
    if (imagePath.startsWith('uploads/')) {
      imagePath = '/' + imagePath;
    } else if (!imagePath.startsWith('/uploads/') && !imagePath.startsWith('http')) {
      imagePath = '/uploads/' + imagePath;
    }
    if (!imagePath.startsWith('/')) {
      imagePath = '/' + imagePath;
    }
    return `http://localhost:5000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!blog) return null;

  const imageUrl = getImageUrl();

  return (
    <>
      {/* Fullscreen Image Modal */}
      {fullscreenImage && imageUrl && !imageError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer"
          onClick={() => setFullscreenImage(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-2xl p-3 hover:bg-white/20 rounded-full transition-all duration-300 z-10"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-5xl"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <FiArrowLeft /> Back to Home
        </motion.button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Full Width Image Section */}
          {imageUrl && !imageError && (
            <div className="relative w-full bg-gradient-to-br from-gray-900 to-gray-800">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
              )}
              <div className="relative">
                <img
                  src={imageUrl}
                  alt={blog.title}
                  className={`w-full max-h-[600px] object-contain bg-gradient-to-br from-gray-900 to-gray-800 transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ objectPosition: 'center' }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
                <button
                  onClick={() => setFullscreenImage(true)}
                  className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                >
                  <FiMaximize2 className="text-xl" />
                </button>
              </div>
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                  {blog.author?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{blog.author?.name || 'Anonymous'}</p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <FiCalendar className="text-purple-500" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>

            {user && blog.author && user._id === blog.author._id && (
              <div className="flex gap-3 mb-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/edit/${blog._id}`)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <FiEdit /> Edit Blog
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <FiTrash2 /> Delete Blog
                </motion.button>
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default BlogDetail;
