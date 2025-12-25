
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import CommandCenter from './components/CommandCenter';
import DistributionPipeline from './components/DistributionPipeline';
import ASDPProtocol from './components/ASDPProtocol';
import DDEXManager from './components/DDEXManager';
import BlockchainRegistry from './components/BlockchainRegistry';
import AIAnalytics from './components/AIAnalytics';
import CLIInterface from './components/CLIInterface';
import StrategyAnalysis from './components/StrategyAnalysis';
import RightsManagement from './components/RightsManagement';
import AuraAssistant from './components/AuraAssistant';
import OnboardingTour from './components/OnboardingTour';
import AssetUpload from './components/AssetUpload';
import { useRealTimeMetrics } from './hooks/useRealTimeMetrics';
import { Tab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.COMMAND_CENTER);
  const [showTour, setShowTour] = useState(false);
  const metrics = useRealTimeMetrics();

  // Check for tour completion on mount
  useEffect(() => {
    const tourCompleted = localStorage.getItem('gresham_tour_completed');
    if (!tourCompleted) {
      setShowTour(true);
    }
  }, []);

  const handleTourComplete = () => {
    localStorage.setItem('gresham_tour_completed', 'true');
    setShowTour(false);
  };

  const renderTab = () => {
    switch (activeTab) {
      case Tab.COMMAND_CENTER: return <CommandCenter metrics={metrics} />;
      case Tab.ASSET_UPLOAD: return <AssetUpload />;
      case Tab.DISTRIBUTION: return <DistributionPipeline />;
      case Tab.ASDP: return <ASDPProtocol />;
      case Tab.DDEX: return <DDEXManager />;
      case Tab.BLOCKCHAIN: return <BlockchainRegistry />;
      case Tab.AI_ANALYTICS: return <AIAnalytics />;
      case Tab.STRATEGY: return <StrategyAnalysis />;
      case Tab.RIGHTS_MANAGEMENT: return <RightsManagement />;
      case Tab.TERMINAL: return <CLIInterface />;
      default: return <CommandCenter metrics={metrics} />;
    }
  };

  return (
    <>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="h-full safe-bottom">
          {renderTab()}
        </div>
      </Layout>
      <AuraAssistant />
      {showTour && (
        <OnboardingTour 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onComplete={handleTourComplete} 
        />
      )}
    </>
  );
};

export default App;
