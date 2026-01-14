import { NodeMetrics, NetworkStatus, SyntropicOperator, OperatorLog } from '../types';

const NODES = [
  { id: 'n-01', name: 'Alpha-Gateway', interface: 'eth0', qdisc: 'cake' },
  { id: 'n-02', name: 'Beta-Relay', interface: 'eth1', qdisc: 'fq_codel' },
  { id: 'n-03', name: 'Gamma-Edge', interface: 'wlan0', qdisc: 'fq_codel' },
  { id: 'n-04', name: 'Delta-Cluster', interface: 'eth2', qdisc: 'cake' },
  { id: 'n-05', name: 'Epsilon-Core', interface: 'eth3', qdisc: 'fq_codel' },
  { id: 'n-06', name: 'Zeta-Mesh', interface: 'wlan1', qdisc: 'cake' },
  { id: 'n-07', name: 'Eta-Link', interface: 'bond0', qdisc: 'fq_codel' },
  { id: 'n-08', name: 'Theta-Hub', interface: 'eth4', qdisc: 'cake' },
  { id: 'n-09', name: 'Iota-Bridge', interface: 'tun0', qdisc: 'fq_codel' },
];

let lastMetrics: NodeMetrics[] = NODES.map(n => ({
  id: n.id,
  name: n.name,
  interface: n.interface,
  qdisc: n.qdisc as 'fq_codel' | 'cake',
  latencyMs: 1.0,
  queueDepth: 1,
  packetLoss: 0,
  bandwidthUsage: 50,
  lastOperator: SyntropicOperator.J,
  status: NetworkStatus.OPTIMAL,
  timestamp: new Date().toISOString(),
  activeFlows: 59,
  syntropicPotential: 43.27,
  adoptionRisk: 25.2,
  stochasticForcing: true
}));

export const generateMetrics = (trafficLoad: number): NodeMetrics[] => {
  const currentTimestamp = new Date().toISOString();

  lastMetrics = lastMetrics.map(node => {
    // Simulate physics of the network stack - Highly Optimized Syntropic State
    const loadFactor = trafficLoad / 100;
    
    // Stochastic Forcing: Small random perturbations to maintain resilience
    const stochasticNoise = (Math.random() - 0.5) * 0.2; 
    
    // Queue is tightly controlled near 1.1 packets (as per observations)
    let newQueue = 1.1 + (loadFactor * 0.5) + stochasticNoise;
    if (newQueue < 0) newQueue = 0;
    
    // Latency is extremely low (1ms baseline)
    let newLatency = 1.0 + (newQueue * 0.1) + Math.abs(stochasticNoise);
    
    let status = NetworkStatus.OPTIMAL;
    // Congestion thresholds are much tighter in this optimized mode
    if (newLatency > 15) status = NetworkStatus.CONGESTED;
    if (newLatency > 40) status = NetworkStatus.CRITICAL;

    let op = SyntropicOperator.J;
    // Operators apply micro-corrections
    if (newLatency > 2.0 && Math.random() > 0.7) op = SyntropicOperator.C; // Micro-correction
    if (status === NetworkStatus.CONGESTED) op = SyntropicOperator.O; // Optimize/Drop

    // Active Flows fluctuate naturally
    const activeFlows = Math.floor(59 + (Math.sin(Date.now() / 10000) * 10) + (Math.random() * 5));

    // Potential (Φ) correlates with Flow/Latency efficiency
    // Higher flows + Lower latency = Higher Potential
    const syntropicPotential = Number((activeFlows / (newLatency * 1.2)).toFixed(2));

    // Adoption Risk correlates with Potential (Success breeds pressure)
    const adoptionRisk = Number((syntropicPotential * 0.58).toFixed(1));

    return {
      ...node,
      latencyMs: Number(newLatency.toFixed(2)),
      queueDepth: Number(newQueue.toFixed(1)),
      bandwidthUsage: Number((loadFactor * 100 + (Math.random() * 5)).toFixed(1)),
      status,
      lastOperator: op,
      timestamp: currentTimestamp,
      activeFlows,
      syntropicPotential,
      adoptionRisk,
      stochasticForcing: true // Always active in this sovereign mode
    };
  });

  return lastMetrics;
};

export const createLogEntry = (nodeId: string, op: SyntropicOperator, msg: string, automated: boolean): OperatorLog => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    nodeId,
    operator: op,
    message: msg,
    automated
  };
};