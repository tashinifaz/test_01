/* ============ CONTENT DATA — edit freely ============ */
const FABRICS = ['Microfiber PP','Box Mesh','Chinigura Mesh','Thai Mesh','Honeycomb','Lurex','Jacquard','Pindot'];
const OPTIONS = {
  'Fabrics': FABRICS.map(f => f === 'Jacquard' ? 'Jacquard (multiple varieties)' : f),
  'Construction': ['One-part','Two-part','Four-part'],
  'Collars': ['Round neck','Polo collar','V-neck','Other variations on request'],
  'Sleeves': ['Half sleeve','Full sleeve'],
  'Printing': ['Sublimation','DTF'],
  'Personalization': ['Player name','Player number','Team logo','Sponsor logo','Collar, rib and cuff changes','Additional sewing','Small pattern modifications where feasible'],
  'With the jersey': ['Shorts / pants','Goalkeeper or special jersey in the same order']
};
const APPAREL = ['T-shirts','Polos','Dropshoulder shirts','Pants','Trousers','Hoodies'];
const MFG = [
  ['Cutting','Garments are cut in-house. We can also cut and sew when you supply the fabric.'],
  ['Sewing','Jerseys, polos, tees, dropshoulders, pants, trousers, hoodies and other garments our setup supports.'],
  ['Sublimation','Full-colour printing for team, company, event and rally apparel.'],
  ['DTF','Logos, names, numbers and smaller custom applications.'],
  ['Customization','Collar, rib and cuff changes, additional sewing, sponsor logos, small pattern changes.']
];
const STEPS = ['You contact us and we talk through what you need.','We explain the options that fit your order and share suitable fabrics.','You send a design or reference.','We prepare a ready-to-print file.','You confirm the file before printing.','We collect names, numbers, sizes and customizations.','Advance payment is collected before manufacturing starts.','We make your order and keep you updated.','Your order is delivered and the remaining payment is collected.','If something is wrong, we verify the issue and send a replacement where appropriate.'];
const LAB = [
  {k:'jersey-dna',n:'Jersey DNA',s:'Answer a few questions and get your jersey profile.',st:'Needs sports database',needs:['Sport selection','Preference questions (competition, era, colours, classic vs modern, minimal vs graphic)','Deterministic scoring and predefined result profiles','Shareable result card and share URL']},
  {k:'jersey-history',n:'Jersey History',s:'Browse how a team’s jersey changed over time.',st:'Needs sports database',needs:['Team / competition / season selectors','Timeline and jersey sequence','Verified design notes with sources','Shareable history result']},
  {k:'jersey-battle',n:'Jersey Battle',s:'Two jerseys. Pick one.',st:'Needs sports database',needs:['Battle categories (teams, competitions, eras, kit types)','Jersey A / B pairing','Vote and result display','Shareable result']},
  {k:'dream-jersey',n:'Dream Jersey',s:'Design your own jersey and see it live.',st:'Playable draft'},
  {k:'ai-jersey-try-on',n:'AI Jersey Try-On',s:'Planned for later. Not available yet.',st:'Coming soon'}
];
/* Add image paths/URLs in src ('' shows a placeholder). Hero = rotating slideshow, WORK = home slider. */
const HERO = [1,2,3,4,5].map(i => ({src:'', label:'Hero image ' + i + ' — add jersey photo'}));
const WORK = [1,2,3,4,5,6].map(i => ({src:'', label:'Design ' + i, name:'Project ' + i}));
const slide = x => x.src ? `<img class="slide" src="${esc(x.src)}" alt="${esc(x.label)}">` : `<div class="slide ph"><span>${esc(x.label)}</span></div>`;
const SPORTS = ['Football','Cricket','Basketball'];
let sport = 'Football';
