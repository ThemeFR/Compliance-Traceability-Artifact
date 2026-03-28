// example-coverage.js
// Measures completeness of examples/sprs-output-example.json against the full 110-control registry.
// Usage: node example-coverage.js
// Exit code 0 always — metric only, not a pass/fail gate.

'use strict';

const fs   = require('fs');
const path = require('path');

const repoDir      = path.resolve(__dirname);
const examplePath  = path.join(repoDir, 'examples', 'sprs-output-example.json');
const registryPath = path.join(repoDir, 'controls', 'registry.json');

const example  = JSON.parse(fs.readFileSync(examplePath,  'utf8'));
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const allControls     = registry.controls;
const exampleControls = example.controls || [];
const exampleById     = new Map(exampleControls.map(c => [c.control_id, c]));

// ── Counts ─────────────────────────────────────────────────────────────────

const total    = allControls.length;
const present  = exampleControls.length;
const missing  = total - present;
const met      = exampleControls.filter(c => c.status === 'met').length;
const notMet   = exampleControls.filter(c => c.status === 'not_met').length;
const partial  = exampleControls.filter(c => c.status === 'partial').length;

// ── SPRS calculation ────────────────────────────────────────────────────────
// DoD Assessment Methodology v1.2.1: start at 110, deduct weight for each NOT MET control.
// Controls not yet in the example are treated as NOT MET (worst case).

let sprsScore = 110;
for (const ctrl of allControls) {
  const inExample = exampleById.get(ctrl.control_id);
  if (!inExample || inExample.status === 'not_met') {
    sprsScore -= (ctrl.sprs_weight || 1);
  } else if (inExample.status === 'partial') {
    sprsScore -= Math.floor((ctrl.sprs_weight || 1) / 2);
  }
}

// ── Per-family breakdown ────────────────────────────────────────────────────

const families = {};
for (const ctrl of allControls) {
  const fam = ctrl.family || ctrl.control_id.split('.')[0];
  if (!families[fam]) families[fam] = { total: 0, present: 0, met: 0 };
  families[fam].total++;
  if (exampleById.has(ctrl.control_id)) {
    families[fam].present++;
    if (exampleById.get(ctrl.control_id).status === 'met') families[fam].met++;
  }
}

// ── Missing control list ────────────────────────────────────────────────────

const missingControls = allControls.filter(c => !exampleById.has(c.control_id));

// ── Output ──────────────────────────────────────────────────────────────────

console.log('=== CTA Example Completeness Metric ===');
console.log('');
console.log(`PRIMARY   Controls:  ${present}/${total} in worked example`);
console.log(`SECONDARY SPRS:      ${sprsScore} (worst-case — missing controls counted as NOT MET)`);
console.log(`TERTIARY  MET/TOTAL: ${met} met, ${notMet} not_met, ${partial} partial, ${missing} missing`);
console.log('');
console.log('BY FAMILY:');
for (const [fam, data] of Object.entries(families).sort()) {
  const bar = data.present === data.total ? '✓' : `${data.present}/${data.total}`;
  console.log(`  ${fam.padEnd(6)} ${bar.padEnd(8)} (${data.met} met)`);
}

if (missingControls.length > 0) {
  console.log('');
  console.log('MISSING CONTROLS:');
  for (const c of missingControls) {
    console.log(`  ${c.control_id.padEnd(20)} weight:${c.sprs_weight}`);
  }
}
