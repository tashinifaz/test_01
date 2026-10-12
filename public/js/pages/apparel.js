R['apparel'] = () => page('Apparel', 'Jerseys are our front door. The same production system makes other garments too.',
`<div class="grid">${APPAREL.map(a => `<div class="card">${ph(a + ' — add photo','4/3')}<h3>${a}</h3>${cta(`Hi OFFside, I’m interested in ${a.toLowerCase()}.`, 'Ask about this', 'btn ghost')}</div>`).join('')}</div>
<div class="note">Add only garments your current production setup supports.</div>`);
