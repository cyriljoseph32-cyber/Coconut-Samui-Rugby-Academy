const fs = require('fs');
const path = require('path');
// Sortie : dossier passé en argument, sinon le dossier courant.
const dir = process.argv[2] || process.cwd();
// Logo : chargé depuis le repo (public/logo-badge-512.webp) et encodé en base64.
const repoRoot = path.resolve(__dirname, '..', '..');
const logoBytes = fs.readFileSync(path.join(repoRoot, 'public', 'logo-badge-512.webp'));
const logo = 'data:image/webp;base64,' + logoBytes.toString('base64');

// Brand palette
const INK = '#004848', PALM = '#007890', FERN = '#009090', FERN2 = '#60c0c0';
const SAND = '#f0d890', CLAY = '#c07830', PAPER = '#fbf4e2';

const head = `
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&family=Schibsted+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1080px; height:1350px; overflow:hidden; }
  body { font-family:'Schibsted Grotesk','Liberation Sans',system-ui,sans-serif; }
  .poster { width:1080px; height:1350px; position:relative; overflow:hidden; }
  .display { font-family:'Fraunces','DejaVu Serif',Georgia,serif; font-weight:900; line-height:0.95; letter-spacing:-0.01em; }
  .serif { font-family:'Fraunces','DejaVu Serif',Georgia,serif; }
  .kicker { font-weight:700; text-transform:uppercase; letter-spacing:0.22em; font-size:26px; }
  .badge { position:absolute; width:132px; height:132px; border-radius:22px; box-shadow:0 10px 30px rgba(0,0,0,0.25); }
  .pill { display:inline-block; border-radius:999px; font-weight:700; }
  .palm { position:absolute; opacity:0.12; }
  .grain { position:absolute; inset:0; opacity:0.05;
    background-image:radial-gradient(circle at 20% 30%, #fff 0.5px, transparent 0.6px),radial-gradient(circle at 70% 60%, #fff 0.5px, transparent 0.6px);
    background-size:6px 6px, 9px 9px; }
</style>`;

// Simple palm-frond SVG for decoration
const palm = (color) => `<svg class="palm" width="620" height="620" viewBox="0 0 200 200" fill="none">
  <g stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round">
    ${Array.from({length:11}).map((_,i)=>{const a=(-90+i*18)*Math.PI/180;const x=100+Math.cos(a)*95;const y=170+Math.sin(a)*95;return `<path d="M100 170 Q${100+Math.cos(a)*40} ${170+Math.sin(a)*55}, ${x} ${y}"/>`;}).join('')}
  </g></svg>`;

