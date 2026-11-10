import React from 'react'
import { Player } from '@remotion/player'

import { AIGiants } from '../shared/video/AIGiants'
import { FPS, HEIGHT, WIDTH } from '../shared/video/theme'
import { SCENES, TOTAL_FRAMES } from '../shared/video/timeline'

export const args = {
  startAt: 'intro',
  captions: true,
  autoPlay: true,
}

export const argTypes = {
  startAt: {
    control: 'select',
    options: ['intro', 'anthropic', 'openai', 'x', 'meta', 'google', 'outro'],
  },
  captions: { control: 'boolean' },
  autoPlay: { control: 'boolean' },
}

type Props = Partial<typeof args>

/**
 * Silent in-browser preview of the 1080×1920 video.
 * Music, narration and SFX are generated and mixed when rendering locally.
 */
export default function VideoPreview(props: Props) {
  const { startAt, captions, autoPlay } = { ...args, ...props }
  const scene = SCENES.find((s) => s.id === startAt) ?? SCENES[0]
  return (
    <main className="flex h-screen w-full items-center justify-center bg-[#EDEBE5]">
      <div className="aspect-[9/16] h-full max-h-full max-w-full overflow-hidden sm:h-[min(100%,960px)] sm:rounded-2xl">
        <Player
          key={`${startAt}-${captions}`}
          component={AIGiants}
          inputProps={{ withAudio: false, captions }}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          compositionWidth={WIDTH}
          compositionHeight={HEIGHT}
          initialFrame={Math.round(scene.start * FPS)}
          autoPlay={autoPlay}
          loop
          controls
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </main>
  )
}
