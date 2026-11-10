import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { Appear, Bar, Chars, DrawPath, Typewriter, f, tween } from '../kit';
import { Beat, CompanyHeader, Panel } from '../SceneKit';
import { C, MONO } from '../theme';

// Scene starts at 14s. Narration (scene-local): 0.8 / 8.8 / 16.8 / 23.8
export function AnthropicScene() {
  return (
    <AbsoluteFill>
      <CompanyHeader brand="anthropic" name="Anthropic" meta="2021 · 旧金山 · Claude" dockAt={8.4} />

      <Beat from={0} to={8.6}>
        <Origin />
      </Beat>
      <Beat from={8.6} to={16.6}>
        <Founders />
      </Beat>
      <Beat from={16.6} to={23.6}>
        <ClaudeChat />
      </Beat>
      <Beat from={23.6} to={32} exit={false}>
        <SafeAndStrong />
      </Beat>
    </AbsoluteFill>
  );
}

/** OpenAI → Anthropic: the 2021 departure. */
function Origin() {
  const frame = useCurrentFrame();
  const at = f(3.2);
  const arrive = tween(frame, [at + 30, at + 46]);
  return (
    <AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <DrawPath d="M370 1160 C 450 1070, 570 1070, 640 1160" at={at + 8} dur={26} stroke={C.anthropic} width={6} />
        <DrawPath d="M612 1138 L642 1164 L602 1172" at={at + 32} dur={8} stroke={C.anthropic} width={6} />
      </svg>
      <Appear at={at} style={{ position: 'absolute', left: 120, top: 1130 }}>
        <div style={pill(C.xSoft, C.ink2)}>OpenAI</div>
      </Appear>
      <div
        style={{
          position: 'absolute',
          left: 660,
          top: 1130,
          opacity: arrive,
          transform: `scale(${0.96 + arrive * 0.04})`,
        }}
      >
        <div style={pill(C.anthropic, '#FFFFFF')}>Anthropic</div>
      </div>
      <Appear at={at + 20} style={{ position: 'absolute', top: 1030, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontFamily: MONO, fontSize: 32, color: C.anthropic, fontWeight: 600 }}>2021 · 出走创业</span>
      </Appear>
    </AbsoluteFill>
  );
}

function Founders() {
  const frame = useCurrentFrame();
  const people = [
    { name: '达里奥 · 阿莫迪', en: 'Dario Amodei', role: 'CEO' },
    { name: '丹妮拉 · 阿莫迪', en: 'Daniela Amodei', role: '总裁' },
  ];
  const shieldAt = f(3.6);
  const glowIn = tween(frame, [shieldAt + 24, shieldAt + 36]);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 470, left: 72, right: 72, display: 'flex', gap: 32 }}>
        {people.map((p, i) => (
          <Appear key={p.en} at={8 + i * 8} from={i === 0 ? 'left' : 'right'} style={{ flex: 1 }}>
            <Panel style={{ padding: 36, display: 'flex', flexDirection: 'column', gap: 18, height: 330 }}>
              <div
                style={{
                  width: 104,
                  height: 104,
                  borderRadius: 104,
                  background: C.anthropicSoft,
                  color: C.anthropic,
                  fontSize: 44,
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                DA
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, color: C.ink, whiteSpace: 'nowrap' }}>{p.name}</div>
              <div style={{ fontSize: 28, color: C.ink3, marginTop: 'auto' }}>
                {p.en} · {p.role}
              </div>
            </Panel>
          </Appear>
        ))}
      </div>

      <svg width={1080} height={1920} style={{ position: 'absolute', inset: 0 }}>
        <DrawPath
          d="M540 880 L700 940 L700 1080 C700 1170 620 1230 540 1270 C460 1230 380 1170 380 1080 L380 940 Z"
          at={shieldAt}
          dur={28}
          stroke={C.anthropic}
          width={8}
          fill="none"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 1010,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 76,
          fontWeight: 900,
          color: C.anthropic,
          opacity: glowIn,
          transform: `scale(${0.96 + glowIn * 0.04})`,
        }}
      >
        AI 安全
      </div>
      <Appear at={shieldAt + 40} style={{ position: 'absolute', top: 1110, left: 0, right: 0, textAlign: 'center' }}>
        <span style={{ fontSize: 30, color: C.ink2, fontWeight: 600 }}>写进公司基因</span>
      </Appear>
    </AbsoluteFill>
  );
}

