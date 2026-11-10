import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Appear, Chars, Counter, DrawPath, Typewriter, f, tween } from '../kit';
import { Beat, CompanyHeader, Panel, Stat } from '../SceneKit';
import { C, MONO } from '../theme';

// Scene starts at 46s. Narration (scene-local): 0.8 / 8.0 / 16.3 / 23.0
export function OpenAIScene() {
  return (
    <AbsoluteFill>
      <CompanyHeader brand="openai" name="OpenAI" meta="2015 · 旧金山 · ChatGPT" dockAt={7.6} />

      <Beat from={0} to={7.8}>
        <Founded />
      </Beat>
      <Beat from={7.8} to={16.1}>
        <Launch />
      </Beat>
      <Beat from={16.1} to={22.9}>
        <Family />
      </Beat>
      <Beat from={22.9} to={32} exit={false}>
        <Defines />
      </Beat>
    </AbsoluteFill>
  );
}

function Founded() {
  return (
    <AbsoluteFill>
      <Appear at={f(3.3)} style={{ position: 'absolute', top: 1040, left: 0, right: 0, textAlign: 'center' }}>
        <Counter
          from={2000}
          to={2015}
          at={f(3.4)}
          dur={22}
          style={{ fontSize: 150, fontWeight: 900, color: C.openai, letterSpacing: -4 }}
        />
        <div style={{ fontSize: 44, fontWeight: 700, color: C.ink, marginTop: 6 }}>以非营利研究机构起步</div>
      </Appear>
    </AbsoluteFill>
  );
}

function Launch() {
  const frame = useCurrentFrame();
  const chartAt = f(3.0);
  const yi = tween(frame, [f(4.8), f(5.4)]);
  return (
    <AbsoluteFill>
      <Appear at={6} style={{ position: 'absolute', top: 450, left: 72, right: 72 }}>
        <Panel style={{ padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 18, height: 18, borderRadius: 18, background: C.openai }} />
          <div style={{ fontFamily: MONO, fontSize: 34, color: C.ink }}>
            <Typewriter text="2022.11.30  ChatGPT 上线" at={10} cps={20} />
          </div>
        </Panel>
      </Appear>

      <div
        style={{
          position: 'absolute',
          top: 610,
          left: 0,
          right: 0,
          opacity: yi,
          transform: `scale(${0.96 + yi * 0.04})`,
        }}
      >
        <Stat brand="openai" value="1 亿" label="用户 · 只用了 2 个月" size={200} />
      </div>

      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <DrawPath d="M110 1290 L970 1290" at={chartAt - 10} dur={16} stroke={C.line} width={4} />
        <DrawPath
          d="M110 1286 C 420 1280, 640 1250, 760 1170 C 860 1100, 920 1020, 970 930"
          at={chartAt}
          dur={46}
          stroke={C.openai}
          width={10}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 930,
          top: 892,
          width: 80,
          height: 80,
          borderRadius: 80,
          border: `6px solid ${C.openai}`,
          background: C.paper,
          opacity: yi,
        }}
      />
      <Appear at={chartAt} style={{ position: 'absolute', left: 110, top: 1306 }}>
        <span style={{ fontFamily: MONO, fontSize: 26, color: C.ink3 }}>第 0 天</span>
      </Appear>
      <Appear at={chartAt + 40} style={{ position: 'absolute', right: 72, top: 1306 }}>
        <span style={{ fontFamily: MONO, fontSize: 26, color: C.ink3 }}>第 60 天</span>
      </Appear>
    </AbsoluteFill>
  );
}

function Family() {
  const items = [
    { name: 'GPT-4', sub: '多模态大模型' },
    { name: 'o 系列', sub: '会"思考"的推理模型' },
    { name: 'DALL·E', sub: '文字生成图像' },
    { name: 'Sora', sub: '文字生成视频' },
  ];
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 460,
          left: 72,
          right: 72,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridAutoRows: 380,
          gap: 28,
        }}
      >
        {items.map((it, i) => (
          <Appear key={it.name} at={f(0.4 + i * 1.1)} style={{ height: '100%' }}>
            <Panel
              style={{
                height: '100%',
                boxSizing: 'border-box',
                padding: 40,
                display: 'flex',
                flexDirection: 'column',
                background: i === 0 ? C.ink : C.paper,
                borderColor: i === 0 ? C.ink : C.line,
              }}
            >
              <div style={{ width: 56, height: 8, borderRadius: 8, background: C.openai }} />
              <div
                style={{
                  marginTop: 'auto',
                  fontSize: 76,
                  fontWeight: 900,
                  letterSpacing: -2,
                  color: i === 0 ? '#FFFFFF' : C.ink,
                  whiteSpace: 'nowrap',
                }}
              >
                {it.name}
              </div>
              <div style={{ marginTop: 12, fontSize: 32, fontWeight: 600, color: i === 0 ? '#C9C9C6' : C.ink2 }}>
                {it.sub}
              </div>
            </Panel>
          </Appear>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function Defines() {
  return (
    <AbsoluteFill>
      <Appear at={4} style={{ position: 'absolute', top: 460, left: 72, right: 72 }}>
        <Panel style={{ padding: 36, display: 'flex', alignItems: 'center', gap: 30 }}>
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 112,
              background: C.openaiSoft,
              color: C.openai,
              fontSize: 44,
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            SA
          </div>
          <div>
            <div style={{ fontSize: 46, fontWeight: 800, color: C.ink }}>萨姆 · 奥特曼</div>
            <div style={{ fontSize: 30, color: C.ink3, marginTop: 6 }}>Sam Altman · CEO</div>
          </div>
        </Panel>
      </Appear>

      <Appear at={18} style={{ position: 'absolute', top: 700, left: 72, right: 72 }}>
        <div
          style={{
            border: `3px solid ${C.ink}`,
            borderRadius: 100,
            padding: '30px 44px',
            fontSize: 40,
            color: C.ink,
            fontWeight: 600,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: C.paper,
          }}
        >
          <Typewriter text="有什么可以帮你的？" at={24} cps={10} />
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 64,
              background: C.ink,
              color: '#FFF',
              fontSize: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ↑
          </div>
        </div>
      </Appear>

      <div style={{ position: 'absolute', top: 960, left: 72, right: 72 }}>
        <Chars text="定义了" at={f(3.4)} stagger={3} style={{ fontSize: 70, fontWeight: 700, color: C.ink2 }} />
        <Chars
          text="大众心中的 AI"
          at={f(3.8)}
          stagger={3}
          style={{ fontSize: 124, fontWeight: 900, color: C.ink, letterSpacing: -3, marginTop: 8 }}
          charStyle={(i) => (i >= 6 ? { color: C.openai } : {})}
        />
      </div>
    </AbsoluteFill>
  );
}
