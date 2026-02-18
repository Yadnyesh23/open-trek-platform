import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Mountain,
  Image as ImageIcon,
  Loader2
} from 'lucide-react';
import API_BASE_URL from '../api/config';

const CreateTrek = () => {
  const [loading, setLoading] = useState(false);
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
    description: ''
  });

  const navigate = useNavigate();

  const handleFileChange = (e) => setImages(e.target.files);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    Array.from(images).forEach(file => data.append('images', file));

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_BASE_URL}treks`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create trek');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c0a] text-white px-6 pt-24 pb-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <Mountain className="mx-auto mb-4 text-moss" size={28} />
          <h1 className="text-4xl font-black tracking-tighter">
            Publish an Expedition
          </h1>
          <p className="text-white/40 mt-2">
            Share the trail. Lead the tribe.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#141614] border border-white/5 rounded-[3rem] p-10 space-y-12"
        >

          {/* Core Info */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left */}
            <div className="lg:col-span-2 space-y-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Trek Name', key: 'trekName', placeholder: 'Kalsubai Peak' },
                  { label: 'Location', key: 'location', placeholder: 'Bhandardara, MH' },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="label">{f.label}</label>
                    <input
                      required
                      placeholder={f.placeholder}
                      className="input"
                      onChange={(e) =>
                        setFormData({ ...formData, [f.key]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="label">Date</label>
                  <input
                    type="date"
                    required
                    className="input"
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="label">Month</label>
                  <select
                    className="input"
                    onChange={(e) =>
                      setFormData({ ...formData, month: e.target.value })
                    }
                  >
                    {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                      .map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="label">Difficulty</label>
                  <select
                    className="input"
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                  >
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Hard</option>
                  </select>
                </div>

                <div>
                  <label className="label">Price (₹)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    className="input"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Right */}
            <aside className="space-y-6 bg-black/30 rounded-3xl p-6 border border-white/5">
              {[
                { label: 'Leader Name', key: 'leaderName' },
                { label: 'WhatsApp', key: 'whatsapp', placeholder: '91xxxxxxxxxx' },
                { label: 'Duration', key: 'duration', placeholder: '1N / 2D' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="label">{f.label}</label>
                  <input
                    required
                    placeholder={f.placeholder}
                    className="input"
                    onChange={(e) =>
                      setFormData({ ...formData, [f.key]: e.target.value })
                    }
                  />
                </div>
              ))}
            </aside>
          </section>

          {/* Description */}
          <section>
            <label className="label">Expedition Description</label>
            <textarea
              rows="4"
              placeholder="What makes this trek special?"
              className="input rounded-3xl p-6"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </section>

          {/* Upload */}
          <section className="relative border-2 border-dashed border-white/10 rounded-3xl p-10 text-center hover:bg-white/5 transition">
            <input
              type="file"
              multiple
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <ImageIcon className="mx-auto mb-3 text-white/30" size={36} />
            <p className="font-black">Upload Gallery Images</p>
            <p className="text-white/40 text-sm mt-1">
              {images.length} files selected
            </p>
          </section>

          {/* CTA */}
          <button
            disabled={loading}
            className="w-full py-5 rounded-[2rem] bg-white text-[#0a0c0a] font-black uppercase tracking-[0.25em] text-[11px] hover:bg-moss transition-all shadow-xl active:scale-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Publish Expedition'}
          </button>

        </form>
      </div>

      {/* Utility styles */}
      <style jsx>{`
        .label {
          display: block;
          margin-bottom: 0.4rem;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
        }
        .input {
          width: 100%;
          padding: 0.9rem 1rem;
          border-radius: 1.25rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          outline: none;
        }
        .input:focus {
          border-color: rgba(122, 255, 155, 0.6);
        }
      `}</style>
    </div>
  );
};

export default CreateTrek;
