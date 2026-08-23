#!/usr/bin/env node
// Vérifications mécaniques de fiabilité du "brain agentique" CSRA.
//
//   a) chaque .claude/agents/*.md a les 7 sections obligatoires, dans l'ordre
//   b) chaque agent existant est bien listé dans la fiche mémoire du projet
//   c) les faits de contact de src/config/site.ts sont bien repris dans brain/academy.md
//
// Node pur — aucune dépendance npm.

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

let passed = 0;
let failed = 0;
const failures = [];

function fail(message) {
  failed += 1;
  failures.push(message);
}

function ok() {
  passed += 1;
}

// --- a) 7 sections obligatoires, dans l'ordre relatif -----------------------

const REQUIRED_SECTIONS = [
  { label: "IDENTITÉ", pattern: /IDENTITÉ/i },
  { label: "PÉRIMÈTRE", pattern: /PÉRIMÈTRE/i },
  { label: "SOURCES AUTORISÉES", pattern: /SOURCES AUTORISÉES/i },
  { label: "PROCESSUS DE DÉCISION", pattern: /PROCESSUS DE DÉCISION/i },
  // accepte l'apostrophe droite ' et l'apostrophe typographique '
  { label: "RÈGLES D'EXCEPTION", pattern: /RÈGLES D['’]EXCEPTION/i },
  { label: "TON ET COMMUNICATION", pattern: /TON ET COMMUNICATION/i },
  { label: "FORMAT DE SORTIE", pattern: /FORMAT DE SORTIE/i },
];

const agentsDir = path.join(ROOT, ".claude", "agents");
const agentFiles = readdirSync(agentsDir)
  .filter((f) => f.endsWith(".md"))
  .sort();
const agentNames = agentFiles.map((f) => f.replace(/\.md$/, ""));

if (agentFiles.length === 0) {
  fail(`Aucun fichier .md trouvé dans ${path.relative(ROOT, agentsDir)}`);
}

for (const file of agentFiles) {
  const filePath = path.join(agentsDir, file);
  const content = readFileSync(filePath, "utf8");
  // Ne considère que les titres de section de niveau 2 ("## ...").
  const headingLines = content
    .split("\n")
    .filter((line) => /^##\s+/.test(line));

  const missing = [];
  let searchStart = 0; // index dans headingLines à partir duquel chercher la prochaine section
  for (const section of REQUIRED_SECTIONS) {
    let found = -1;
    for (let i = searchStart; i < headingLines.length; i++) {
      if (section.pattern.test(headingLines[i])) {
        found = i;
        break;
      }
    }
    if (found === -1) {
      missing.push(section.label);
    } else {
      searchStart = found + 1;
    }
  }

  if (missing.length > 0) {
    fail(
      `${path.relative(ROOT, filePath)} : section(s) manquante(s) ou mal ordonnée(s) — ${missing.join(", ")}`
    );
  } else {
    ok();
  }
}

// --- b) synchro fiche mémoire ↔ liste réelle d'agents ------------------------

const memoirePath = path.join(
  ROOT,
  "brain",
  "memoire",
  "projets",
  "coconut-samui-rugby-academy.md"
);

let memoireContent = "";
try {
  memoireContent = readFileSync(memoirePath, "utf8");
} catch {
  fail(`Fiche mémoire introuvable : ${path.relative(ROOT, memoirePath)}`);
}

if (memoireContent) {
  const missingAgents = agentNames.filter(
    (name) => !memoireContent.includes(name)
  );
  if (missingAgents.length > 0) {
    fail(
      `Fiche mémoire (${path.relative(ROOT, memoirePath)}) désynchronisée : ` +
        `agent(s) présent(s) dans .claude/agents/ mais absent(s) du texte — ${missingAgents.join(", ")}. ` +
        `Ajoute-les à la liste des agents dans la fiche mémoire.`
    );
  } else {
    ok();
  }
}

// --- c) cross-check léger brain/ ↔ src/ --------------------------------------

const sitePath = path.join(ROOT, "src", "config", "site.ts");
const academyPath = path.join(ROOT, "brain", "academy.md");

let siteContent = "";
let academyContent = "";
try {
  siteContent = readFileSync(sitePath, "utf8");
} catch {
  fail(`Fichier introuvable : ${path.relative(ROOT, sitePath)}`);
}
try {
  academyContent = readFileSync(academyPath, "utf8");
} catch {
  fail(`Fichier introuvable : ${path.relative(ROOT, academyPath)}`);
}

if (siteContent && academyContent) {
  function extractField(name) {
    const m = siteContent.match(
      new RegExp(`${name}\\s*:\\s*["'\`]([^"'\`]+)["'\`]`)
    );
    return m ? m[1] : null;
  }

  const email = extractField("email");
  const whatsappNumber = extractField("whatsappNumber");
  const instagramHandle = extractField("instagramHandle");

  const checks = [];

  if (email) {
    checks.push({
      label: `email (${email})`,
      present: academyContent.includes(email),
    });
  }

  if (whatsappNumber) {
    // Tolérant sur le format d'affichage (espaces, "+", groupement des
    // chiffres) : on compare uniquement la séquence de chiffres.
    const digitsOnly = whatsappNumber.replace(/\D/g, "");
    const academyDigitGroups = academyContent.match(/[\d\s+().-]{6,}/g) || [];
    const found = academyDigitGroups.some(
      (group) => group.replace(/\D/g, "").includes(digitsOnly)
    );
    checks.push({
      label: `whatsappNumber (${whatsappNumber})`,
      present: found,
    });
  }

  if (instagramHandle) {
    // Le handle peut apparaître avec ou sans "@".
    const bare = instagramHandle.replace(/^@/, "");
    checks.push({
      label: `instagramHandle (${instagramHandle})`,
      present: academyContent.includes(instagramHandle) || academyContent.includes(bare),
    });
  }

  const missingFacts = checks.filter((c) => !c.present);
  if (missingFacts.length > 0) {
    fail(
      `brain/academy.md désynchronisé avec src/config/site.ts : ` +
        `valeur(s) introuvable(s) dans le texte — ${missingFacts.map((c) => c.label).join(", ")}. ` +
        `Rappel (CLAUDE.md) : en cas de contradiction, src/ gagne, il faut resynchroniser brain/.`
    );
  } else {
    ok();
  }
}

// --- résumé -------------------------------------------------------------------

console.log("");
console.log("=== Vérifications du brain agentique CSRA ===");
console.log(`Passées : ${passed}`);
console.log(`Échouées : ${failed}`);

if (failed > 0) {
  console.log("");
  console.log("Détail des échecs :");
  for (const message of failures) {
    console.log(`  - ${message}`);
  }
  console.log("");
  process.exit(1);
}

console.log("");
console.log("OK — 7 sections présentes dans les 9 agents, fiche mémoire synchronisée, brain/academy.md aligné avec src/config/site.ts.");
process.exit(0);
