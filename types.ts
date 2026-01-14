export enum SyntropicOperator {
  J = 'J', // Join (Observe)
  C = 'C', // Correct (Active Queue Management adjustment)
  R = 'R', // Reset (Force Queue Flush)
  H = 'H', // Harmonize (Quantum/Flow adjustment)
  O = 'O', // Optimize (ECN toggle)
  M = 'M'  // Mutate (Interval shift)
}

export enum NetworkStatus {
  OPTIMAL = 'OPTIMAL',
  CONGESTED = 'CONGESTED',
  CRITICAL = 'CRITICAL'
}

export interface NodeMetrics {
  id: string;
  name: string;
  interface: string;
  qdisc: 'fq_codel' | 'cake';
  latencyMs: number;
  queueDepth: number; // Packets
  packetLoss: number; // Percentage
  bandwidthUsage: number; // Mbps
  lastOperator: SyntropicOperator;
  status: NetworkStatus;
  timestamp: string;
  
  // Advanced Syntropic Metrics
  activeFlows: number; // f_t
  syntropicPotential: number; // Φ
  adoptionRisk: number;
  stochasticForcing: boolean;
}

export interface OperatorLog {
  id: string;
  timestamp: string;
  nodeId: string;
  operator: SyntropicOperator;
  message: string;
  automated: boolean;
}

export interface SimulationConfig {
  baseLatency: number;
  jitter: number;
  trafficLoad: number; // 0-100
}