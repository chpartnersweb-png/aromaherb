// 公開URLはAstro設定・メタ情報・構造化データ・サイトマップで共有する。
export const SITE_URL = 'https://aromaherb.pages.dev/';

/** @param {string} [pathname] */
export const absoluteUrl = (pathname = '/') => new URL(pathname, SITE_URL).href;
