import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Appear, Chars, Counter, DrawPath, Typewriter, easeInOut, f, tween } from '../kit';
import { Beat, CompanyHeader, Panel } from '../SceneKit';
import { C, MONO } from '../theme';

// Scene starts at 78s. Narration (scene-local): 0.8 / 7.8 / 15.0 / 21.8
export function XScene() {
  return (
    <AbsoluteFill>
      <CompanyHeader brand="x" name="xAI" meta="2023 · 埃隆 · 马斯克 · Grok" dockAt={7.4} />

      <Beat from={0} to={7.6}>
        <Merge />
      </Beat>
      <Beat from={7.6} to={14.8}>
        <Grok />
      </Beat>
      <Beat from={14.8} to={21.6}>
        <Colossus />
      </Beat>
      <Beat from={21.6} to={30} exit={false}>
        <Charge />
      </Beat>
    </AbsoluteFill>
  );
}

function Merge() {
  const frame = useCurrentFrame();
  const m = tween(frame, [f(4.2), f(5.0)], [0, 1], easeInOut);
  const show = tween(frame, [f(2.6), f(3.1)]);
  const box: React.CSSProperties = {
    position: 'absolute',
    top: 1080,
    width: 150,
    height: 150,
    borderRadius: 40,
    background: C.ink,
    color: '#FFF',
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <AbsoluteFill>
      <div style={{ ...box, fontSize: 52, left: 250 + m * 215, opacity: show * (1 - m) }}>xAI</div>
      <div style={{ ...box, fontSize: 80, left: 680 - m * 215, opacity: show, transform: `scale(${1 + m * 0.12})` }}>X</div>
      <div
        style={{
          position: 'absolute',
          top: 1260,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 40,
          fontWeight: 800,
          color: C.ink,
          opacity: tween(frame, [f(5.0), f(5.5)]),
        }}
      >
        合并为一家
      </div>
    </AbsoluteFill>
  );
}

function Grok() {
  const frame = useCurrentFrame();
  const scroll = (frame * 3) % 150;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="Grok" at={4} stagger={4} style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6, color: C.ink }} />
      </div>

      <Appear at={14} from="left" style={{ position: 'absolute', top: 680, left: 72, width: 400 }}>
        <Panel style={{ height: 560, overflow: 'hidden', position: 'relative', padding: '0 28px' }}>
          <div style={{ position: 'absolute', top: 22, left: 28, fontFamily: MONO, fontSize: 24, color: C.ink3, zIndex: 1, background: C.paper, padding: '4px 0' }}>
            ● 实时信息流
          </div>
          <div style={{ transform: `translateY(${-scroll}px)`, paddingTop: 80 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, height: 150, alignItems: 'flex-start' }}>
                <div style={{ width: 52, height: 52, borderRadius: 52, background: i % 2 ? C.xSoft : '#D6D5D1', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 6 }}>
                  <div style={{ height: 14, width: '55%', borderRadius: 14, background: '#CFCDC7' }} />
                  <div style={{ height: 14, width: '95%', borderRadius: 14, background: C.xSoft }} />
                  <div style={{ height: 14, width: `${60 + (i % 3) * 12}%`, borderRadius: 14, background: C.xSoft }} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Appear>

      <Appear at={30} from="right" style={{ position: 'absolute', top: 680, left: 500, right: 72 }}>
        <Panel style={{ height: 560, boxSizing: 'border-box', padding: 32, background: C.ink, borderColor: C.ink }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: '#FFF', marginBottom: 20 }}>Grok</div>
          <div style={{ fontSize: 32, lineHeight: 1.55, color: '#E8E8E6', fontWeight: 500 }}>
            <Typewriter text="根据过去一小时的讨论，大家最关心的是……" at={f(1.6)} cps={9} />
          </div>
        </Panel>
      </Appear>
    </AbsoluteFill>
  );
}

function Colossus() {
  const frame = useCurrentFrame();
  const cols = 14;
  const rows = 6;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="Colossus" at={4} stagger={2} style={{ fontSize: 140, fontWeight: 900, letterSpacing: -5, color: C.ink }} />
        <Appear at={20} distance={20}>
          <div style={{ fontFamily: MONO, fontSize: 30, color: C.ink2, marginTop: 6 }}>孟菲斯 · 超级计算集群</div>
        </Appear>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 720,
          left: 72,
          right: 72,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: 10,
        }}
      >
        {Array.from({ length: cols * rows }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const at = 14 + (r + c) * 2.2 + ((i * 37) % 7);
          const on = tween(frame, [at, at + 6]);
          return (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: 10,
                background: on > 0.5 ? C.ink : C.xSoft,
                transform: `scale(${0.96 + on * 0.04})`,
              }}
            />
          );
        })}
      </div>

      <div style={{ position: 'absolute', top: 1160, left: 72, right: 72, display: 'flex', gap: 60 }}>
        <Appear at={f(3.0)}>
          <Counter to={122} at={f(3.0)} dur={24} style={{ fontSize: 96, fontWeight: 900, color: C.ink }} />
          <span style={{ fontSize: 40, fontWeight: 800, color: C.ink, marginLeft: 8 }}>天建成</span>
        </Appear>
        <Appear at={f(3.6)}>
          <Counter to={10} at={f(3.6)} dur={24} style={{ fontSize: 96, fontWeight: 900, color: C.ink }} />
          <span style={{ fontSize: 40, fontWeight: 800, color: C.ink, marginLeft: 8 }}>万块 GPU 起步</span>
        </Appear>
      </div>
    </AbsoluteFill>
  );
}

function Charge() {
  const frame = useCurrentFrame();
  const pts = [
    { x: 140, y: 1150, label: 'Grok 1', year: '2023' },
    { x: 400, y: 1010, label: 'Grok 2', year: '2024' },
    { x: 660, y: 830, label: 'Grok 3', year: '2025' },
    { x: 920, y: 600, label: 'Grok 4', year: '2025' },
  ];
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' ');
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <DrawPath d={d} at={8} dur={50} stroke={C.ink} width={10} />
      </svg>
      {pts.map((p, i) => {
        const at = 8 + i * 16;
        const on = tween(frame, [at, at + 10]);
        return (
          <div key={p.label} style={{ position: 'absolute', left: p.x - 22, top: p.y - 22, opacity: on, transform: `scale(${0.96 + on * 0.04})` }}>
            <div style={{ width: 44, height: 44, borderRadius: 44, background: i === 3 ? C.ink : C.paper, border: `8px solid ${C.ink}`, boxSizing: 'border-box' }} />
            <div style={{ position: 'absolute', top: 58, left: -60, width: 164, textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: C.ink, whiteSpace: 'nowrap' }}>{p.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 24, color: C.ink3 }}>{p.year}</div>
            </div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="速度 × 算力" at={f(1.2)} stagger={3} style={{ fontSize: 110, fontWeight: 900, color: C.ink, letterSpacing: -2 }} />
      </div>
    </AbsoluteFill>
  );
}
