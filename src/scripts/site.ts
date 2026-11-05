function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (!toggle || !nav || toggle.dataset.bound === 'true') return;
  toggle.dataset.bound = 'true';
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    nav.setAttribute('inert', '');
    document.documentElement.classList.remove('menu-open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) nav.removeAttribute('inert'); else nav.setAttribute('inert', '');
    document.documentElement.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}

function initReveal() {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-enabled');
  }
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-reveal-ready])');
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((item) => { item.dataset.revealReady = 'true'; observer.observe(item); });
}

function initArchive() {
  const grid = document.querySelector<HTMLElement>('[data-project-grid]');
  if (!grid || grid.dataset.bound === 'true') return;
  grid.dataset.bound = 'true';
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-project-card]'));
  const search = document.querySelector<HTMLInputElement>('[data-project-search]');
  const count = document.querySelector<HTMLElement>('[data-archive-count]');
  const empty = document.querySelector<HTMLElement>('[data-archive-empty]');
  const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  let activeCategory = 'all';
  const apply = () => {
    const query = (search?.value ?? '').trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const categoryMatch = activeCategory === 'all' || card.dataset.category === activeCategory;
      const searchMatch = (card.dataset.search ?? '').includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (count) count.textContent = `SHOWING ${visible} / ${cards.length} PROJECTS`;
    if (empty) empty.hidden = visible !== 0;
  };
  search?.addEventListener('input', apply);
  buttons.forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter ?? 'all';
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    apply();
  }));
  apply();
}

function initEnquiryForm() {
  const form = document.querySelector<HTMLFormElement>('[data-enquiry-form]');
  if (!form || form.dataset.bound === 'true') return;
  form.dataset.bound = 'true';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = `Project enquiry — ${String(data.get('service') ?? 'New project')}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Service: ${data.get('service')}`,
      '',
      'Project brief:',
      String(data.get('message') ?? ''),
    ].join('\n');
    window.location.href = `mailto:baselardstudios@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function initSite() {
  initMenu();
  initReveal();
  initArchive();
  initEnquiryForm();
}

initSite();
document.addEventListener('astro:page-load', initSite);
