import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile } from 'remotion';
import { Background, Captions, ProgressRail, Wipes } from './Chrome';
import { NARRATION } from './narration';
import { FONT } from './theme';
import { SCENES, SFX, SceneId, TOTAL_FRAMES, sec } from './timeline';
import { Intro } from './scenes/Intro';
import { AnthropicScene } from './scenes/AnthropicScene';
import { OpenAIScene } from './scenes/OpenAIScene';
import { XScene } from './scenes/XScene';
import { MetaScene } from './scenes/MetaScene';
import { GoogleScene } from './scenes/GoogleScene';
import { Outro } from './scenes/Outro';

export type AIGiantsProps = {
  /** Render with music, narration and sound effects. Needs `npm run assets` first. */
  withAudio: boolean;
  /** Burn subtitles into the video. */
  captions: boolean;
};

const SCENE_COMPONENT: Record<SceneId, React.FC> = {
  intro: Intro,
  anthropic: AnthropicScene,
  openai: OpenAIScene,
  x: XScene,
  meta: MetaScene,
  google: GoogleScene,
  outro: Outro,
};

export function AIGiants({ withAudio, captions }: AIGiantsProps) {
  return (
    <AbsoluteFill style={{ fontFamily: FONT, overflow: 'hidden' }}>
      <Background />

      {SCENES.map((s) => {
        const Scene = SCENE_COMPONENT[s.id];
        return (
          <Sequence
            key={s.id}
            from={sec(s.start)}
            durationInFrames={sec(s.end - s.start)}
            name={s.label}
          >
            <Scene />
          </Sequence>
        );
      })}

      <ProgressRail />
      {captions && <Captions />}
      <Wipes />

      {withAudio && (
        <>
          <Audio
            src={staticFile('audio/bgm.wav')}
            loop
            volume={(fr) =>
              interpolate(
                fr,
                [0, 30, TOTAL_FRAMES - 90, TOTAL_FRAMES],
                [0, 0.16, 0.16, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              )
            }
          />
          {NARRATION.map((l) => (
            <Sequence key={l.id} from={sec(l.start)} name={`VO ${l.id}`}>
              <Audio src={staticFile(`voice/${l.id}.mp3`)} volume={1} />
            </Sequence>
          ))}
          {SFX.map((s, i) => (
            <Sequence key={i} from={sec(s.at)} durationInFrames={sec(2)} name={`SFX ${s.name}`}>
              <Audio src={staticFile(`sfx/${s.name}.wav`)} volume={(s.volume ?? 0.7) * 0.8} />
            </Sequence>
          ))}
        </>
      )}
    </AbsoluteFill>
  );
}
