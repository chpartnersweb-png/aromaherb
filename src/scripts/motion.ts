// 表示をCSSで事前に隠さず、対応ブラウザだけでアニメーションを追加する。
// 読み込み失敗や非対応環境でも本文・リンクはそのまま利用できる。
function initializeMotion() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('animate' in Element.prototype)) return;

  const running = new Map<Animation, HTMLElement>();
  const revealed = new WeakSet<HTMLElement>();
  const delays = new WeakMap<HTMLElement, number>();
  let observer: IntersectionObserver | undefined;

  const stopMotion = () => {
    observer?.disconnect();
    running.forEach((_element, animation) => animation.cancel());
    running.clear();
  };

  const play = (element: HTMLElement, keyframes: Keyframe[], options: KeyframeAnimationOptions) => {
    if (preference.matches) return;
    const animation = element.animate(keyframes, options);
    running.set(animation, element);
    const release = () => running.delete(animation);
    animation.addEventListener('finish', release, { once: true });
    animation.addEventListener('cancel', release, { once: true });
  };

  preference.addEventListener('change', event => {
    if (event.matches) stopMotion();
  });
  window.addEventListener('pagehide', stopMotion, { once: true });

  // キーボード操作中は、フォーカス先をすぐ見える状態にする。
  document.addEventListener('focusin', event => {
    if (!(event.target instanceof Node)) return;
    const target = event.target;
    running.forEach((element, animation) => {
      if (element.contains(target)) animation.finish();
    });
  });

  const hero = document.querySelector<HTMLElement>('.hero');
  const heroImage = document.querySelector<HTMLImageElement>('.hero-picture img');
  const heroVisible = () => {
    if (!hero || document.visibilityState === 'hidden') return false;
    const bounds = hero.getBoundingClientRect();
    return bounds.bottom > 0 && bounds.top < window.innerHeight;
  };

  if ((!window.location.hash || window.location.hash === '#home') && heroVisible()) {
    document.querySelectorAll<HTMLElement>('.hero-content > *').forEach((element, index) => {
      play(element, [
        { opacity: 0, transform: 'translateY(16px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], {
        duration: 750, delay: 120 + index * 85,
        easing: 'cubic-bezier(.2, .65, .3, 1)', fill: 'backwards',
      });
    });

    const revealHeroImage = () => {
      if (!heroImage || !heroVisible()) return;
      play(heroImage, [
        { opacity: .75, transform: 'scale(1.035)' },
        { opacity: 1, transform: 'scale(1)' },
      ], { duration: 1800, easing: 'cubic-bezier(.2, .65, .3, 1)' });
    };
    if (heroImage?.complete && heroImage.naturalWidth > 0) revealHeroImage();
    else heroImage?.addEventListener('load', revealHeroImage, { once: true });
  }

  if (!('IntersectionObserver' in window)) return;

  const smallScreen = window.matchMedia('(max-width: 600px)').matches;
  const stagger = (parentSelector: string, childSelector: string, columns: number) => {
    document.querySelectorAll<HTMLElement>(parentSelector).forEach(parent => {
      parent.querySelectorAll<HTMLElement>(childSelector).forEach((element, index) => {
        delays.set(element, (index % columns) * 85);
      });
    });
  };
  stagger('.therapist-grid', '.therapist-card', smallScreen ? 2 : 3);
  stagger('.course-comparison', ':scope > div', smallScreen ? 2 : 4);
  stagger('.room-gallery', '.room-photo', 3);
  stagger('.rooms', '.room', 2);
  stagger('.quick-links', ':scope > a', 3);
  stagger('.social-links', ':scope > a', 2);

  const selectors = [
    '.schedule-notice', '.quick-links > a', '.directory-heading',
    '.therapist-card', '.visit-guide', '.section-heading',
    '.course-comparison > div', '.price-footer', '.room-photo',
    '.room', '.contact-panel', '.social-layout > div:first-child',
    '.social-links > a', '.recruit-intro', '.recruit-details',
    '.footer-top', '.footer-bottom',
  ].join(',');

  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) return;
      const element = entry.target;
      observer?.unobserve(element);
      if (revealed.has(element)) return;
      revealed.add(element);
      if (element.contains(document.activeElement)) return;
      play(element, [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], {
        duration: 720, delay: delays.get(element) || 0,
        easing: 'cubic-bezier(.2, .65, .3, 1)', fill: 'backwards',
      });
    });
  }, { rootMargin: '0px 0px -32px 0px', threshold: .08 });

  document.querySelectorAll<HTMLElement>(selectors).forEach(element => {
    // 途中位置から開いた場合、すでに通過した要素は動かさない。
    if (element.getBoundingClientRect().bottom <= 0) return;
    observer?.observe(element);
  });
}

initializeMotion();
