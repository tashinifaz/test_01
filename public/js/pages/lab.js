R['lab'] = () => page('Lab', 'Play with jerseys. Pick a sport first — it changes the teams, eras and options you see.',
`<div class="chips" id="sports">${SPORTS.map(s => `<button class="chip ${s === sport ? 'on' : ''}" data-sport="${s}">${s}</button>`).join('')}</div>
<div class="grid l">${LAB.map(l => `<a class="card" href="#/lab/${l.k}" style="text-decoration:none"><span class="tag">${l.st}</span><h3>${l.n}</h3><p>${l.s}</p></a>`).join('')}</div>
<div class="note">Jersey DNA, History and Battle need the sports and jersey database before they can run. No AI is used in the Lab.</div>`);


LAB.forEach(l => R['lab/' + l.k] = () => {
  const head = `<a href="#/lab">← Lab</a><br><br>`;
  if (l.k === 'dream-jersey') return sec('Dream Jersey', `${head}<div class="split dream"><div class="stage" id="stage">${jersey(D,'dj')}</div><div id="ctrl">
  <p>Draft preview. This is not a quote or an order.</p><br>
  <label>Body <input type="color" data-k="b" value="${D.b}"></label><label>Sleeves <input type="color" data-k="s" value="${D.s}"></label>
  <label>Trim and text <input type="color" data-k="t" value="${D.t}"></label><label>Pattern colour <input type="color" data-k="a" value="${D.a}"></label>
  <label>Pattern <select data-k="p"><option value="plain">Plain</option><option value="stripes" selected>Stripes</option><option value="hoops">Hoops</option><option value="half">Half and half</option></select></label>
  <label>Name <input data-k="n" maxlength="14" value="${D.n}"></label><label>Number <input data-k="u" maxlength="2" value="${D.u}"></label><br>
  <a class="btn" id="dcta" href="${wa(dreamMsg())}" target="_blank" rel="noopener">Make something like this</a></div></div>`);
  if (l.k === 'ai-jersey-try-on') return sec(l.n, `${head}<span class="tag">Coming soon</span><p>A future way to see a jersey on you. Nothing to upload or generate yet.</p>`);
  return sec(l.n, `${head}<span class="tag">${l.st}</span><p>${l.s}</p><div class="note"><b>To build this:</b><ul style="margin:8px 0 0 18px">${l.needs.map(n => `<li>${n}</li>`).join('')}</ul></div>${cta(`Hi OFFside, I came from ${l.n} and want to discuss a custom jersey.`)}`);
});
