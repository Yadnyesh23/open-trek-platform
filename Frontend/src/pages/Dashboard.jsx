import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, LayoutGrid, LogOut, Loader2, Mountain } from 'lucide-react';
import TrekCard from '../components/TrekCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleTrekDeleted = (deletedId) => {
    setTreks((prev) => prev.filter((t) => t._id !== deletedId));
  };

  useEffect(() => {
    const fetchMyTreks = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5001/api/treks/my', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTreks(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyTreks();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-white px-6 pt-24 pb-24">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <section className="relative bg-[#141614] border border-white/5 rounded-[3rem] p-10 overflow-hidden">
          <Mountain className="absolute -right-16 -top-16 w-72 h-72 text-white/[0.03]" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-moss mb-2">
                Leader Console
              </p>
              <h1 className="text-4xl font-black tracking-tighter">
                Trailhead Dashboard
              </h1>
              <p className="text-white/40 mt-2 font-medium">
                Welcome back, <span className="text-white font-black">{user?.name}</span>
              </p>
            </div>

            <div className="flex gap-3 items-start">
              <button
                onClick={() => navigate('/create-trek')}
                className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-[#0a0c0a] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-moss transition-all active:scale-95 shadow-xl"
              >
                <Plus size={14} /> New Trek
              </button>

              <button
                onClick={handleLogout}
                className="p-4 rounded-2xl border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Active Treks', value: treks.length },
            { label: 'Total Views', value: 0 },
            { label: 'Inquiries', value: 0 },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#141614] border border-white/5 rounded-2xl p-6"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-white/30">
                {stat.label}
              </p>
              <p className="text-4xl font-black tracking-tight mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        {/* Main Content */}
        {loading ? (
          <div className="py-32 flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-moss" size={36} />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40">
              Mapping your expeditions…
            </p>
          </div>
        ) : treks.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {treks.map((trek) => (
              <TrekCard
                key={trek._id}
                trek={trek}
                isPublic={false}
                onTrekDeleted={handleTrekDeleted}
              />
            ))}
          </section>
        ) : (
          <section className="py-28 text-center bg-[#141614] rounded-[3rem] border border-dashed border-white/10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/5 flex items-center justify-center text-moss">
              <LayoutGrid size={28} />
            </div>

            <h3 className="text-xl font-black">
              No Treks Listed
            </h3>
            <p className="text-white/40 max-w-sm mx-auto mt-2">
              Your dashboard is empty. Begin by publishing your first expedition.
            </p>

            <button
              onClick={() => navigate('/create-trek')}
              className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-moss hover:text-white transition"
            >
              + Create your first trek
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
