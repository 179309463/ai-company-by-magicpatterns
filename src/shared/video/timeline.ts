import { FPS } from './theme';

export type SceneId = 'intro' | 'anthropic' | 'openai' | 'x' | 'meta' | 'google' | 'outro';

/** Scene boundaries in seconds. Transitions straddle each boundary. */
export const SCENES: { id: SceneId; start: number; end: number; label: string }[] = [
  { id: 'intro', start: 0, end: 14, label: '开场' },
  { id: 'anthropic', start: 14, end: 46, label: 'Anthropic' },
  { id: 'openai', start: 46, end: 78, label: 'OpenAI' },
  { id: 'x', start: 78, end: 108, label: 'X / xAI' },
  { id: 'meta', start: 108, end: 140, label: 'Meta' },
  { id: 'google', start: 140, end: 172, label: 'Google' },
  { id: 'outro', start: 172, end: 185, label: '结尾' },
];

export const TOTAL_SECONDS = 185;
export const TOTAL_FRAMES = TOTAL_SECONDS * FPS;

export const sec = (s: number) => Math.round(s * FPS);

export type SfxName = 'whoosh' | 'pop' | 'ding' | 'tick' | 'rise' | 'hit' | 'type';

/** Sound effects, in absolute seconds. */
export const SFX: { at: number; name: SfxName; volume?: number }[] = [
  // intro
  { at: 0.3, name: 'rise', volume: 0.5 },
  { at: 1.2, name: 'hit', volume: 0.6 },
  { at: 7.4, name: 'pop' },
  { at: 8.8, name: 'pop', volume: 0.5 },
  { at: 9.0, name: 'pop', volume: 0.5 },
  { at: 9.2, name: 'pop', volume: 0.5 },
  { at: 9.4, name: 'pop', volume: 0.5 },
  { at: 9.6, name: 'pop', volume: 0.5 },
  { at: 12.8, name: 'rise', volume: 0.5 },
  // anthropic
  { at: 13.6, name: 'whoosh' },
  { at: 14.6, name: 'hit', volume: 0.5 },
  { at: 18.2, name: 'tick', volume: 0.5 },
  { at: 23.0, name: 'pop' },
  { at: 23.4, name: 'pop' },
  { at: 26.6, name: 'ding', volume: 0.5 },
  { at: 31.0, name: 'pop' },
  { at: 32.5, name: 'type', volume: 0.35 },
  { at: 38.0, name: 'type', volume: 0.35 },
  { at: 43.2, name: 'ding', volume: 0.6 },
  // openai
  { at: 45.6, name: 'whoosh' },
  { at: 46.6, name: 'hit', volume: 0.5 },
  { at: 49.5, name: 'tick', volume: 0.5 },
  { at: 54.2, name: 'pop' },
  { at: 57.0, name: 'rise', volume: 0.45 },
  { at: 59.0, name: 'ding', volume: 0.6 },
  { at: 62.5, name: 'pop', volume: 0.6 },
  { at: 63.6, name: 'pop', volume: 0.6 },
  { at: 64.7, name: 'pop', volume: 0.6 },
  { at: 65.8, name: 'pop', volume: 0.6 },
  { at: 69.4, name: 'hit', volume: 0.4 },
  // x
  { at: 77.6, name: 'whoosh' },
  { at: 78.6, name: 'hit', volume: 0.6 },
  { at: 83.0, name: 'pop' },
  { at: 86.0, name: 'type', volume: 0.35 },
  { at: 93.2, name: 'rise', volume: 0.5 },
  { at: 96.0, name: 'tick', volume: 0.5 },
  { at: 100.0, name: 'hit', volume: 0.6 },
  // meta
  { at: 107.6, name: 'whoosh' },
  { at: 108.6, name: 'hit', volume: 0.5 },
  { at: 112.0, name: 'tick', volume: 0.5 },
  { at: 116.4, name: 'pop' },
  { at: 120.5, name: 'ding', volume: 0.5 },
  { at: 125.2, name: 'pop', volume: 0.6 },
  { at: 126.4, name: 'pop', volume: 0.6 },
  { at: 127.6, name: 'pop', volume: 0.6 },
  { at: 128.8, name: 'pop', volume: 0.6 },
  { at: 133.2, name: 'rise', volume: 0.45 },
  { at: 135.5, name: 'ding', volume: 0.5 },
  // google
  { at: 139.6, name: 'whoosh' },
  { at: 140.6, name: 'hit', volume: 0.5 },
  { at: 143.0, name: 'type', volume: 0.35 },
  { at: 148.6, name: 'pop' },
  { at: 155.2, name: 'pop' },
  { at: 158.6, name: 'pop' },
  { at: 161.0, name: 'ding', volume: 0.6 },
  { at: 163.6, name: 'hit', volume: 0.45 },
  // outro
  { at: 171.6, name: 'whoosh' },
  { at: 172.8, name: 'pop', volume: 0.55 },
  { at: 173.6, name: 'pop', volume: 0.55 },
  { at: 174.4, name: 'pop', volume: 0.55 },
  { at: 175.2, name: 'pop', volume: 0.55 },
  { at: 176.0, name: 'pop', volume: 0.55 },
  { at: 178.8, name: 'rise', volume: 0.5 },
  { at: 179.6, name: 'hit', volume: 0.7 },
  { at: 182.0, name: 'ding', volume: 0.5 },
];