function ClaudeChat() {
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 440, left: 72, right: 72 }}>
        <Chars text="Claude" at={4} stagger={3} style={{ fontSize: 170, fontWeight: 900, letterSpacing: -6, color: C.ink }} />
      </div>
      <Appear at={18} style={{ position: 'absolute', top: 680, left: 72, right: 72 }}>
        <Panel style={{ padding: 40, height: 470, display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              alignSelf: 'flex-end',
              background: C.anthropicSoft,
              color: C.ink,
              fontSize: 34,
              fontWeight: 600,
              padding: '18px 28px',
              borderRadius: 26,
            }}
          >
            帮我找出这段代码的 bug
          </div>
          <div style={{ fontFamily: MONO, fontSize: 30, lineHeight: 1.6, color: C.ink }}>
            <Typewriter
              text={'第 14 行在空数组时会越界。\n\n- return items[items.length]\n+ return items.at(-1) ?? null'}
              at={f(1.8)}
              cps={26}
            />
          </div>
        </Panel>
      </Appear>
      <div style={{ position: 'absolute', top: 1200, left: 72, right: 72, display: 'flex', gap: 32 }}>
        {[
          { k: '推理', v: 0.92, at: f(4.2) },
          { k: '编程', v: 0.96, at: f(4.6) },
        ].map((s) => (
          <div key={s.k} style={{ flex: 1 }}>
            <Appear at={s.at} distance={20}>
              <div style={{ fontSize: 32, fontWeight: 700, color: C.ink, marginBottom: 12 }}>{s.k}</div>
              <Bar value={s.v} at={s.at + 4} color={C.anthropic} track={C.anthropicSoft} />
            </Appear>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
}

function SafeAndStrong() {
  const frame = useCurrentFrame();
  const join = tween(frame, [f(5.0), f(5.8)]);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', top: 450, left: 72, right: 72, display: 'flex', alignItems: 'center', gap: 22 }}>
        <Appear at={4} from="left">
          <div style={pill(C.anthropicSoft, C.anthropic)}>宪法式 AI</div>
        </Appear>
        <Appear at={14} from="left" distance={30}>
          <div style={{ fontSize: 48, color: C.ink3 }}>→</div>
        </Appear>
        <Appear at={22} from="left">
          <div style={pill(C.anthropic, '#FFFFFF')}>Claude Code</div>
        </Appear>
      </div>

      <Appear at={30} style={{ position: 'absolute', top: 600, left: 72, right: 72 }}>
        <Panel style={{ padding: 40, background: '#FBFAF7' }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {[C.gRed, C.gYellow, C.gGreen].map((c) => (
              <div key={c} style={{ width: 20, height: 20, borderRadius: 20, background: c }} />
            ))}
          </div>
          <div style={{ fontFamily: MONO, fontSize: 32, lineHeight: 1.7, color: C.ink, minHeight: 290 }}>
            <Typewriter
              text={'$ claude "给登录页加上双重验证"\n✓ 读取代码库\n✓ 修改 6 个文件\n✓ 测试全部通过'}
              at={f(1.4)}
              cps={22}
            />
          </div>
        </Panel>
      </Appear>

      <div
        style={{
          position: 'absolute',
          top: 1100,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
          gap: 28 - join * 6,
          fontWeight: 900,
          fontSize: 110,
          color: C.ink,
        }}
      >
        <span style={{ opacity: join, transform: `translateX(${(1 - join) * -120}px)` }}>安全</span>
        <span style={{ color: C.anthropic, fontSize: 90, opacity: join }}>&</span>
        <span style={{ opacity: join, transform: `translateX(${(1 - join) * 120}px)` }}>强大</span>
      </div>
    </AbsoluteFill>
  );
}

function pill(bg: string, color: string): React.CSSProperties {
  return {
    background: bg,
    color,
    fontSize: 40,
    fontWeight: 800,
    padding: '20px 36px',
    borderRadius: 100,
    whiteSpace: 'nowrap',
  };
}
