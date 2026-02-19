import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, IndianRupee, MessageCircle, Calendar, Trash2, Edit3, ArrowUpRight } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../api/config';

const TrekCard = ({ trek, isPublic = false, onTrekDeleted }) => {
  const navigate = useNavigate();
  const displayImage = trek.images?.[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000';

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Remove this expedition?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${API_BASE_URL}/treks/${trek._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (onTrekDeleted) onTrekDeleted(trek._id);
      } catch (err) {
        alert("Failed to delete the trek.");
      }
    }
  };

  return (
    <div className="group relative bg-white dark:bg-[#1a1d1a] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/5 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-2 flex flex-col h-full">
      
      {/* Delete Action (Dashboard Only) */}
      {!isPublic && (
        <button 
          onClick={handleDelete}
          className="absolute top-4 left-4 z-20 p-2.5 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-xl"
        >
          <Trash2 size={16} />
        </button>
      )}

      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={displayImage} 
          alt={trek.trekName}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d1a] via-transparent to-transparent opacity-60" />
        
        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white shadow-2xl">
            {trek.difficulty}
          </span>
        </div>
        
        {/* Date Overlay */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <div className="bg-moss p-1.5 rounded-lg shadow-lg">
            <Calendar size={12} className="text-[#0f110f]" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            {trek.month} {trek.date ? new Date(trek.date).getDate() : ''}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 space-y-6 flex flex-col flex-grow">
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-[#0f110f] dark:text-white leading-tight tracking-tighter group-hover:text-moss transition-colors">
            {trek.trekName}
          </h3>
          <div className="flex items-center gap-1.5 opacity-60 dark:text-white">
            <MapPin size={14} className="text-moss" />
            <span className="text-[10px] font-black uppercase tracking-[0.15em]">{trek.location}</span>
          </div>
        </div>

        {/* Modern Stats Grid */}
        <div className="grid grid-cols-2 gap-4 py-5 border-y border-black/5 dark:border-white/5">
          <div className="space-y-1">
            <span className="text-[8px] font-black text-moss uppercase tracking-[0.2em]">Duration</span>
            <div className="flex items-center gap-1.5 dark:text-white font-bold text-sm italic">
              <Clock size={14} className="opacity-40" /> {trek.duration}
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-[8px] font-black text-moss uppercase tracking-[0.2em]">Investment</span>
            <div className="flex items-center justify-end gap-0.5 dark:text-white font-black text-lg">
              <IndianRupee size={16} className="opacity-40" /> {trek.price}
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="flex gap-3 pt-2 mt-auto">
          {isPublic ? (
            <button 
              onClick={() => navigate(`/trek/${trek._id}`)}
              className="flex-1 py-4 bg-[#0f110f] dark:bg-white text-white dark:text-[#0f110f] rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-moss dark:hover:bg-moss transition-all group/btn shadow-xl"
            >
              View Expedition <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <button 
              onClick={() => navigate(`/edit-trek/${trek._id}`)}
              className="flex-1 py-4 bg-[#f5f5f5] dark:bg-white/5 text-[#0f110f] dark:text-white border border-black/5 dark:border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-moss dark:hover:bg-moss dark:hover:text-[#0f110f] transition-all"
            >
              <Edit3 size={14} /> Edit
            </button>
          )}
          
          <a 
            href={`https://wa.me/${trek.whatsapp}?text=Hi, I'm interested in the ${trek.trekName} expedition!`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 bg-moss/10 dark:bg-moss/5 text-moss rounded-2xl hover:bg-moss hover:text-[#0f110f] transition-all border border-moss/20"
            title="Chat with Leader"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrekCard;