import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Appear, Chars, DrawPath, Typewriter, f, tween } from '../kit';
import { Beat, CompanyHeader, Panel } from '../SceneKit';
import { C, MONO } from '../theme';

const GC = [C.gBlue, C.gRed, C.gYellow, C.gBlue, C.gGreen, C.gRed];

// Scene starts at 140s. Narration (scene-local): 0.8 / 8.3 / 14.8 / 23.3
export function GoogleScene() {
  return (
    <AbsoluteFill>
      <CompanyHeader brand="google" name="Google" meta="山景城 · DeepMind · Gemini" dockAt={7.9} />

      <Beat from={0} to={8.1}>
        <Paper />
      </Beat>
      <Beat from={8.1} to={14.6}>
        <Bedrock />
      </Beat>
      <Beat from={14.6} to={23.1}>
        <DeepMind />
      </Beat>
      <Beat from={23.1} to={32} exit={false}>
        <Gemini />
      </Beat>
    </AbsoluteFill>
  );
}

function Paper() {
  return (
    <AbsoluteFill>
      <Appear at={f(2.6)} style={{ position: 'absolute', top: 1030, left: 120, right: 120 }}>
        <Panel style={{ padding: '34px 40px' }}>
          <div style={{ fontFamily: MONO, fontSize: 26, color: C.ink3, marginBottom: 12 }}>arXiv · 2017</div>
          <div style={{ fontSize: 50, fontWeight: 800, color: C.ink, lineHeight: 1.2, minHeight: 120 }}>
            <Typewriter text="Attention Is All You Need" at={f(3.0)} cps={16} />
          </div>
        </Panel>
      </Appear>
    </AbsoluteFill>
  );
}

