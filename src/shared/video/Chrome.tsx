import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND_COLOR, BRAND_NAME, Brand } from './BrandMark';
import { easeInOut, f, tween } from './kit';
import { NARRATION } from './narration';
import { C, FONT, FPS } from './theme';
import { SCENES } from './timeline';

/** Warm paper ground with a slowly drifting dot grid — runs under every scene. */
export function Background() {
  const frame = useCurrentFrame();
  const off = (frame * 0.4) % 48;
  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern
            id="dots"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
            patternTransform={`translate(${off} ${off * 0.5})`}
          >
            <circle cx="2" cy="2" r="2" fill="#DAD7CE" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    </AbsoluteFill>
  );
}

const COMPANIES: Brand[] = ['anthropic', 'openai', 'x', 'meta', 'google'];

/** Chapter rail at the top: one segment per company, filling as its chapter plays. */
export function ProgressRail() {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const first = SCENES[1];
  const last = SCENES[5];
  const vis =
    tween(frame, [f(first.start + 0.4), f(first.start + 0.9)]) *
    (1 - tween(frame, [f(last.end - 0.3), f(last.end + 0.3)]));
  if (vis <= 0) return null;
  return (
    <div
      style={{
        position: 'absolute',
        top: 120,
        left: 72,
        right: 72,
        opacity: vis,
        transform: `translateY(${(1 - vis) * -30}px)`,
        fontFamily: FONT,
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        {COMPANIES.map((b, i) => {
          const s = SCENES[i + 1];
          const p = Math.max(0, Math.min(1, (t - s.start) / (s.end - s.start)));
          const active = t >= s.start && t < s.end;
          return (
            <div key={b} style={{ flex: active ? 2.4 : 1, minWidth: 0 }}>
              <div style={{ height: 8, borderRadius: 8, background: C.line, overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${p * 100}%`,
                    height: '100%',
                    background: BRAND_COLOR[b],
                    borderRadius: 8,
                  }}
                />
              </div>
              <div
                style={{
                  marginTop: 14,
                  fontSize: 28,
                  fontWeight: 600,
                  color: active ? C.ink : C.ink3,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  opacity: active ? 1 : 0,
                }}
              >
                {BRAND_NAME[b]}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Burned-in subtitles that follow the narration. */
export function Captions() {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const line = NARRATION.find((l) => t >= l.start - 0.1 && t < l.end + 0.15);
  if (!line) return null;
  const a = f(line.start - 0.1);
  const z = f(line.end + 0.15);
  const p = tween(frame, [a, a + 7]) * (1 - tween(frame, [z - 6, z]));
  return (
    <div
      style={{
        position: 'absolute',
        left: 80,
        right: 80,
        bottom: 360,
        display: 'flex',
        justifyContent: 'center',
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontSize: 46,
          lineHeight: 1.45,
          fontWeight: 600,
          color: C.ink,
          background: 'rgba(255,255,255,0.94)',
          border: `2px solid ${C.line}`,
          borderRadius: 28,
          padding: '22px 36px',
          textAlign: 'center',
          maxWidth: 920,
        }}
      >
        {line.text}
      </div>
    </div>
  );
}

const WIPE_LABEL: Record<string, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  x: 'xAI · X',
  meta: 'Meta',
  google: 'Google',
  outro: '五条路径',
};

/** Colour panel that sweeps up across each chapter boundary. 36 frames, centred on the cut. */
export function Wipes() {
  const frame = useCurrentFrame();
  return (
    <>
      {SCENES.slice(1).map((s) => {
        const mid = f(s.start);
        const local = frame - (mid - 18);
        if (local < 0 || local > 36) return null;
        const color = s.id === 'outro' ? C.ink : BRAND_COLOR[s.id as Brand];
        // paper leads in and trails out; the colour panel rides on top of it
        const inP = tween(local, [3, 17], [0, 1], easeInOut);
        const outP = tween(local, [20, 33], [0, 1], easeInOut);
        const y = (1 - inP) * 100 - outP * 100;
        const y2 =
          (1 - tween(local, [0, 14], [0, 1], easeInOut)) * 100 -
          tween(local, [23, 36], [0, 1], easeInOut) * 100;
        const label = tween(local, [11, 17]) * (1 - tween(local, [20, 26]));
        return (
          <AbsoluteFill key={s.id} style={{ pointerEvents: 'none' }}>
            <AbsoluteFill style={{ background: C.paper, transform: `translateY(${y2}%)` }} />
            <AbsoluteFill
              style={{
                background: color,
                transform: `translateY(${y}%)`,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 132,
                  fontWeight: 800,
                  letterSpacing: -3,
                  color: '#FFFFFF',
                  opacity: label,
                  transform: `scale(${0.96 + label * 0.04})`,
                }}
              >
                {WIPE_LABEL[s.id]}
              </div>
            </AbsoluteFill>
          </AbsoluteFill>
        );
      })}
    </>
  );
}
