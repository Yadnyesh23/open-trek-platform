import React from 'react';
import { useNavigate } from 'react-router-dom';
import profileImg from '../assets/YadnyeshPfp.png';
import {
    Mountain,
    Target,
    Zap,
    Github,
    Linkedin,
    Globe,
    Mail,
    Compass
} from 'lucide-react';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0a0c0a] text-white pt-32 pb-24 px-6 relative">


            <button
                onClick={() => navigate('/')}
                className="fixed top-28 left-6 z-40 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-moss hover:border-moss/50 transition-all group"
            >
                <Compass size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                Back to Treks
            </button>

            <div className="max-w-6xl mx-auto space-y-24">


                <section className="text-center space-y-6">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-moss/10 border border-moss/20 text-moss text-[10px] font-black uppercase tracking-widest mb-4">
                        Our Manifesto
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase leading-none">
                        We Build Trails, <br /> Not Just Apps.
                    </h1>
                    <p className="max-w-2xl mx-auto text-white/50 text-lg font-medium leading-relaxed">
                        Open Trek Platform is a specialized ecosystem built for the modern adventurer. We synchronize the spirit of exploration by seamlessly connecting bold trekkers with world-class trekking groups
                    </p>
                </section>


                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-[#141614] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden group hover:border-moss/30 transition-all">
                        <Target className="text-moss mb-6" size={40} />
                        <h3 className="text-2xl font-black mb-4">The Problem</h3>
                        <p className="text-white/40 leading-relaxed uppercase text-xs font-bold tracking-wider">
                            Trekking information today is scattered across multiple platforms —
                            WhatsApp groups, unstructured social media posts, and outdated blogs.
                            Because of this, finding a well-organized trek with a verified leader
                            has become difficult for many trekking enthusiasts.
                        </p>
                    </div>

                    <div className="bg-[#141614] border border-white/5 p-10 rounded-[3rem] relative overflow-hidden group hover:border-moss/30 transition-all">
                        <Zap className="text-moss mb-6" size={40} />
                        <h3 className="text-2xl font-black mb-4">The Solution</h3>
                        <p className="text-white/40 leading-relaxed uppercase text-xs font-bold tracking-wider">
                            We built a platform that brings the entire trekking experience into one place.

                            With a clean and intuitive interface, adventurers can easily discover treks,
                            compare options based on time and budget, explore leader profiles,
                            and join verified trekking groups — all from a single platform.

                            One place for the entire trekking community.
                        </p>
                    </div>
                </section>


                <section className="relative bg-white text-[#0a0c0a] rounded-[4rem] p-10 md:p-20 overflow-hidden">
                    <Mountain className="absolute -bottom-20 -right-20 w-96 h-96 text-black/[0.03]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">

                        <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] bg-[#0a0c0a] flex items-center justify-center shrink-0 overflow-hidden border-8 border-black/5 shadow-2xl">
                            <img
                                src={profileImg}
                                alt="Yadnyesh - Developer"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                        </div>

                        <div className="space-y-6 text-center md:text-left">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 mb-2">Architect & Developer</h4>
                                <h2 className="text-5xl font-black tracking-tighter italic uppercase">Yadnyesh Halde</h2>
                            </div>

                            <p className="text-black/60 font-medium max-w-xl leading-relaxed">
                                I am a developer driven by building scalable solutions for real-world challenges, creating this platform to bridge my technical expertise with my passion for trekking and the outdoors.
                            </p>


                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <SocialLink href="https://yadnyeshhalde.vercel.app" icon={<Globe size={18} />} label="Portfolio" />
                                <SocialLink href="https://github.com/yadnyesh23" icon={<Github size={18} />} label="GitHub" />
                                <SocialLink href="https://www.linkedin.com/in/yadnyesh-halde-447112369" icon={<Linkedin size={18} />} label="LinkedIn" />
                                <SocialLink href="mailto:haldeyadnyesh88@gmail.com" icon={<Mail size={18} />} label="Contact" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 bg-[#0a0c0a] text-white rounded-2xl hover:bg-moss hover:text-[#0a0c0a] transition-all active:scale-95 text-[10px] font-black uppercase tracking-widest shadow-xl"
    >
        {icon}
        {label}
    </a>
);

export default About;