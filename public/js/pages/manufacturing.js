R['manufacturing'] = () => page('Manufacturing', 'Cutting, sewing, printing and customization under one roof. Replace the slots with real photos and video.',
`<div class="grid l">${MFG.map(m => `<div class="card"><h3>${m[0]}</h3><p>${m[1]}</p>${ph(m[0] + ' — add photo or video','16/9')}</div>`).join('')}
<div class="card"><h3>Quality control</h3><p>Add a short, true description of your checks.</p>${ph('Quality control — add photo','16/9')}</div></div>
<br>${cta('Hi OFFside, I want to ask about manufacturing.')}`);
