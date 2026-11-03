const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileMenu = document.querySelector<HTMLElement>('#mobile-menu');
const header = document.querySelector<HTMLElement>('.site-header');

function setMenu(open: boolean) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
document.addEventListener('click', event => {
  if (menuToggle?.getAttribute('aria-expanded') === 'true' && event.target instanceof Node && !header?.contains(event.target)) setMenu(false);
});
document.addEventListener('focusin', event => {
  if (menuToggle?.getAttribute('aria-expanded') === 'true' && event.target instanceof Node && !header?.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 1101px)').addEventListener('change', event => {
  if (event.matches) setMenu(false);
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
let headerFrame: number | undefined;
window.addEventListener('scroll', () => {
  if (headerFrame !== undefined) return;
  headerFrame = window.requestAnimationFrame(() => {
    headerFrame = undefined;
    updateHeader();
  });
}, { passive: true });
window.addEventListener('pageshow', updateHeader);
updateHeader();

document.querySelectorAll<HTMLButtonElement>('[data-profile]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.profile || '');
    if (!(dialog instanceof HTMLDialogElement)) return;
    if (typeof dialog.showModal !== 'function') {
      window.open('https://ameblo.jp/aromaherb405/entry-12948917061.html', '_blank', 'noopener,noreferrer');
      return;
    }
    dialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

document.querySelectorAll<HTMLDialogElement>('.profile-dialog').forEach(dialog => {
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (!document.querySelector('dialog[open]')) document.body.classList.remove('dialog-open');
  });
});
