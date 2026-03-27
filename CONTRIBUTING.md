# Contributing to CTA

CTA is an open standard. Its value depends on real-world input from the people who do CMMC assessments, run defense supply chains, and implement security controls in small-to-mid-size manufacturers.

---

## Who Should Contribute

- **C3PAO assessors** — you see the gaps between what contractors think they have and what evidence actually exists. Tell us.
- **Defense subcontractors** — you know what your systems actually produce. If your evidence doesn't fit the schema, that's a schema problem.
- **MSPs serving the DIB** — you're implementing controls at scale. You know where the standard tools fail.
- **Security tool vendors** — if your product produces evidence relevant to CMMC Level 2, we want a connector design.
- **OSCAL / NIST community** — help us keep the schema aligned with the broader federal compliance ecosystem.

---

## What We Accept

### Schema additions
New evidence types, new invariants, new metadata fields. Must be grounded in a real assessment finding or documented compliance gap — not hypothetical.

**Required for a schema PR:**
1. Description of the real-world scenario that motivated the addition
2. Which NIST 800-171 Rev 2 control(s) the addition evidences
3. Draft JSON Schema addition (diff against `spec/cta-v0.1.schema.json`)
4. At least one example evidence object using the new type
5. Note on which connector or system produces this evidence

### Control registry corrections
If a SPRS weight in `controls/registry.json` conflicts with the official DoD Assessment Methodology, open an issue with the specific discrepancy and cite the source document.

### New connector designs
CTA connectors are MCP servers. If you want to propose a connector for a system not yet covered (e.g., Qualys, Tenable, ServiceNow, Okta Workforce, CrowdStrike Falcon), open an issue describing:
- System name and API availability
- Which controls it evidences
- Data it can provide (specific fields/endpoints)

### Worked examples
Additional `examples/` entries from real assessment scenarios (anonymized). Manufacturing, logistics, IT services, healthcare — every sector has different evidence patterns.

---

## What We Do Not Accept

- Schema additions without a real-world evidence grounding
- Changes that make the schema proprietary or license-restricted
- Modifications to the affirmation statement in `cta-v0.1.sprs-output.schema.json` — it reflects the DFARS statutory language
- Changes to `invariants.shared_account_violation.affected_controls` without C3PAO review — this invariant reflects actual assessment failure patterns

---

## Process

### For issues
Open a GitHub issue. Use the label `schema-gap`, `bug`, `connector-request`, or `question`.

### For PRs
1. Fork the repo
2. Create a branch: `feat/evidence-type-xyz` or `fix/control-weight-ac311`
3. Make your changes
4. Update `CHANGELOG.md` under `[Unreleased]`
5. Open a PR against `main` with a clear description

### Review
All schema changes require review by at least one CTA Working Group member before merge. Working Group membership is open — join by contributing two accepted PRs.

---

## CTA Working Group

The CTA Working Group reviews schema changes, manages the release process, and coordinates with C3PAO assessors on real-world validation.

Target charter: Q2 2026.

To be notified when the Working Group formally constitutes: watch this repo and open an issue tagged `working-group-interest`.

---

## Versioning

CTA follows semantic versioning:
- **Minor version** (0.1 → 0.2): backwards-compatible additions (new evidence types, new optional fields)
- **Major version** (0.x → 1.0): breaking changes (required field additions, type changes, invariant modifications)

v1.0 target: after C3PAO working group validation and OSCAL mapping.

---

## Code of Conduct

This project follows standard open-source norms: be direct, be accurate, cite your sources. Schema debates should be resolved by evidence from real assessments, not by preference.
