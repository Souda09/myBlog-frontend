import React from 'react';
import { motion } from 'framer-motion';
import { useBlogs } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';
import { FiPenTool, FiUsers, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const Home = () => {
  const { blogs, loading } = useBlogs();

  const features = [
    { icon: FiPenTool, title: 'Write Stories', desc: 'Share your thoughts and experiences with the world', color: 'from-purple-500 to-pink-500' },
    { icon: FiUsers, title: 'Build Community', desc: 'Connect with fellow bloggers and readers', color: 'from-blue-500 to-cyan-500' },
    { icon: FiTrendingUp, title: 'Grow Together', desc: 'Learn, improve and grow your audience', color: 'from-green-500 to-emerald-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-700 via-pink-700 to-purple-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-12">
                <FiPenTool className="text-5xl text-white" />
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              BlogSphere
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Where stories come alive. Share your thoughts, connect with readers, 
              and become part of a vibrant blogging community.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                Get Started <FiArrowRight />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">BlogSphere</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to start your blogging journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              Latest <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Blogs</span>
            </h2>
            <p className="text-gray-600">Discover amazing stories from our community</p>
          </motion.div>

          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No blogs yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog._id} blog={blog} showEditDelete={false} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;