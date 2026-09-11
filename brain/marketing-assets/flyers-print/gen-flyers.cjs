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
  .leaf { position:absolute; opacity:0.15; }
</style>`;

// ---------- FLYER 1 : KIDS + TEENS ----------
function kidsTeensFlyer() {
  return `
  <div class="flyer">
    <div class="grain"></div>

    <img class="badge" src="${logo}" style="top:110px; left:110px; width:220px; height:220px;">
    <div style="position:absolute; top:140px; right:130px; text-align:right;">
      <div class="serif" style="font-style:italic; font-size:40px; opacity:0.9;">Grow Strong Together.</div>
      <div style="font-size:34px; font-weight:700; margin-top:8px;">Koh's 33 Stadium · Lamai</div>
    </div>

    <div style="position:absolute; left:50%; top:640px; transform:translate(-50%,-50%); width:1700px; height:1700px; border-radius:50%;
      background:radial-gradient(circle, ${SAND} 0%, rgba(240,216,144,0.4) 45%, transparent 70%); z-index:0;"></div>

    <div style="position:absolute; top:340px; left:0; right:0; z-index:1; padding:0 150px; text-align:center;">
      <div class="kicker" style="font-size:44px; color:${SAND};">Rejoins l'académie</div>
      <div class="display" style="font-size:230px; color:#ffffff; margin-top:20px;">Rugby</div>
      <div class="display" style="font-size:190px; color:${SAND}; margin-top:-20px;">Kids &amp; Teens</div>
    </div>

    <div style="position:absolute; top:1180px; left:0; right:0; z-index:1; display:flex; gap:60px; justify-content:center; padding:0 130px;">
      <div class="card" style="flex:1; padding:80px 60px; text-align:center;">
        <div class="display" style="font-size:100px; color:${SAND};">Kids</div>
        <div style="font-size:52px; font-weight:800; margin-top:14px;">4 – 12 ans</div>
        <div style="font-size:42px; margin-top:36px; line-height:1.5;">Tag rugby · zéro contact<br>zéro pression</div>
        <div class="pill" style="background:#ffffff; color:${INK}; font-size:50px; padding:28px 50px; margin-top:50px;">Samedi 16h30–17h30</div>
      </div>
      <div class="card" style="flex:1; padding:80px 60px; text-align:center;">
        <div class="display" style="font-size:100px; color:${SAND};">Teens</div>
        <div style="font-size:52px; font-weight:800; margin-top:14px;">11 – 17 ans</div>
        <div style="font-size:42px; margin-top:36px; line-height:1.5;">Contact progressif<br>chemin vers le tournoi</div>
        <div class="pill" style="background:#ffffff; color:${INK}; font-size:50px; padding:28px 50px; margin-top:50px;">Samedi 16h30–17h30</div>
      </div>
    </div>

    <div style="position:absolute; top:2020px; left:0; right:0; z-index:1; text-align:center;">
      <div style="font-size:56px; font-weight:800;">Débutants bienvenus</div>
      <div style="font-size:50px; font-weight:700; margin-top:6px; color:${SAND};">Coaching bilingue FR/EN</div>
    </div>

    <div style="position:absolute; top:2280px; left:0; right:0; z-index:1; text-align:center;">
      <div style="width:340px; height:3px; background:rgba(255,255,255,0.35); margin:0 auto;"></div>
    </div>

    <div style="position:absolute; top:2380px; left:0; right:0; z-index:1; text-align:center;">
      <div style="font-size:52px; font-weight:700;">350 THB la séance</div>
      <div style="font-size:52px; font-weight:700; margin-top:6px;">ou 1 200 THB le mois</div>
      <div class="pill" style="background:${SAND}; color:${INK}; font-size:48px; padding:22px 48px; margin-top:44px;">Essai découverte — 200 THB</div>
    </div>

    <div style="position:absolute; top:2850px; left:0; right:0; z-index:1; text-align:center; padding:0 220px;">
      <div style="font-size:38px; opacity:0.85; line-height:1.6; font-style:italic;" class="serif">« La première académie de rugby structurée de Koh Samui »</div>
    </div>

    <div style="position:absolute; bottom:0; left:0; right:0; height:340px; background:rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; z-index:1;">
      <div class="pill" style="background:${CLAY}; color:#fff; font-size:58px; padding:40px 76px;">📲 WhatsApp +66 63 375 3316</div>
    </div>
  </div>`;
}

// ---------- FLYER 2 : TOUCH RUGBY ADULTES ----------
function touchFlyer() {
  return `
  <div class="flyer">
    <div class="grain"></div>

    <img class="badge" src="${logo}" style="top:110px; left:110px; width:220px; height:220px;">
    <div style="position:absolute; top:140px; right:130px; text-align:right;">
      <div class="serif" style="font-style:italic; font-size:40px; opacity:0.9;">Grow Strong Together.</div>
      <div style="font-size:34px; font-weight:700; margin-top:8px;">Koh's 33 Stadium · Lamai</div>
    </div>

    <div style="position:absolute; left:50%; top:760px; transform:translate(-50%,-50%); width:1800px; height:1800px; border-radius:50%;
      background:radial-gradient(circle, ${SAND} 0%, rgba(240,216,144,0.4) 45%, transparent 70%); z-index:0;"></div>

    <div style="position:absolute; top:400px; left:0; right:0; z-index:1; padding:0 130px; text-align:center;">
      <div class="kicker" style="font-size:46px; color:${SAND};">Adults · Sunset sessions</div>
      <div class="display" style="font-size:280px; color:#ffffff; margin-top:30px;">Touch</div>
      <div class="display" style="font-size:280px; color:${SAND}; margin-top:-40px;">Rugby</div>
    </div>

    <div style="position:absolute; top:1420px; left:0; right:0; z-index:1; text-align:center; padding:0 220px;">
      <div style="font-size:54px; font-weight:800; line-height:1.6;">
        Sans contact · équipes mixtes refaites chaque semaine
      </div>
      <div style="font-size:48px; font-weight:600; margin-top:24px; opacity:0.9; line-height:1.6;">
        Résidents, expats, voyageurs — tous niveaux<br>ambiance sociale d'abord
      </div>
    </div>

    <div style="position:absolute; top:1900px; left:0; right:0; z-index:1; display:flex; justify-content:center;">
      <div class="pill" style="background:#ffffff; color:${INK}; font-size:62px; padding:38px 70px;">Mardi 19h00 – 20h30</div>
    </div>

    <div style="position:absolute; top:2200px; left:0; right:0; z-index:1; text-align:center;">
      <div style="font-size:52px; font-weight:800; color:${SAND};">Aucun engagement</div>
      <div style="font-size:44px; font-weight:600; margin-top:10px;">viens quand tu peux, on refait les équipes chaque semaine</div>
    </div>

    <div style="position:absolute; top:2460px; left:0; right:0; z-index:1; text-align:center;">
      <div style="width:340px; height:3px; background:rgba(255,255,255,0.35); margin:0 auto;"></div>
    </div>

    <div style="position:absolute; top:2560px; left:0; right:0; z-index:1; text-align:center;">
      <div style="font-size:52px; font-weight:700;">350 THB la séance</div>
      <div style="font-size:52px; font-weight:700; margin-top:6px;">ou 1 200 THB le mois</div>
      <div class="pill" style="background:${SAND}; color:${INK}; font-size:48px; padding:22px 48px; margin-top:44px;">Première séance — 200 THB</div>
    </div>

    <div style="position:absolute; top:3000px; left:0; right:0; z-index:1; text-align:center; padding:0 220px;">
      <div style="font-size:38px; opacity:0.85; line-height:1.6; font-style:italic;" class="serif">« Le meilleur moment de ta semaine, coucher de soleil compris »</div>
    </div>

    <div style="position:absolute; bottom:0; left:0; right:0; height:340px; background:rgba(0,0,0,0.15); display:flex; align-items:center; justify-content:center; z-index:1;">
      <div class="pill" style="background:${CLAY}; color:#fff; font-size:58px; padding:40px 76px;">📲 WhatsApp +66 63 375 3316</div>
    </div>
  </div>`;
}

fs.writeFileSync(path.join(outDir, 'flyer-kids-teens.html'), `<!doctype html><html><head>${head}</head><body>${kidsTeensFlyer()}</body></html>`);
fs.writeFileSync(path.join(outDir, 'flyer-touch-rugby.html'), `<!doctype html><html><head>${head}</head><body>${touchFlyer()}</body></html>`);
console.log('wrote both flyers');
