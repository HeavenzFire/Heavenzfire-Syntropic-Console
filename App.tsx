import React, { useState, useEffect, useCallback } from 'react';
import { Activity, Server, Cpu, BrainCircuit, Play, Pause, RefreshCw, Zap, TrendingUp, AlertTriangle, Network } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { generateMetrics, createLogEntry } from './services/syntropicService';
import { analyzeNetworkState } from './services/geminiService';
import { NodeMetrics, OperatorLog, SyntropicOperator, NetworkStatus } from './types';
import OperatorBadge from './components/OperatorBadge';
import LogTerminal from './components/LogTerminal';

const App: React.FC = () => {
  const [nodes, setNodes] = useState<NodeMetrics[]>([]);
  const [logs, setLogs] = useState<OperatorLog[]>([]);
  const [isRunning, setIsRunning] = useState(true);
  const [trafficLoad, setTrafficLoad] = useState(30);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [isThinking, setIsThinking] = useState(false);

  // Initialize with deployment logs
  useEffect(() => {
    setLogs([
      createLogEntry('GRID', SyntropicOperator.J, 'Multi-Node Grid Deployment Initiated', true),
      createLogEntry('GRID', SyntropicOperator.C, 'Stochastic Forcing: ENABLED', true),
      createLogEntry('GRID', SyntropicOperator.H, 'Sovereign Mode: ACTIVE', true),
      createLogEntry('system', SyntropicOperator.M, 'Target Benchmarks: 2050 Aligned', true)
    ]);
  }, []);

  // Main Simulation Loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning) {
      interval = setInterval(() => {
        setNodes(prev => {
          const newMetrics = generateMetrics(trafficLoad);
          
          // Check for significant operator events to log
          // Limiting logging frequency for the grid to avoid spam
          if (Math.random() > 0.9) {
             const activeNode = newMetrics.find(n => n.lastOperator !== SyntropicOperator.J);
             if (activeNode) {
                 // We rely on the log effect or manual insertion in a real app, 
                 // but here we just update metrics state.
             }
          }
          return newMetrics;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, trafficLoad]);

  const handleOperator = useCallback((nodeId: string, op: SyntropicOperator) => {
    setLogs(prev => [...prev, createLogEntry(nodeId, op, `Manual Governance Intervention`, false)]);
    setNodes(prev => prev.map(n => {
        if (n.id === nodeId) {
            return { ...n, lastOperator: op, queueDepth: op === SyntropicOperator.R ? 0 : n.queueDepth };
        }
        return n;
    }));
  }, []);

  const handleAiAnalysis = async () => {
    setIsThinking(true);
    setAiAnalysis("Syntropic Intelligence is analyzing Grid Potential (Φ)...");
    
    try {
        const result = await analyzeNetworkState(nodes);
        setAiAnalysis(result);
    } catch (e) {
        setAiAnalysis("Analysis Failed.");
    } finally {
        setIsThinking(false);
    }
  };

  const getStatusColor = (status: NetworkStatus) => {
    switch (status) {
      case NetworkStatus.OPTIMAL: return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
      case NetworkStatus.CONGESTED: return 'text-amber-400 border-amber-500/30 bg-amber-500/5';
      case NetworkStatus.CRITICAL: return 'text-rose-500 border-rose-500/30 bg-rose-500/5';
    }
  };

  // Calculate Grid Averages
  const avgPotential = nodes.length > 0 ? (nodes.reduce((acc, n) => acc + n.syntropicPotential, 0) / nodes.length).toFixed(2) : "0.00";
  const avgFlows = nodes.length > 0 ? Math.floor(nodes.reduce((acc, n) => acc + n.activeFlows, 0) / nodes.length) : 0;
  const avgRisk = nodes.length > 0 ? (nodes.reduce((acc, n) => acc + n.adoptionRisk, 0) / nodes.length).toFixed(1) : "0.0";

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-200 flex flex-col font-sans selection:bg-cyan-500/30">
      
      {/* Header */}
      <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <BrainCircuit className="text-cyan-400" size={28} />
          <div>
            <h1 className="text-lg font-bold tracking-wider text-cyan-100 uppercase">Heavenzfire <span className="text-cyan-600">Syntropic</span></h1>
            <div className="text-[10px] text-slate-500 font-mono tracking-widest flex items-center space-x-2">
                <span>MULTI-NODE GRID DEPLOYMENT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 bg-slate-800 rounded px-3 py-1">
             <span className="text-xs text-slate-400 uppercase">Stochastic Load</span>
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={trafficLoad} 
               onChange={(e) => setTrafficLoad(parseInt(e.target.value))}
               className="w-24 accent-cyan-500"
             />
             <span className="text-xs font-mono w-8 text-right">{trafficLoad}%</span>
          </div>
          
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`p-2 rounded-full border ${isRunning ? 'border-cyan-500/50 text-cyan-400 bg-cyan-950/30' : 'border-slate-600 text-slate-400 hover:bg-slate-800'}`}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left Column: Metrics & Nodes (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-6 overflow-y-auto">
           
           {/* Syntropic Core Vitals HUD */}
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Zap size={12} className="text-amber-400"/> Potential (Φ)
                    </div>
                    <div className="text-2xl font-mono text-amber-100">{avgPotential}</div>
                 </div>
                 <div className="h-full flex items-end">
                    <span className="text-[10px] text-emerald-400">+4.2%</span>
                 </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Network size={12} className="text-cyan-400"/> Active Flows
                    </div>
                    <div className="text-2xl font-mono text-cyan-100">{avgFlows}</div>
                 </div>
                 <div className="h-full flex items-end">
                    <span className="text-[10px] text-slate-400">Distributed</span>
                 </div>
              </div>
              <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <AlertTriangle size={12} className="text-rose-400"/> Adoption Risk
                    </div>
                    <div className="text-2xl font-mono text-rose-100">{avgRisk}</div>
                 </div>
                 <div className="h-full flex items-end">
                    <span className="text-[10px] text-rose-400">Incentivized</span>
                 </div>
              </div>
           </div>

           {/* Global Chart: Syntropic Potential */}
           <div className="h-64 bg-slate-900/50 border border-slate-800 rounded-lg p-4 relative backdrop-blur-sm">
             <h3 className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-2">
                <TrendingUp size={14} /> 
                SYNTROPIC RESONANCE MANIFOLD (Φ vs t)
             </h3>
             <ResponsiveContainer width="100%" height="85%">
               <AreaChart data={nodes}>
                 <defs>
                    <linearGradient id="colorPotential" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                 <XAxis dataKey="timestamp" hide />
                 <YAxis stroke="#475569" fontSize={10} domain={[30, 60]} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                    itemStyle={{ fontSize: '12px' }}
                 />
                 <Area type="monotone" dataKey="syntropicPotential" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPotential)" strokeWidth={2} isAnimationActive={false} />
                 <Line type="monotone" dataKey="latencyMs" stroke="#10b981" strokeWidth={1} dot={false} isAnimationActive={false} />
               </AreaChart>
             </ResponsiveContainer>
             <div className="absolute top-4 right-4 flex space-x-4 text-[10px]">
                <span className="text-cyan-400">● Potential (Φ)</span>
                <span className="text-emerald-500">● Latency (1ms base)</span>
             </div>
           </div>

           {/* Nodes Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {nodes.map(node => (
                <div key={node.id} className={`bg-slate-900 border rounded-lg p-4 relative group transition-all duration-300 ${getStatusColor(node.status)} border-opacity-20`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                        <Server size={18} className="opacity-70" />
                        <div>
                            <h4 className="text-sm font-bold text-slate-200">{node.name}</h4>
                            <div className="text-[10px] font-mono opacity-60 uppercase">{node.interface} • {node.qdisc}</div>
                        </div>
                    </div>
                    <OperatorBadge op={node.lastOperator} />
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">Latency</span>
                        <span className="text-emerald-400">{node.latencyMs}ms</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">Q-Depth</span>
                        <span className="text-slate-300">{node.queueDepth} pkts</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-slate-500">Active Flows</span>
                        <span className="text-cyan-300">{node.activeFlows}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5 mt-2">
                         <div className="flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-amber-500/80 uppercase">STOCHASTIC FORCING</span>
                         </div>
                        <span className="text-slate-400 text-[10px]">RISK: {node.adoptionRisk}</span>
                    </div>
                  </div>

                  {/* Manual Controls Overlay (Human-in-the-Loop) */}
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">Inject Operator</span>
                    <div className="flex space-x-2">
                        <button onClick={() => handleOperator(node.id, SyntropicOperator.R)} className="bg-rose-900/50 border border-rose-500 hover:bg-rose-800 p-2 rounded text-rose-200" title="RESET (Flush)">R</button>
                        <button onClick={() => handleOperator(node.id, SyntropicOperator.C)} className="bg-blue-900/50 border border-blue-500 hover:bg-blue-800 p-2 rounded text-blue-200" title="CORRECT (Adjust)">C</button>
                        <button onClick={() => handleOperator(node.id, SyntropicOperator.O)} className="bg-emerald-900/50 border border-emerald-500 hover:bg-emerald-800 p-2 rounded text-emerald-200" title="OPTIMIZE (ECN)">O</button>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Right Column: AI & Logs (4 cols) */}
        <div className="lg:col-span-4 flex flex-col h-[calc(100vh-140px)] space-y-6">
           
           {/* AI Insight Panel */}
           <div className="bg-gradient-to-b from-indigo-900/20 to-slate-900 border border-indigo-500/30 rounded-lg p-5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                 <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                    <Cpu size={16} /> SYNTROPIC INTELLIGENCE
                 </h3>
                 <button 
                    onClick={handleAiAnalysis}
                    disabled={isThinking}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded-full text-white flex items-center gap-1 transition-all disabled:opacity-50"
                 >
                    {isThinking ? <RefreshCw className="animate-spin" size={12}/> : <BrainCircuit size={12}/>}
                    {isThinking ? 'Processing...' : 'Analyze State'}
                 </button>
              </div>
              
              <div className="min-h-[80px] text-xs leading-relaxed text-indigo-100/80 font-mono bg-slate-950/30 p-3 rounded border border-white/5">
                 {aiAnalysis || "Grid Operational. Awaiting analysis of stochastic potential..."}
              </div>
              
              {/* Decorative background element */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none"></div>
           </div>

           {/* Log Terminal */}
           <div className="flex-1 min-h-0">
             <LogTerminal logs={logs} />
           </div>

           {/* Status Footer */}
           <div className="bg-slate-900 border border-slate-800 rounded p-3 flex justify-between items-center text-[10px] text-slate-500">
             <div className="flex items-center space-x-2">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
               <span>MESH: SYNCED</span>
             </div>
             <span>TARGET: 2050</span>
           </div>

        </div>
      </div>
    </div>
  );
};

export default App;