// Build-time Open Graph images (1200×630 PNG): satori lays out the card and
// turns the text into SVG paths, sharp rasterises it. Server-only: reads the
// font and logo from src/assets (paths relative to the project root, where
// `astro build` runs).
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const asset = (file: string) => readFileSync(resolve('src/assets', file));
const fonts = [
  { name: 'Inter', data: asset('fonts/inter-latin-400.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Inter', data: asset('fonts/inter-latin-800.ttf'), weight: 800 as const, style: 'normal' as const },
];
const logo = `data:image/svg+xml;base64,${asset('pnk-digital-logo.svg').toString('base64')}`;

const PINK = '#ec008c';

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export interface OgCard {
  /** Small label above the title, e.g. "Tech support". */
  eyebrow?: string;
  title: string;
  /** One supporting line under the title. */
  line: string;
}

export async function renderOgImage({ eyebrow, title, line }: OgCard): Promise<Buffer> {
  const titleSize = title.length > 60 ? 60 : 72;
  const tree = h(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px 72px',
      background: '#0a0a0f',
      color: '#ffffff',
      fontFamily: 'Inter',
      borderLeft: `24px solid ${PINK}`,
    },
    [
      h('div', { display: 'flex', alignItems: 'center', gap: 20 }, [
        h('img', { width: 46, height: 56 }, undefined, { src: logo, width: 46, height: 56 }),
        h('div', { fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em' }, 'PNK Digital'),
      ]),
      h('div', { display: 'flex', flexDirection: 'column', gap: 24 }, [
        ...(eyebrow
          ? [h('div', { fontSize: 24, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: PINK }, eyebrow)]
          : []),
        h('div', { fontSize: titleSize, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.03em' }, title),
        h('div', { fontSize: 32, fontWeight: 400, lineHeight: 1.35, color: '#c9c6d3' }, line),
      ]),
      h('div', { display: 'flex', height: 8, width: 160, background: PINK, borderRadius: 4 }),
    ]
  );
  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], { width: 1200, height: 630, fonts });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
