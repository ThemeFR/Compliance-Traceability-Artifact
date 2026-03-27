# CTA — Compliance Traceability Artifact

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.pending-blue)](https://doi.org/10.5281/zenodo.pending)
[![Schema Version](https://img.shields.io/badge/Schema-v0.1-green)](spec/cta-v0.1.schema.json)
[![NIST 800-171](https://img.shields.io/badge/NIST%20SP%20800--171-Rev%202-blue)](https://csrc.nist.gov/publications/detail/sp/800-171/rev-2/final)

**Portable, machine-readable CMMC Level 2 compliance proof for the defense supply chain.**

One command installs NemoClaw. It connects to systems they already have. CTA reads what comes out. The artifact goes to the prime. The prime verifies in 30 seconds. The CEO signs once a year. Nobody goes to jail.

---

## The Problem

**80,000 organizations** in the defense industrial base require CMMC Level 2 certification by November 10, 2026. Fewer than 900 currently have it.

Current cost to certify: **$300,000–$1,500,000.** Current cost to maintain: **$300,000–$500,000/year.**

The DOJ is actively prosecuting contractors for false SPRS affirmations under the False Claims Act — up to 20 years prison for knowing misrepresentation.

The compliance gap is not a technology problem. It is a documentation and evidence problem. Every defense subcontractor already runs systems that produce compliance-relevant data. None of them have a standard format to capture it, sign it, and deliver it to a prime contractor in a form that can be verified in seconds.

CTA is that format.

---

## What CTA Is

CTA (Compliance Traceability Artifact) is an open JSON-LD schema for packaging CMMC Level 2 compliance evidence into a signed, timestamped, portable artifact.

**Key properties:**

| Property | Value |
|---|---|
| Schema spine | NIST SP 800-171 Rev 2 (110 controls) |
| Score system | SPRS (-203 to +110) |
| Signature | SHA-256 over canonical payload |
| Format | JSON-LD |
| License | CC BY 4.0 — open forever |
| Freshness model | Configurable TTL (default: 365 days self-assessment, 90 days C3PAO) |

**What travels:** Only the signed artifact — not the underlying system data. Sensitive evidence stays inside the contractor's perimeter.

---

## Architecture

```
Contractor's Environment (their hardware, their perimeter)
    └── NemoClaw (NVIDIA OpenClaw + OpenShell)
          └── MCP Connectors → Okta, Azure AD, CrowdStrike, Splunk, Intune
    └── CTA Studio
          └── Evidence mapper
          └── Maturity scorer
          └── Artifact generator (signed JSON-LD)
          └── SPRS package builder

CTA Artifact ──────── travels outward ────────▶

Prime Contractor / C3PAO
    └── CTA Verify API
          └── Signature validation
          └── Freshness check
          └── SPRS score display
          └── Supply chain dashboard
```

The contractor owns the hardware. NemoClaw lives in their perimeter. Only the signed artifact travels outward.

---

## SPRS Score Model

SPRS scores are calculated per the **DoD Assessment Methodology for NIST SP 800-171 (v1.2.1)**.

| Threshold | Meaning |
|---|---|
| +110 | All 110 controls met |
| +88 | Minimum for C3PAO assessment eligibility |
| 0 | Half the controls unimplemented |
| -203 | All controls failed (floor) |

Controls are weighted 1, 3, or 5 points based on criticality. 5-point failures have the highest score impact. See [controls/registry.json](controls/registry.json) for per-control weights.

---

## CMMC Enforcement Timeline

| Phase | Date | Requirement |
|---|---|---|
| Phase 1 | Nov 10, 2025 – Nov 9, 2026 | Self-assessment + SPRS submission |
| **Phase 2** | **Nov 10, 2026** | **C3PAO certification mandatory** |
| Phase 3 | Nov 10, 2027 | Level 3 requirements |

**Phase 2 is 7.5 months away from the date of this publication. The standards race is active.**

---

## Repository Structure

```
cta/
├── spec/
│   ├── cta-v0.1.schema.json              Core artifact JSON Schema
│   └── cta-v0.1.sprs-output.schema.json  SPRS submission package schema
├── controls/
│   └── registry.json                     All 110 NIST 800-171 Rev 2 controls
│                                         with SPRS weights and family metadata
└── examples/
    └── sprs-output-example.json          Worked example: 67-person precision
                                          manufacturer, SPRS score 101,
                                          2 POA&M items
```

---

## v0.2 Additions (included in this release)

The following additions were derived from a structured Elicit session with a real defense subcontractor (precision machining, DoD contracts):

**`fips_validated` flag on evidence objects** — explicitly tracks whether cryptographic implementations use FIPS 140-2 validated modules. Required to evidence SC.L2-3.13.11.

**`device_inventory` evidence type** — covers managed device registry evidence from Intune, JAMF, or CrowdStrike. Required for CM.L2-3.4.1 and SI.L2-3.14.2 evidence in environments without dedicated CMDB.

**`job_traveler_audit` evidence type** — physical CUI document audit for manufacturing environments. Job travelers (shop floor documents that travel with physical parts) are a CUI vector not covered by any existing compliance tool. This type covers physical review audit records for MP.L2-3.8.1 and MP.L2-3.8.4.

**`shared_account_violation` invariant** — when detected, automatically overrides maturity to 0 for AC.L2-3.1.1, IA.L2-3.5.1, and AU.L2-3.3.2 regardless of other evidence. Shared accounts are the most common hidden compliance failure in small manufacturing environments.

---

## Quick Start

### Validate an artifact against the schema

```bash
npm install -g ajv-cli
ajv validate -s spec/cta-v0.1.schema.json -d examples/sprs-output-example.json
```

### NemoClaw install (automated evidence collection)

```bash
npx nemoclaw install --profile cta-cmmc-level2
```

### Verify an artifact via CTA Verify API

```bash
curl -X POST https://verify.themefr.io/v1/verify \
  -H "Content-Type: application/json" \
  -d @my-artifact.json
```

---

## Worked Example

See [examples/sprs-output-example.json](examples/sprs-output-example.json) for a complete artifact from a 67-person precision machining company with:

- 3 active DoD contracts ($4.2M)
- SPRS score: 101 (post-remediation, C3PAO-eligible)
- 2 active POA&M items (target close: May 2026)
- Evidence from: Okta, Azure AD, CrowdStrike, Splunk, Intune, physical review
- Shared account violation resolved (invariant: not detected)
- Job traveler CUI audit complete (manufacturing-specific control)

---

## OSCAL Compatibility

CTA control IDs map directly to NIST SP 800-171 Rev 2 requirement numbers. CTA artifacts are designed to be translatable to OSCAL SSP and Assessment Results formats. OSCAL mapping guide: forthcoming in v0.2.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose schema changes, report gaps, and join the CTA Working Group.

Schema changes require:
1. Documented real-world evidence gap or C3PAO assessor feedback
2. Draft JSON Schema addition
3. Example evidence object
4. Working group review

---

## License

CTA schema and all files in this repository are published under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

You are free to use, distribute, and build on this schema — including commercially — provided you attribute the source.

**The schema must remain open.** CTA's value to the defense industrial base depends on universal adoption, which depends on zero license friction.

---

## Citation

```bibtex
@misc{finch2026cta,
  author    = {Finch, Dalaun},
  title     = {CTA v0.1: Compliance Traceability Artifact Specification
               for CMMC Level 2 Supply Chain Assurance},
  year      = {2026},
  publisher = {Theme Fr},
  doi       = {10.5281/zenodo.pending},
  url       = {https://github.com/ThemeFR/cta}
}
```

---

## About Theme Fr

Theme Fr (Tactical Hardware, Equipment, Materials & Essentials for Federal Readiness) is a SAM.gov-registered defense supply chain vendor (CAGE: 8H6J7, UEI: Z5QRADKLUNQ5) building open infrastructure for the defense industrial base.

Contact: info@themefr.com
