import { absoluteUrl } from '../config/site.mjs';
import { site, courses, rooms, roomPhotos } from './site';

export const seo = {
  title: `熊本・水前寺・本荘のメンズエステ｜${site.name}`,
  description: site.description,
  canonical: site.url,
  image: absoluteUrl('/assets/brand/ogp.png'),
  imageAlt: `${site.name}の店舗名入りロゴ。熊本・水前寺・本荘のオイルマッサージ。`,
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
};

const businessId = absoluteUrl('/#organization');
const websiteId = absoluteUrl('/#website');
const webpageId = absoluteUrl('/#webpage');
const catalogId = absoluteUrl('/#menu');
const roomId = (number: string) => absoluteUrl(`/#room-${number}`);

// 未公開の詳細住所、終業時刻、評価、資格、人物の実写真等は補わない。
// OrganizationとPlaceで、確認できる店舗・お部屋の情報だけを表現する。
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite', '@id': websiteId,
      url: site.url, name: site.name,
      alternateName: ['あろま～ぶ', 'aromaherb'],
      inLanguage: 'ja-JP', publisher: { '@id': businessId },
    },
    {
      '@type': 'WebPage', '@id': webpageId,
      url: seo.canonical, name: seo.title, description: seo.description,
      inLanguage: 'ja-JP', isPartOf: { '@id': websiteId },
      mainEntity: { '@id': businessId },
      primaryImageOfPage: {
        '@type': 'ImageObject', url: seo.image, width: 1200, height: 630,
        caption: `${site.name}のロゴ`,
      },
    },
    {
      '@type': 'Organization', '@id': businessId,
      name: site.name, alternateName: ['あろま～ぶ', 'aromaherb'],
      url: site.url, description: site.description,
      telephone: `+81${site.phone.replaceAll('-', '').slice(1)}`,
      logo: {
        '@type': 'ImageObject', url: absoluteUrl('/assets/brand/logo.png'),
        width: 1040, height: 284,
      },
      image: roomPhotos.map(photo => absoluteUrl(photo.src)),
      sameAs: [site.instagram, site.blog],
      location: rooms.map(room => ({ '@id': roomId(room.number) })),
      hasOfferCatalog: { '@id': catalogId },
    },
    ...rooms.map(room => ({
      '@type': 'Place', '@id': roomId(room.number),
      name: `${room.name}のお部屋`, url: absoluteUrl('/#access'),
      address: {
        '@type': 'PostalAddress', addressCountry: 'JP',
        addressRegion: '熊本県', addressLocality: '熊本市中央区',
        streetAddress: room.streetAddress,
      },
    })),
    {
      '@type': 'Service', '@id': absoluteUrl('/#oil-massage'),
      name: 'オイルマッサージ', serviceType: 'オイルマッサージ',
      url: absoluteUrl('/#menu'), provider: { '@id': businessId },
      hasOfferCatalog: { '@id': catalogId },
    },
    {
      '@type': 'OfferCatalog', '@id': catalogId,
      name: 'オイルマッサージのコース・料金',
      itemListElement: courses.map(course => ({
        '@type': 'Offer',
        name: `オイルマッサージ${course.minutes}分`,
        url: absoluteUrl('/#menu'),
        price: Number(course.price.replaceAll(',', '')), priceCurrency: 'JPY',
        seller: { '@id': businessId },
        itemOffered: {
          '@type': 'Service', name: `オイルマッサージ${course.minutes}分`,
          provider: { '@id': businessId },
        },
      })),
    },
  ],
};
