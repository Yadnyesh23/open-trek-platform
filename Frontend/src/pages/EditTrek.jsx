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
          trekName: trek.trekName || '',
          location: trek.location || '',
          date: trek.date
            ? new Date(trek.date).toISOString().split('T')[0]
            : '',
          month: trek.month || 'Jan',
          duration: trek.duration || '',
          difficulty: trek.difficulty || 'Easy',
          price: trek.price || '',
          leaderName: trek.leaderName || '',
          whatsapp: trek.whatsapp || '',
          description: trek.description || '',
        });
      } catch (err) {
        console.error("Fetch trek error:", err.response?.data || err.message);
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      if (images && images.length > 0) {
        Array.from(images).forEach((img) => {
          payload.append('images', img);
        });
      }

      const token = localStorage.getItem('token');

      await axios.put(`${API_BASE_URL}/treks/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Important: force dashboard refresh
      navigate('/dashboard', { state: { updated: true, time: Date.now() } });

    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  /* ---------------- Loading Screen ---------------- */
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
          <h1 className="text-4xl font-black tracking-tighter italic">
            Update Expedition
          </h1>
          <p className="text-white/40 mt-2">
            Refine the trail intelligence for the tribe.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#141614] border border-white/5 rounded-[3rem] p-10 space-y-12 shadow-2xl"
        >
          {/* Core Info */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">Trek Name</label>
                  <input
                    name="trekName"
                    value={formData.trekName}
                    onChange={handleChange}
                    required
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
                    className="input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input"
                />

                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="input"
                >
                  {[
                    'Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec'
                  ].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>

                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Easy</option>
                  <option>Moderate</option>
                  <option>Hard</option>
                </select>

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

            {/* Sidebar */}
            <aside className="space-y-6 bg-black/30 rounded-3xl p-6 border border-white/5">
              <input
                name="leaderName"
                value={formData.leaderName}
                onChange={handleChange}
                placeholder="Leader Name"
                className="input"
              />

              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="91xxxxxxxxxx"
                className="input"
              />

              <input
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="1N / 2D"
                className="input"
              />
            </aside>
          </section>

          {/* Description */}
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="input rounded-3xl p-6 min-h-[150px]"
          />

          {/* Image Upload */}
          <section className="relative border-2 border-dashed border-white/10 rounded-3xl p-10 text-center hover:bg-white/5 transition group">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={(e) => setImages(e.target.files)}
            />
            <ImageIcon className="mx-auto mb-3 text-white/20 group-hover:text-moss" size={36} />
            <p className="font-black text-sm uppercase tracking-widest">
              Update Gallery Images
            </p>
            <p className="text-white/40 text-[10px] mt-2">
              {images.length > 0
                ? `${images.length} files selected`
                : 'Leave empty to keep existing images'}
            </p>
          </section>

          {/* Submit */}
          <button
            disabled={updating}
            className="w-full py-5 rounded-[2rem] bg-white text-[#0a0c0a] font-black uppercase tracking-[0.25em] text-[11px] hover:bg-moss transition-all shadow-xl active:scale-95 disabled:opacity-60 flex items-center justify-center"
          >
            {updating ? <Loader2 className="animate-spin" /> : 'Save Modifications'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTrek;
