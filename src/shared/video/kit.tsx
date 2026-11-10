import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { EASE_IN_OUT, EASE_OUT, FPS } from './theme';

export const easeOut = Easing.bezier(...EASE_OUT);
export const easeInOut = Easing.bezier(...EASE_IN_OUT);

/** Seconds → frames. */
export const f = (s: number) => Math.round(s * FPS);

/** Clamped interpolate with the house ease-out curve. */
export function tween(
  frame: number,
  range: [number, number],
  out: [number, number] = [0, 1],
  easing: (t: number) => number = easeOut,
) {
  return interpolate(frame, range, out, {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** 0→1 spring that starts at `delay` frames. */
export function useSpring(delay = 0, damping = 18, mass = 0.7) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping, mass, stiffness: 140 } });
}

type Dir = 'up' | 'down' | 'left' | 'right' | 'none';

/**
 * Enters at `at` (frames), optionally exits at `out`.
 * Enters from opacity 0, scale 0.96 and a short offset.
 */
export function Appear({
  at = 0,
  out,
  dur = 16,
  from = 'up',
  distance = 60,
  style,
  children,
}: {
  key?: React.Key;
  at?: number;
  out?: number;
  dur?: number;
  from?: Dir;
  distance?: number;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const frame = useCurrentFrame();
  const p = tween(frame, [at, at + dur]);
  const o = out === undefined ? 0 : tween(frame, [out, out + 12], [0, 1], easeInOut);
  const d = (1 - p) * distance - o * distance * 0.5;
  const tx = from === 'left' ? -d : from === 'right' ? d : 0;
  const ty = from === 'up' ? d : from === 'down' ? -d : 0;
  const scale = 0.96 + 0.04 * p;
  return (
    <div
      style={{
        opacity: p * (1 - o),
        transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Kinetic headline: each character rises in on a stagger. */
export function Chars({
  text,
  at = 0,
  stagger = 2,
  style,
  charStyle,
}: {
  text: string;
  at?: number;
  stagger?: number;
  style?: React.CSSProperties;
  charStyle?: (i: number) => React.CSSProperties;
}) {
  const frame = useCurrentFrame();
  const chars = Array.from(text);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', ...style }}>
      {chars.map((ch, i) => {
        const p = tween(frame, [at + i * stagger, at + i * stagger + 14]);
        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              whiteSpace: 'pre',
              opacity: p,
              transform: `translateY(${(1 - p) * 0.5}em)`,
              ...(charStyle ? charStyle(i) : {}),
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
}

/** Typewriter reveal. `cps` = characters per second. */
export function Typewriter({
  text,
  at = 0,
  cps = 24,
  caret = true,
  style,
}: {
  text: string;
  at?: number;
  cps?: number;
  caret?: boolean;
  style?: React.CSSProperties;
}) {
  const frame = useCurrentFrame();
  const chars = Array.from(text);
  const n = Math.max(0, Math.min(chars.length, Math.floor(((frame - at) / FPS) * cps)));
  const done = n >= chars.length;
  const blink = Math.floor(frame / 15) % 2 === 0;
  return (
    <span style={{ whiteSpace: 'pre-wrap', ...style }}>
      {chars.slice(0, n).join('')}
      {caret && frame >= at && (!done || blink) ? (
        <span style={{ opacity: 0.8 }}>▍</span>
      ) : null}
    </span>
  );
}

/** Rolling number. */
export function Counter({
  from = 0,
  to,
  at = 0,
  dur = 30,
  format = (n: number) => Math.round(n).toString(),
  style,
}: {
  from?: number;
  to: number;
  at?: number;
  dur?: number;
  format?: (n: number) => string;
  style?: React.CSSProperties;
}) {
  const frame = useCurrentFrame();
  const v = tween(frame, [at, at + dur], [from, to]);
  return <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>{format(v)}</span>;
}

/** SVG stroke that draws itself between `at` and `at + dur`. */
export function DrawPath({
  d,
  at = 0,
  dur = 24,
  stroke,
  width = 6,
  fill = 'none',
  linecap = 'round',
}: {
  key?: React.Key;
  d: string;
  at?: number;
  dur?: number;
  stroke: string;
  width?: number;
  fill?: string;
  linecap?: 'round' | 'butt' | 'square';
}) {
  const frame = useCurrentFrame();
  const p = tween(frame, [at, at + dur], [0, 1], easeInOut);
  return (
    <path
      d={d}
      pathLength={1}
      fill={fill}
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap={linecap}
      strokeLinejoin="round"
      strokeDasharray="1 1"
      strokeDashoffset={1 - p}
      opacity={p > 0 ? 1 : 0}
    />
  );
}

/** Horizontal bar that fills to `value` (0–1). */
export function Bar({
  value,
  at = 0,
  dur = 26,
  color,
  track,
  height = 18,
}: {
  value: number;
  at?: number;
  dur?: number;
  color: string;
  track: string;
  height?: number;
}) {
  const frame = useCurrentFrame();
  const p = tween(frame, [at, at + dur]);
  return (
    <div style={{ height, borderRadius: height, background: track, overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: `${value * p * 100}%`,
          borderRadius: height,
          background: color,
        }}
      />
    </div>
  );
}
