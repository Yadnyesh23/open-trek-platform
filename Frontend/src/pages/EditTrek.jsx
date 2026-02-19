import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Mountain,
  Image as ImageIcon,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import API_BASE_URL from '../api/config';

const EditTrek = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    trekName: '',
    location: '',
    date: '',
    month: 'Jan',
    duration: '',
    difficulty: 'Easy',
    price: '',
    leaderName: '',
    whatsapp: '',
    description: '',
  });

  /* ---------------- Fetch trek ---------------- */
  useEffect(() => {
    const fetchTrek = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/treks/${id}`);
        const trek = data.data;

        setFormData({
          ...trek,
          date: trek.date ? new Date(trek.date).toISOString().split('T')[0] : '',
        });
      } catch (err) {
        alert('Failed to load trek');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchTrek();
  }, [id, navigate]);

  /* ---------------- Handlers ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      if (images.length > 0) {
        Array.from(images).forEach((img) => payload.append('images', img));
      }

      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}/treks/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0c0a] flex items-center justify-center">
        <Loader2 className="animate-spin text-moss" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-white px-6 pt-24 pb-24">
      <div className="max-w-6xl mx-auto">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-white/30 font-black uppercase tracking-widest text-[9px] mb-8 hover:text-moss transition-colors"
        >
          <ChevronLeft size={16} /> Cancel Edit
        </button>

        {/* Header */}
        <div className="mb-12 text-center">
          <Mountain className="mx-auto mb-4 text-moss" size={28} />
          <h1 className="text-4xl font-black tracking-tighter italic">Update Expedition</h1>
          <p className="text-white/40 mt-2">Refine the trail intelligence for the tribe.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#141614] border border-white/5 rounded-[3rem] p-10 space-y-12 shadow-2xl">
          
          {/* Core Info Grid (2/3 Split) */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Trek Name</label>
                  <input
                    name="trekName"
                    value={formData.trekName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Kalsubai Peak"
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Location</label>
                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Bhandardara, MH"
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="input"
                  />
                </div>
                <div>
                  <label className="label">Month</label>
                  <select name="month" value={formData.month} onChange={handleChange} className="input">
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => (
                      <option key={m} className="bg-[#141614]">{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Difficulty</label>
                  <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="input">
                    <option className="bg-[#141614]">Easy</option>
                    <option className="bg-[#141614]">Moderate</option>
                    <option className="bg-[#141614]">Hard</option>
                  </select>
                </div>
                <div>
                  <label className="label">Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Right Column */}
            <aside className="space-y-6 bg-black/30 rounded-3xl p-6 border border-white/5">
              <div>
                <label className="label">Leader Name</label>
                <input name="leaderName" value={formData.leaderName} onChange={handleChange} className="input" />
              </div>
              <div>
                <label className="label">WhatsApp</label>
                <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="91xxxxxxxxxx" className="input" />
              </div>
              <div>
                <label className="label">Duration</label>
                <input name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 1N / 2D" className="input" />
              </div>
            </aside>
          </section>

          {/* Description Section */}
          <section>
            <label className="label">Expedition Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="What makes this trek special?"
              className="input rounded-3xl p-6 min-h-[150px]"
            />
          </section>

          {/* Upload Section */}
          <section className="relative border-2 border-dashed border-white/10 rounded-3xl p-10 text-center hover:bg-white/5 transition group">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => setImages(e.target.files)}
            />
            <ImageIcon className="mx-auto mb-3 text-white/20 group-hover:text-moss transition-colors" size={36} />
            <p className="font-black text-sm uppercase tracking-widest">Update Gallery Images</p>
            <p className="text-white/40 text-[10px] mt-2 font-bold uppercase tracking-tighter">
              {images.length > 0 ? `${images.length} files selected` : 'Leave empty to keep existing images'}
            </p>
          </section>

          {/* CTA Button */}
          <button
            disabled={updating}
            className="w-full py-5 rounded-[2rem] bg-white text-[#0a0c0a] font-black uppercase tracking-[0.25em] text-[11px] hover:bg-moss transition-all shadow-xl active:scale-95 disabled:opacity-60 flex items-center justify-center"
          >
            {updating ? <Loader2 className="animate-spin" /> : 'Save Modifications'}
          </button>

        </form>
      </div>

      {/* Synchronized Utility Styles */}
      <style jsx>{`
        .label {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .input {
          width: 100%;
          padding: 0.9rem 1.2rem;
          border-radius: 1.25rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.3s ease;
        }
        .input:focus {
          border-color: rgba(122, 255, 155, 0.6);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 0 20px rgba(122, 255, 155, 0.05);
        }
        select.input {
          cursor: pointer;
        }
        textarea.input {
          resize: none;
        }
      `}</style>
    </div>
  );
};

export default EditTrek;