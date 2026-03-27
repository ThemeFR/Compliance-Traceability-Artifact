# Changelog

All notable changes to the CTA schema are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] — 2026-03-26

### Initial release

**Core artifact schema** (`spec/cta-v0.1.schema.json`):
- Full CTA artifact structure: issuer, assessment, controls array, invariants, SPRS score, signature
- 110 CMMC Level 2 control assessments (NIST SP 800-171 Rev 2 spine)
- Control assessment model: status (met/not_met/planned/not_applicable), maturity (0–3), SPRS weight, POA&M
- 15 evidence types: log, screenshot, policy_document, configuration_export, user_attestation, device_inventory, job_traveler_audit, audit_report, vulnerability_scan, mfa_enforcement_report, access_control_list, training_record, incident_report, maintenance_log, physical_access_log
- SHA-256 artifact signature
- Configurable freshness TTL (valid_until)

**SPRS output schema** (`spec/cta-v0.1.sprs-output.schema.json`):
- Full SPRS submission package: artifact reference, issuer identity, SPRS score fields, affirmation record
- DFARS affirmation statement (canonical, non-modifiable)
- Prime contractor delivery metadata
- False Claims Act liability acknowledgment flag

**Controls registry** (`controls/registry.json`):
- All 110 NIST SP 800-171 Rev 2 practices
- Per-control SPRS weight (1, 3, or 5) per DoD Assessment Methodology v1.2.1
- Critical flag for 5-point controls
- Family metadata (14 families: AC, AT, AU, CM, IA, IR, MA, MP, PS, PE, RA, CA, SC, SI)
- Cross-control notes where invariant relationships exist

**Worked example** (`examples/sprs-output-example.json`):
- 67-person precision machining company, 3 active DoD contracts ($4.2M)
- SPRS score: 101 (post-remediation)
- 2 POA&M items (SI.L2-3.14.1, SI.L2-3.14.2)
- Evidence from: Okta, Azure AD, CrowdStrike, Splunk, Intune, physical review
- Demonstrates: shared account violation resolved, job traveler CUI audit, device inventory, FIPS validation evidence

### v0.2 additions (included in v0.1.0 release)

The following additions were derived from a structured Elicit session with a real defense subcontractor and are baked into v0.1 schema:

- **`fips_validated` boolean on evidence objects** — explicitly flags FIPS 140-2 module usage. Required for SC.L2-3.13.11 evidence.
- **`device_inventory` evidence type** — managed device registry evidence (Intune/JAMF/CrowdStrike). Covers CM.L2-3.4.1 and SI.L2-3.14.2.
- **`job_traveler_audit` evidence type** — physical CUI document audit for manufacturing environments. First compliance schema to formally address shop floor CUI vectors.
- **`shared_account_violation` invariant** — cross-control invariant that forces maturity to 0 on AC.L2-3.1.1, IA.L2-3.5.1, and AU.L2-3.3.2 when shared credentials are detected. The most common hidden compliance failure in small manufacturers.

---

## [Unreleased]

### Added in v0.1.1 (crypto-agile patch)
- **Crypto-agile `signature.algorithm`** — expanded from `["SHA-256"]` to `["SHA-256", "CRYSTALS-Dilithium", "hybrid"]`. Backwards-compatible: SHA-256 artifacts remain valid.
- **`cryptography` block (optional top-level property)** — extended metadata for PQC signing: `signature_algorithm`, `fips_validated`, `fips_level`, `pqc_compliant`, `cnsa_2_0_compliant`, `nist_pqc_standard` (FIPS-204/FIPS-203), `trust_anchor` (software | SEALSQ-US-RoT | SEALSQ-QS7001 | SEALSQ-QVault-TPM), `hybrid_classical`, `certificate`, `trust_chain`, `artifact_hash`, `issued_at`, `expires_at`. Required when algorithm is `CRYSTALS-Dilithium` or `hybrid`.
- **Policy signal:** Katie Arrington (CMMC architect) joined IonQ January 2026. NIST PQC standards finalized August 2024 (CRYSTALS-Dilithium = FIPS-204). CNSA 2.0 mandates are coming. CTA is crypto-agile before the mandate arrives.

### Planned for v0.2
- OSCAL SSP mapping guide
- NemoClaw connector specification (MCP server interface)
- CTA Verify API OpenAPI specification
- SEALSQ INeS integration guide (quantum-secure signing walkthrough)
- Additional worked examples: IT services, logistics, healthcare sectors
- C3PAO assessor review and validation notes
