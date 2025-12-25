
export enum Tab {
  COMMAND_CENTER = 'COMMAND_CENTER',
  ASSET_UPLOAD = 'ASSET_UPLOAD',
  DISTRIBUTION = 'DISTRIBUTION',
  ASDP = 'ASDP',
  DDEX = 'DDEX',
  BLOCKCHAIN = 'BLOCKCHAIN',
  AI_ANALYTICS = 'AI_ANALYTICS',
  STRATEGY = 'STRATEGY',
  RIGHTS_MANAGEMENT = 'RIGHTS_MANAGEMENT',
  TERMINAL = 'TERMINAL'
}

export interface Metrics {
  activeReleases: number;
  totalStreams: number;
  equityValue: number;
  blockchainVerified: number;
  synergyScore: number;
  clsScore: number;
}

export interface ProvenanceRecord {
  id: string;
  releaseId: string;
  timestamp: string;
  fingerprint: string;
  txHash: string;
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
}

export interface WaterfallPhase {
  name: string;
  status: 'COMPLETED' | 'ACTIVE' | 'PENDING';
  platforms: string[];
  access: string;
}
