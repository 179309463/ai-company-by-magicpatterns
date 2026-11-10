import React from 'react';
import { C } from './theme';

export type Brand = 'anthropic' | 'openai' | 'x' | 'meta' | 'google';

export const BRAND_COLOR: Record<Brand, string> = {
  anthropic: C.anthropic,
  openai: C.openai,
  x: C.x,
  meta: C.meta,
  google: C.gBlue,
};

export const BRAND_SOFT: Record<Brand, string> = {
  anthropic: C.anthropicSoft,
  openai: C.openaiSoft,
  x: C.xSoft,
  meta: C.metaSoft,
  google: C.googleSoft,
};

export const BRAND_NAME: Record<Brand, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  x: 'xAI',
  meta: 'Meta',
  google: 'Google',
};

/**
 * Abstract brand marks drawn for this video — colour-coded badges,
 * not the companies' trademarked logos.
 */
export function BrandMark({
  brand,
  size = 160,
  rotate = 0,
}: {
  brand: Brand;
  size?: number;
  rotate?: number;
}) {
  const r = size * 0.28;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {brand === 'anthropic' && (
        <g>
          <rect x="0" y="0" width="100" height="100" rx={r / (size / 100)} fill={C.anthropic} />
          <path
            d="M28 74 L46 26 L54 26 L72 74 M37 58 L63 58"
            stroke="#FFF7F0"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}
      {brand === 'openai' && (
        <g>
          <circle cx="50" cy="50" r="50" fill={C.ink} />
          <g transform={`rotate(${rotate} 50 50)`}>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <ellipse
                key={a}
                cx="50"
                cy="35"
                rx="11"
                ry="17"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="5"
                transform={`rotate(${a} 50 50)`}
              />
            ))}
          </g>
        </g>
      )}
      {brand === 'x' && (
        <g>
          <rect x="0" y="0" width="100" height="100" rx={r / (size / 100)} fill={C.ink} />
          <path
            d="M30 28 L70 72 M70 28 L30 72"
            stroke="#FFFFFF"
            strokeWidth="11"
            strokeLinecap="round"
          />
        </g>
      )}
      {brand === 'meta' && (
        <g>
          <rect x="0" y="0" width="100" height="100" rx={r / (size / 100)} fill={C.meta} />
          <path
            d="M50 50 C42 36 34 32 28 32 C20 32 16 42 16 50 C16 58 20 68 28 68 C34 68 42 64 50 50 C58 36 66 32 72 32 C80 32 84 42 84 50 C84 58 80 68 72 68 C66 68 58 64 50 50 Z"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
            strokeLinejoin="round"
          />
        </g>
      )}
      {brand === 'google' && (
        <g>
          <circle cx="50" cy="50" r="49" fill="#FFFFFF" stroke={C.line} strokeWidth="2" />
          <g transform={`rotate(${rotate} 50 50)`}>
            <circle cx="35" cy="35" r="11" fill={C.gBlue} />
            <circle cx="65" cy="35" r="11" fill={C.gRed} />
            <circle cx="65" cy="65" r="11" fill={C.gYellow} />
            <circle cx="35" cy="65" r="11" fill={C.gGreen} />
          </g>
        </g>
      )}
    </svg>
  );
}
