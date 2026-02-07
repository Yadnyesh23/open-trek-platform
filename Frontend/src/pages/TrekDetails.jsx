import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../api/config';

import {
  MapPin,
  Clock,
  IndianRupee,
  Calendar,
  ChevronLeft,
  ShieldCheck,
  Mountain,
  MessageCircle // Added for WhatsApp icon
} from 'lucide-react';

const TrekDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trek, setTrek] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchTrekDetails = async () => {
      try {
        const res = await axios.get(`API_BASE_URL/treks/${id}`);
        setTrek(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrekDetails();
  }, [id]);

  // Handler for WhatsApp Enquiry
  const handleWhatsAppEnquiry = () => {
    if (!trek) return;
    const phoneNumber = trek.whatsapp || "91XXXXXXXXXX"; // Fallback if number is missing
    const message = `Hi! I'm interested in the ${trek.trekName} expedition. Can I get more details?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0a0c0a]">
        <div className="w-10 h-10 border-2 border-moss border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-white pt-24 pb-24 px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-white/40 font-black uppercase tracking-widest text-[11px] hover:text-moss transition"
        >
          <ChevronLeft size={16} />
          Back to Explore
        </button>

        {/* HEADER */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="px-3 py-1 rounded-lg bg-moss/10 text-moss border border-moss/20 text-[9px] font-black uppercase tracking-wider">
              {trek.difficulty}
            </span>

            <span className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-white/40">
              <MapPin size={12} className="text-moss" />
              {trek.location}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight italic uppercase">
            {trek.trekName}
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery */}
            <section className="space-y-5">
              <div className="aspect-[16/8] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
                <img
                  src={trek.images[activeImage]}
                  alt={trek.trekName}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {trek.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-24 h-16 rounded-xl overflow-hidden border transition
                      ${activeImage === i ? 'border-moss scale-105' : 'border-white/10 opacity-40 hover:opacity-80'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="thumb" />
                  </button>
                ))}
              </div>
            </section>

            {/* Description */}
            <section className="relative bg-[#141614] rounded-[3rem] p-10 border border-white/5 overflow-hidden">
              <Mountain className="absolute -bottom-12 -right-12 w-56 h-56 text-white/[0.02]" />
              <div className="relative z-10 space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-moss">
                  Expedition Overview
                </h3>
                <p className="text-white/60 leading-relaxed font-medium text-base">
                  {trek.description}
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 max-w-[360px] mx-auto lg:ml-auto">
              <div className="bg-white text-[#0a0c0a] rounded-[3rem] p-8 shadow-2xl space-y-6">

                <div className="text-center space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">
                    Expedition Cost
                  </p>
                  <h2 className="text-5xl font-black tracking-tighter flex justify-center items-center">
                    <IndianRupee size={28} strokeWidth={3} />
                    {trek.price}
                  </h2>
                </div>

                <div className="space-y-4 py-6 border-y border-black/5 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 opacity-60">
                      <Calendar size={16} className="text-moss" />
                      Departure
                    </span>
                    <span>{trek.month}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="flex items-center gap-2 opacity-60">
                      <Clock size={16} className="text-moss" />
                      Duration
                    </span>
                    <span>{trek.duration}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 rounded-2xl bg-[#0a0c0a] text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-moss hover:text-[#0a0c0a] transition shadow-lg active:scale-95">
                    Join Expedition
                  </button>
                  
                  {/* WHATSAPP ENQUIRY BUTTON */}
                  <button 
                    onClick={handleWhatsAppEnquiry}
                    className="w-full py-4 rounded-2xl bg-white border-2 border-[#0a0c0a] text-[#0a0c0a] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-green-50 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <MessageCircle size={14} className="text-green-600" />
                    Enquire on WhatsApp
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-30">
                  <ShieldCheck size={12} />
                  Verified Listing
                </div>

              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default TrekDetails;