function Bedrock() {
  const models = ['GPT', 'Claude', 'Gemini', 'Llama', 'Grok'];
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="Transformer" at={4} stagger={2} style={{ fontSize: 132, fontWeight: 900, letterSpacing: -5, color: C.ink }} />
        <Appear at={20} distance={20}>
          <div style={{ fontSize: 40, fontWeight: 700, color: C.ink2, marginTop: 6 }}>今天几乎所有大模型的基石</div>
        </Appear>
      </div>

      <div style={{ position: 'absolute', top: 760, left: 72, right: 72 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, alignItems: 'end', height: 330 }}>
          {models.map((m, i) => (
            <Appear key={m} at={f(1.6) + i * 5} from="down" distance={120}>
              <div
                style={{
                  height: 170 + ((i * 53) % 140),
                  borderRadius: 22,
                  background: C.paper,
                  border: `3px solid ${C.ink}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingTop: 22,
                  fontSize: 30,
                  fontWeight: 800,
                  color: C.ink,
                }}
              >
                {m}
              </div>
            </Appear>
          ))}
        </div>
        <Appear at={f(0.5)} from="up" distance={40}>
          <div
            style={{
              marginTop: 14,
              height: 120,
              borderRadius: 24,
              background: C.gBlue,
              color: '#FFF',
              fontSize: 48,
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Transformer
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
}

function DeepMind() {
  const frame = useCurrentFrame();
  const stones = [
    [2, 2, 1], [3, 3, 0], [4, 2, 1], [5, 4, 0], [3, 5, 1], [6, 6, 0], [2, 6, 1], [4, 4, 0], [6, 3, 1], [5, 2, 0],
  ];
  const nobel = tween(frame, [f(6.4), f(6.9)]);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="DeepMind" at={2} stagger={2} style={{ fontSize: 110, fontWeight: 900, letterSpacing: -4, color: C.ink }} />
      </div>

      <div style={{ position: 'absolute', top: 600, left: 72, right: 72, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
        <Appear at={f(0.6)}>
          <Panel style={{ padding: 28, height: 400, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <svg viewBox="0 0 90 90" width="100%" height={250}>
              {Array.from({ length: 9 }).map((_, i) => (
                <g key={i}>
                  <line x1={5 + i * 10} y1={5} x2={5 + i * 10} y2={85} stroke={C.line} strokeWidth={0.8} />
                  <line x1={5} y1={5 + i * 10} x2={85} y2={5 + i * 10} stroke={C.line} strokeWidth={0.8} />
                </g>
              ))}
              {stones.map(([x, y, w], i) => {
                const on = tween(frame, [f(1) + i * 4, f(1) + i * 4 + 6]);
                return (
                  <circle key={i} cx={5 + x * 10} cy={5 + y * 10} r={4.2 * on} fill={w ? C.paper : C.ink} stroke={C.ink} strokeWidth={0.8} />
                );
              })}
            </svg>
            <div style={{ marginTop: 'auto', fontSize: 40, fontWeight: 900, color: C.ink }}>AlphaGo</div>
            <div style={{ fontFamily: MONO, fontSize: 24, color: C.ink3 }}>2016 · 击败围棋世界冠军</div>
          </Panel>
        </Appear>
        <Appear at={f(4.0)}>
          <Panel style={{ padding: 28, height: 400, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
            <svg viewBox="0 0 90 90" width="100%" height={250}>
              <DrawPath
                d="M8 70 C 18 40, 30 80, 38 50 S 50 20, 58 42 S 72 70, 78 40 S 70 12, 52 16 S 26 22, 20 34"
                at={f(4.2)}
                dur={40}
                stroke={C.gGreen}
                width={4}
              />
              <DrawPath d="M14 82 C 30 74, 46 88, 62 78 S 80 70, 84 60" at={f(4.6)} dur={30} stroke={C.gBlue} width={3} />
            </svg>
            <div style={{ marginTop: 'auto', fontSize: 40, fontWeight: 900, color: C.ink }}>AlphaFold</div>
            <div style={{ fontFamily: MONO, fontSize: 24, color: C.ink3 }}>预测蛋白质结构</div>
          </Panel>
        </Appear>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 1070,
          left: 72,
          right: 72,
          display: 'flex',
          alignItems: 'center',
          gap: 30,
          opacity: nobel,
          transform: `translateY(${(1 - nobel) * 30}px)`,
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            background: C.gYellow,
            border: `8px solid ${C.ink}`,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            fontWeight: 900,
            color: C.ink,
            flexShrink: 0,
          }}
        >
          2024
        </div>
        <div>
          <div style={{ fontSize: 64, fontWeight: 900, color: C.ink }}>诺贝尔化学奖</div>
          <div style={{ fontSize: 30, color: C.ink2, marginTop: 4 }}>哈萨比斯与江珀 · AlphaFold</div>
        </div>
      </div>
    </AbsoluteFill>
  );
}

function Gemini() {
  const frame = useCurrentFrame();
  const chip = tween(frame, [f(2.6), f(3.2)]);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars
          text="Gemini"
          at={6}
          stagger={3}
          style={{ fontSize: 180, fontWeight: 900, letterSpacing: -6 }}
          charStyle={(i) => ({ color: GC[i % GC.length] })}
        />
      </div>

      <div style={{ position: 'absolute', top: 690, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <div style={{ opacity: chip, transform: `scale(${0.96 + chip * 0.04})` }}>
          <svg width={340} height={340} viewBox="0 0 100 100">
            {Array.from({ length: 5 }).map((_, i) => {
              const p = 26 + i * 12;
              return (
                <g key={i} stroke={C.ink} strokeWidth={3} strokeLinecap="round">
                  <line x1={p} y1={4} x2={p} y2={14} />
                  <line x1={p} y1={86} x2={p} y2={96} />
                  <line x1={4} y1={p} x2={14} y2={p} />
                  <line x1={86} y1={p} x2={96} y2={p} />
                </g>
              );
            })}
            <rect x={16} y={16} width={68} height={68} rx={10} fill={C.paper} stroke={C.ink} strokeWidth={3} />
            <rect x={30} y={30} width={40} height={40} rx={6} fill={C.gBlue} />
            <text x={50} y={55} textAnchor="middle" fontSize={13} fontWeight={900} fill="#FFF" fontFamily="Inter, sans-serif">
              TPU
            </text>
          </svg>
        </div>
      </div>
      <Appear at={f(3.4)} style={{ position: 'absolute', top: 1050, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: C.ink2 }}>自研 AI 芯片</div>
      </Appear>
      <div style={{ position: 'absolute', top: 1150, left: 0, right: 0 }}>
        <Chars
          text="重回 AI 竞赛中心"
          at={f(5.2)}
          stagger={3}
          style={{ justifyContent: 'center', fontSize: 92, fontWeight: 900, color: C.ink, letterSpacing: -2 }}
        />
      </div>
    </AbsoluteFill>
  );
}
