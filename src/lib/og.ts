import sharp from 'sharp';

function escapeXml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[character]!);
}

function wrapJapanese(value: string, lineLength = 25, maxLines = 3) {
  const characters = [...value];
  const lines = [];
  for (let index = 0; index < characters.length && lines.length < maxLines; index += lineLength) {
    const line = characters.slice(index, index + lineLength).join('');
    lines.push(index + lineLength < characters.length && lines.length === maxLines - 1 ? `${line.slice(0, -1)}…` : line);
  }
  return lines;
}

export async function generateOgImage(kicker: string, title: string) {
  const lines = wrapJapanese(title);
  const tspans = lines.map((line, index) => `<tspan x="84" dy="${index === 0 ? 0 : 78}">${escapeXml(line)}</tspan>`).join('');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
      <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f7fafb"/><stop offset="1" stop-color="#e8f2f4"/></linearGradient></defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <rect x="64" y="60" width="1072" height="510" rx="28" fill="#fff" stroke="#dbe1e6" stroke-width="2"/>
      <rect x="84" y="100" width="10" height="66" rx="5" fill="#1d5d70"/>
      <text x="116" y="145" fill="#1d5d70" font-family="sans-serif" font-size="30" font-weight="700">${escapeXml(kicker)}</text>
      <text x="84" y="252" fill="#17212b" font-family="sans-serif" font-size="58" font-weight="700">${tspans}</text>
      <text x="84" y="525" fill="#5e6872" font-family="sans-serif" font-size="28">にじさんじ配信アーカイブ検証室</text>
    </svg>`;
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
