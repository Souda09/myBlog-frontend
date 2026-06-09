import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiHome, FiPlusCircle, FiUser, FiLogOut, FiBookOpen, 
  FiMenu, FiX, FiPenTool, FiSettings 
} from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Navigation items for logged in user
  const userNavItems = [
    { path: '/', icon: FiHome, label: 'Home' },
    { path: '/create', icon: FiPlusCircle, label: 'Create Blog' },
    { path: '/my-blogs', icon: FiBookOpen, label: 'My Blogs' },
  ];

  // Navigation items for guests
  const guestNavItems = [
    { path: '/', icon: FiHome, label: 'Home' },
  ];

  const navItems = user ? userNavItems : guestNavItems;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <FiPenTool className="text-white text-xl" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BlogSphere
                </h1>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <NavLink key={item.path} item={item} isActive={location.pathname === item.path} />
              ))}
              
              {user ? (
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <FiUser className="text-sm" />
                    </div>
                    <span className="font-medium">{user.name?.split(' ')[0]}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    <FiLogOut /> Logout
                  </motion.button>
                </div>
              ) : (
                <div className="flex gap-2 ml-4">
                  <Link to="/login">
                    <button className="px-5 py-2 text-purple-600 border-2 border-purple-600 rounded-full hover:bg-purple-50 transition-all">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all">
                      Register
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-lg bg-gray-100">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="fixed inset-0 z-40 bg-white pt-20 px-4 md:hidden"
        >
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100">
                  <item.icon /> {item.label}
                </div>
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center gap-3 px-4 py-3 bg-red-500 text-white rounded-xl">
                <FiLogOut /> Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-3 text-purple-600 border-2 border-purple-600 rounded-xl">Login</button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">Register</button>
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}

      <div className="h-20" />
    </>
  );
};

const NavLink = ({ item, isActive }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      to={item.path}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
        isActive
          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <item.icon /> {item.label}
    </Link>
  </motion.div>
);

export default Navbar;