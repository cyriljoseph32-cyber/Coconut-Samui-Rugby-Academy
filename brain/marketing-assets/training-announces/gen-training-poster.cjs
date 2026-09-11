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
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&family=Schibsted+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1080px; height:1350px; overflow:hidden; }
  body { font-family:'Schibsted Grotesk','Liberation Sans',system-ui,sans-serif; }
  .poster { width:1080px; height:1350px; position:relative; overflow:hidden; display:flex; flex-direction:column; }
  .display { font-family:'Fraunces','DejaVu Serif',Georgia,serif; font-weight:900; line-height:0.95; letter-spacing:-0.01em; }
  .serif { font-family:'Fraunces','DejaVu Serif',Georgia,serif; }
  .kicker { font-weight:700; text-transform:uppercase; letter-spacing:0.22em; font-size:26px; }
  .badge { position:absolute; width:132px; height:132px; border-radius:22px; box-shadow:0 10px 30px rgba(0,0,0,0.25); }
  .pill { display:inline-block; border-radius:999px; font-weight:700; }
  .grain { position:absolute; inset:0; opacity:0.05;
    background-image:radial-gradient(circle at 20% 30%, #fff 0.5px, transparent 0.6px),radial-gradient(circle at 70% 60%, #fff 0.5px, transparent 0.6px);
    background-size:6px 6px, 9px 9px; }
</style>`;

function trainingPoster() {
  return `
  <div class="poster" style="background:linear-gradient(180deg, ${INK} 0%, ${PALM} 45%, ${CLAY} 100%); color:${PAPER};">
    <div class="grain"></div>

    <img class="badge" src="${logo}" style="top:70px; left:70px;">
    <div style="position:absolute; top:96px; right:80px; text-align:right;">
      <div class="kicker" style="color:${SAND};">Kids · Teens</div>
      <div class="serif" style="font-style:italic; font-size:24px; opacity:0.85; margin-top:6px;">Grow Strong Together.</div>
    </div>

    <div style="position:absolute; left:50%; top:52%; transform:translate(-50%,-50%); width:560px; height:560px; border-radius:50%;
      background:radial-gradient(circle, ${SAND} 0%, rgba(240,216,144,0.5) 45%, transparent 70%); z-index:0;"></div>

    <div style="position:relative; z-index:1; flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 60px;">
      <div class="display" style="font-size:120px; color:#ffffff;">Training</div>
      <div class="display" style="font-size:120px; color:${SAND}; margin-top:-10px;">Demain</div>

      <div class="pill" style="background:#ffffff; color:${INK}; font-size:40px; padding:20px 46px; margin-top:36px;">SAMEDI 12 SEPTEMBRE</div>

      <div class="display" style="font-size:96px; color:#ffffff; margin-top:34px;">16:30 – 17:30</div>
      <div style="margin-top:14px; display:flex; gap:36px; align-items:center; justify-content:center;">
        <div style="font-size:28px; font-weight:700; color:${SAND};">KIDS 4–12</div>
        <div style="width:2px; height:34px; background:rgba(255,255,255,0.35);"></div>
        <div style="font-size:28px; font-weight:700; color:${SAND};">TEENS 11–17</div>
      </div>

      <div style="font-size:32px; font-weight:700; margin-top:34px;">📍 Koh's 33 Stadium · Lamai</div>
      <div style="font-size:26px; opacity:0.9; margin-top:10px;">Coaching bilingue FR/EN · débutants bienvenus</div>
    </div>

    <div style="position:relative; z-index:1; text-align:center; padding-bottom:90px;">
      <div class="pill" style="background:${CLAY}; color:#fff; font-size:30px; padding:22px 42px;">📲 DM · WhatsApp +66 63 375 3316</div>
    </div>
  </div>`;
}

const html = `<!doctype html><html><head>${head}</head><body>${trainingPoster()}</body></html>`;
fs.writeFileSync(path.join(outDir, 'poster-training-2026-09-12.html'), html);
console.log('wrote html');
