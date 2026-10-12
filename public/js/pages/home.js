R['home'] = () => `
<section class="hero"><div class="wrap"><div>
<h1><span>Your team</span><span>Your identity</span><span>Your jersey</span></h1>
<p>OFFside is a custom apparel manufacturer. Start with customized jerseys, minimum order ${MOQ} pieces.</p>
${cta('Hi OFFside, I’m interested in customized jerseys.')} &nbsp; <a class="btn ghost" href="#/work">See our work</a>
</div><div class="slides" id="hs" style="aspect-ratio:4/5">${HERO.map(slide).join('')}<div class="dots">${HERO.map((_,i) => `<button aria-label="Show image ${i+1}"></button>`).join('')}</div></div></div></section>
${sec('', `<div class="sl-h"><h2>Selected work</h2><div class="sl-b"><button data-slide="-1" aria-label="Previous">‹</button><button data-slide="1" aria-label="Next">›</button></div></div><div class="track" id="wt">${WORK.map(w => `<a class="wk" href="#/work">${w.src ? `<img src="${esc(w.src)}" alt="${esc(w.name)}">` : ph(w.label)}<b>${esc(w.name)}</b></a>`).join('')}<a class="wk more" href="#/work"><span class="disp">View more</span></a></div>`)}
${sec('One production system', `<p>The same cutting, sewing, printing and customization setup makes jerseys for any sport, team, company or event.</p><br><div class="grid">${MFG.slice(0,4).map(m => `<div class="card"><h3>${m[0]}</h3><p>${m[1]}</p></div>`).join('')}</div><br><a class="btn ghost" href="#/manufacturing">How we make it</a>`, 'alt')}
${sec('Fabrics', `<p>Real fabric close-ups, so you can choose by look and feel.</p>${chips(FABRICS)}<a class="btn ghost" href="#/fabrics">Browse fabrics</a>`)}
${sec('Also on the floor', `<div class="grid"><div class="card"><h3>Design library</h3><p>Browse previous designs and ask for something similar.</p><a class="btn ghost" href="#/designs">Open library</a></div><div class="card"><h3>Process</h3><p>From first message to delivery.</p><a class="btn ghost" href="#/process">See the steps</a></div><div class="card"><h3>Proof</h3><p>Reviews and real finished orders.</p><a class="btn ghost" href="#/proof">See proof</a></div><div class="card"><h3>Lab</h3><p>Play with jerseys. Design your own.</p><a class="btn ghost" href="#/lab">Enter the Lab</a></div></div>`, 'alt')}
${finalCta()}`;
