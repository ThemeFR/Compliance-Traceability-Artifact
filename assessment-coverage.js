// assessment-coverage.js
// Primary metric:   coverage  — count of controls with ≥1 AG field mapping
// Secondary metric: depth     — average AG fields per control (global + per-type)
// Tertiary metric:  type coverage — per-type definitions / total evidence types
//
// Usage: node assessment-coverage.js
// Exit code: always 0 (metric only, not a pass/fail gate)

'use strict';

const fs   = require('fs');
const path = require('path');

// All field names that count as explicit Assessment Guide alignment.
// When present in evidence_object (global) or a per-type definition, they score.
const AG_FIELD_NAMES = new Set([
  'assessment_fields',
  'assessment_guide_reference',
  'corroborating_evidence',
  'evidence_method',
  'protection_controls',
  'review_cadence',
  'reviewer',
  'scope',
]);

// Full set of evidence types declared in the schema enum.
// Used to compute per-type definition coverage (secondary metric).
const ALL_EVIDENCE_TYPES = [
  'access_control_list',
  'audit_report',
  'configuration_export',
  'device_inventory',
  'incident_report',
  'job_traveler_audit',
  'log',
  'maintenance_log',
  'mfa_enforcement_report',
  'physical_access_log',
  'policy_document',
  'screenshot',
  'training_record',
  'user_attestation',
  'vulnerability_scan',
];

// --- Schema inspection helpers ---

function findAgFields(properties) {
  const found = new Set();
  if (!properties || typeof properties !== 'object') return found;
  for (const [name, def] of Object.entries(properties)) {
    if (AG_FIELD_NAMES.has(name)) {
      found.add(name);
      continue;
    }
    if (def && typeof def.description === 'string' &&
        def.description.toLowerCase().includes('assessment guide')) {
      found.add(name);
    }
  }
  return found;
}

// Returns { global: Set<string>, byType: Map<string, Set<string>> }
function collectAgFieldsFromSchema(schema) {
  const result = { global: new Set(), byType: new Map() };

  const evDef = schema.definitions && schema.definitions.evidence_object;
  if (evDef && evDef.properties) {
    result.global = findAgFields(evDef.properties);
  }

  if (schema.definitions) {
    for (const [defName, def] of Object.entries(schema.definitions)) {
      if (defName.startsWith('evidence_') && defName !== 'evidence_object' && def.properties) {
        const typeName = defName.replace(/^evidence_/, '');
        const fields   = findAgFields(def.properties);
        if (fields.size > 0) {
          result.byType.set(typeName, fields);
        }
      }
    }
  }

  return result;
}

// Total unique AG fields applicable to a single evidence object.
function agFieldsForEvidence(evidenceObj, agFields) {
  const applicable = new Set([...agFields.global]);
  const typeSpecific = agFields.byType.get(evidenceObj.type);
  if (typeSpecific) {
    for (const f of typeSpecific) applicable.add(f);
  }
  return applicable;
}

// --- Main ---

