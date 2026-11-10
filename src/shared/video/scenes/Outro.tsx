import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { BRAND_COLOR, Brand, BrandMark } from '../BrandMark';
import { Chars, easeInOut, f, tween } from '../kit';
import { C } from '../theme';

const ITEMS: { brand: Brand; word: string }[] = [
  { brand: 'anthropic', word: '安全' },
  { brand: 'openai', word: '普及' },
  { brand: 'x', word: '速度' },
  { brand: 'meta', word: '开源' },
  { brand: 'google', word: '底层创新' },
];

// Scene starts at 172s and runs 13s. Narration (scene-local): 0.6 / 7.0
export function Outro() {
  const frame = useCurrentFrame();
  const conv = tween(frame, [f(6.8), f(7.8)], [0, 1], easeInOut);
  const words = 1 - tween(frame, [f(6.5), f(6.9)]);
  const title = tween(frame, [f(4.6), f(5.1)]) * (1 - tween(frame, [f(6.5), f(6.9)]));
  const end = tween(frame, [f(12.4), f(13)]);
  const cx = 540;
  const cy = 860;
  const R = 330;
  const size = 132;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 470,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 76,
          fontWeight: 900,
          color: C.ink,
          opacity: title,
          transform: `translateY(${(1 - title) * 30}px)`,
        }}
      >
        五家公司 · 五条路径
      </div>

      {ITEMS.map((it, i) => {
        const pop = tween(frame, [f(0.8 + i * 0.8), f(0.8 + i * 0.8) + 12]);
        const rowX = 140 + i * 200;
        const rowY = 820;
        const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2 + frame * 0.006;
        const ringX = cx + Math.cos(angle) * R;
        const ringY = cy + Math.sin(angle) * R;
        const x = rowX + (ringX - rowX) * conv;
        const y = rowY + (ringY - rowY) * conv;
        const s = size * (1 - conv * 0.15);
        return (
          <div
            key={it.brand}
            style={{
              position: 'absolute',
              left: x - s / 2,
              top: y - s / 2,
              opacity: pop,
              transform: `scale(${0.96 + pop * 0.04})`,
            }}
          >
            <BrandMark brand={it.brand} size={s} rotate={frame * 0.5} />
            <div
              style={{
                position: 'absolute',
                top: s + 24,
                left: -50,
                right: -50,
                textAlign: 'center',
                fontSize: 40,
                fontWeight: 900,
                color: BRAND_COLOR[it.brand],
                opacity: words,
                whiteSpace: 'nowrap',
              }}
            >
              {it.word}
            </div>
          </div>
        );
      })}

      {frame > f(7.4) && (
        <div style={{ position: 'absolute', top: cy - 120, left: 0, right: 0 }}>
          <Chars
            text="下一个十年"
            at={f(7.4)}
            stagger={3}
            style={{ justifyContent: 'center', fontSize: 60, fontWeight: 700, color: C.ink2 }}
          />
          <Chars
            text="谁会领跑？"
            at={f(7.9)}
            stagger={4}
            style={{ justifyContent: 'center', fontSize: 100, fontWeight: 900, color: C.ink, marginTop: 10 }}
          />
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          top: 1262,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          opacity: tween(frame, [f(10), f(10.5)]),
          transform: `translateY(${(1 - tween(frame, [f(10), f(10.5)])) * 24}px)`,
        }}
      >
        <div
          style={{
            background: C.ink,
            color: '#FFF',
            fontSize: 40,
            fontWeight: 800,
            padding: '20px 48px',
            borderRadius: 100,
            whiteSpace: 'nowrap',
          }}
        >
          关注我 · 持续追踪 AI 动态
        </div>
      </div>

      <AbsoluteFill style={{ background: C.bg, opacity: end }} />
    </AbsoluteFill>
  );
}
