import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { Mail, Lock, ArrowRight, Mountain } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await authService.login(formData);

      const data = response.data?.data || response.data || response;
      const token = data?.token || data?.data?.token;
      const user = data?.user || data?.data?.user;

      if (token && user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        setError('Login succeeded, but user data was missing.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="h-screen bg-[#0a0c0a] flex items-center justify-center px-4 overflow-hidden relative">

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-moss/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[380px] animate-in fade-in zoom-in duration-500">

        {/* Header */}
        <header className="text-center mb-8 space-y-2">
          <Mountain className="mx-auto text-moss" size={22} />
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">
            Welcome <span className="text-moss">Back</span>
          </h1>
          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">
            Resume Your Expedition
          </p>
        </header>

        {/* Card */}
        <div className="bg-[#141614] rounded-[2.2rem] border border-white/5 shadow-2xl p-7">

          {error && (
            <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[10px] font-bold text-red-200 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black uppercase tracking-[0.18em] text-moss ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-white/20 group-focus-within:text-moss transition" />
                <input
                  type="email"
                  required
                  placeholder="leader@trail.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white placeholder:text-white/10 outline-none focus:border-moss/40 transition"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black uppercase tracking-[0.18em] text-moss ml-1">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-white/20 group-focus-within:text-moss transition" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white placeholder:text-white/10 outline-none focus:border-moss/40 transition"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* CTA */}
            <button
              type="submit"
              className="group w-full mt-2 py-4 bg-white text-[#0a0c0a] rounded-2xl font-black uppercase tracking-[0.25em] text-[9px] shadow-xl hover:bg-moss transition active:scale-95 flex items-center justify-center gap-2"
            >
              Enter Camp
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-7 pt-5 border-t border-white/5 text-center">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/25">
              New here?{' '}
              <Link
                to="/register"
                className="text-moss hover:text-white transition"
              >
                Create an account
              </Link>
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Login;