function main() {
  const repoDir = path.resolve(__dirname);

  let schema, example;
  try {
    schema = JSON.parse(fs.readFileSync(path.join(repoDir, 'spec', 'cta-v0.1.schema.json'), 'utf8'));
  } catch (e) {
    console.error(`ERROR: Cannot read schema: ${e.message}`);
    process.exit(0);
  }
  try {
    example = JSON.parse(fs.readFileSync(path.join(repoDir, 'examples', 'sprs-output-example.json'), 'utf8'));
  } catch (e) {
    console.error(`ERROR: Cannot read example: ${e.message}`);
    process.exit(0);
  }

  const agFields = collectAgFieldsFromSchema(schema);
  const controls = example.controls || [];
  const total    = controls.length;

  // ── Primary metric: coverage ──────────────────────────────────────────────
  const mapped   = [];
  const unmapped = [];

  for (const ctrl of controls) {
    const controlId    = ctrl.control_id;
    const evidenceList = ctrl.evidence || [];
    let   controlMapped = false;
    const fieldHits     = new Set();

    if (evidenceList.length === 0) {
      if (agFields.global.size > 0) {
        controlMapped = true;
        for (const f of agFields.global) fieldHits.add(f);
      }
    } else {
      for (const ev of evidenceList) {
        const applicable = agFieldsForEvidence(ev, agFields);
        if (applicable.size > 0) {
          controlMapped = true;
          for (const f of applicable) fieldHits.add(f);
        }
      }
    }

    if (controlMapped) {
      // Record evidence types used by this control (for depth display)
      const evTypes = [...new Set((evidenceList).map(e => e.type))];
      mapped.push({ control_id: controlId, fields: Array.from(fieldHits).sort(), ev_types: evTypes });
    } else {
      unmapped.push(controlId);
    }
  }

  const coverageScore = mapped.length;

  // ── Secondary metric: depth ───────────────────────────────────────────────
  // Depth per control = unique AG fields available given its evidence type(s)
  const depthByControl = [];

  for (const ctrl of controls) {
    const evidenceList = ctrl.evidence || [];
    const allFields    = new Set([...agFields.global]);

    if (evidenceList.length === 0) {
      // No evidence — only global fields apply
    } else {
      for (const ev of evidenceList) {
        const typeSpecific = agFields.byType.get(ev.type);
        if (typeSpecific) {
          for (const f of typeSpecific) allFields.add(f);
        }
      }
    }

    const evTypes = evidenceList.length > 0
      ? [...new Set(evidenceList.map(e => e.type))]
      : ['(no evidence)'];

    depthByControl.push({
      control_id : ctrl.control_id,
      depth      : allFields.size,
      fields     : Array.from(allFields).sort(),
      ev_types   : evTypes,
    });
  }

  const totalDepth = depthByControl.reduce((s, c) => s + c.depth, 0);
  const avgDepth   = total > 0 ? (totalDepth / total).toFixed(2) : '0.00';
  const minDepth   = Math.min(...depthByControl.map(c => c.depth));
  const maxDepth   = Math.max(...depthByControl.map(c => c.depth));

  // ── Tertiary metric: per-type definition coverage ─────────────────────────
  const typesWithDefs    = ALL_EVIDENCE_TYPES.filter(t => agFields.byType.has(t));
  const typesMissingDefs = ALL_EVIDENCE_TYPES.filter(t => !agFields.byType.has(t));
  const typeScore        = `${typesWithDefs.length}/${ALL_EVIDENCE_TYPES.length}`;

  // ── Output ─────────────────────────────────────────────────────────────────
  console.log('\n=== CTA Assessment Guide Coverage & Depth Metric ===');
  console.log(`\nPRIMARY   Coverage:  ${coverageScore}/${total} controls have ≥1 AG field mapping`);
  console.log(`SECONDARY Depth:     avg ${avgDepth} AG fields/control  (min: ${minDepth}, max: ${maxDepth})`);
  console.log(`TERTIARY  Type defs: ${typeScore} evidence types have per-type AG definitions`);

  // Depth table
  console.log('\nDEPTH BY CONTROL:');
  const sorted = [...depthByControl].sort((a, b) => b.depth - a.depth);
  for (const c of sorted) {
    const evLabel = c.ev_types.join(', ');
    console.log(`  ${c.control_id.padEnd(20)} [${evLabel.padEnd(22)}]  ${c.depth} fields`);
  }

  // Coverage breakdown
  if (unmapped.length > 0) {
    console.log(`\nUNMAPPED (${unmapped.length}):`);
    for (const id of unmapped) console.log(`  ✗  ${id}`);
  }

  // Global AG fields
  console.log('\nGlobal AG fields (evidence_object):');
  if (agFields.global.size > 0) {
    for (const f of Array.from(agFields.global).sort()) console.log(`  •  ${f}`);
  } else {
    console.log('  (none)');
  }

  // Per-type definition inventory
  console.log('\nPer-type definitions present:');
  if (typesWithDefs.length > 0) {
    for (const t of typesWithDefs) {
      const fields = Array.from(agFields.byType.get(t)).sort();
      console.log(`  ✓  ${t.padEnd(26)} ${fields.length} fields: ${fields.join(', ')}`);
    }
  } else {
    console.log('  (none)');
  }

  if (typesMissingDefs.length > 0) {
    console.log(`\nEVIDENCE TYPES MISSING PER-TYPE DEFINITIONS (${typesMissingDefs.length}):`);
    for (const t of typesMissingDefs) console.log(`  ✗  ${t}`);
  }

  console.log('');
  process.exit(0);
}

main();
