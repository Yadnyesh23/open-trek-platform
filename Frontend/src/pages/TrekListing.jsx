import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { trekService } from '../api/trekService';
import { Search, SlidersHorizontal, Loader2, Compass } from 'lucide-react';
import TrekCard from '../components/TrekCard';

const TrekListing = () => {
  const [filters, setFilters] = useState({
    search: '',
    month: '',
    difficulty: ''
  });

  const { data, isLoading } = useQuery({
    queryKey: ['treks', filters],
    queryFn: () => trekService.getAllTreks(filters),
  });

  const treks = data?.data?.treks || [];

  return (
  <div className="pb-24">
    
    {/* Hero Header */}
    <section className="pt-16 pb-14 px-6">
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-moss/10 border border-moss/20 text-moss text-[10px] font-black uppercase tracking-[0.25em]">
          <Compass size={14} /> Open Expeditions
        </div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#0f110f] dark:text-white">
          FIND YOUR <span className="text-moss italic">NEXT PEAK.</span>
        </h1>

        <p className="text-earth/60 dark:text-white/50 font-medium max-w-xl mx-auto leading-relaxed">
          Browse vetted trails led by experienced local guides across the Sahyadri and beyond.
        </p>
      </div>
    </section>

    {/* Filter Bar */}
    <section className="sticky top-24 z-40 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/80 dark:bg-[#1a1d1a]/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-black/5 dark:border-white/10 px-4 py-4">

          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            
            {/* Search */}
            <div className="flex-1 relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-moss transition-transform group-focus-within:scale-110"
                size={18}
              />
              <input
                type="text"
                placeholder="Search expeditions..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#f5f5f5] dark:bg-white/5 rounded-2xl border border-transparent focus:border-moss/30 outline-none text-sm font-bold text-[#0f110f] dark:text-white placeholder:text-earth/40"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <select
                className="w-full md:w-40 appearance-none py-3.5 px-4 bg-[#f5f5f5] dark:bg-white/5 rounded-2xl border border-transparent focus:border-moss/30 text-[10px] font-black text-black dark:text-[#f5f5f5] uppercase tracking-widest cursor-pointer"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, month: e.target.value }))
                }
              >
                <option value="" >All Months</option>
                {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
                  <option key={m} value={m} className="bg-[#1f1f1f] text-[#f5f5f5]">{m}</option>
                ))}
              </select>

              <select
                className="w-full md:w-40 appearance-none py-3.5 px-4 bg-[#f5f5f5] dark:bg-white/5 rounded-2xl border border-transparent focus:border-moss/30 text-[10px] font-black text-black dark:text-[#f5f5f5] uppercase tracking-widest cursor-pointer"
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, difficulty: e.target.value }))
                }
              >
                <option value="" className="bg-[#1f1f1f] text-[#f5f5f5]">Difficulty</option>
                <option value="Easy" className="bg-[#1f1f1f] text-[#f5f5f5]">Easy</option>
                <option value="Moderate" className="bg-[#1f1f1f] text-[#f5f5f5]">Moderate</option>
                <option value="Hard" className="bg-[#1f1f1f] text-[#f5f5f5]">Hard</option>
              </select>

              
            </div>

          </div>
        </div>
      </div>
    </section>

    {/* Trek Grid */}
    <section className="pt-20 px-6">
      <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center py-32 gap-4">
            <Loader2 className="animate-spin text-moss" size={48} />
            <p className="text-moss font-black uppercase tracking-[0.3em] text-[10px]">
              Scouting Trails
            </p>
          </div>
        ) : treks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {treks.map((trek) => (
              <TrekCard key={trek._id} trek={trek} isPublic />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center border-2 border-dashed border-black/5 dark:border-white/5 rounded-[3rem]">
            <p className="text-earth/40 dark:text-white/20 font-black uppercase tracking-widest">
              No expeditions found
            </p>
          </div>
        )}
      </div>
    </section>

  </div>
);

};

export default TrekListing;