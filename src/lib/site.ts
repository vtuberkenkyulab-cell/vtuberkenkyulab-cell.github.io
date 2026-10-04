export const SITE_NAME = 'にじさんじ配信アーカイブ検証室';
export const SITE_SUBTITLE = 'にじさんじの話題を、元配信・公式情報まで遡って確認する非公式アーカイブ';
export const SITE_DESCRIPTION = 'にじさんじ所属VTuber・配信者について検索で見かける話題を、元配信、本人SNS、公式発表などの公開資料まで遡って確認する非公式アーカイブです。';

export function sitePath(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}` || '/';
}

export function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Tokyo'
  }).format(new Date(value));
}
