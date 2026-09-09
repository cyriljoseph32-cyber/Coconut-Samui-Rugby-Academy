const fs = require('fs');
const path = require('path');

const outDir = process.argv[2] || process.cwd();
const repoRoot = path.resolve(__dirname, '..', '..', '..');
const logoBytes = fs.readFileSync(path.join(repoRoot, 'public', 'logo-badge-512.webp'));
const logo = 'data:image/webp;base64,' + logoBytes.toString('base64');

const lomaRegular = fs.readFileSync('/usr/share/fonts/opentype/tlwg/Loma.otf');
const lomaBold = fs.readFileSync('/usr/share/fonts/opentype/tlwg/Loma-Bold.otf');
const lomaRegularB64 = 'data:font/otf;base64,' + lomaRegular.toString('base64');
const lomaBoldB64 = 'data:font/otf;base64,' + lomaBold.toString('base64');

const INK = '#004848', PALM = '#007890', SAND = '#f0d890', CLAY = '#c07830', PAPER = '#fbf4e2';

const head = `
<meta charset="utf-8">
<style>
  @font-face { font-family:'Loma'; src:url('${lomaRegularB64}') format('opentype'); font-weight:400; }
  @font-face { font-family:'Loma'; src:url('${lomaBoldB64}') format('opentype'); font-weight:700; }
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1080px; height:1350px; overflow:hidden; }
  body { font-family:'Loma','Schibsted Grotesk',system-ui,sans-serif; }
  .poster { width:1080px; height:1350px; position:relative; overflow:hidden; display:flex; flex-direction:column; }
  .display { font-family:'Loma',serif; font-weight:700; line-height:1.05; }
  .kicker { font-weight:700; letter-spacing:0.05em; font-size:26px; }
  .badge { position:absolute; width:132px; height:132px; border-radius:22px; box-shadow:0 10px 30px rgba(0,0,0,0.25); }
  .pill { display:inline-block; border-radius:999px; font-weight:700; }
  .grain { position:absolute; inset:0; opacity:0.05;
    background-image:radial-gradient(circle at 20% 30%, #fff 0.5px, transparent 0.6px),radial-gradient(circle at 70% 60%, #fff 0.5px, transparent 0.6px);
    background-size:6px 6px, 9px 9px; }
</style>`;

function touchPosterTH(dateTH, dateSub) {
  return `
  <div class="poster" style="background:linear-gradient(180deg, ${INK} 0%, ${PALM} 45%, ${CLAY} 100%); color:${PAPER};">
    <div class="grain"></div>

    <img class="badge" src="${logo}" style="top:70px; left:70px;">
    <div style="position:absolute; top:96px; right:80px; text-align:right;">
      <div class="kicker" style="color:${SAND};">ผู้ใหญ่ · ทัชรักบี้</div>
      <div style="font-style:italic; font-size:22px; opacity:0.85; margin-top:6px; font-family:'Schibsted Grotesk','Liberation Sans',sans-serif;">Grow Strong Together.</div>
    </div>

    <div style="position:absolute; left:50%; top:52%; transform:translate(-50%,-50%); width:560px; height:560px; border-radius:50%;
      background:radial-gradient(circle, ${SAND} 0%, rgba(240,216,144,0.5) 45%, transparent 70%); z-index:0;"></div>

    <div style="position:relative; z-index:1; flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 60px;">
      <div class="display" style="font-size:110px; color:#ffffff;">ทัช</div>
      <div class="display" style="font-size:110px; color:${SAND}; margin-top:-6px;">รักบี้</div>

      <div class="pill" style="background:#ffffff; color:${INK}; font-size:38px; padding:20px 44px; margin-top:36px; font-family:'Loma',sans-serif;">${dateTH}</div>
      <div style="font-size:26px; font-weight:700; color:#ffffff; text-shadow:0 1px 10px rgba(0,72,72,0.45); margin-top:16px; font-family:'Loma',sans-serif;">${dateSub}</div>

      <div class="display" style="font-size:90px; color:#ffffff; margin-top:34px; font-family:'Schibsted Grotesk','Liberation Sans',sans-serif; font-weight:900;">19:00 – 20:30</div>
      <div style="font-size:30px; font-weight:700; margin-top:20px; font-family:'Loma',sans-serif;">📍 Koh's 33 Stadium · ละไม</div>
      <div style="font-size:26px; opacity:0.9; margin-top:10px; font-family:'Loma',sans-serif;">เล่นได้ทุกระดับ · ไม่มีปะทะ · มาได้เลย</div>
    </div>

    <div style="position:relative; z-index:1; text-align:center; padding-bottom:90px;">
      <div class="pill" style="background:${CLAY}; color:#fff; font-size:28px; padding:22px 40px; font-family:'Loma',sans-serif;">📲 ทัก DM หรือ WhatsApp +66 63 375 3316</div>
    </div>
  </div>`;
}

const html = `<!doctype html><html><head>${head}</head><body>${touchPosterTH('อังคาร 15 กันยายน', 'สนามฝึกทุกวันอังคาร')}</body></html>`;
fs.writeFileSync(path.join(outDir, 'poster-touch-2026-09-15-th.html'), html);
console.log('wrote html');
