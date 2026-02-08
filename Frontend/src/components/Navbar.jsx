import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Mountain, LayoutDashboard, LogOut, ChevronDown, Info, Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true); 
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    setShowMobileMenu(false);
  };

  const NavLink = ({ to, icon: Icon, children, onClick }) => (
    <Link 
      to={to} 
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-[#0f110f] dark:text-white hover:bg-moss hover:text-[#0f110f] transition-all border-b border-black/5 dark:border-white/5 md:border-none md:p-0 md:hover:bg-transparent md:hover:text-moss md:text-[#0f110f]/40 md:dark:text-white/40"
    >
      <Icon size={16} />
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-[#0f110f]/90 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LEFT: Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="bg-[#1a1d1a] dark:bg-white p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-xl">
            <Mountain className="text-white dark:text-[#0f110f]" size={22} />
          </div>
          <span className="text-2xl font-black text-[#0f110f] dark:text-white tracking-tighter uppercase italic">
            Open<span className="text-moss">Trek</span>
          </span>
        </Link>

        {/* RIGHT: Actions */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Dark Mode Toggle (Always Visible) */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-[#f5f5f5] dark:bg-white/5 text-[#0f110f] dark:text-white border border-black/5 dark:border-white/10"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/about" icon={Info}>About</NavLink>
            {user ? (
              <div className="flex items-center gap-6">
                <NavLink to="/dashboard" icon={LayoutDashboard}>Dashboard</NavLink>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:opacity-70"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-[#0f110f] dark:bg-white text-white dark:text-[#0f110f] px-7 py-3 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-2xl"
              >
                Leader Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle (Hamburger) */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2.5 rounded-xl bg-[#0f110f] dark:bg-white text-white dark:text-[#0f110f] transition-all"
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {showMobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0f110f] border-b border-black/5 dark:border-white/5 animate-in slide-in-from-top duration-300 shadow-2xl">
          <div className="flex flex-col">
            {user && (
              <div className="px-6 py-4 bg-moss/10 border-b border-black/5 dark:border-white/5">
                <p className="text-[10px] font-black text-moss uppercase tracking-[0.2em]">Logged in as</p>
                <p className="text-sm font-bold text-[#0f110f] dark:text-white">{user.name}</p>
              </div>
            )}
            
            <NavLink to="/about" icon={Info} onClick={() => setShowMobileMenu(false)}>About Platform</NavLink>
            
            {user ? (
              <>
                <NavLink to="/dashboard" icon={LayoutDashboard} onClick={() => setShowMobileMenu(false)}>Dashboard</NavLink>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-6 py-5 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50"
                >
                  <LogOut size={18} /> Logout Session
                </button>
              </>
            ) : (
              <NavLink to="/login" icon={LogIn} onClick={() => setShowMobileMenu(false)}>Leader Login</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;