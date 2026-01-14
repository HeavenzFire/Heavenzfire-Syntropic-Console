import React, { useEffect, useRef } from 'react';
import { OperatorLog } from '../types';
import OperatorBadge from './OperatorBadge';
import { Terminal } from 'lucide-react';

interface Props {
  logs: OperatorLog[];
}

const LogTerminal: React.FC<Props> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-slate-900/90 border border-slate-700 rounded-lg flex flex-col h-full overflow-hidden shadow-2xl backdrop-blur-sm">
      <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center space-x-2">
        <Terminal size={16} className="text-cyan-400" />
        <span className="text-xs font-mono text-slate-300 uppercase tracking-wider">Syntropic Audit Log (JSONL)</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start space-x-3 border-b border-slate-800/50 pb-2 last:border-0 hover:bg-slate-800/30 p-1 rounded transition-colors">
            <span className="text-slate-500 whitespace-nowrap min-w-[70px]">
              {log.timestamp.split('T')[1].split('.')[0]}
            </span>
            <div className="flex-shrink-0">
               <OperatorBadge op={log.operator} size="sm" />
            </div>
            <div className="flex-1 break-all text-slate-300">
              <span className={log.automated ? "text-cyan-600" : "text-amber-500"}>
                [{log.automated ? 'AUTO' : 'MANUAL'}]
              </span>{' '}
              <span className="text-slate-400">node:{log.nodeId}</span>{' '}
              {log.message}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};

export default LogTerminal;