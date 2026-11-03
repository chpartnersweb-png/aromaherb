import { SITE_URL } from '../config/site.mjs';

export const site = {
  name: 'aromaherb-あろま～ぶ',
  url: SITE_URL,
  phone: '080-7006-3145', telephone: 'tel:08070063145',
  hours: '10:00〜LAST', closed: '不定休',
  instagram: 'https://www.instagram.com/aromaherb3145/',
  blog: 'https://ameblo.jp/aromaherb405/',
  therapistSource: 'https://ameblo.jp/aromaherb405/entry-12948917061.html',
  description: '熊本市中央区・水前寺／本荘のメンズエステ「aromaherb-あろま～ぶ」。オイルマッサージ90分10,000円から。在籍セラピスト、出勤情報への案内、コース料金、お部屋・アクセスを掲載。ご予約・お問い合わせは080-7006-3145へ。',
};
export const courses = [
  { minutes: 90, price: '10,000' }, { minutes: 120, price: '13,000' },
  { minutes: 150, price: '16,000' }, { minutes: 180, price: '19,000' },
];
export const rooms = [
  { number: '01', name: '水前寺', english: 'Suizenji', address: '熊本県熊本市中央区水前寺3丁目', streetAddress: '水前寺3丁目', access: 'JR豊肥本線「水前寺駅」から徒歩約9分・タクシー約3分' },
  { number: '02', name: '本荘', english: 'Honjo', address: '熊本県熊本市中央区本荘2丁目', streetAddress: '本荘2丁目', access: 'アクセスの詳細は、お電話でお問い合わせください。' },
];
// 部屋①・②との対応は未指定のため、共通の室内ギャラリーとして掲載。
export const roomPhotos = [
  { src: '/assets/images/room-interior-01.webp', width: 750, height: 562, alt: 'ブラウンの施術マットと、柔らかな灯りのある室内' },
  { src: '/assets/images/room-interior-02.webp', width: 750, height: 1000, alt: 'あたたかな照明とカーテン、施術スペースのある室内' },
  { src: '/assets/images/room-interior-03.webp', width: 750, height: 1000, alt: 'ソファと施術スペースを備えた室内の様子' },
];
export const navigation = [
  { href: '#schedule', label: '出勤情報' }, { href: '#therapists', label: 'セラピスト' },
  { href: '#menu', label: 'メニュー' }, { href: '#access', label: 'アクセス' },
  { href: '#recruit', label: '求人案内' },
];
