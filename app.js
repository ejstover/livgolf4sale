/* No analytics, presence polling, accounts, or chat service. */
(() => {
  'use strict';
  const { players, sources } = window.LIV_DATA;
  const $ = id => document.getElementById(id);
  const groups = [
    { id: 'online', title: 'Online', subtitle: 'still in the group project' },
    { id: 'idle', title: 'Idle', subtitle: 'it’s complicated' },
    { id: 'offline', title: 'Offline', subtitle: 'has left the chat' }
  ];
  const sorted = [...players].sort((a, b) => a.name.localeCompare(b.name, 'en'));
  const mobile = () => window.matchMedia('(max-width: 720px)').matches;
  // Both long groups stay one tap away on small screens; no nested mobile scrolling.
  const collapsed = new Set(['idle', ...(mobile() ? ['offline'] : [])]);
  let selected = players.find(p => p.name === 'Richard Bland');
  let filter = '';
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function buddyButton(p) {
    const button = el('button', 'buddy-button'); button.type = 'button'; button.dataset.player = p.id;
    button.setAttribute('aria-pressed', String(p.id === selected.id));
    button.setAttribute('aria-label', `${p.name}, ${p.presence === 'lurkers' ? 'Lurkers' : p.presence}. View fictional status`);
    const dot = el('span', `presence ${p.presence === 'lurkers' ? 'online' : p.presence}`); dot.setAttribute('aria-hidden', 'true');
    const copy = el('span', 'buddy-copy'); copy.append(el('span', 'buddy-name', p.name));
    if (p.presence === 'lurkers') copy.append(el('span', 'attendance', p.message));
    else { copy.append(el('span', 'buddy-handle', p.screenName)); if (p.presence === 'online') copy.append(el('span', 'buddy-preview', p.message)); }
    button.append(dot, copy); button.addEventListener('click', () => select(p, true)); return button;
  }
  function render() {
    const fragment = document.createDocumentFragment(); let results = 0;
    for (const group of groups) {
      const all = sorted.filter(p => p.presence === group.id);
      const matches = all.filter(p => `${p.name} ${p.screenName}`.toLowerCase().includes(filter)); results += matches.length;
      const section = el('section', 'buddy-group'); const heading = el('button', 'group-heading');
      const open = !!filter || !collapsed.has(group.id); heading.type = 'button';
      heading.setAttribute('aria-expanded', String(open)); heading.setAttribute('aria-controls', `group-${group.id}`);
      heading.append(el('span', 'triangle', open ? '▼' : '▶'), el('span', '', group.title), el('span', 'group-subtitle', group.subtitle), el('span', 'group-count', filter ? `${matches.length}/${all.length}` : String(all.length)));
      const list = el('ul', 'buddy-list'); list.id = `group-${group.id}`; list.hidden = !open;
      for (const p of matches) { const li = el('li'); li.append(buddyButton(p)); list.append(li); }
      if (!matches.length) list.append(el('li', 'no-match', 'No matching buddies.'));
      heading.addEventListener('click', () => {
        if (filter) { filter = ''; $('buddy-search').value = ''; }
        if (open) collapsed.add(group.id); else collapsed.delete(group.id);
        render(); document.querySelector(`[aria-controls="group-${group.id}"]`).focus();
      });
      section.append(heading, list); fragment.append(section);
    }
    $('buddy-groups').replaceChildren(fragment); $('no-results').hidden = results > 0;
    const lurkers = sorted.filter(p => p.presence === 'lurkers');
    const heading = el('div', 'lurker-heading'); heading.append(el('span', '', 'LURKERS'), el('span', '', String(lurkers.length)));
    $('lurkers').replaceChildren(heading, ...lurkers.map(buddyButton));
    const count = presence => players.filter(p => p.presence === presence).length;
    $('list-total').textContent = `${count('online')} online · ${count('idle')} idle · ${count('offline')} offline`;
  }
  function select(p, moveFocus = false) {
    selected = p;
    document.querySelectorAll('[data-player]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.player === p.id)));
    $('to-handle').textContent = p.screenName; $('profile-name').textContent = p.name; $('profile-handle').textContent = p.screenName;
    $('profile-message').textContent = p.message; $('profile-note').textContent = p.note;
    $('profile-presence').textContent = p.presence === 'lurkers' ? '● Lurker' : `${p.presence === 'idle' ? '◷' : p.presence === 'offline' ? '○' : '●'} ${p.presence}`;
    $('profile-presence').dataset.presence = p.presence;
    $('message-kind').textContent = p.presence === 'offline' ? 'LAST AWAY MESSAGE' : p.presence === 'lurkers' ? 'BUDDY INFO' : 'AWAY MESSAGE';
    $('profile-sources').replaceChildren(...p.sources.map(source => {
      const link = el('a', '', source.label); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; return link;
    }));
    if (moveFocus && mobile()) {
      const title = $('profile-name'); title.setAttribute('tabindex', '-1'); title.focus({ preventScroll: true }); title.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' });
    }
  }
  $('buddy-search').addEventListener('input', event => { filter = event.target.value.toLowerCase().trim(); render(); });
  $('focus-search').addEventListener('click', () => $('buddy-search').focus());
  $('next-buddy').addEventListener('click', () => {
    const next = sorted[(sorted.findIndex(p => p.id === selected.id) + 1) % sorted.length];
    collapsed.delete(next.presence); filter = ''; $('buddy-search').value = ''; select(next); render();
    if (!mobile()) document.querySelector(`[data-player="${next.id}"]`)?.scrollIntoView({ block: 'nearest' });
  });
  const siteURL = 'https://livgolf4sale.com/';
  async function copyLink() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(siteURL); $('share-feedback').textContent = 'Link copied. Please don’t make another group chat.'; $('manual-copy').hidden = true;
    } catch {
      $('share-feedback').textContent = 'Select and copy the link below.'; $('manual-copy').hidden = false; $('share-url').focus(); $('share-url').select();
    }
  }
  async function share() {
    if (navigator.share) {
      try { await navigator.share({ title: 'LIV Instant Messenger', text: 'the future of golf is currently typing…', url: siteURL }); $('share-feedback').textContent = 'Shared. The group chat has entered its emo era.'; }
      catch (error) { if (error.name !== 'AbortError') await copyLink(); }
    } else await copyLink();
  }
  document.querySelectorAll('.share-trigger').forEach(button => button.addEventListener('click', share));
  $('copy-link').addEventListener('click', copyLink);
  for (const source of Object.values(sources)) {
    const item = el('li'); const link = el('a', '', source.label); link.href = source.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; item.append(link); $('source-index').append(item);
  }
  render(); select(selected);
})();
