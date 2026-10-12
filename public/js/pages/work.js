R['work'] = () => page('Selected work', 'A curated set of what we have made, strongest first.',
`<div class="grid l">${WORK.map(w => `<div>${w.src ? `<img class="cover" style="aspect-ratio:4/3" src="${esc(w.src)}" alt="${esc(w.name)}">` : ph(w.label, '4/3')}<b>${esc(w.name)}</b>${w.caption ? `<p>${esc(w.caption)}</p>` : ''}</div>`).join('')}</div>`);
