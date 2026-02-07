import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Mountain, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true); // Defaulting to dark for that modern feel
  const [showMenu, setShowMenu] = useState(false);
  
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
    setShowMenu(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0f110f]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-all duration-300 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo - Modern High Contrast */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-[#1a1d1a] dark:bg-white p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-xl">
            <Mountain className="text-white dark:text-[#0f110f]" size={22} />
          </div>
          <span className="text-2xl font-black text-[#0f110f] dark:text-white tracking-tighter uppercase italic">
            Open<span className="text-moss">Trek</span>
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5">
          {/* Dark Mode Toggle - Simplified Modern look */}
          <button 
            onClick={() => setIsDark(!isDark)}
            className="p-2.5 rounded-xl bg-[#f5f5f5] dark:bg-white/5 text-[#0f110f] dark:text-white hover:scale-110 transition-all border border-black/5 dark:border-white/10"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {user ? (
            /* LOGGED IN: Sleek Profile Button */
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-[#f5f5f5] dark:bg-white/5 border border-black/5 dark:border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-moss flex items-center justify-center text-[#0f110f] font-black shadow-inner">
                  {user.name?.[0].toUpperCase()}
                </div>
                <ChevronDown size={14} className={`text-[#0f110f] dark:text-white transition-transform ${showMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Modern Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#1a1d1a] border border-black/5 dark:border-white/10 rounded-[2rem] shadow-2xl p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-5 py-4 mb-2">
                    <p className="text-[10px] font-black text-moss uppercase tracking-[0.2em] mb-1">Leader Session</p>
                    <p className="text-sm font-bold text-[#0f110f] dark:text-white truncate">{user.name}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <button 
                      onClick={() => { navigate('/dashboard'); setShowMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-[#0f110f] dark:text-white hover:bg-moss hover:text-[#0f110f] dark:hover:bg-moss dark:hover:text-[#0f110f] rounded-2xl transition-all"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* LOGGED OUT: High-Contrast Login Button */
            <Link 
              to="/login" 
              className="bg-[#0f110f] dark:bg-white text-white dark:text-[#0f110f] px-7 py-3 rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl"
            >
              Leader Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;