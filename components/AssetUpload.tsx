
import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Music, 
  Image as ImageIcon, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Wand2, 
  Trash2, 
  Play, 
  Pause, 
  CloudLightning, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  Shield
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const AssetUpload: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('Initializing...');
  const [isDeployed, setIsDeployed] = useState(false);
  
  const [metadata, setMetadata] = useState({
    title: '',
    artist: '',
    genre: 'Electronic',
    mood: '',
    bpm: '',
    description: ''
  });

  const audioInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleMetadataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const autoFillMetadata = async () => {
    if (!metadata.description && !metadata.title) return;
    setIsAutoFilling(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Based on this release description: "${metadata.description || metadata.title}", suggest appropriate metadata. 
        Return JSON matching this schema: { title, artist, genre, mood, bpm }.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              artist: { type: Type.STRING },
              genre: { type: Type.STRING },
              mood: { type: Type.STRING },
              bpm: { type: Type.STRING },
            },
            required: ['title', 'artist', 'genre', 'mood', 'bpm']
          }
        }
      });
      const data = JSON.parse(response.text);
      setMetadata(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error("Auto-fill failed", error);
    } finally {
      setIsAutoFilling(false);
    }
  };

  const generateCoverArt = async () => {
    if (!metadata.description && !metadata.title) {
        alert("Please provide a title or description for the AI to imagine a cover.");
        return;
    }
    setIsGeneratingImage(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `A high-quality cinematic music cover art for a track titled "${metadata.title}" described as: ${metadata.description}. Style: futuristic, digital, high contrast, professional album art.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });

      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64Data = part.inlineData.data;
          setImageFile(`data:image/png;base64,${base64Data}`);
        }
      }
    } catch (error) {
      console.error("Image generation failed", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleAudioDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const validTypes = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/x-flac', 'audio/x-wav'];
    if (file && validTypes.includes(file.type)) {
        setAudioFile(file);
    } else if (file) {
        alert("Invalid file type. Please upload MP3, WAV, or FLAC.");
    }
  };

  const handleImageDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) setImageFile(URL.createObjectURL(file));
  };

  const deployToNode = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const statuses = [
      "Initializing Secure Tunnel...",
      "Encrypting Master Audio Assets...",
      "Generating Visual Fingerprints...",
      "Mapping Metadata to ERN 4.3...",
      "Staging for SMART_WATERFALL...",
      "Signing Blockchain Provenance...",
      "Finalizing Node Distribution..."
    ];

    const interval = setInterval(() => {
        setUploadProgress(prev => {
            const next = prev + (Math.random() * 8);
            if (next >= 100) {
                clearInterval(interval);
                setIsUploading(false);
                setIsDeployed(true);
                return 100;
            }
            
            // Map progress to status messages
            const statusIdx = Math.min(
              statuses.length - 1,
              Math.floor((next / 100) * statuses.length)
            );
            setUploadStatus(statuses[statusIdx]);
            
            return next;
        });
    }, 200);
  };

  const resetUpload = () => {
    setAudioFile(null);
    setImageFile(null);
    setIsDeployed(false);
    setUploadProgress(0);
    setMetadata({
        title: '',
        artist: '',
        genre: 'Electronic',
        mood: '',
        bpm: '',
        description: ''
    });
  };

  if (isDeployed) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="relative">
                <div className="w-32 h-32 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                </div>
                <div className="absolute -top-2 -right-2 bg-blue-600 p-2 rounded-lg animate-bounce">
                    <CloudLightning className="w-4 h-4 text-white" />
                </div>
            </div>
            
            <div className="space-y-2">
                <h2 className="text-4xl font-black text-white">DEPLOYMENT SUCCESS</h2>
                <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">
                    Asset ID: LNKZ-{Math.random().toString(36).substr(2, 6).toUpperCase()}
                </p>
            </div>

            <div className="bg-[#121214] border border-zinc-800 p-8 rounded-[2.5rem] w-full max-w-xl shadow-2xl">
                <div className="flex items-center gap-6 text-left">
                    <div className="w-24 h-24 bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800">
                        {imageFile && <img src={typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile as File)} alt="Cover" className="w-full h-full object-cover" />}
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">{metadata.title}</h4>
                        <p className="text-zinc-400">{metadata.artist}</p>
                        <div className="flex gap-2 mt-2">
                             <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-mono border border-blue-500/20 rounded-md">{metadata.genre}</span>
                             <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 rounded-md">VERIFIED</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-blue-500" />
                        <div className="text-left">
                            <div className="text-[10px] text-zinc-600 font-mono uppercase">Blockchain</div>
                            <div className="text-xs text-zinc-300">Tag Generated</div>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-center gap-3">
                        <Globe className="w-5 h-5 text-indigo-500" />
                        <div className="text-left">
                            <div className="text-[10px] text-zinc-600 font-mono uppercase">Distribution</div>
                            <div className="text-xs text-zinc-300">Phase 1 Queued</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button 
                    onClick={resetUpload}
                    className="px-8 py-3 bg-zinc-900 text-zinc-400 font-bold rounded-2xl hover:bg-zinc-800 transition-all border border-zinc-800"
                >
                    Upload Another
                </button>
                <button 
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 flex items-center gap-2"
                >
                    Go to Pipeline <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left: Upload Zones */}
        <div className="w-full md:w-1/2 space-y-6">
          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={handleAudioDrop}
            className={`relative group h-64 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all cursor-pointer ${
              audioFile ? 'border-blue-500 bg-blue-500/5' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30'
            }`}
            onClick={() => audioInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={audioInputRef} 
              className="hidden" 
              accept="audio/mpeg, audio/wav, audio/flac"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) setAudioFile(file);
              }}
            />
            
            {audioFile ? (
              <div className="text-center p-6 space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-900/20">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white truncate max-w-[250px]">{audioFile.name}</h4>
                  <p className="text-xs text-zinc-500 font-mono">{(audioFile.size / (1024 * 1024)).toFixed(2)} MB • {audioFile.type.split('/')[1].toUpperCase()} READY</p>
                </div>
                <div className="flex justify-center gap-3">
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                        className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
                    >
                        {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); setAudioFile(null); }}
                        className="p-2 bg-zinc-800 rounded-full hover:bg-red-900/50 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 bg-zinc-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-zinc-400" />
                </div>
                <h4 className="font-bold text-zinc-300">Drop Master Audio</h4>
                <p className="text-xs text-zinc-500 mt-1">MP3, WAV, or FLAC supported</p>
              </>
            )}
          </div>

          <div 
            onDragOver={e => e.preventDefault()}
            onDrop={handleImageDrop}
            className={`relative group h-96 border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden ${
              imageFile ? 'border-indigo-500 bg-indigo-500/5' : 'border-zinc-800 hover:border-zinc-700 bg-zinc-900/30'
            }`}
            onClick={() => !isGeneratingImage && imageInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={imageInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={e => e.target.files?.[0] && setImageFile(URL.createObjectURL(e.target.files[0]))}
            />

            {imageFile ? (
              <>
                <img src={typeof imageFile === 'string' ? imageFile : URL.createObjectURL(imageFile as File)} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Cover Art" />
                <div className="relative z-10 flex flex-col items-center gap-4 bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                   <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                   <div className="text-center">
                       <h4 className="font-bold text-white">Cover Art Staged</h4>
                       <button 
                            onClick={(e) => { e.stopPropagation(); setImageFile(null); }}
                            className="mt-2 text-xs text-red-400 font-bold hover:underline flex items-center gap-1 mx-auto"
                        >
                            <Trash2 className="w-3 h-3" /> Remove
                        </button>
                   </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                {isGeneratingImage ? (
                  <div className="space-y-4">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto" />
                    <p className="text-sm font-mono text-blue-400 animate-pulse uppercase tracking-widest">Genie is Painting...</p>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-zinc-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform mx-auto w-fit">
                      <ImageIcon className="w-8 h-8 text-zinc-400" />
                    </div>
                    <h4 className="font-bold text-zinc-300">Visual Identity</h4>
                    <p className="text-xs text-zinc-500 mt-1 mb-6">Drop cover art or let Genie imagine one.</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); generateCoverArt(); }}
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full flex items-center gap-2 transition-all mx-auto shadow-lg shadow-indigo-900/40"
                    >
                        <Wand2 className="w-4 h-4" />
                        AI Cover Generator
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right: Metadata Form */}
        <div className="flex-1 bg-[#121214] border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Metadata Engine</h3>
              <p className="text-sm text-zinc-500">Configure your release for the Gresham Protocol.</p>
            </div>
            <button 
                onClick={autoFillMetadata}
                disabled={isAutoFilling}
                className="flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 hover:bg-blue-500/20 transition-all disabled:opacity-50"
            >
                {isAutoFilling ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                Auto-Fill with AI
            </button>
          </div>

          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Track Title</label>
                    <input 
                        name="title" 
                        value={metadata.title} 
                        onChange={handleMetadataChange} 
                        placeholder="e.g. IAED Ignition"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-700"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Primary Artist</label>
                    <input 
                        name="artist" 
                        value={metadata.artist} 
                        onChange={handleMetadataChange} 
                        placeholder="e.g. Neon Vanguard"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-700"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Genre</label>
                    <select 
                        name="genre" 
                        value={metadata.genre} 
                        onChange={handleMetadataChange}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all appearance-none text-zinc-300"
                    >
                        <option>Electronic</option>
                        <option>Synthwave</option>
                        <option>Hip Hop</option>
                        <option>Lo-Fi</option>
                        <option>Rock</option>
                        <option>Ambient</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Mood</label>
                    <input 
                        name="mood" 
                        value={metadata.mood} 
                        onChange={handleMetadataChange} 
                        placeholder="e.g. Cinematic"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">BPM</label>
                    <input 
                        name="bpm" 
                        value={metadata.bpm} 
                        onChange={handleMetadataChange} 
                        placeholder="124"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-1">Project Brief / Description</label>
                <textarea 
                    name="description" 
                    value={metadata.description} 
                    onChange={handleMetadataChange} 
                    placeholder="Describe the vibe, context, or story behind the track..."
                    rows={4}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl p-4 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-zinc-700 resize-none"
                />
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-500 leading-relaxed">
                  Upon submission, assets are analyzed by the <span className="text-blue-400 font-bold">Synergistic Opportunity Radar</span> to determine the optimal SMART_WATERFALL strategy for global equity capture.
              </p>
          </div>

          <div className="mt-8 space-y-4">
              {isUploading && (
                  <div className="space-y-3 p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl animate-in fade-in slide-in-from-bottom duration-300 shadow-lg">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                          <div className="flex items-center gap-2 text-blue-400">
                             <Loader2 className="w-3 h-3 animate-spin" />
                             <span className="animate-pulse">{uploadStatus}</span>
                          </div>
                          <span className="text-zinc-500">{Math.floor(uploadProgress)}%</span>
                      </div>
                      <div className="h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                            style={{ width: `${uploadProgress}%` }} 
                          />
                      </div>
                      <div className="flex items-center gap-2 text-[9px] text-zinc-600 font-mono italic">
                         <Shield className="w-3 h-3" />
                         Secure Layer: AES-256 Multi-Node Encryption Active
                      </div>
                  </div>
              )}
              
              <button 
                onClick={deployToNode}
                disabled={!audioFile || !imageFile || !metadata.title || isUploading}
                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-5 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 group ${isUploading ? 'opacity-30 grayscale cursor-not-allowed' : 'hover:scale-[1.01] active:scale-[0.98]'}`}
              >
                {isUploading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        In Transit...
                    </>
                ) : (
                    <>
                        Deploy to Gresham Node
                        <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                    </>
                )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetUpload;
