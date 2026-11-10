import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Appear, Chars, Counter, DrawPath, Typewriter, f, tween } from '../kit';
import { Beat, CompanyHeader, Panel, Stat } from '../SceneKit';
import { C, MONO } from '../theme';

// Scene starts at 108s. Narration (scene-local): 0.8 / 8.0 / 16.8 / 24.8
export function MetaScene() {
  return (
    <AbsoluteFill>
      <CompanyHeader brand="meta" name="Meta" meta="门洛帕克 · FAIR · Llama" dockAt={7.6} />

      <Beat from={0} to={7.8}>
        <Fair />
      </Beat>
      <Beat from={7.8} to={16.6}>
        <LeCun />
      </Beat>
      <Beat from={16.6} to={24.6}>
        <Llama />
      </Beat>
      <Beat from={24.6} to={32} exit={false}>
        <Reach />
      </Beat>
    </AbsoluteFill>
  );
}

function Fair() {
  return (
    <AbsoluteFill>
      <Appear at={f(3.6)} style={{ position: 'absolute', top: 1040, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 40, fontWeight: 700, color: C.ink2 }}>FAIR 人工智能实验室</div>
        <Counter
          from={2000}
          to={2013}
          at={f(3.8)}
          dur={22}
          style={{ fontSize: 150, fontWeight: 900, color: C.meta, letterSpacing: -4 }}
        />
      </Appear>
    </AbsoluteFill>
  );
}

function LeCun() {
  return (
    <AbsoluteFill>
      <Appear at={6} style={{ position: 'absolute', top: 460, left: 72, right: 72 }}>
        <Panel style={{ padding: 36, display: 'flex', alignItems: 'center', gap: 30 }}>
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 112,
              background: C.metaSoft,
              color: C.meta,
              fontSize: 44,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            YL
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 46, fontWeight: 800, color: C.ink }}>杨立昆</div>
            <div style={{ fontSize: 30, color: C.ink3, marginTop: 6 }}>Yann LeCun · 图灵奖得主</div>
          </div>
        </Panel>
      </Appear>

      <Appear at={f(3.0)} style={{ position: 'absolute', top: 720, left: 72, right: 72 }}>
        <Panel style={{ padding: 40, background: '#FBFAF7' }}>
          <div style={{ fontFamily: MONO, fontSize: 34, lineHeight: 1.7, color: C.ink, minHeight: 230 }}>
            <Typewriter
              text={'import torch\n\nmodel = torch.nn.Linear(512, 10)\nmodel.to("cuda")'}
              at={f(3.4)}
              cps={30}
            />
          </div>
        </Panel>
      </Appear>

      <Appear at={f(4.6)} style={{ position: 'absolute', top: 1100, left: 72, right: 72 }}>
        <div style={{ fontSize: 96, fontWeight: 900, color: C.meta, letterSpacing: -3 }}>PyTorch</div>
        <div style={{ fontSize: 36, fontWeight: 700, color: C.ink, marginTop: 4 }}>最流行的深度学习框架之一</div>
      </Appear>
    </AbsoluteFill>
  );
}

function Llama() {
  const frame = useCurrentFrame();
  const items = [
    { name: 'Llama', date: '2023.02' },
    { name: 'Llama 2', date: '2023.07' },
    { name: 'Llama 3', date: '2024.04' },
    { name: 'Llama 4', date: '2025.04' },
  ];
  const fan = Array.from({ length: 11 }).map((_, i) => 130 + i * 82);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="开放权重" at={4} stagger={3} style={{ fontSize: 130, fontWeight: 900, color: C.ink, letterSpacing: -2 }} />
      </div>

      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <DrawPath d="M150 760 L930 760" at={f(0.4)} dur={f(4)} stroke={C.meta} width={6} />
        {fan.map((x, i) => (
          <DrawPath key={i} d={`M930 760 C 930 1000, ${x} 1000, ${x} 1180`} at={f(5.0) + i * 2} dur={20} stroke={C.metaSoft} width={4} />
        ))}
      </svg>

      {items.map((it, i) => {
        const x = 150 + i * 260;
        const at = f(0.6 + i * 1.2);
        const on = tween(frame, [at, at + 10]);
        return (
          <div key={it.name} style={{ position: 'absolute', left: x - 20, top: 740, opacity: on, transform: `scale(${0.96 + on * 0.04})` }}>
            <div style={{ width: 40, height: 40, borderRadius: 40, background: C.meta }} />
            <div style={{ position: 'absolute', top: -96, left: -70, width: 180, textAlign: 'center' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: C.ink, whiteSpace: 'nowrap' }}>{it.name}</div>
              <div style={{ fontFamily: MONO, fontSize: 24, color: C.ink3 }}>{it.date}</div>
            </div>
          </div>
        );
      })}

      {fan.map((x, i) => {
        const at = f(5.0) + i * 2 + 16;
        const on = tween(frame, [at, at + 8]);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x - 14,
              top: 1180,
              width: 28,
              height: 28,
              borderRadius: 28,
              background: C.paper,
              border: `5px solid ${C.meta}`,
              boxSizing: 'border-box',
              opacity: on,
            }}
          />
        );
      })}
      <Appear at={f(6.2)} style={{ position: 'absolute', top: 1240, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontSize: 38, fontWeight: 700, color: C.ink2 }}>开发者社区的无数衍生模型</span>
      </Appear>
    </AbsoluteFill>
  );
}

function Reach() {
  const frame = useCurrentFrame();
  const apps = [
    { name: 'WhatsApp', x: 200, y: 640 },
    { name: 'Instagram', x: 880, y: 640 },
    { name: 'Facebook', x: 200, y: 1000 },
    { name: 'Messenger', x: 880, y: 1000 },
  ];
  const cx = 540;
  const cy = 820;
  const pulse = (frame % 40) / 40;
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        {apps.map((a, i) => (
          <DrawPath key={a.name} d={`M${cx} ${cy} L${a.x} ${a.y}`} at={14 + i * 4} dur={16} stroke={C.meta} width={5} />
        ))}
        <circle cx={cx} cy={cy} r={110 + pulse * 70} fill="none" stroke={C.meta} strokeWidth={3} opacity={(1 - pulse) * 0.5} />
      </svg>
      <Appear at={4} style={{ position: 'absolute', left: cx - 110, top: cy - 110 }}>
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 220,
            background: C.meta,
            color: '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 48,
            fontWeight: 900,
          }}
        >
          Meta AI
        </div>
      </Appear>
      {apps.map((a, i) => (
        <Appear key={a.name} at={24 + i * 4} style={{ position: 'absolute', left: a.x - 120, top: a.y - 42 }}>
          <div
            style={{
              width: 240,
              height: 84,
              borderRadius: 84,
              background: C.paper,
              border: `3px solid ${C.meta}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
              color: C.ink,
            }}
          >
            {a.name}
          </div>
        </Appear>
      ))}
      <Appear at={f(2.9)} style={{ position: 'absolute', top: 1110, left: 0, right: 0 }}>
        <Stat brand="meta" value="数十亿" label="用户触手可及" size={130} />
      </Appear>
    </AbsoluteFill>
  );
}
