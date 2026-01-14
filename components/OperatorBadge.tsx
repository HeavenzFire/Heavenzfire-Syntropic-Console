import React from 'react';
import { SyntropicOperator } from '../types';

interface Props {
  op: SyntropicOperator;
  size?: 'sm' | 'md' | 'lg';
}

const OperatorBadge: React.FC<Props> = ({ op, size = 'md' }) => {
  const colors = {
    [SyntropicOperator.J]: 'bg-slate-700 text-slate-200 border-slate-500',
    [SyntropicOperator.C]: 'bg-blue-900 text-blue-200 border-blue-500',
    [SyntropicOperator.R]: 'bg-red-900 text-red-200 border-red-500 animate-pulse',
    [SyntropicOperator.H]: 'bg-purple-900 text-purple-200 border-purple-500',
    [SyntropicOperator.O]: 'bg-emerald-900 text-emerald-200 border-emerald-500',
    [SyntropicOperator.M]: 'bg-amber-900 text-amber-200 border-amber-500',
  };

  const descriptions = {
    [SyntropicOperator.J]: 'JOIN: Observing State',
    [SyntropicOperator.C]: 'CORRECT: Adjusting AQM Interval',
    [SyntropicOperator.R]: 'RESET: Flushing Queue',
    [SyntropicOperator.H]: 'HARMONIZE: Tuning Quantum Flows',
    [SyntropicOperator.O]: 'OPTIMIZE: Toggling ECN',
    [SyntropicOperator.M]: 'MUTATE: Shifting Bandwidth Profile',
  };

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div 
      className={`rounded-full flex items-center justify-center border ${colors[op]} ${sizeClasses[size]} font-bold font-mono shadow-lg transition-all`}
      title={descriptions[op]}
    >
      {op}
    </div>
  );
};

export default OperatorBadge;