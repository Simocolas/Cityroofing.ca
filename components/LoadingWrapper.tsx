'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

// Module-level flag — resets on every full page load (JS bundle reload),
// but survives client-side navigation (same JS instance).
let hasLoadedThisSession = false;

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(!hasLoadedThisSession);

  const handleComplete = () => {
    hasLoadedThisSession = true;
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen
            key="loading-screen"
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>
      <div
        style={{
          opacity: loading ? 0 : 1,
          // No transition while loading — prevents ghost flash when screen exits
          transition: loading ? 'none' : 'opacity 0.4s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
