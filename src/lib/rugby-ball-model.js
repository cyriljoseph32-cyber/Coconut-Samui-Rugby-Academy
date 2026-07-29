// Builds the Coconut Samui rugby ball as a THREE.Group of named parts.
// Procedural leather ball: lathe-generated hull, four meridian seams with a
// stitching detail on one, a valve nub and the club badge on the belly panel.
export function buildBall(THREE) {
  const group = new THREE.Group();
  group.name = "coconut_samui_rugby_ball";

  const HALF_LEN = 0.145; // regulation-ish half length (m)
  const MAX_R = 0.093;

  const profileR = (y) => {
    const t = Math.min(1, Math.abs(y) / HALF_LEN);
    return MAX_R * Math.pow(Math.max(0, 1 - t * t), 0.65);
  };

  // ---------- leather grain / roughness texture (procedural) ----------
  function makeGrainTexture() {
    const size = 512;
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#9a9a9a";
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 22000; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const v = 120 + Math.random() * 90;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 1, 1);
    }
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * size;
      const y = Math.random() * size;
      const r = 4 + Math.random() * 10;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      const v = 100 + Math.random() * 60;
      g.addColorStop(0, `rgba(${v},${v},${v},0.35)`);
      g.addColorStop(1, `rgba(${v},${v},${v},0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 3);
    return tex;
  }

  const grainTex = makeGrainTexture();
  const leather = new THREE.MeshStandardMaterial({
    name: "leather_palm",
    color: 0x007890, // brand palm — primary academy teal
    roughness: 0.85,
    metalness: 0.02,
    roughnessMap: grainTex,
    bumpMap: grainTex,
    bumpScale: 0.0006,
  });

  const seamMat = new THREE.MeshStandardMaterial({
    name: "seam_sand",
    color: 0xf0d890, // brand sand — panel/seam contrast
    roughness: 0.6,
    metalness: 0.03,
  });

  const valveMat = new THREE.MeshStandardMaterial({
    name: "valve_ink",
    color: 0x123030,
    roughness: 0.55,
    metalness: 0.1,
  });

  // ---------- ball hull (lathe, axis = local Y = ball's long axis) ----------
  const steps = 44;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const y = -HALF_LEN + (2 * HALF_LEN * i) / steps;
    pts.push(new THREE.Vector2(Math.max(0.0001, profileR(y)), y));
  }
  const latheGeo = new THREE.LatheGeometry(pts, 64);
  latheGeo.computeVertexNormals();
  const hull = new THREE.Mesh(latheGeo, leather);
  hull.name = "hull";
  group.add(hull);

  // ---------- meridian seams (4 panels) ----------
  const seamSamples = 40;
  function seamCurvePoints(angle) {
    const arr = [];
    for (let i = 0; i <= seamSamples; i++) {
      const y = -HALF_LEN + (2 * HALF_LEN * i) / seamSamples;
      const r = profileR(y) + 0.0012;
      arr.push(new THREE.Vector3(r * Math.cos(angle), y, r * Math.sin(angle)));
    }
    return arr;
  }
  const seamAngles = [Math.PI / 4, (3 * Math.PI) / 4, (5 * Math.PI) / 4, (7 * Math.PI) / 4];
  const stitchGroup = new THREE.Group();
  stitchGroup.name = "stitching";
  seamAngles.forEach((a, idx) => {
    const curve = new THREE.CatmullRomCurve3(seamCurvePoints(a));
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.0028, 8, false);
    const seam = new THREE.Mesh(tubeGeo, seamMat);
    seam.name = "seam_" + idx;
    group.add(seam);

    if (idx === 0) {
      const dashCount = 22;
      for (let i = 2; i < dashCount - 2; i++) {
        const tt = i / (dashCount - 1);
        const p = curve.getPointAt(tt);
        const tangent = curve.getTangentAt(tt).normalize();
        const radial = p.clone().setY(0).normalize();
        const binormal = new THREE.Vector3().crossVectors(tangent, radial).normalize();
        const dashGeo = new THREE.BoxGeometry(0.016, 0.0022, 0.0032);
        const dash = new THREE.Mesh(dashGeo, seamMat);
        dash.position.copy(p).addScaledVector(radial, 0.0016);
        const m = new THREE.Matrix4().makeBasis(binormal, radial, tangent);
        dash.quaternion.setFromRotationMatrix(m);
        dash.name = "stitch_" + i;
        stitchGroup.add(dash);
      }
    }
  });
  group.add(stitchGroup);

  // ---------- valve nub near one tip ----------
  const valveGeo = new THREE.CylinderGeometry(0.006, 0.007, 0.01, 16);
  const valve = new THREE.Mesh(valveGeo, valveMat);
  valve.name = "valve";
  const valveY = -HALF_LEN + 0.028;
  valve.position.set(0, valveY, profileR(valveY) - 0.002);
  valve.rotation.x = Math.PI / 2.15;
  group.add(valve);

  // ---------- official badge logo, on the belly panel ----------
  const badgeTex = new THREE.TextureLoader().load("/logo-badge-192.webp");
  badgeTex.colorSpace = THREE.SRGBColorSpace;
  const badgeGeo = new THREE.CircleGeometry(0.05, 40);
  const badgeMat = new THREE.MeshStandardMaterial({
    name: "brand_badge",
    map: badgeTex,
    roughness: 0.5,
    metalness: 0,
    transparent: true,
    opacity: 1,
  });
  const badge = new THREE.Mesh(badgeGeo, badgeMat);
  badge.name = "badge_logo";
  const badgeAngle = Math.PI * 0.5;
  const badgeY = 0;
  const br = profileR(badgeY) + 0.0016;
  badge.position.set(br * Math.cos(badgeAngle), badgeY, br * Math.sin(badgeAngle));
  const outward = new THREE.Vector3(Math.cos(badgeAngle), 0, Math.sin(badgeAngle));
  badge.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), outward);
  group.add(badge);

  // present at an editorial three-quarter angle
  group.rotation.set(0.32, 0.75, 1.32);

  group.userData.parts = { hull, seamMat, leather, valveMat, stitchGroup };
  return group;
}
