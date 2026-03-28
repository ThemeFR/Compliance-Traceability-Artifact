// validate.js
// Validate examples/sprs-output-example.json against spec/cta-v0.1.schema.json
// Usage: node validate.js
// Exit code 0 = valid, Exit code 1 = invalid

'use strict';

const fs   = require('fs');
const path = require('path');

// ajv resolution order:
//   1. Local node_modules/ajv  (Docker container after npm install, or local npm install)
//   2. ajv-cli bundled copy    (legacy Windows local dev path)
const AJV_FALLBACK = 'C:/Users/phill/AppData/Roaming/npm/node_modules/ajv-cli/node_modules/ajv';

let Ajv;
try {
  Ajv = require('ajv');
} catch (e) {
  try {
    Ajv = require(AJV_FALLBACK);
  } catch (e2) {
    console.error('ERROR: Cannot load ajv. Run: npm install  (from repo root)');
    process.exit(1);
  }
}

const repoDir    = path.resolve(__dirname);
const schemaPath = path.join(repoDir, 'spec', 'cta-v0.1.schema.json');
const dataPath   = path.join(repoDir, 'examples', 'sprs-output-example.json');

let schema, data;
try {
  schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
} catch (e) {
  console.error(`ERROR: Cannot read schema: ${e.message}`);
  process.exit(1);
}
try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (e) {
  console.error(`ERROR: Cannot read data: ${e.message}`);
  process.exit(1);
}

// Strip the $schema URI to avoid meta-schema resolution — we're providing the schema directly
const schemaToUse = Object.assign({}, schema);
delete schemaToUse.$schema;

// Strip top-level _comment (worked examples use it for human context; not part of CTA spec)
const dataToValidate = Object.assign({}, data);
delete dataToValidate._comment;

// validateFormats: false — ajv v8 requires ajv-formats for format keywords;
// format conformance is enforced separately by CTA Studio, not this validator gate.
const ajv = new Ajv({ allErrors: true, strict: false, validateFormats: false });
const validate = ajv.compile(schemaToUse);
const valid = validate(dataToValidate);

if (valid) {
  console.log('examples/sprs-output-example.json valid');
  process.exit(0);
} else {
  console.error('examples/sprs-output-example.json INVALID');
  for (const err of validate.errors) {
    console.error(`  ${err.instancePath || '(root)'} ${err.message}`);
  }
  process.exit(1);
}
