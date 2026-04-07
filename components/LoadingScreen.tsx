'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ─── Constants ────────────────────────────────────────────────────────────────

const TILE_SIZE = 16;
const GAP = 2;
const STEP = TILE_SIZE + GAP; // 18px
const COLS = 20;
const ROWS = 18;
const CENTER_COL = 9.5;
const CENTER_ROW = 9;

const GRID_W = COLS * STEP; // 360px
const GRID_H = ROWS * STEP; // 324px

// CT triangle logo mask — 20 cols × 18 rows
const MASK: number[][] = [
  [0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// ─── Tile data ─────────────────────────────────────────────────────────────────

interface TileData {
  id: string;
  col: number;
  row: number;
  startY: number;         // random negative offset above screen
  distFromCenter: number; // for stage 3 stagger (center-out)
}

function buildTiles(): TileData[] {
  const tiles: TileData[] = [];
  // Use a seeded-ish pattern so it's deterministic (avoid hydration issues)
  let seed = 42;
  function rand() { seed = (seed * 1664525 + 1013904223) & 0xffffffff; return ((seed >>> 0) / 0x100000000); }

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (MASK[row][col]) {
        tiles.push({
          id: `${row}-${col}`,
          col,
          row,
          startY: -(rand() * 400 + 200), // -200 to -600
          distFromCenter: Math.sqrt(
            Math.pow(col - CENTER_COL, 2) + Math.pow(row - CENTER_ROW, 2)
          ),
        });
      }
    }
  }
  return tiles;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface LoadingScreenProps {
  onComplete: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [stage, setStage] = useState(0);
  const tiles = useMemo(() => buildTiles(), []);
  const completedRef = useRef(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 50),    // start falling
      setTimeout(() => setStage(2), 1200),  // hold + glow
      setTimeout(() => setStage(3), 1800),  // flip out + logo reveal
      setTimeout(() => setStage(4), 2600),  // begin exit fade
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // ── Tile animation ──────────────────────────────────────────────────────────

  function getTileAnimate(tile: TileData) {
    if (stage === 0) return { y: tile.startY, opacity: 1, rotateY: 0 };
    if (stage === 1 || stage === 2) return { y: 0, opacity: 1, rotateY: 0 };
    return { y: 0, rotateY: 90, opacity: 0 }; // stage 3+
  }

  function getTileTransition(tile: TileData) {
    if (stage === 1) {
      // Fall in — stagger left to right by column, gravity ease
      return {
        y: {
          delay: tile.col * 0.038,
          duration: 0.48,
          ease: [0.55, 0, 1, 0.45] as [number, number, number, number],
        },
        rotateY: { duration: 0 },
        opacity: { duration: 0 },
      };
    }
    if (stage === 3) {
      // Flip out — center tiles first
      const delay = tile.distFromCenter * 0.022;
      return {
        rotateY: { delay, duration: 0.28, ease: 'easeIn' as const },
        opacity:  { delay: delay + 0.08, duration: 0.18 },
        y: { duration: 0 },
      };
    }
    return { duration: 0 };
  }

  // ── Screen exit animation ───────────────────────────────────────────────────

  const screenAnimate = stage >= 4 ? { opacity: 0 } : { opacity: 1 };

  // ── Logo animate (stage 3 fade in, stage 4 scale + fade) ───────────────────

  const logoOpacity = stage >= 3 ? (stage >= 4 ? 0 : 1) : 0;
  const logoScale   = stage >= 4 ? 1.05 : 1;

  // ── Glow: stage 2 pulse ─────────────────────────────────────────────────────

  const glowVariants = {
    idle:  { filter: 'drop-shadow(0 0 0px rgba(139,26,26,0))' },
    pulse: { filter: ['drop-shadow(0 0 8px rgba(139,26,26,0.4))', 'drop-shadow(0 0 24px rgba(139,26,26,0.8))', 'drop-shadow(0 0 8px rgba(139,26,26,0.4))'] },
  };

  return (
    <motion.div
      animate={screenAnimate}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onAnimationComplete={() => {
        // Called after every animate cycle — only fire onComplete after the opacity:0 exit
        if (stage >= 4 && !completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#0F0F0F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Grid + Logo container ── */}
      <div style={{ position: 'relative', width: GRID_W, height: GRID_H }}>

        {/* Tile grid */}
        <motion.div
          variants={glowVariants}
          animate={stage === 2 ? 'pulse' : 'idle'}
          transition={stage === 2 ? { duration: 0.55, repeat: 1, repeatType: 'reverse' } : { duration: 0 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {tiles.map((tile) => (
            <motion.div
              key={tile.id}
              initial={{ y: tile.startY, opacity: 1, rotateY: 0 }}
              animate={getTileAnimate(tile)}
              transition={getTileTransition(tile)}
              style={{
                position: 'absolute',
                left: tile.col * STEP,
                top: tile.row * STEP,
                width: TILE_SIZE,
                height: TILE_SIZE,
                backgroundColor: '#8B1A1A',
                borderRadius: 2,
                transformOrigin: 'center',
                // Slight color variation for depth
                opacity: 0.85 + (tile.row / ROWS) * 0.15,
              }}
            />
          ))}
        </motion.div>

        {/* Logo — only rendered from Stage 3 onward to prevent ghost */}
        {stage >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: logoOpacity, scale: logoScale }}
            transition={{ opacity: { duration: 0.5 }, scale: { duration: 0.6 } }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              src="/images/logo-transparent.png"
              alt="City Roofing & Exteriors"
              width={GRID_W}
              height={GRID_H}
              style={{ objectFit: 'contain', width: GRID_W, height: GRID_H }}
              priority
            />
          </motion.div>
        )}
      </div>

      {/* ── Loading bar ── */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          width: '200px',
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '11px',
            letterSpacing: '3px',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}
        >
          Loading...
        </span>
        <div
          style={{
            width: '200px',
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            style={{
              height: '100%',
              backgroundColor: '#8B1A1A',
              borderRadius: '1px',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
