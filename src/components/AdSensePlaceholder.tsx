/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface AdSensePlaceholderProps {
  type: 'banner' | 'leaderboard' | 'sidebar' | 'inline';
  className?: string;
}

export default function AdSensePlaceholder({ type, className = '' }: AdSensePlaceholderProps) {
  // Define standard heights and widths to prevent Cumulative Layout Shift (CLS)
  const getStyles = () => {
    switch (type) {
      case 'banner':
        return 'w-full min-h-[90px] md:min-h-[120px] max-w-[728px]';
      case 'leaderboard':
        return 'w-full min-h-[90px] max-w-[970px]';
      case 'sidebar':
        return 'w-full min-h-[250px] max-w-[300px]';
      case 'inline':
        return 'w-full min-h-[250px] max-w-[336px]';
      default:
        return 'w-full min-h-[90px]';
    }
  };

  return (
    <div
      className={`mx-auto my-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 p-2 text-center transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 ${getStyles()} ${className}`}
    >
      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-400 dark:text-slate-500">
        Publicidad - Google AdSense
      </span>
      <div className="mt-1 text-xs text-slate-300 dark:text-slate-700">
        Espacio reservado para anuncio [{type.toUpperCase()}]
      </div>
    </div>
  );
}
