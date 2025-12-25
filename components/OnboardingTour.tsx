
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Tab } from '../types';

interface OnboardingTourProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onComplete: () => void;
}

const steps = [
  {
    title: "Welcome to the Future of Music Equity",
    content: "The Gresham Protocol empowers artists through Intelligent Autonomous Equity Distribution. Let's take a quick tour of your new command deck.",
    tab: Tab.COMMAND_CENTER,
    anchor: "nav-COMMAND_CENTER"
  },
  {
    title: "Real-time Command Center",
    content: "Monitor your global stream velocity, equity value, and node verification status in real-time. This is your high-level operational overview.",
    tab: Tab.COMMAND_CENTER,
    anchor: "nav-COMMAND_CENTER"
  },
  {
    title: "SMART_WATERFALL Distribution",
    content: "Deploy your music across three autonomous phases, from token-gated scarcity to global DSP expansion and long-tail licensing.",
    tab: Tab.DISTRIBUTION,
    anchor: "nav-DISTRIBUTION"
  },
  {
    title: "Synergistic AI Analytics",
    content: "Our 'Genie' AI scans global markets to find high-confidence sync, playlist, and viral opportunities for your specific acoustic fingerprint.",
    tab: Tab.AI_ANALYTICS,
    anchor: "nav-AI_ANALYTICS"
  },
  {
    title: "Protocol Ready",
    content: "You're now equipped to manage your equity autonomously. Access the Terminal for advanced gresham-cli commands or consult Genie anytime.",
    tab: Tab.COMMAND_CENTER,
    anchor: "nav-TERMINAL"
  }
];

const OnboardingTour: React.FC<OnboardingTourProps> = ({ setActiveTab, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setActiveTab(steps[nextStep].tab);
    } else {
      setIsVisible(false);
      onComplete();
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete();
  };

  if (!isVisible) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-[#121214] border border-blue-500/30 rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl shadow-blue-900/20 relative overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
          <div 
            className="h-full bg-blue-600 transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        <button 
          onClick={handleSkip}
          className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
          aria-label="Skip tour"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6 pt-4">
          <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-2">
            {currentStep === steps.length - 1 ? (
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            ) : (
              <Sparkles className="w-10 h-10 animate-bounce" />
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white tracking-tight">{step.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{step.content}</p>
          </div>

          <div className="flex items-center gap-4 w-full pt-4">
            {currentStep > 0 && (
              <button 
                onClick={() => {
                  const prev = currentStep - 1;
                  setCurrentStep(prev);
                  setActiveTab(steps[prev].tab);
                }}
                className="flex-1 px-6 py-3 bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold rounded-2xl hover:bg-zinc-800 transition-all"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-[2] px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/40 group"
            >
              {currentStep === steps.length - 1 ? "Finish Deployment" : "Next Step"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'bg-blue-500 w-4' : 'bg-zinc-800'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
