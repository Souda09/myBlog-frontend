// // frontend/src/components/BlogCard.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { FiCalendar, FiUser, FiImage } from 'react-icons/fi';

// const BlogCard = ({ blog }) => {
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } }
//   };

//   // Local SVG placeholder - NO EXTERNAL DEPENDENCY
//   const getPlaceholderImage = () => {
//     return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%239ca3af" text-anchor="middle" dy=".3em"%3E📝 No Image%3C/text%3E%3C/svg%3E';
//   };

//   const getImageUrl = (imagePath) => {
//     // Agar image nahi hai to LOCAL PLACEHOLDER (via.placeholder.com nahi)
//     if (!imagePath) {
//       return getPlaceholderImage();
//     }
//     // Agar already URL hai
//     if (imagePath.startsWith('http')) {
//       return imagePath;
//     }
//     // Local image from backend
//     return `http://localhost:5000${imagePath}`;
//   };

//   const [imgError, setImgError] = React.useState(false);

//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover="hover"
//       className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
//     >
//       <Link to={`/blog/${blog._id}`}>
//         <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
//           {!imgError ? (
//             <motion.img
//               whileHover={{ scale: 1.1 }}
//               transition={{ duration: 0.5 }}
//               src={getImageUrl(blog.image)}
//               alt={blog.title}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 setImgError(true);
//                 e.target.src = getPlaceholderImage();
//               }}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <FiImage className="text-5xl text-purple-400" />
//             </div>
//           )}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>
        
//         <div className="p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
//             {blog.title}
//           </h2>
//           <p className="text-gray-600 mb-4 line-clamp-3">
//             {blog.content?.substring(0, 150)}...
//           </p>
          
//           <div className="flex items-center justify-between text-sm text-gray-500">
//             <div className="flex items-center gap-2">
//               <FiUser className="text-purple-500" />
//               <span>{blog.author?.name || 'Anonymous'}</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FiCalendar className="text-purple-500" />
//               <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default BlogCard;


// frontend/src/components/BlogCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiImage } from 'react-icons/fi';

const BlogCard = ({ blog }) => {
  const [imgError, setImgError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  // ✅ Get correct image URL - Supports Cloudinary, Local, and External
  const getImageUrl = () => {
    if (!blog.image) return null;
    
    // ✅ Cloudinary URL (starts with https)
    if (blog.image.startsWith('http')) {
      return blog.image;
    }
    
    // ✅ Local development fallback (only for local testing)
    if (process.env.NODE_ENV === 'development') {
      let imagePath = blog.image;
      if (!imagePath.startsWith('/uploads/') && !imagePath.startsWith('uploads/')) {
        imagePath = '/uploads/' + imagePath;
      }
      if (!imagePath.startsWith('/')) {
        imagePath = '/' + imagePath;
      }
      return `http://localhost:5000${imagePath}`;
    }
    
    // ✅ Production fallback - Cloudinary placeholder
    return null;
  };

  // ✅ Local SVG placeholder (no external dependency)
  const getPlaceholderImage = () => {
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%239ca3af" text-anchor="middle" dy=".3em"%3E📝 No Image%3C/text%3E%3C/svg%3E';
  };

  const imageUrl = getImageUrl();
  const hasImage = imageUrl && !imgError;

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <Link to={`/blog/${blog._id}`}>
        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
          {hasImage ? (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-purple-50 z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={blog.title}
                className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  imageRendering: 'auto',
                  imageRendering: '-webkit-optimize-contrast'
                }}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  console.error('Image load error:', imageUrl);
                  setImgError(true);
                  setImageLoaded(true);
                  // ✅ Fallback to placeholder
                  e.target.src = getPlaceholderImage();
                }}
                loading="lazy"
              />
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <FiImage className="text-6xl text-purple-300" />
              <span className="text-sm text-gray-400 font-medium">No Image Available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
            {blog.title}
          </h2>
          <p className="text-gray-600 mb-3 line-clamp-3 text-sm leading-relaxed">
            {blog.content?.substring(0, 120)}...
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                {blog.author?.name?.charAt(0) || 'U'}
              </div>
              <span className="font-medium">{blog.author?.name?.split(' ')[0] || 'Anonymous'}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-purple-500 text-sm" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;