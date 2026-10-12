/* ============ JERSEY SVG (used by hero + Dream Jersey) ============ */
const jersey = (o, id = 'j') => {
  const {b,s,t,a,p,n,u} = o;
  const pat = p === 'stripes' ? [0,1,2,3,4].map(i => `<rect x="${80+i*31.2}" y="0" width="15" height="320" fill="${a}"/>`).join('')
    : p === 'hoops' ? [0,1,2,3].map(i => `<rect x="60" y="${90+i*50}" width="180" height="22" fill="${a}"/>`).join('')
    : p === 'half' ? `<rect x="150" y="0" width="90" height="320" fill="${a}"/>` : '';
  const body = 'M95 20Q150 55 205 20L228 40V300Q150 312 72 300V40Z';
  const f = 'font-family="Big Shoulders Display,Impact,sans-serif" font-weight="800" text-anchor="middle"';
  return `<svg viewBox="0 0 300 330" role="img" aria-label="Jersey preview"><defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs>
<path d="M95 20L55 35L10 95L50 125L72 100V40Z" fill="${s}"/><path d="M205 20L245 35L290 95L250 125L228 100V40Z" fill="${s}"/>
<path d="${body}" fill="${b}"/><g clip-path="url(#${id})">${pat}</g>
<path d="M95 20Q150 55 205 20" fill="none" stroke="${t}" stroke-width="7"/>
<text x="150" y="96" ${f} font-size="24" letter-spacing="2" fill="${t}">${esc(n)}</text>
<text x="150" y="200" ${f} font-size="100" fill="${t}">${esc(u)}</text></svg>`;
};
const D = {b:'#0E1A33',s:'#C8302E',t:'#F2F2EF',a:'#C8302E',p:'stripes',n:'YOUR NAME',u:'10'};
const dreamMsg = () => `Hi OFFside, I designed a jersey in the Lab (${D.p} pattern, name "${D.n}", number ${D.u}; body ${D.b}, sleeves ${D.s}, trim ${D.t}). I want something like this.`;
