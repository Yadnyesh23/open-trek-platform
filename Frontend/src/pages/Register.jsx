import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../api/authService';
import { User, Mail, Lock, Mountain, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'leader',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(formData);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
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
          <div className="flex items-center justify-center gap-2 text-moss">
            <Mountain size={22} />
          </div>

          <h1 className="text-2xl font-black tracking-tighter uppercase italic">
            Join the <span className="text-moss">Tribe</span>
          </h1>

          <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/30">
            Trek Leader Registration
          </p>
        </header>

        {/* Card */}
        <div className="bg-[#141614] rounded-[2.2rem] border border-white/5 shadow-2xl p-7">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-black uppercase tracking-[0.18em] text-moss ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 size-3.5 text-white/20 group-focus-within:text-moss transition" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white placeholder:text-white/10 outline-none focus:border-moss/40 transition"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

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
              Start Leading
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-7 pt-5 border-t border-white/5 text-center">
            <p className="text-[8px] font-black uppercase tracking-widest text-white/25">
              Already onboard?{' '}
              <Link
                to="/login"
                className="text-moss hover:text-white transition"
              >
                Login
              </Link>
            </p>
          </footer>

        </div>
      </div>
    </div>
  );
};

export default Register;