const posters = {
  'poster-free-trial': `
  <div class="poster" style="background:linear-gradient(160deg, ${INK} 0%, ${PALM} 100%); color:${PAPER};">
    <div class="grain"></div>
    <div style="${''}position:absolute; top:-60px; right:-80px; color:${FERN2};">${palm(FERN2)}</div>
    <img class="badge" src="${logo}" style="top:70px; left:70px;">
    <div style="position:absolute; top:96px; right:80px; text-align:right;">
      <div class="kicker" style="color:${SAND};">Koh Samui</div>
      <div style="font-weight:500; font-size:24px; opacity:0.85; margin-top:6px;">Grow Strong Together.</div>
    </div>

    <div style="position:absolute; top:300px; left:70px; right:70px;">
      <div class="serif" style="font-size:40px; font-style:italic; font-weight:600; color:${SAND};">This week only —</div>
      <div class="display" style="font-size:230px; color:#ffffff; margin-top:4px;">FREE<br><span style="color:${SAND};">TRIAL</span></div>
      <div class="display" style="font-size:70px; margin-top:26px; color:#ffffff;">Kids &amp; Teens Rugby</div>
      <div style="font-size:32px; line-height:1.5; margin-top:26px; max-width:820px; opacity:0.92;">
        Ages 4–17 · tag rugby for the little ones, progressive contact for teens.
        Bilingual coaching FR/EN. No experience needed.
      </div>
    </div>

    <div style="position:absolute; left:70px; bottom:80px; right:70px; display:flex; align-items:center; justify-content:space-between;">
      <div class="pill" style="background:${CLAY}; color:#fff; font-size:34px; padding:24px 42px;">📲 WhatsApp +66 63 375 3316</div>
      <div class="serif" style="font-size:26px; opacity:0.85; text-align:right;">coconutsamuirugby.com<br>@coconut_samui_rugby</div>
    </div>
  </div>`,

  'poster-kids-session': `
  <div class="poster" style="background:${SAND}; color:${INK};">
    <div class="grain" style="opacity:0.04;"></div>
    <div style="position:absolute; bottom:-120px; left:-120px; color:${PALM};">${palm(PALM)}</div>
    <img class="badge" src="${logo}" style="top:70px; right:70px;">
    <div style="position:absolute; top:96px; left:80px;">
      <div class="kicker" style="color:${PALM};">For parents</div>
    </div>

    <div style="position:absolute; top:250px; left:80px; right:80px;">
      <div class="display" style="font-size:118px; color:${INK};">A Kids session,<br><span style="color:${PALM};">step by step.</span></div>
      <div style="font-size:30px; margin-top:26px; color:${INK}; opacity:0.8;">No tackling. No pressure. No child sits out. →</div>
    </div>

    <div style="position:absolute; left:80px; right:80px; bottom:250px; display:flex; flex-direction:column; gap:22px;">
      ${[
        ['1','Warm-up games that don’t feel like warm-ups'],
        ['2','Ball skills in pairs and small groups'],
        ['3','Tag mini-matches — everyone plays'],
        ['4','Team huddle: one value, one high-five, home'],
      ].map(([n,t])=>`<div style="display:flex; align-items:center; gap:26px;">
        <div class="serif" style="flex:none; width:78px; height:78px; border-radius:50%; background:${PALM}; color:#fff; font-size:42px; font-weight:700; display:flex; align-items:center; justify-content:center;">${n}</div>
        <div style="font-size:34px; font-weight:500;">${t}</div></div>`).join('')}
    </div>

    <div style="position:absolute; left:80px; bottom:80px;">
      <div class="pill" style="background:${INK}; color:#fff; font-size:32px; padding:22px 40px;">First session free · WhatsApp +66 63 375 3316</div>
    </div>
  </div>`,

  'poster-tournament': `
  <div class="poster" style="background:radial-gradient(120% 90% at 50% 15%, ${PALM} 0%, ${INK} 60%); color:${PAPER};">
    <div class="grain"></div>
    <!-- sunset band -->
    <div style="position:absolute; left:0; right:0; bottom:0; height:520px; background:linear-gradient(180deg, rgba(192,120,48,0) 0%, ${CLAY} 70%, #7a3d12 100%); opacity:0.55;"></div>
    <div style="position:absolute; left:0; right:0; bottom:0; height:220px; background:${INK};
      -webkit-mask:linear-gradient(180deg,transparent,#000 60%); mask:linear-gradient(180deg,transparent,#000 60%);"></div>
    <img class="badge" src="${logo}" style="top:70px; left:50%; transform:translateX(-50%);">

    <div style="position:absolute; top:290px; left:70px; right:70px; text-align:center;">
      <div class="kicker" style="color:${SAND};">The island’s first</div>
      <div class="display" style="font-size:132px; margin-top:22px; color:#fff;">Inter-School<br>Rugby<br><span style="color:${SAND};">Tournament</span></div>
      <div class="serif" style="font-size:40px; font-style:italic; margin-top:30px; opacity:0.92;">One day · every school · one trophy.</div>
    </div>

    <div style="position:absolute; left:0; right:0; bottom:110px; text-align:center;">
      <div style="font-size:30px; opacity:0.9;">Koh Samui · U11–U15 · Late 2027</div>
      <div class="pill" style="background:${SAND}; color:${INK}; font-size:32px; padding:22px 44px; margin-top:26px; font-weight:700;">Schools: register interest · coconutsamuirugby.com</div>
    </div>
  </div>`,

  'poster-sunset-touch': `
  <div class="poster" style="background:linear-gradient(180deg, ${INK} 0%, ${PALM} 45%, ${CLAY} 100%); color:${PAPER};">
    <div class="grain"></div>
    <!-- sun -->
    <div style="position:absolute; left:50%; top:520px; transform:translate(-50%,-50%); width:520px; height:520px; border-radius:50%;
      background:radial-gradient(circle, ${SAND} 0%, rgba(240,216,144,0.5) 45%, transparent 70%);"></div>
    <img class="badge" src="${logo}" style="top:70px; left:70px;">
    <div style="position:absolute; top:96px; right:80px; text-align:right;">
      <div class="kicker" style="color:${SAND};">Adults · 18+</div>
    </div>

    <div style="position:absolute; top:640px; left:70px; right:70px; text-align:center;">
      <div class="display" style="font-size:150px; color:#fff;">Sunset</div>
      <div class="display" style="font-size:150px; color:${SAND}; margin-top:-14px;">Sessions</div>
      <div class="serif" style="font-size:40px; font-style:italic; margin-top:28px; opacity:0.95;">Social touch rugby, until the light goes.</div>
      <div style="font-size:30px; margin-top:22px; opacity:0.9;">All levels · no membership · just show up</div>
    </div>

    <div style="position:absolute; left:0; right:0; bottom:80px; text-align:center;">
      <div class="pill" style="background:#ffffff; color:${INK}; font-size:34px; padding:22px 46px; font-weight:700;">DM or WhatsApp +66 63 375 3316</div>
    </div>
  </div>`,
};

for (const [name, html] of Object.entries(posters)) {
  fs.writeFileSync(`${dir}/${name}.html`, `<!doctype html><html><head>${head}</head><body>${html}</body></html>`);
  console.log('wrote', name);
}
