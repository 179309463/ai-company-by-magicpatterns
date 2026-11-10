import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { BRAND_COLOR, Brand, BrandMark } from './BrandMark';
import { Chars, easeInOut, f, tween } from './kit';
import { C, MONO } from './theme';

/**
 * A narrative beat inside a scene. Children see frame 0 at `from` (seconds, scene-local).
 * It eases out over its last 10 frames so beats hand over rather than cut.
 */
export function Beat({
  from,
  to,
  children,
  exit = true,
}: {
  from: number;
  to: number;
  children: React.ReactNode;
  exit?: boolean;
}) {
  return (
    <Sequence from={f(from)} durationInFrames={f(to - from)} layout="none">
      <BeatInner dur={f(to - from)} exit={exit}>
        {children}
      </BeatInner>
    </Sequence>
  );
}

function BeatInner({ dur, exit, children }: { dur: number; exit: boolean; children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const o = exit ? tween(frame, [dur - 10, dur], [0, 1], easeInOut) : 0;
  return (
    <AbsoluteFill style={{ opacity: 1 - o, transform: `translateY(${-o * 40}px)` }}>
      {children}
    </AbsoluteFill>
  );
}

/**
 * Company header. Opens large and centred, then docks to the top-left at `dockAt`
 * (seconds, scene-local) and stays there for the rest of the chapter.
 */
export function CompanyHeader({
  brand,
  name,
  meta,
  dockAt,
}: {
  brand: Brand;
  name: string;
  meta: string;
  dockAt: number;
}) {
  const frame = useCurrentFrame();
  const enter = tween(frame, [f(0.5), f(1.1)]);
  const c = tween(frame, [f(dockAt), f(dockAt + 0.8)], [0, 1], easeInOut);
  const lerp = (a: number, b: number) => a + (b - a) * c;

  const markSize = lerp(240, 104);
  const markX = lerp(540 - 120, 72);
  const markY = lerp(470, 250);
  const nameSize = lerp(150, 64);
  const nameX = lerp(0, 200);
  const nameY = lerp(740, 252);
  const metaY = lerp(930, 330);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: markX,
          top: markY,
          opacity: enter,
          transform: `scale(${0.96 + enter * 0.04}) rotate(${(1 - enter) * -8}deg)`,
          transformOrigin: 'center',
        }}
      >
        <BrandMark brand={brand} size={markSize} rotate={frame * 0.5} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: nameY,
          left: nameX,
          right: c > 0 ? 72 : 0,
          display: 'flex',
          justifyContent: c > 0.5 ? 'flex-start' : 'center',
        }}
      >
        <Chars
          text={name}
          at={f(0.8)}
          stagger={2}
          style={{
            fontSize: nameSize,
            fontWeight: 850,
            letterSpacing: -nameSize * 0.03,
            lineHeight: 1.1,
            color: C.ink,
            flexWrap: 'nowrap',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          top: metaY,
          left: c > 0.5 ? 200 : 0,
          right: c > 0.5 ? 72 : 0,
          textAlign: c > 0.5 ? 'left' : 'center',
          fontFamily: MONO,
          fontSize: lerp(40, 28),
          color: C.ink2,
          opacity: tween(frame, [f(1.4), f(2)]),
        }}
      >
        {meta}
      </div>
    </AbsoluteFill>
  );
}

/** Rounded white panel used for diagrams, chats and terminals. */
export function Panel({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: C.paper,
        border: `2px solid ${C.line}`,
        borderRadius: 36,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Big statement number + label, used for one hero stat per beat. */
export function Stat({
  value,
  label,
  brand,
  size = 220,
}: {
  value: React.ReactNode;
  label: string;
  brand: Brand;
  size?: number;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          fontSize: size,
          fontWeight: 900,
          letterSpacing: -size * 0.04,
          lineHeight: 1,
          color: BRAND_COLOR[brand],
        }}
      >
        {value}
      </div>
      <div style={{ marginTop: 20, fontSize: 48, fontWeight: 700, color: C.ink }}>{label}</div>
    </div>
  );
}
