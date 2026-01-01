
import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Activity, Users, MessageSquare, Code, ArrowRight, Mic, Phone, Play, Terminal, Check, X, Info, Search, Sparkles, Shield, Lock, FileText, Sliders } from 'lucide-react';
import { FooterAssistant } from './FooterAssistant.tsx';

interface LandingPageProps {
  onGetStarted: () => void;
  onEnterAsGuest: () => void;
}

// Logo URL representing the 3-node triangle logo provided by the user
const logoUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDUwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjI1MCIgcj0iMTcwIiBzdHJva2U9InVybCgjZ3JhZDEpIiBzdHJva2Utd2lkdGg9IjEyIi8+CjxjaXJjbGUgY3g9IjI1MCIgY3k9IjE2MCIgcj0iMzUiIGZpbGw9IiM4QjVDRjYiLz4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iMzAwIiByPSIzNSIgZmlsbD0iIzNCODJGNiIvPgo8Y2lyY2xlIGN4PSIzMzAiIGN5PSIzMDAiIHI9IjM1IiBmaWxsPSIjMDBGMEY2Ii8+CjxsaW5lIHgxPSIyNTAiIHkxPSIxNjAiIHgyPSIxNzAiIHkyPSIzMDAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjMiIHN0cm9rZS13aWR0aD0iMyIvPgo8bGluZSB4MT0iMjUwIiB5MT0iMTYwIiB4Mj0iMzMwIiB5Mj0iMzAwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjMiLz4KPGxpbmUgeDE9IjE3MCIgeTE9IjMwMCIgeDI9IjMzMCIgeTI9IjMwMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMyIgc3Ryb2tlLXdpZHRoPSIzIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQxIiB4MT0iODAiIHkxPSI4MCIgeDI9IjQyMCIgeTI9IjQyMCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBzdG9wLWNvbG9yPSIjOEI1Q0Y2Ii8+CjxzdG9wIG9mZnNldD0iMC41IiBzdG9wLWNvbG9yPSIjM0I4MkY2Ii8+CjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwRjBGRiIvPgo8L2xpbmVhckdyYWRpZW50Pgo8L2RlZnM+Cjwvc3ZnPg==';

interface DocsGuideProps {
    onClose: () => void;
}

