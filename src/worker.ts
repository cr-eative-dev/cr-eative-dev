import { fallback, link, top } from './render.js';
import data from './stats.json';

export type Year = {
  from: string;
  to: string;
  days: number[];
};

const MAX_YEARS = 3;

const worker: ExportedHandler = {
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    const theme = (searchParams.get('theme') ?? 'light') as 'light' | 'dark';
    const section = searchParams.get('section') ?? '';
    let content = 'cr.eative.dev';

    if (section === 'top') {
      const { contributions } = data;
      content = top({ height: 20, contributions, theme });
    } else if (section === 'link-website') {
      const index = Number(searchParams.get('i')) ?? 0;
      content = link({ height: 18, width: 100, index, theme })('Website');
    } else if (section === 'link-linkedin') {
      const index = Number(searchParams.get('i')) ?? 0;
      content = link({ height: 18, width: 100, index, theme })('Linkedin');
    } else if (section === 'link-github') {
      const index = Number(searchParams.get('i')) ?? 0;
      content = link({ height: 18, width: 100, index, theme })('GitHub');
    } else if (section == 'fallback') {
      content = fallback({ height: 180, width: 420, theme });
    }

    return new Response(content, {
      headers: {
        'content-type': 'image/svg+xml',
        'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        pragma: 'no-cache',
        expires: '0'
      }
    });
  }
};

export default worker;
