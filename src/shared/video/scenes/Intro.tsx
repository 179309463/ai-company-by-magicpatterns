import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND_COLOR, BRAND_NAME, Brand, BrandMark } from '../BrandMark';
import { Chars, DrawPath, Typewriter, easeInOut, f, tween } from '../kit';
import { C, MONO } from '../theme';

const BRANDS: Brand[] = ['anthropic', 'openai', 'x', 'meta', 'google'];
// network positions (beat 1) → row positions (beat 2)
const NODES = [
  { x: 170, y: 560 },
  { x: 900, y: 520 },
  { x: 120, y: 1120 },
  { x: 950, y: 1080 },
  { x: 560, y: 1290 },
];
const ROW = [140, 340, 540, 740, 940].map((x) => ({ x, y: 1000 }));

export function Intro() {
  const frame = useCurrentFrame();

  // beat 2 starts at 7.2s
  const b2 = tween(frame, [f(7.2), f(8.2)], [0, 1], easeInOut);
  const aiIn = tween(frame, [f(1.2), f(1.8)]);
  const aiY = 820 - b2 * 380;
  const aiScale = (0.9 + aiIn * 0.1) * (1 - b2 * 0.55);
  const lines = 1 - tween(frame, [f(7.6), f(8.4)]);
  const sub = 1 - tween(frame, [f(7.2), f(7.6)]);
  const lift = tween(frame, [f(12.6), f(13.8)], [0, 1], easeInOut);

  return (
    <AbsoluteFill>
      {/* date line */}
      <div
        style={{
          position: 'absolute',
          top: 380,
          width: '100%',
          textAlign: 'center',
          fontFamily: MONO,
          fontSize: 34,
          color: C.ink2,
          opacity: sub,
        }}
      >
        <Typewriter text="2022.11.30  ChatGPT 发布" at={f(0.4)} cps={22} />
      </div>

      {/* network */}
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0, opacity: lines }}>
        {NODES.map((n, i) => {
          const m = NODES[(i + 1) % NODES.length];
          const o = NODES[(i + 2) % NODES.length];
          return (
            <g key={i}>
              <DrawPath d={`M${n.x} ${n.y} L${m.x} ${m.y}`} at={f(1.8) + i * 5} dur={22} stroke={C.line} width={4} />
              <DrawPath d={`M${n.x} ${n.y} L${o.x} ${o.y}`} at={f(2.6) + i * 5} dur={22} stroke={C.line} width={3} />
            </g>
          );
        })}
      </svg>

      {/* AI wordmark */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: aiY - 230,
          textAlign: 'center',
          fontSize: 440,
          fontWeight: 900,
          letterSpacing: -20,
          lineHeight: 1,
          color: C.ink,
          opacity: aiIn,
          transform: `scale(${aiScale})`,
        }}
      >
        AI
      </div>

      {/* beat 1 subline */}
      <div style={{ position: 'absolute', top: 1110, left: 0, right: 0, opacity: sub }}>
        <Chars
          text="正在重塑世界"
          at={f(3.0)}
          stagger={3}
          style={{ justifyContent: 'center', fontSize: 92, fontWeight: 800, color: C.ink, letterSpacing: 6 }}
        />
      </div>

      {/* beat 2 headline */}
      {frame > f(7.6) && (
        <div style={{ position: 'absolute', top: 640, left: 0, right: 0 }}>
          <Chars
            text="五家 AI 巨头"
            at={f(7.6)}
            stagger={3}
            style={{ justifyContent: 'center', fontSize: 132, fontWeight: 900, color: C.ink, letterSpacing: -2 }}
          />
        </div>
      )}

      {/* nodes → brand marks */}
      {BRANDS.map((b, i) => {
        const pop = tween(frame, [f(1.8) + i * 4, f(1.8) + i * 4 + 12]);
        const m = tween(frame, [f(8.6) + i * 6, f(8.6) + i * 6 + 18], [0, 1], easeInOut);
        const x = NODES[i].x + (ROW[i].x - NODES[i].x) * m;
        const y = NODES[i].y + (ROW[i].y - NODES[i].y) * m - lift * 40;
        const size = 150;
        return (
          <div
            key={b}
            style={{
              position: 'absolute',
              left: x - size / 2,
              top: y - size / 2,
              width: size,
              height: size,
              transform: `scale(${1 + lift * 0.08})`,
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: size / 2 - 22,
                top: size / 2 - 22,
                width: 44,
                height: 44,
                borderRadius: 44,
                background: BRAND_COLOR[b],
                opacity: pop * (1 - m),
                transform: `scale(${0.96 + pop * 0.04})`,
              }}
            />
            <div style={{ opacity: m, transform: `scale(${0.5 + m * 0.5})` }}>
              <BrandMark brand={b} size={size} rotate={frame * 0.6} />
            </div>
            <div
              style={{
                position: 'absolute',
                top: size + 20,
                left: -40,
                right: -40,
                textAlign: 'center',
                fontSize: 30,
                fontWeight: 700,
                color: C.ink,
                opacity: tween(frame, [f(9.2) + i * 6, f(9.6) + i * 6]),
                whiteSpace: 'nowrap',
              }}
            >
              {BRAND_NAME[b]}
            </div>
          </div>
        );
      })}

      {/* question */}
      <div
        style={{
          position: 'absolute',
          top: 1230,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 54,
          fontWeight: 600,
          color: C.ink2,
          opacity: tween(frame, [f(10.6), f(11.2)]),
          transform: `translateY(${(1 - tween(frame, [f(10.6), f(11.2)])) * 30}px)`,
        }}
      >
        谁在定义下一代人工智能？
      </div>
    </AbsoluteFill>
  );
}
