R['contact'] = () => page('Contact', 'Tell us what you need in your own words. No form to fill.',
`<div class="grid l"><div class="card"><h3>WhatsApp</h3><p>+${WA}</p>${cta('Hi OFFside, I need some help.', 'Message on WhatsApp')}</div>
<div class="card"><h3>Facebook</h3><p>${esc(FB_NAME)}</p>${MESSENGER ? `<a class="btn" href="${MESSENGER}" target="_blank" rel="noopener">Message on Messenger</a>` : '<p>Add your Messenger link in the settings at the top of the file.</p>'}</div></div>`);
