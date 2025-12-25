
import React, { useState } from 'react';
import { FileCode, Play, Download, CheckCircle2, Edit3, Save, Info, AlertTriangle } from 'lucide-react';

interface Metadata {
  releaseId: string;
  artistName: string;
  title: string;
  genre: string;
  label: string;
  isrc: string;
  upc: string;
}

const DDEXManager: React.FC = () => {
  const [metadata, setMetadata] = useState<Metadata>({
    releaseId: 'REL-2024-X-001',
    artistName: 'Neon Vanguard',
    title: 'IAED Ignition',
    genre: 'Synthwave',
    label: 'Gresham Protocol Records',
    isrc: 'QM-GZA-24-00123',
    upc: '190296712345'
  });

  const [xml, setXml] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{ score: number, status: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetadata(prev => ({ ...prev, [name]: value }));
  };

  const validateAndGenerate = () => {
    setIsValidating(true);
    setValidationResult(null);
    
    // Simulate AI Audit
    setTimeout(() => {
      setValidationResult({ score: 100, status: 'COMPLIANT' });
      setIsValidating(false);
      
      const generatedXml = `<?xml version="1.0" encoding="UTF-8"?>
<NewReleaseMessage xmlns:ern="http://ddex.net/xml/ern/43" MessageSchemaVersionId="ern/43">
  <MessageHeader>
    <MessageThreadId>LNKZ-TH-${new Date().getFullYear()}-001</MessageThreadId>
    <MessageSender>LinkZ IAED Agent</MessageSender>
    <SentOnBehalfOf>Autonomous Distribution Protocol</SentOnBehalfOf>
  </MessageHeader>
  <PartyList>
    <Party>
      <PartyId>PADPIDA-${metadata.isrc.split('-')[2]}</PartyId>
      <FullName>${metadata.artistName}</FullName>
    </Party>
  </PartyList>
  <ReleaseList>
    <Release>
      <ReleaseId>
        <GRid>${metadata.upc}</GRid>
        <ICPN>${metadata.upc}</ICPN>
      </ReleaseId>
      <ReferenceTitle>
        <TitleText>${metadata.title}</TitleText>
      </ReferenceTitle>
      <ReleaseType>Album</ReleaseType>
      <ReleaseDetails>
        <Genre>${metadata.genre}</Genre>
        <LabelName>${metadata.label}</LabelName>
      </ReleaseDetails>
    </Release>
  </ReleaseList>
</NewReleaseMessage>`;
      setXml(generatedXml);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full animate-in fade-in duration-500">
      <div className="space-y-6">
        <div className="bg-[#121214] border border-zinc-800 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <FileCode className="w-24 h-24" />
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-white">Metadata Review Hub</h3>
              <p className="text-sm text-zinc-500">Pre-flight validation for ERN 4.3 compliance.</p>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`p-3 rounded-xl transition-all ${isEditing ? 'bg-blue-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-white'}`}
            >
              {isEditing ? <Save className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Release Title</label>
                {isEditing ? (
                  <input name="title" value={metadata.title} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" />
                ) : (
                  <div className="text-zinc-200 font-medium">{metadata.title}</div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Artist Name</label>
                {isEditing ? (
                  <input name="artistName" value={metadata.artistName} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" />
                ) : (
                  <div className="text-zinc-200 font-medium">{metadata.artistName}</div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">ISRC</label>
                {isEditing ? (
                  <input name="isrc" value={metadata.isrc} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" />
                ) : (
                  <div className="text-zinc-200 font-mono text-blue-400">{metadata.isrc}</div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">UPC/EAN</label>
                {isEditing ? (
                  <input name="upc" value={metadata.upc} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" />
                ) : (
                  <div className="text-zinc-200 font-mono text-blue-400">{metadata.upc}</div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Label / Entity</label>
              {isEditing ? (
                <input name="label" value={metadata.label} onChange={handleInputChange} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none" />
              ) : (
                <div className="text-zinc-200">{metadata.label}</div>
              )}
            </div>
          </div>

          <button 
            onClick={validateAndGenerate}
            disabled={isValidating || isEditing}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            {isValidating ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Play className="w-4 h-4" />}
            Validate & Deploy ERN 4.3
          </button>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[2rem] flex items-start gap-4">
          <div className="p-2 bg-blue-500/10 rounded-lg mt-1">
            <Info className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-200">DDEX Automation Engine</h4>
            <p className="text-xs text-zinc-500 leading-relaxed mt-1">
              LinkZ IAED automatically maps internal schema to the global ERN 4.3 standard. High-quality metadata triggers the "Concrete Jungle" expansion phase instantly upon validation.
            </p>
          </div>
        </div>

        {validationResult && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-left duration-300">
            <div className="p-2 bg-emerald-500 rounded-full">
              <CheckCircle2 className="text-black w-6 h-6" />
            </div>
            <div>
              <h5 className="font-bold text-emerald-500 uppercase tracking-widest text-[10px]">Compliance Audit: PASSED</h5>
              <p className="text-lg font-bold text-white">{validationResult.score}/100 Compliance Score</p>
              <p className="text-xs text-emerald-500/80">ERN 4.3 Schema validation successful. Assets staged for delivery.</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden flex flex-col relative shadow-2xl">
        <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Raw ERN 4.3 Output</span>
          </div>
          {xml && (
            <div className="flex gap-2">
              <button className="p-2 text-zinc-500 hover:text-white bg-zinc-800 rounded-lg transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        <div className="flex-1 p-8 font-mono text-xs text-zinc-400 overflow-auto whitespace-pre custom-scrollbar">
          {xml ? (
            <div className="animate-in fade-in duration-1000">
              {xml}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 grayscale">
              <FileCode className="w-12 h-12 mb-4" />
              <p>Waiting for metadata validation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DDEXManager;
