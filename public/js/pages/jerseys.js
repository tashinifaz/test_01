R['jerseys'] = () => page('Jerseys', 'Customized jerseys are what we make best. Pick the options below, or just send us your idea.',
`<div class="grid l">${Object.entries(OPTIONS).map(([k,v]) => `<div class="card"><h3>${k}</h3>${chips(v)}</div>`).join('')}</div>
<div class="note">Minimum order in Bangladesh: <b>${MOQ} pieces</b>. Pricing depends on your configuration, so ask us for a quote.</div>
<div class="grid">${[1,2,3,4].map(i => ph('Jersey example ' + i)).join('')}</div><br>
${cta('Hi OFFside, I’m interested in customized jerseys.')}`);
