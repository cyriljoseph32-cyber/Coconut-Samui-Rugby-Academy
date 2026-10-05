const fs = require('fs');
const path = require('path');

const outDir = process.argv[2] || process.cwd();
const repoRoot = '/home/user/Coconut-Samui-Rugby-Academy';
const logoBytes = fs.readFileSync(path.join(repoRoot, 'public', 'logo-badge-512.webp'));
const logo = 'data:image/webp;base64,' + logoBytes.toString('base64');

const INK = '#004848', PALM = '#007890', SAND = '#f0d890', CLAY = '#c07830', PAPER = '#fbf4e2';

const head = `
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&family=Schibsted+Grotesk:wght@400;500;700;800&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:2480px; height:3508px; background:${INK}; }
  body { font-family:'Schibsted Grotesk','Liberation Sans',system-ui,sans-serif; }
  .flyer { width:2480px; height:3508px; position:relative; background:linear-gradient(180deg, ${INK} 0%, ${PALM} 42%, ${CLAY} 100%); color:${PAPER}; overflow:hidden; }
  .display { font-family:'Fraunces','DejaVu Serif',Georgia,serif; font-weight:900; line-height:0.95; letter-spacing:-0.01em; }
  .serif { font-family:'Fraunces','DejaVu Serif',Georgia,serif; }
  .kicker { font-weight:800; text-transform:uppercase; letter-spacing:0.28em; }
  .badge { position:absolute; border-radius:44px; box-shadow:0 20px 60px rgba(0,0,0,0.3); }
  .pill { display:inline-block; border-radius:999px; font-weight:800; }
  .grain { position:absolute; inset:0; opacity:0.05;
    background-image:radial-gradient(circle at 20% 30%, #fff 1px, transparent 1.2px),radial-gradient(circle at 70% 60%, #fff 1px, transparent 1.2px);
    background-size:14px 14px, 20px 20px; }
  .card { background:rgba(255,255,255,0.08); border:2px solid rgba(255,255,255,0.25); border-radius:36px; }
</style>`;

function periscolaireFlyer() {
  return `
  <div class="flyer">
    <div class="grain"></div>

    <img class="badge" src="${logo}" style="top:110px; left:110px; width:220px; height:220px;">
    <div style="position:absolute; top:140px; right:130px; text-align:right;">
      <div class="serif" style="font-style:italic; font-size:40px; opacity:0.9;">Grow Strong Together.</div>
      <div style="font-size:34px; font-weight:700; margin-top:8px;">Coconut Samui Rugby Academy</div>
    </div>

    <div style="position:absolute; left:50%; top:660px; transform:translate(-50%,-50%); width:1750px; height:1750px; border-radius:50%;
      background:radial-gradient(circle, ${SAND} 0%, rgba(240,216,144,0.4) 45%, transparent 70%); z-index:0;"></div>

    <div style="position:absolute; top:340px; left:0; right:0; z-index:1; padding:0 140px; text-align:center;">
      <div class="kicker" style="font-size:42px; color:${SAND};">Rugby périscolaire · After-school rugby</div>
      <div class="display" style="font-size:170px; color:#ffffff; margin-top:26px;">Lamai</div>
      <div class="display" style="font-size:170px; color:${SAND}; margin-top:-14px;">International School</div>
    </div>

    <div style="position:absolute; top:1180px; left:0; right:0; z-index:1; padding:0 160px;">
      <div class="card" style="padding:70px 90px;">
        <div style="display:flex; align-items:center; gap:40px; margin-bottom:44px;">
          <div style="font-size:70px;">🗓️</div>
          <div>
            <div style="font-size:52px; font-weight:800;">Tous les mercredis · Every Wednesday</div>
            <div style="font-size:46px; font-weight:700; margin-top:6px; color:${SAND};">15h00 – 16h00 · 15:00 – 16:00</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:40px; margin-bottom:44px;">
          <div style="font-size:70px;">📅</div>
          <div style="font-size:44px; font-weight:600; line-height:1.5;">
            9, 16, 23 &amp; 30 septembre · 7 &amp; 14 octobre 2026
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:40px; margin-bottom:44px;">
          <div style="font-size:70px;">🏉</div>
          <div style="font-size:44px; font-weight:600;">Toutes classes bienvenues · All classes welcome</div>
        </div>
        <div style="display:flex; align-items:center; gap:40px;">
          <div style="font-size:70px;">💵</div>
          <div style="font-size:52px; font-weight:800; color:${SAND};">200 THB / séance</div>
        </div>
      </div>
    </div>

    <div style="position:absolute; top:2200px; left:0; right:0; z-index:1; text-align:center; padding:0 200px;">
      <div class="pill" style="background:#ffffff; color:${INK}; font-size:56px; padding:36px 70px;">Inscription auprès de l'école</div>
      <div style="font-size:46px; font-weight:600; margin-top:30px; opacity:0.9;">Register through the school office</div>
    </div>

    <div style="position:absolute; top:2560px; left:0; right:0; z-index:1; text-align:center;">
      <div style="width:340px; height:3px; background:rgba(255,255,255,0.35); margin:0 auto;"></div>
    </div>

    <div style="position:absolute; top:2680px; left:0; right:0; z-index:1; text-align:center; padding:0 200px;">
      <div style="font-size:44px; font-weight:700; color:${SAND};">Coaching bilingue FR/EN</div>
      <div style="font-size:38px; opacity:0.85; line-height:1.6; font-style:italic; margin-top:34px;" class="serif">« La première académie de rugby structurée de Koh Samui »</div>
    </div>

    <div style="position:absolute; bottom:0; left:0; right:0; height:280px; background:rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; z-index:1;">
      <div style="font-size:48px; font-weight:700;">Coconut Samui Rugby Academy</div>
    </div>
  </div>`;
}

fs.writeFileSync(path.join(outDir, 'flyer-lis-periscolaire.html'), `<!doctype html><html><head>${head}</head><body>${periscolaireFlyer()}</body></html>`);
console.log('wrote flyer-lis-periscolaire.html');
