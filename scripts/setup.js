// Run once: npm run setup  (also use it to change the admin password; the admin link stays the same)
const rl = require('readline').createInterface({ input: process.stdin, output: process.stdout });
const bcrypt = require('bcryptjs'), crypto = require('crypto'), fs = require('fs');
rl.question('Choose an admin password (at least 10 characters): ', pw => {
  rl.close();
  if (pw.length < 10) { console.log('Too short. Run npm run setup again.'); process.exit(1); }
  const keep = {};
  try { fs.readFileSync('.env', 'utf8').split(/\r?\n/).forEach(l => { const m = l.match(/^(\w+)='?([^']*)'?$/); if (m) keep[m[1]] = m[2]; }); } catch (e) {}
  const env = {
    PORT: keep.PORT || '3000',
    ADMIN_PATH: keep.ADMIN_PATH || '/' + crypto.randomBytes(9).toString('hex'),
    SESSION_SECRET: keep.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    ADMIN_PASSWORD_HASH: bcrypt.hashSync(pw, 12)
  };
  fs.writeFileSync('.env', Object.entries(env).map(([k, v]) => `${k}='${v}'`).join('\n') + '\n');
  console.log('\nSaved. Your private admin link:\nhttp://localhost:' + env.PORT + env.ADMIN_PATH + '\n');
});
