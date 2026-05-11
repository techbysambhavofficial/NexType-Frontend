import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, FiActivity, FiList, FiAward, 
  FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX,
  FiZap, FiBookOpen, FiTrendingUp
} from 'react-icons/fi';
import './Layout.scss';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      // Auto-close sidebar on mobile devices
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
      
      // Reset mobile sidebar state when switching to desktop
      if (!mobile) {
        setIsMobileOpen(false);
        document.body.classList.remove('sidebar-open');
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('sidebar-open');
    };
  }, [sidebarOpen]);

  // Handle body scroll prevention when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isMobileOpen]);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const closeMobileSidebar = () => {
    if (isMobile && isMobileOpen) {
      setIsMobileOpen(false);
      document.body.classList.remove('sidebar-open');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const handleLogout = async () => {
    await logout();
    if (isMobile) {
      closeMobileSidebar();
    }
  };

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: FiHome },
    { path: '/test', name: 'Typing Test', icon: FiZap },
    { path: '/exercises', name: 'Exercises', icon: FiBookOpen },
    { path: '/history', name: 'History', icon: FiList },
    { path: '/leaderboard', name: 'Leaderboard', icon: FiTrendingUp },
    { path: '/achievements', name: 'Achievements', icon: FiAward },
    { path: '/statistics', name: 'Statistics', icon: FiBarChart2 },
    { path: '/settings', name: 'Settings', icon: FiSettings },
  ];

  // Determine if sidebar should be visible
  const isSidebarVisible = () => {
    if (isMobile) {
      return isMobileOpen;
    }
    return true;
  };

  // Get sidebar classes
  const getSidebarClasses = () => {
    let classes = 'sidebar';
    
    if (!isMobile) {
      classes += sidebarOpen ? ' open' : ' closed';
    }
    
    return classes;
  };

  return (
    <div className="layout">
      {/* Mobile Menu Button - Only show on mobile when sidebar is closed */}
      {isMobile && !isMobileOpen && (
        <button 
          className="mobile-menu-btn" 
          onClick={toggleSidebar}
          aria-label="Open Menu"
        >
          <FiMenu />
        </button>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarVisible() && (
          <motion.div 
            className={getSidebarClasses()}
            initial={isMobile ? { x: -300 } : false}
            animate={isMobile ? { x: 0 } : false}
            exit={isMobile ? { x: -300 } : false}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="sidebar-header">
              <div className="logo">
                <FiZap className="logo-icon" />
                <span className="logo-text">NexType</span>
              </div>
              {/* Only show close button on mobile, on desktop show toggle button */}
              {isMobile ? (
                <button 
                  className="close-btn" 
                  onClick={toggleSidebar}
                  aria-label="Close Menu"
                >
                  <FiX />
                </button>
              ) : (
                <button 
                  className="toggle-btn" 
                  onClick={toggleSidebar}
                  aria-label={sidebarOpen ? 'Close Menu' : 'Open Menu'}
                >
                  {sidebarOpen ? <FiX /> : <FiMenu />}
                </button>
              )}
            </div>

            <div className="user-info">
              <div className="avatar">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              {(!isMobile && sidebarOpen) || (isMobile && isMobileOpen) ? (
                <motion.div 
                  className="user-details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <h4>{user?.username || 'Guest User'}</h4>
                  <p>{user?.stats?.totalTests || 0} tests completed</p>
                </motion.div>
              ) : null}
            </div>

            <nav className="nav-menu">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={() => handleNavigation(item.path)}
                  whileHover={!isMobile ? { x: 5 } : {}}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <item.icon className="nav-icon" />
                  {(!isMobile && sidebarOpen) || (isMobile && isMobileOpen) ? (
                    <span className="nav-name">{item.name}</span>
                  ) : null}
                </motion.div>
              ))}
            </nav>

            <div className="sidebar-footer">
              <motion.div
                className="nav-item logout"
                onClick={handleLogout}
                whileHover={!isMobile ? { x: 5 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <FiLogOut className="nav-icon" />
                {(!isMobile && sidebarOpen) || (isMobile && isMobileOpen) ? (
                  <span className="nav-name">Logout</span>
                ) : null}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isMobile && isMobileOpen && (
        <motion.div 
          className="mobile-overlay"
          onClick={closeMobileSidebar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main Content */}
      <main 
        className={`main-content ${isMobile && isMobileOpen ? 'blurred' : ''}`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;