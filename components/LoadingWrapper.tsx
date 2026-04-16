'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './LoadingScreen';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('city_roofing_loaded');

    if (!hasSeenLoading) {
      // First visit this session — show animation
      setLoading(true);
    }

    setMounted(true);
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem('city_roofing_loaded', 'true');
    setLoading(false);
  };

  // Don't render until mounted (avoid hydration mismatch)
  if (!mounted) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
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
          transition: loading ? 'none' : 'opacity 0.3s ease',
        }}
      >
        {children}
      </div>
    </>
  );
}
