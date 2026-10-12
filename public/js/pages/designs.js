R['designs'] = () => page('Design library', 'Browse previous designs. Found one you like? Ask for something similar.',
`<input class="search" id="dsearch" placeholder="Search designs" aria-label="Search designs">
${chips(['All sports','All apparel','All colours','All styles'])}
<div class="grid" id="dgrid">${Array.from({length:12},(_,i) => { const id = '#' + String(i+1).padStart(4,'0'); return `<div class="card dcard" data-t="design ${id}">${ph('Design ' + id,'1/1')}<b>Design ${id}</b>${cta(`Hi OFFside, I want something like Design ${id}.`, 'Want something like this?', 'btn ghost')}</div>`; }).join('')}</div>
<div class="note">Before showing a customer’s design, logo or name here, make sure you have permission.</div>`);