const DocsGuide: React.FC<DocsGuideProps> = ({ onClose }) => {
    const steps = [
        {
            title: "Setup & Authenticate",
            icon: <Lock size={24} />,
            content: "Start by logging in with your Google account or entering as a Guest. Your chat history and persona settings are instantly synced across your devices.",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            title: "Configure Your Persona",
            icon: <Sliders size={24} />,
            content: "Go to 'Settings' in the top bar. Choose your preferred Tone (Humorous, Professional, etc.), Style, and Verbosity. Easit AI adapts its speech pattern to match your choice.",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            title: "Natural Voice Conversation",
            icon: <Mic size={24} />,
            content: "Tap the Mic icon to enter 'Live Mode'. Our Gemini-powered engine handles natural interruptions and responds with ultra-low latency. Simply speak to start the conversation.",
            color: "text-neon-cyan",
            bg: "bg-neon-cyan/10"
        },
        {
            title: "Activate Verified Search",
            icon: <Search size={24} />,
            content: "Enable 'Verified Search' to ground responses in real-time web data. The assistant will cite sources at the bottom of each message to ensure accuracy and freshness.",
            color: "text-brand-blue",
            bg: "bg-brand-blue/10"
        },
        {
            title: "Hallucination Check",
            icon: <ShieldCheck size={24} />,
            content: "Click the 'Shield' button on any AI response. Easit AI will re-analyze its claims against verified search chunks and flag any potential inaccuracies for you.",
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            title: "Utilize Power Presets",
            icon: <Zap size={24} />,
            content: "Save time with one-click presets like 'Summarize', 'Deep Research', or 'Explain Simply' located right above the text input area.",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-deep-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-glass-black border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up-fade-in relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all z-10"
                >
                    <X size={24} />
                </button>

                <div className="p-8 md:p-12">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-brand-blue/20 rounded-2xl text-brand-blue">
                            <Terminal size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-white">Easit AI Usage Guide</h2>
                            <p className="text-gray-400">Master your voice assistant in 6 simple steps.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {steps.map((step, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${step.bg} ${step.color} group-hover:scale-110 transition-transform`}>
                                    {step.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{i + 1}. {step.title}</h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">{step.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 text-center">
                        <h3 className="text-xl font-bold text-white mb-3">Ready to transform your productivity?</h3>
                        <p className="text-gray-400 mb-6 max-w-lg mx-auto">Experience the most reliable voice AI interaction built for precision and speed.</p>
                        <button 
                            onClick={onClose}
                            className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-all shadow-lg shadow-brand-blue/20"
                        >
                            Start Chatting
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LegalModal = ({ title, content, onClose }: { title: string, content: React.ReactNode, onClose: () => void }) => (
    <div className="fixed inset-0 z-[110] bg-deep-black/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto p-8 relative shadow-2xl">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">{title}</h2>
            <div className="text-gray-400 text-sm space-y-4 leading-relaxed">
                {content}
            </div>
            <button onClick={onClose} className="mt-8 w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl border border-white/10 transition-all">Close</button>
        </div>
    </div>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onEnterAsGuest }) => {
    const [showDocs, setShowDocs] = useState(false);
    const [activeLegal, setActiveLegal] = useState<{ title: string, content: React.ReactNode } | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-deep-black text-white font-sans selection:bg-brand-blue selection:text-white overflow-x-hidden">
            {/* Navbar */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-deep-black/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <img src={logoUrl} alt="Easit.ai Logo" className="w-8 h-8 rounded-full" />
                        <span className="text-xl font-bold tracking-tight text-white">Easit.ai</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-10">
                        <button onClick={() => scrollTo('product')} className="text-sm font-medium text-gray-400 hover:text-white transition">Product</button>
                        <button onClick={() => setShowDocs(true)} className="text-sm font-medium text-gray-400 hover:text-white transition">Usage Guide</button>
                        <button onClick={() => scrollTo('pricing')} className="text-sm font-medium text-gray-400 hover:text-white transition">Pricing</button>
                    </nav>
                    <div className="flex items-center gap-4">
                        <button onClick={onGetStarted} className="text-sm font-medium text-white hover:text-gray-300 transition hidden md:block">Login</button>
                        <button onClick={onGetStarted} className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition shadow-lg">Start for Free</button>
                    </div>
                </div>
            </header>

            <main>
                {/* Hero */}
                <section className="relative pt-32 pb-20 min-h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 grid-bg pointer-events-none"></div>
                    <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-left space-y-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-neon-cyan">
                                <Sparkles size={12} />
                                Hallucination-Free Voice AI
                            </div>
                            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.95] tracking-tighter">
                                Faster. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-purple to-neon-cyan">
                                    Verified.
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                                Experience low-latency conversations grounded in reality. Real-time web search and active verification logic ensure your assistant never hallucinates.
                            </p>
                            <div className="flex flex-wrap items-center gap-5">
                                <button onClick={onEnterAsGuest} className="flex items-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-blue/90 transition shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                                    <Phone size={22} />
                                    Talk to Easit
                                </button>
                                <button onClick={() => setShowDocs(true)} className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 hover:bg-white/5 transition">
                                    <Terminal size={22} />
                                    Read Docs
                                </button>
                            </div>
                        </div>

                        <div className="relative animate-orb-float">
                            <div className="absolute inset-0 bg-brand-blue/20 blur-[120px] rounded-full"></div>
                            <div className="bg-glass-black backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                    <div className="ml-auto font-mono text-[10px] text-gray-500 tracking-widest">GEMINI_LIVE_SESSION</div>
                                </div>
                                <div className="space-y-4 font-mono text-sm">
                                    <div className="text-brand-blue"><span className="text-brand-purple">import</span> {'{'} GoogleGenAI {'}'} <span className="text-brand-purple">from</span> "@google/genai";</div>
                                    <div className="text-gray-400">const ai = new GoogleGenAI();</div>
                                    <div className="text-gray-400">const session = ai.live.connect({'{'}</div>
                                    <div className="pl-6 text-neon-cyan">grounding: "active",</div>
                                    <div className="pl-6 text-neon-cyan">verify: true</div>
                                    <div className="text-gray-400">{'}'});</div>
                                </div>
                                <div className="mt-12 flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center shadow-lg shadow-brand-blue/30">
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500">Security Guard</div>
                                            <div className="text-sm font-bold text-white">Verification ON</div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">HEALTHY</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="product" className="py-32 bg-deep-black relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24 max-w-3xl mx-auto space-y-4">
                            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Engineered for Accuracy.</h2>
                            <p className="text-gray-400 text-xl leading-relaxed">
                                Most AI assistants guess when they don't know. Easit AI searches, verifies, and cites.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard icon={<ShieldCheck size={26} />} title="Hallucination Checks">
                                Our unique verification algorithm cross-references AI internal logic with external web chunks instantly.
                            </FeatureCard>
                            <FeatureCard icon={<Search size={26} />} title="Real-time Grounding">
                                Powered by Google Search, fetching real-time news, documentation, and market data.
                            </FeatureCard>
                            <FeatureCard icon={<Zap size={26} />} title="Smart Presets">
                                One-click summarization, simplicity mapping, and deep research modes tailored for productivity.
                            </FeatureCard>
                            <FeatureCard icon={<Mic size={26} />} title="Voice Interaction">
                                Ultra-low latency voice with interruptible streaming. It listens as well as it speaks.
                            </FeatureCard>
                            <FeatureCard icon={<Shield size={26} />} title="Privacy First">
                                End-to-end encrypted storage for chats and secure session management.
                            </FeatureCard>
                            <FeatureCard icon={<Code size={26} />} title="Technical Personas">
                                Specialized modes for developers, researchers, and creative writers.
                            </FeatureCard>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-32 bg-deep-black">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Simple, fair pricing.</h2>
                            <p className="text-gray-400 text-lg">Choose the plan that fits your research needs.</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            <PricingCard 
                                title="Free User" 
                                price="$0"
                                highlight 
                                buttonText="Get Started"
                                features={["25 Verified Searches/day", "Unlimited standard voice", "History syncing", "All persona settings", "Community support"]}
                                onSelect={onGetStarted}
                            />
                            <PricingCard 
                                title="Pro Account" 
                                price="$20" 
                                buttonText="Upgrade Now"
                                features={["Unlimited Verified Searches", "Priority server access", "Custom persona templates", "API Access (Early)", "Direct support"]}
                                onSelect={onGetStarted}
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-black py-20 border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 space-y-6">
                            <div className="flex items-center gap-2">
                                <img src={logoUrl} alt="Easit.ai Logo" className="w-10 h-10 rounded-full" />
                                <span className="text-lg font-bold text-white">Easit.ai</span>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Building the world's most reliable voice assistant grounded in real-time information.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><button onClick={() => scrollTo('product')} className="hover:text-brand-blue transition">Voice AI</button></li>
                                <li><button onClick={() => scrollTo('product')} className="hover:text-brand-blue transition">Grounding</button></li>
                                <li><button onClick={() => scrollTo('pricing')} className="hover:text-brand-blue transition">Pricing</button></li>
                                <li><button onClick={() => setShowDocs(true)} className="hover:text-brand-blue transition">Guide</button></li>
                                <li><button onClick={() => setActiveLegal({ title: "Remove Presets Info", content: <p>You can customize or reset your AI persona presets at any time within the Chat Interface settings. Simply log in, navigate to Settings, and click "Reset Defaults" to restore the original configuration.</p> })} className="hover:text-brand-blue transition text-left">Remove Presets</button></li>
                                <li><button onClick={() => setActiveLegal({ title: "Security Overview", content: <><p>Security is baked into Easit AI's core. We use industry-standard AES-256 encryption for data at rest and TLS 1.3 for all data in transit. Your voice biometrics are never stored as raw audio files; instead, we generate transient cryptographic hashes that expire with your session.</p></> })} className="hover:text-brand-blue transition">Security</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Usage</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><button onClick={() => setShowDocs(true)} className="hover:text-brand-blue transition">Usage Guide</button></li>
                                <li><button onClick={() => scrollTo('product')} className="hover:text-brand-blue transition">Smart Presets</button></li>
                                <li><button onClick={() => scrollTo('product')} className="hover:text-brand-blue transition">Security Logic</button></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><button onClick={() => setActiveLegal({ title: "About Easit AI", content: <><p>Easit AI was founded with a simple goal: make AI reliable. We believe voice interaction is the future, but only if users can trust the information provided. Our proprietary Grounding Engine ensures every word is backed by real data.</p><p>We are a remote-first team of engineers and linguists dedicated to solving the hallucination problem in large language models.</p></> })} className="hover:text-brand-blue transition">About</button></li>
                                <li><button onClick={() => setActiveLegal({ title: "Privacy Policy", content: <><p>1. Data Collection: We store chat history only for your synchronization needs. We do not sell data to third parties.</p><p>2. Security: All data is encrypted at rest and in transit using bank-grade protocols.</p><p>3. Controls: You can delete your history, account, and all associated data at any time from your dashboard.</p></> })} className="hover:text-brand-blue transition">Privacy Policy</button></li>
                                <li><button onClick={() => setActiveLegal({ title: "Terms of Service", content: <><p>By using Easit AI, you agree to fair use of our API resources. Harassment or abusive prompts directed at the AI or our infrastructure will result in account suspension. Free plans are subject to daily rate limits for search and voice modalities.</p></> })} className="hover:text-brand-blue transition text-left">Terms & Conditions</button></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 gap-4">
                        <p>© 2024 Easit.ai Inc. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white transition">Twitter</a>
                            <a href="#" className="hover:text-white transition">GitHub</a>
                            <a href="#" className="hover:text-white transition">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>

            <FooterAssistant />
            {showDocs && <DocsGuide onClose={() => setShowDocs(false)} />}
            {activeLegal && <LegalModal title={activeLegal.title} content={activeLegal.content} onClose={() => setActiveLegal(null)} />}
        </div>
    );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
    <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-blue/30 transition-all group">
        <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-6 group-hover:scale-110 group-hover:bg-brand-blue group-hover:text-white transition-all">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{children}</p>
    </div>
);

const PricingCard = ({ title, price, features, highlight, buttonText, onSelect }: { title: string; price: string; features: string[]; highlight?: boolean; buttonText: string; onSelect: () => void }) => (
    <div className={`p-10 rounded-3xl border flex flex-col h-full transition-all ${highlight ? 'border-brand-blue bg-brand-blue/5 shadow-[0_0_50px_rgba(59,130,246,0.1)]' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
        <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-400 mb-2">{title}</h3>
            <div className="text-5xl font-bold text-white tracking-tighter">{price}<span className="text-sm text-gray-500 font-normal">/mo</span></div>
        </div>
        <ul className="flex-1 space-y-4 mb-10">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check size={16} className="text-brand-blue" />
                    {f}
                </li>
            ))}
        </ul>
        <button onClick={onSelect} className={`w-full py-4 rounded-full font-bold transition-all ${highlight ? 'bg-brand-blue text-white hover:bg-brand-blue/90' : 'bg-white text-black hover:bg-gray-200'}`}>
            {buttonText}
        </button>
    </div>
);
