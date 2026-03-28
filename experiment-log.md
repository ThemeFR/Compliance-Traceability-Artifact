# CTA Schema Iteration — Experiment Log
## Repo: ThemeFR/Compliance-Traceability-Artifact
## Loop started: 2026-03-27

---
Experiment 0 | 2026-03-27T03:10:00Z
Change: Added `evidence_method` enum field to `evidence_object` definition in spec/cta-v0.1.schema.json. Values: "documentary" | "interview" | "observation". Maps to CMMC Assessment Guide evidence categorization applied to all control families.
Validator: PASS
Metric before: 0/17
Metric after: 17/17
Decision: KEPT

---
Experiment 1 | 2026-03-27T22:20:00Z
Change: Added `evidence_log` per-type definition with `assessment_fields` array enum (date_and_time_of_event, component_of_event, type_of_event, user_or_process_identity, outcome_of_event) — maps to AU.L2-3.3.1 Assessment Guide five required audit log content elements.
Validator: PASS
Metric before: 17/17 (all via evidence_method only)
Metric after: 17/17 (AU.L2-3.3.1 and AU.L2-3.3.2 now also via assessment_fields)
Decision: KEPT

---
Experiment 2 | 2026-03-27T22:25:00Z
Change: Added `protection_controls` object to `evidence_log` definition with three Assessment Guide fields: access_restricted_to (array), modification_prevention (string), logging_function_protected (boolean) — maps to AU.L2-3.3.2 audit protection requirements.
Validator: PASS
Metric before: 17/17 (AU via assessment_fields, evidence_method)
Metric after: 17/17 (AU.L2-3.3.1 and AU.L2-3.3.2 now via assessment_fields, evidence_method, protection_controls)
Decision: KEPT

---
Experiment 3 | 2026-03-27T22:30:00Z
Change: Added `review_cadence` enum (daily/weekly/monthly/quarterly/event_driven) and `reviewer` string to `evidence_log` definition — maps to Assessment Guide audit review requirements (AU.L2-3.3.5 and related controls).
Validator: PASS
Metric before: 17/17 (AU via 3 AG fields)
Metric after: 17/17 (AU.L2-3.3.1 and AU.L2-3.3.2 now via 5 AG fields: assessment_fields, evidence_method, protection_controls, review_cadence, reviewer)
Decision: KEPT

---
Experiment 4 | 2026-03-27T22:35:00Z
Change: Added `evidence_mfa_enforcement_report` per-type definition with `assessment_fields` array (mfa_system_configuration, user_enrollment_status, bypass_exception_log, authenticator_type, privileged_account_enforcement) and `scope` object (total_users, enrolled_users, bypass_exceptions, bypass_justifications) — maps to IA.L2-3.5.3 Assessment Guide three required evidence categories: system config, enrollment records, bypass exception logs.
Validator: PASS
Metric before: 17/17 (IA via evidence_method only)
Metric after: 17/17 (IA.L2-3.5.2 and IA.L2-3.5.3 now via assessment_fields, evidence_method, scope)
Decision: KEPT

---
Experiment 5 | 2026-03-27T22:40:00Z
Change: Added `evidence_configuration_export` per-type definition with `assessment_fields` array (system_name, configuration_setting, expected_value, actual_value, enforcement_mechanism) and `scope` string — applies to AC.L2-3.1.1, AC.L2-3.1.13, IA.L2-3.5.1, SC.L2-3.13.8, SC.L2-3.13.11.
Validator: PASS
Metric before: 17/17 (AC/SC/IA.3.5.1 via evidence_method only)
Metric after: 17/17 (5 controls upgraded to assessment_fields, evidence_method, scope)
Decision: KEPT

---
Experiment 6 | 2026-03-27T22:45:00Z
Change: Added `evidence_access_control_list` per-type definition with `assessment_fields` (privileged_accounts, standard_accounts, role_definitions, separation_of_duties, least_privilege_enforcement) and `scope` — maps to AC.L2-3.1.5 least privilege and separation of duties requirements.
Validator: PASS
Metric before: 17/17 (AC.L2-3.1.5 via evidence_method only)
Metric after: 17/17 (AC.L2-3.1.5 upgraded to assessment_fields, evidence_method, scope)
Decision: KEPT

---
Experiment 7 | 2026-03-27T22:50:00Z
Change: Added `evidence_device_inventory` per-type definition with `assessment_fields` (device_name, device_type, operating_system, compliance_status, enrollment_status, last_check_in, baseline_configuration) and `scope` object (total_devices, managed_devices, unmanaged_devices) — maps to CM.L2-3.4.1 baseline configuration and SI.L2-3.14.2 endpoint protection coverage.
Validator: PASS
Metric before: 17/17 (CM.L2-3.4.1 and SI.L2-3.14.2 via evidence_method only)
Metric after: 17/17 (both upgraded to assessment_fields, evidence_method, scope)
Decision: KEPT

---
Experiment 8 | 2026-03-27T22:55:00Z
Change: Added `evidence_policy_document` per-type definition with `assessment_fields` (document_title, version, approval_authority, approval_date, review_date, distribution_scope, control_coverage), `review_cadence`, `reviewer`, and `scope` — maps to IR.L2-3.6.1 incident response plan and CA.L2-3.12.4 system security plan requirements.
Validator: PASS
Metric before: 17/17 (IR/CA via evidence_method only)
Metric after: 17/17 (IR.L2-3.6.1 and CA.L2-3.12.4 upgraded to 5 AG fields: assessment_fields, evidence_method, review_cadence, reviewer, scope)
Decision: KEPT

---
Experiment 9 | 2026-03-27T23:00:00Z
Change: Added `evidence_vulnerability_scan` per-type definition with `assessment_fields` (scan_date, scanner_tool, devices_scanned, critical/high/medium/low_findings, remediation_status), `scope` object (total_devices_in_boundary, devices_scanned, scan_coverage_percent), and `review_cadence` — maps to RA.L2-3.11.2 vulnerability scanning and SI.L2-3.14.1 flaw remediation requirements. Initial attempt had JSON syntax error (extra closing brace on evidence_mfa_enforcement_report); fixed and re-validated.
Validator: PASS (after JSON fix)
Metric before: 17/17 (RA/SI.14.1 via evidence_method only)
Metric after: 17/17 (RA.L2-3.11.2 upgraded to 4 AG fields, SI.L2-3.14.1 upgraded to 4 AG fields)
Decision: KEPT

---
Experiment 10 | 2026-03-27T23:05:00Z
Change: Added `evidence_job_traveler_audit` per-type definition with `assessment_fields` (cui_marking_applied, secure_storage_location, access_control_mechanism, distribution_tracking, destruction_procedure) and `scope` object (documents_reviewed, locations_inspected, findings) — maps to MP.L2-3.8.1 physical CUI media protection. Last control with only evidence_method coverage.
Validator: PASS
Metric before: 17/17 (MP.L2-3.8.1 via evidence_method only)
Metric after: 17/17 (ALL 17 controls now have 3+ AG fields. MP.L2-3.8.1 upgraded to assessment_fields, evidence_method, scope)
Decision: KEPT

---
Experiment 11 | 2026-03-27T23:10:00Z
Change: Added `corroborating_evidence` array (uuid references) to `evidence_log` definition — assessors cross-reference audit log evidence with configuration exports, interviews, and observations per Assessment Guide.
Validator: PASS
Metric before: 17/17 (AU via 5 AG fields)
Metric after: 17/17 (AU.L2-3.3.1 and AU.L2-3.3.2 upgraded to 6 AG fields)
Decision: KEPT

---
Experiment 12 | 2026-03-27T23:15:00Z
Change: Added `corroborating_evidence` array (uuid references) to `evidence_configuration_export` definition — assessors cross-reference config exports against interviews, observations, and policy documents.
Validator: PASS
Metric before: 17/17 (config_export controls via 3 AG fields)
Metric after: 17/17 (AC.L2-3.1.1, AC.L2-3.1.13, IA.L2-3.5.1, SC.L2-3.13.8, SC.L2-3.13.11 upgraded to 4 AG fields)
Decision: KEPT

---
Experiment 13 | 2026-03-27T23:20:00Z
Change: Added `corroborating_evidence` array to `evidence_mfa_enforcement_report` definition — assessors cross-reference MFA reports with user directory exports and interview evidence.
Validator: PASS
Metric before: 17/17 (IA.L2-3.5.2/3.5.3 via 3 AG fields)
Metric after: 17/17 (IA.L2-3.5.2 and IA.L2-3.5.3 upgraded to 4 AG fields)
Decision: KEPT

---
Experiment 14 | 2026-03-27T23:25:00Z
Change: Added `corroborating_evidence` array to `evidence_access_control_list` definition — assessors cross-reference ACLs with directory exports and role assignment interviews.
Validator: PASS
Metric before: 17/17 (AC.L2-3.1.5 via 3 AG fields)
Metric after: 17/17 (AC.L2-3.1.5 upgraded to 4 AG fields)
Decision: KEPT

---
Experiment 15 | 2026-03-27T23:30:00Z
Change: Added `corroborating_evidence` array to `evidence_device_inventory` definition — assessors cross-reference device inventory with configuration exports and physical observation.
Validator: PASS
Metric before: 17/17 (CM.L2-3.4.1 and SI.L2-3.14.2 via 3 AG fields)
Metric after: 17/17 (both upgraded to 4 AG fields)
Decision: KEPT

---
Experiment 16 | 2026-03-27T23:35:00Z
Change: Added `corroborating_evidence` array to `evidence_policy_document` definition — assessors verify policies are implemented in practice via configuration exports and interviews.
Validator: PASS
Metric before: 17/17 (IR/CA via 5 AG fields)
Metric after: 17/17 (IR.L2-3.6.1 and CA.L2-3.12.4 upgraded to 6 AG fields each)
Decision: KEPT

---
Experiment 17 | 2026-03-27T23:40:00Z
Change: Added `corroborating_evidence` array to `evidence_vulnerability_scan` definition — assessors cross-reference scan results with patch management records and remediation tickets.
Validator: PASS
Metric before: 17/17 (RA/SI.14.1 via 4 AG fields)
Metric after: 17/17 (RA.L2-3.11.2 and SI.L2-3.14.1 upgraded to 5 AG fields each)
Decision: KEPT

---
Experiment 18 | 2026-03-27T23:45:00Z
Change: Added `corroborating_evidence` array to `evidence_job_traveler_audit` definition — assessors cross-reference physical audits with policy documents and training records.
Validator: PASS
Metric before: 17/17 (MP.L2-3.8.1 via 3 AG fields)
Metric after: 17/17 (ALL 17 controls now have 4+ AG fields. MP.L2-3.8.1 upgraded to 4 AG fields)
Decision: KEPT

---
Experiment 19 | 2026-03-27T23:50:00Z
Change: Added `scope` string to `evidence_log` definition — describes which systems, applications, and network segments are covered by the log source.
Validator: PASS
Metric before: 17/17 (AU via 6 AG fields)
Metric after: 17/17 (AU.L2-3.3.1 and AU.L2-3.3.2 now at maximum 7 AG fields: assessment_fields, corroborating_evidence, evidence_method, protection_controls, review_cadence, reviewer, scope)
Decision: KEPT

---
Experiment 20 | 2026-03-27T23:55:00Z
Change: Added `review_cadence` enum and `reviewer` string to `evidence_access_control_list` definition — AC.L2-3.1.5 assessors verify access privileges are reviewed periodically.
Validator: PASS
Metric before: 17/17 (AC.L2-3.1.5 via 4 AG fields)
Metric after: 17/17 (AC.L2-3.1.5 upgraded to 6 AG fields)
Decision: KEPT

---
Experiment 21 | 2026-03-28T00:00:00Z
Change: Added `review_cadence` enum to `evidence_device_inventory` definition — CM.L2-3.4.1 assessors verify baseline configuration reviews on a defined schedule.
Validator: PASS
Metric before: 17/17 (CM/SI.14.2 via 4 AG fields)
Metric after: 17/17 (CM.L2-3.4.1 and SI.L2-3.14.2 upgraded to 5 AG fields)
Decision: KEPT

---
Experiment 22 | 2026-03-28T00:05:00Z
Change: Added `review_cadence` enum to `evidence_configuration_export` definition — assessors verify configuration baselines are reviewed periodically to detect drift.
Validator: PASS
Metric before: 17/17 (config_export controls via 4 AG fields)
Metric after: 17/17 (AC.L2-3.1.1, AC.L2-3.1.13, IA.L2-3.5.1, SC.L2-3.13.8, SC.L2-3.13.11 all upgraded to 5 AG fields)
Decision: KEPT

---
Experiment 23 | 2026-03-28T00:10:00Z
Change: Added `review_cadence` enum to `evidence_mfa_enforcement_report` definition — IA.L2-3.5.3 assessors verify MFA enrollment and bypass exceptions are reviewed periodically.
Validator: PASS
Metric before: 17/17 (IA.L2-3.5.2/3.5.3 via 4 AG fields)
Metric after: 17/17 (IA.L2-3.5.2 and IA.L2-3.5.3 upgraded to 5 AG fields)
Decision: KEPT

---
Experiment 24 | 2026-03-28T00:15:00Z
Change: Added `review_cadence` enum and `reviewer` string to `evidence_job_traveler_audit` definition — MP.L2-3.8.1 assessors verify physical CUI audits are conducted on a defined schedule with a designated reviewer.
Validator: PASS
Metric before: 17/17 (MP.L2-3.8.1 via 4 AG fields)
Metric after: 17/17 (MP.L2-3.8.1 upgraded to 6 AG fields)
Decision: KEPT

---
Experiment 25 | 2026-03-28T00:20:00Z
Change: Added `reviewer` string to `evidence_vulnerability_scan` definition — reviewer responsible for vulnerability scan results and remediation prioritization.
Validator: PASS
Metric before: 17/17 (RA/SI.14.1 via 5 AG fields)
Metric after: 17/17 (RA.L2-3.11.2 and SI.L2-3.14.1 upgraded to 6 AG fields)
Decision: KEPT

---
Experiment 26 | 2026-03-28T00:25:00Z
Change: Added `reviewer` string to `evidence_device_inventory` definition — reviewer responsible for device inventory and baseline configuration reviews.
Validator: PASS
Metric before: 17/17 (CM/SI.14.2 via 5 AG fields)
Metric after: 17/17 (CM.L2-3.4.1 and SI.L2-3.14.2 upgraded to 6 AG fields)
Decision: KEPT

---
Experiment 27 | 2026-03-28T00:30:00Z
Change: Added `reviewer` string to `evidence_configuration_export` definition — reviewer responsible for configuration review and change approval. Impacts AC.L2-3.1.1, AC.L2-3.1.13, IA.L2-3.5.1, SC.L2-3.13.8, SC.L2-3.13.11.
Validator: PASS
Metric before: 17/17 (5 config_export controls via 5 AG fields)
Metric after: 17/17 (all 5 upgraded to 6 AG fields. 15/17 controls now at 6+ AG fields)
Decision: KEPT

---
Experiment 28 | 2026-03-28T00:35:00Z
Change: Added `reviewer` string to `evidence_mfa_enforcement_report` definition — reviewer responsible for MFA enrollment reviews and bypass exception approvals.
Validator: PASS
Metric before: 17/17 (IA.L2-3.5.2/3.5.3 via 5 AG fields)
Metric after: 17/17 (ALL 17 controls now have 6+ AG fields. IA.L2-3.5.2 and IA.L2-3.5.3 upgraded to 6. AU controls at 7 with protection_controls.)
Decision: KEPT

---
## SUMMARY

**Loop completed: 2026-03-28T00:35:00Z**
**Experiments: 29 total (0–28)**
- Kept: 28 (Experiments 0–28, including JSON fix in Exp 9)
- Discarded: 0
- Validator failures: 1 (Exp 9 initial — JSON syntax error, fixed immediately)

**Final metric: 17/17 controls with Assessment Guide field mappings**

### Per-control AG field depth (final state):

| Control | AG Fields | Count |
|---------|-----------|-------|
| AU.L2-3.3.1 | assessment_fields, corroborating_evidence, evidence_method, protection_controls, review_cadence, reviewer, scope | **7** |
| AU.L2-3.3.2 | assessment_fields, corroborating_evidence, evidence_method, protection_controls, review_cadence, reviewer, scope | **7** |
| AC.L2-3.1.1 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| AC.L2-3.1.5 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| AC.L2-3.1.13 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| CM.L2-3.4.1 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| IA.L2-3.5.1 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| IA.L2-3.5.2 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| IA.L2-3.5.3 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| IR.L2-3.6.1 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| MP.L2-3.8.1 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| RA.L2-3.11.2 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| CA.L2-3.12.4 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| SC.L2-3.13.8 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| SC.L2-3.13.11 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| SI.L2-3.14.1 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |
| SI.L2-3.14.2 | assessment_fields, corroborating_evidence, evidence_method, review_cadence, reviewer, scope | **6** |

### Per-type evidence definitions added:

| Evidence Type | AG Fields | Key Assessment Guide Alignment |
|---------------|-----------|-------------------------------|
| evidence_log | 6 (+protection_controls) | AU.L2-3.3.1 five audit content fields, AU.L2-3.3.2 protection controls |
| evidence_access_control_list | 5 | AC.L2-3.1.5 least privilege, separation of duties |
| evidence_device_inventory | 5 | CM.L2-3.4.1 baseline config, SI.L2-3.14.2 endpoint coverage |
| evidence_configuration_export | 5 | AC/SC/IA config verification fields |
| evidence_policy_document | 5 | IR.L2-3.6.1 IRP, CA.L2-3.12.4 SSP review fields |
| evidence_job_traveler_audit | 5 | MP.L2-3.8.1 physical CUI marking/storage |
| evidence_mfa_enforcement_report | 5 | IA.L2-3.5.3 enrollment/bypass/scope fields |
| evidence_vulnerability_scan | 5 | RA.L2-3.11.2 scan scope/coverage |

---
## LOOP 2 — Experiments 29–43

---
Experiment 29 | 2026-03-28T09:00:00Z
Change: Added `evidence_screenshot` per-type definition with assessment_fields (captured_system, captured_date, captured_by, control_demonstrated, capture_method), scope, review_cadence, reviewer, corroborating_evidence, assessment_guide_reference. Maps to AT.L2-3.2.x, AC, CM screenshot evidence.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 8/15 → 9/15
Decision: KEPT

---
Experiment 30 | 2026-03-28T09:05:00Z
Change: Added `evidence_user_attestation` per-type definition with assessment_fields (attesting_user, attestation_date, policy_version, acknowledgment_type, supervisor_witness), scope, review_cadence (annual/on_role_change/on_policy_update/event_driven), reviewer, corroborating_evidence, assessment_guide_reference. Maps to AT.L2-3.2.x, PS, PE acknowledgment evidence.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 9/15 → 10/15
Decision: KEPT

---
Experiment 31 | 2026-03-28T09:10:00Z
Change: Added `evidence_audit_report` per-type definition with assessment_fields (report_date, auditor, scope_boundary, findings_count, recommendations, remediation_status), scope, review_cadence, reviewer, corroborating_evidence, assessment_guide_reference. Maps to CA.L2-3.12.1 security assessments and RA.L2-3.11.x risk assessment reports.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 10/15 → 11/15
Decision: KEPT

---
Experiment 32 | 2026-03-28T09:15:00Z
Change: Added `evidence_training_record` per-type definition with assessment_fields (trainee, training_title, completion_date, training_method, passing_score, role_applicability), scope, review_cadence (annual/on_hire/on_role_change/quarterly/event_driven), reviewer, corroborating_evidence, assessment_guide_reference. Maps to AT.L2-3.2.1 awareness training and AT.L2-3.2.2 role-based training.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 11/15 → 12/15
Decision: KEPT

---
Experiment 33 | 2026-03-28T09:20:00Z
Change: Added `evidence_incident_report` per-type definition with assessment_fields (incident_id, detection_date, containment_date, resolution_date, incident_type, affected_systems, reporting_status), scope, review_cadence (per_incident/monthly/quarterly/annual), reviewer, corroborating_evidence, assessment_guide_reference. Maps to IR.L2-3.6.2 incident tracking and DoD/US-CERT reporting requirements.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 12/15 → 13/15
Decision: KEPT

---
Experiment 34 | 2026-03-28T09:25:00Z
Change: Added `evidence_maintenance_log` per-type definition with assessment_fields (maintenance_date, technician, system_affected, maintenance_type, authorization_reference, completion_status), scope, review_cadence (per_activity/monthly/quarterly/annual), reviewer, corroborating_evidence, assessment_guide_reference. Maps to MA.L2-3.7.1 authorized maintenance and MA.L2-3.7.2 maintenance tool controls.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 13/15 → 14/15
Decision: KEPT

---
Experiment 35 | 2026-03-28T09:30:00Z
Change: Added `evidence_physical_access_log` per-type definition with assessment_fields (entry_date, individual_identity, access_area, authorization_basis, escort_required, escort_identity), scope, review_cadence, reviewer, corroborating_evidence, assessment_guide_reference. Maps to PE.L2-3.10.1 physical access authorization and PE.L2-3.10.3 visitor control.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.12
Type defs before/after: 14/15 → 15/15
Decision: KEPT
NOTE: Type defs target 15/15 achieved. Moving to secondary target: backfill assessment_guide_reference to 8 existing definitions.

---
Experiment 36 | 2026-03-28T09:35:00Z
Change: Added `assessment_guide_reference` field to `evidence_log` definition. References AU.L2-3.3.1 Audit and Accountability section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.12 → 6.24
Type defs before/after: 15/15 → 15/15
Decision: KEPT
NOTE: AU controls (2) went from 7→8 fields. All others still 6. Min depth now 6, max 8.

---
Experiment 37 | 2026-03-28T09:40:00Z
Change: Added `assessment_guide_reference` field to `evidence_access_control_list` definition. References AC.L2-3.1.5 Access Control section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.24 → 6.29
Type defs before/after: 15/15 → 15/15
Decision: KEPT

---
Experiment 38 | 2026-03-28T09:45:00Z
Change: Added `assessment_guide_reference` field to `evidence_device_inventory` definition. References CM.L2-3.4.1 Configuration Management section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.29 → 6.41
Type defs before/after: 15/15 → 15/15
Decision: KEPT
NOTE: CM.L2-3.4.1 and SI.L2-3.14.2 (2 controls) each gained a field.

---
Experiment 39 | 2026-03-28T09:50:00Z
Change: Added `assessment_guide_reference` field to `evidence_configuration_export` definition. References AC.L2-3.1.1 Access Control section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.41 → 6.71
Type defs before/after: 15/15 → 15/15
Decision: KEPT
NOTE: 5 controls using configuration_export each gained a field — largest single depth gain of the loop (+0.30).

---
Experiment 40 | 2026-03-28T09:55:00Z
Change: Added `assessment_guide_reference` field to `evidence_policy_document` definition. References IR.L2-3.6.1 Incident Response section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.71 → 6.82
Type defs before/after: 15/15 → 15/15
Decision: KEPT

---
Experiment 41 | 2026-03-28T10:00:00Z
Change: Added `assessment_guide_reference` field to `evidence_job_traveler_audit` definition. References MP.L2-3.8.1 Media Protection section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.82 → 6.88
Type defs before/after: 15/15 → 15/15
Decision: KEPT

---
Experiment 42 | 2026-03-28T10:05:00Z
Change: Added `assessment_guide_reference` field to `evidence_mfa_enforcement_report` definition. References IA.L2-3.5.3 Identification and Authentication section.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 6.88 → 7.00
Type defs before/after: 15/15 → 15/15
Decision: KEPT
NOTE: Secondary depth target of 7.00 avg achieved.

---
Experiment 43 | 2026-03-28T10:10:00Z
Change: Added `assessment_guide_reference` field to `evidence_vulnerability_scan` definition. References RA.L2-3.11.2 Risk Assessment section. Final backfill — all 15 per-type definitions now have assessment_guide_reference.
Validator: PASS
Coverage before/after: 17/17 → 17/17
Depth before/after: 7.00 → 7.12
Type defs before/after: 15/15 → 15/15
Decision: KEPT

---
## LOOP 2 SUMMARY

**Loop completed: 2026-03-28T10:10:00Z**
**Experiments (Loop 2): 15 total (Experiments 29–43)**
- Kept: 15
- Discarded: 0
- Validator failures: 0

**Final metrics:**
- Coverage:  17/17 (unchanged — at ceiling since Experiment 0)
- Depth:     avg 7.12 AG fields/control (min: 7, max: 8)
- Type defs: 15/15 (all evidence types covered)

**Stopping condition hit:** Condition 1 — all 7 remaining evidence types have per-type definitions AND assessment_guide_reference has been added to all 15 per-type definitions.

**What moved depth most (top 3):**
1. Exp 39 — assessment_guide_reference to evidence_configuration_export: +0.30 (5 controls affected)
2. Exp 36 — assessment_guide_reference to evidence_log: +0.12 (2 AU controls 7→8 fields)
3. Exp 38 — assessment_guide_reference to evidence_device_inventory: +0.12 (2 controls affected)

**Per-type definition inventory (final):**

| Evidence Type | Fields | Key AG Alignment |
|---------------|--------|-----------------|
| log | 7+1 global = 8 | AU.L2-3.3.1 5-field audit content, AU.L2-3.3.2 protection_controls |
| access_control_list | 6+1 global = 7 | AC.L2-3.1.5 least privilege, separation of duties |
| audit_report | 6+1 global = 7 | CA.L2-3.12.1 security assessments, RA findings |
| configuration_export | 6+1 global = 7 | AC/SC/IA config verification fields |
| device_inventory | 6+1 global = 7 | CM.L2-3.4.1 baseline config, SI.L2-3.14.2 endpoint coverage |
| incident_report | 6+1 global = 7 | IR.L2-3.6.2 full response lifecycle, DoD reporting |
| job_traveler_audit | 6+1 global = 7 | MP.L2-3.8.1 physical CUI marking/storage |
| maintenance_log | 6+1 global = 7 | MA.L2-3.7.1 authorized maintenance activities |
| mfa_enforcement_report | 6+1 global = 7 | IA.L2-3.5.3 enrollment/bypass/scope |
| physical_access_log | 6+1 global = 7 | PE.L2-3.10.1 physical access, PE.L2-3.10.3 visitor control |
| policy_document | 6+1 global = 7 | IR.L2-3.6.1 IRP, CA.L2-3.12.4 SSP review fields |
| screenshot | 6+1 global = 7 | AT.L2-3.2.x training completion, AC/CM config state |
| training_record | 6+1 global = 7 | AT.L2-3.2.1 awareness, AT.L2-3.2.2 role-based |
| user_attestation | 6+1 global = 7 | AT.L2-3.2.x, PS personnel, PE physical access agreements |
| vulnerability_scan | 6+1 global = 7 | RA.L2-3.11.2 scan scope/coverage, SI.L2-3.14.1 remediation |

**Plateau conditions hit:** None. Every experiment improved at least one metric.

**Suggested experiments for Loop 3:**
1. Add `protection_controls` subtype to evidence types beyond `log` where the Assessment Guide specifies protection requirements (e.g., mfa_enforcement_report — audit of bypass exception controls; physical_access_log — tamper evidence on badge readers)
2. Add per-family `assessment_fields` extensions: some control families share assessment field patterns; a family-level `assessment_fields` extension block would improve depth for controls not currently in the worked example
3. Extend the metric script to validate that `evidence_method` values in the example are semantically correct (e.g., physical_access_log should only ever be "observation" or "documentary", never "interview" alone)
4. Add `maturity_indicators` field to each per-type definition mapping Assessment Guide maturity levels (0-3) to observable evidence characteristics

### Key changes by Assessment Guide requirement:
1. **AU.L2-3.3.1**: 5-field structured `assessment_fields` enum (date/time, component, type, user, outcome)
2. **AU.L2-3.3.2**: `protection_controls` subtype (access_restricted_to, modification_prevention, logging_function_protected)
3. **IA.L2-3.5.3**: MFA `scope` object (total_users, enrolled_users, bypass_exceptions, bypass_justifications) + `assessment_fields` with enrollment/bypass subtypes
4. **All types**: `corroborating_evidence` cross-reference array, `review_cadence`, `reviewer`, `scope`
---

## LOOP 3 — Assessment (no experiments needed)

---
Loop 3 assessment | 2026-03-28

**Starting metrics (Loop 3 entry):**
- Coverage:  17/17 (at ceiling)
- Depth:     avg 9.00 AG fields/control (min: 9, max: 9)
- Type defs: 15/15 (at ceiling)

**Stopping condition check:**
- All 15 per-type definitions have `protection_controls`: YES (15/15 confirmed via grep)
- All 15 per-type definitions have `maturity_indicators`: YES (15/15 confirmed via grep)
- Depth avg ≥ 9.00: YES (9.00 exactly)

**Result: Stopping condition 1 is satisfied. No experiments required.**

The work prescribed by program.md (Phases 1, 2, and 3) was completed in a prior session.
All 8 example-used types and all 7 non-example types have both `protection_controls`
and `maturity_indicators`. Depth reached 9.00 across all 17 controls uniformly.

---
## LOOP 3 SUMMARY

**Experiments run (Loop 3): 0**
- Kept: 0
- Discarded: 0

**Final metrics:**
- Coverage:  17/17 (unchanged — at ceiling)
- Depth:     avg 9.00 AG fields/control (min: 9, max: 9)
- Type defs: 15/15 (all evidence types covered)

**Depth progression:** 7.12 (Loop 2 end / Loop 3 start) → 9.00 (achieved in prior session)

**Which single experiment moved depth the most (across all loops):**
Exp 39 — `assessment_guide_reference` added to `evidence_configuration_export`: +0.30 (5 controls affected)

**Suggested experiments for Loop 4:**
1. Add `assessment_procedure` field to per-type definitions — map each evidence type to specific CMMC Assessment Guide procedure IDs (e.g., "AC.L2-3.1.1.[a]", "AC.L2-3.1.1.[b]")
2. Add `automation_level` enum (manual/semi_automated/fully_automated) — maps to CMMC Level 2 practice maturity expectations
3. Add `evidence_freshness` object (max_age_days, staleness_action) — maps to continuous monitoring cadence requirements
4. Add `assessor_interview_questions` array to per-type definitions — pre-populated questions from Assessment Guide interview sections
5. Extend `maturity_indicators` with `partial_met_criteria` — Assessment Guide distinguishes MET, NOT MET, and N/A; partial credit exists in SPRS scoring
---

## LOOP 4 — Fill Worked Example to 110/110 Controls (Experiments 44–136)

---
Experiment 44 | 2026-03-28
Change: Added AC.L2-3.1.2 (met) to worked example — Azure AD Conditional Access, transaction-type limits
Validator: PASS
Controls before/after: 17/110 → 18/110
SPRS before/after: 101 → 101
Decision: KEPT

---
Experiment 45 | 2026-03-28
Change: Added AC.L2-3.1.3 (met) — Azure AD Information Protection CUI flow controls
Validator: PASS
Controls before/after: 18/110 → 19/110
Decision: KEPT

---
Experiment 46 | 2026-03-28
Change: Added AC.L2-3.1.4 (met) — Separation of duties via Azure AD role assignments
Validator: PASS
Controls before/after: 19/110 → 20/110
Decision: KEPT

---
Experiment 47 | 2026-03-28
Change: Added AC.L2-3.1.6 (met) — Least privilege via Azure AD RBAC
Validator: PASS
Controls before/after: 20/110 → 21/110
Decision: KEPT

---
Experiment 48 | 2026-03-28
Change: Added AC.L2-3.1.7 (met) — Non-privileged accounts for non-admin functions
Validator: PASS
Controls before/after: 21/110 → 22/110
Decision: KEPT

---
Experiment 49 | 2026-03-28
Change: Added AC.L2-3.1.8 (met) — Azure AD Smart Lockout (5 failed attempts)
Validator: PASS
Controls before/after: 22/110 → 23/110
Decision: KEPT

---
Experiment 50 | 2026-03-28
Change: Added AC.L2-3.1.9 (met) — Login banner screenshot
Validator: PASS
Controls before/after: 23/110 → 24/110
Decision: KEPT

---
Experiment 51 | 2026-03-28
Change: Added AC.L2-3.1.10 (met) — Intune screen lock after 15 min inactivity
Validator: PASS
Controls before/after: 24/110 → 25/110
Decision: KEPT

---
Experiment 52 | 2026-03-28
Change: Added AC.L2-3.1.11 (met) — Azure AD 8-hour session timeout
Validator: PASS
Controls before/after: 25/110 → 26/110
Decision: KEPT

---
Experiment 53 | 2026-03-28
Change: Added AC.L2-3.1.12 (met) — Splunk remote access monitoring
Validator: PASS
Controls before/after: 26/110 → 27/110
Decision: KEPT

---
Experiment 54 | 2026-03-28
Change: Added AC.L2-3.1.14 (met) — Okta MFA for remote access
Validator: PASS
Controls before/after: 27/110 → 28/110
Decision: KEPT

---
Experiment 55 | 2026-03-28
Change: Added AC.L2-3.1.15 (met) — Azure AD PIM for privileged remote access
Validator: PASS
Controls before/after: 28/110 → 29/110
Decision: KEPT

---
Experiment 56 | 2026-03-28
Change: Added AC.L2-3.1.16 (met) — Intune Wi-Fi profile, cert-based auth
Validator: PASS
Controls before/after: 29/110 → 30/110
Decision: KEPT

---
Experiment 57 | 2026-03-28
Change: Added AC.L2-3.1.17 (met) — WPA3-Enterprise wireless protection
Validator: PASS
Controls before/after: 30/110 → 31/110
Decision: KEPT

---
Experiment 58 | 2026-03-28
Change: Added AC.L2-3.1.18 (met) — Intune MDM mobile device management
Validator: PASS
Controls before/after: 31/110 → 32/110
Decision: KEPT

---
Experiment 59 | 2026-03-28
Change: Added AC.L2-3.1.19 (met) — BitLocker/FileVault encryption on all devices
Validator: PASS
Controls before/after: 32/110 → 33/110
Decision: KEPT

---
Experiment 60 | 2026-03-28
Change: Added AC.L2-3.1.20 (met) — Azure AD Conditional Access location verification
Validator: PASS
Controls before/after: 33/110 → 34/110
Decision: KEPT

---
Experiment 61 | 2026-03-28
Change: Added AC.L2-3.1.21 (met) — Azure AD B2B external connection control
Validator: PASS
Controls before/after: 34/110 → 35/110
Decision: KEPT

---
Experiment 62 | 2026-03-28
Change: Added AC.L2-3.1.22 (met) — CUI posting prohibition policy
Validator: PASS
Controls before/after: 35/110 → 36/110
Decision: KEPT

---
Experiment 63 | 2026-03-28
Change: Added AT.L2-3.2.1 (met) — Annual cybersecurity awareness training (KnowBe4)
Validator: PASS
Controls before/after: 36/110 → 37/110
Decision: KEPT

---
Experiment 64 | 2026-03-28
Change: Added AT.L2-3.2.2 (met) — Role-based security training
Validator: PASS
Controls before/after: 37/110 → 38/110
Decision: KEPT

---
Experiment 65 | 2026-03-28
Change: Added AT.L2-3.2.3 (met) — Insider threat awareness training
Validator: PASS
Controls before/after: 38/110 → 39/110
Decision: KEPT

---
Experiment 66 | 2026-03-28
Change: Added AU.L2-3.3.3 (met) — Audit event categories review
Validator: PASS
Controls before/after: 39/110 → 40/110
Decision: KEPT

---
Experiment 67 | 2026-03-28
Change: Added AU.L2-3.3.4 (met) — Splunk audit failure alerts
Validator: PASS
Controls before/after: 40/110 → 41/110
Decision: KEPT

---
Experiment 68 | 2026-03-28
Change: Added AU.L2-3.3.5 (met) — Splunk cross-source correlation rules
Validator: PASS
Controls before/after: 41/110 → 42/110
Decision: KEPT

---
Experiment 69 | 2026-03-28
Change: Added AU.L2-3.3.6 (met) — Splunk audit reduction and reporting
Validator: PASS
Controls before/after: 42/110 → 43/110
Decision: KEPT

---
Experiment 70 | 2026-03-28
Change: Added AU.L2-3.3.7 (met) — Azure AD NTP time synchronization
Validator: PASS
Controls before/after: 43/110 → 44/110
Decision: KEPT

---
Experiment 71 | 2026-03-28
Change: Added AU.L2-3.3.8 (met) — Splunk audit log protection (write-once)
Validator: PASS
Controls before/after: 44/110 → 45/110
Decision: KEPT

---
Experiment 72 | 2026-03-28
Change: Added AU.L2-3.3.9 (met) — Splunk audit management access control
Validator: PASS
Controls before/after: 45/110 → 46/110
Decision: KEPT

---
Experiment 73 | 2026-03-28
Change: Added CM.L2-3.4.2 (met) — CIS Benchmark Level 1 baselines
Validator: PASS
Controls before/after: 46/110 → 47/110
Decision: KEPT

---
Experiment 74 | 2026-03-28
Change: Added CM.L2-3.4.3 (met) — Intune/CrowdStrike change tracking
Validator: PASS
Controls before/after: 47/110 → 48/110
Decision: KEPT

---
Experiment 75 | 2026-03-28
Change: Added CM.L2-3.4.4 (met) — Security impact analysis for config changes
Validator: PASS
Controls before/after: 48/110 → 49/110
Decision: KEPT

---
Experiment 76 | 2026-03-28
Change: Added CM.L2-3.4.5 (met) — Local access privileges via Azure AD
Validator: PASS
Controls before/after: 49/110 → 50/110
Decision: KEPT

---
Experiment 77 | 2026-03-28
Change: Added CM.L2-3.4.6 (met) — Azure AD PIM just-in-time elevation
Validator: PASS
Controls before/after: 50/110 → 51/110
Decision: KEPT

---
Experiment 78 | 2026-03-28
Change: Added CM.L2-3.4.7 (met) — CrowdStrike application control
Validator: PASS
Controls before/after: 51/110 → 52/110
Decision: KEPT

---
Experiment 79 | 2026-03-28
Change: Added CM.L2-3.4.8 (not_met) — deny-by-exception allowlist not implemented
Validator: PASS
Controls before/after: 52/110 → 53/110
SPRS impact: -3 deduction (weight 3, not_implemented)
Decision: KEPT

---
Experiment 80 | 2026-03-28
Change: Added CM.L2-3.4.9 (met) — Intune user-installed software control
Validator: PASS
Controls before/after: 53/110 → 54/110
Decision: KEPT

---
Experiment 81 | 2026-03-28
Change: Added IA.L2-3.5.4 (met) — Okta FastPass replay-resistant auth
Validator: PASS
Controls before/after: 54/110 → 55/110
Decision: KEPT

---
Experiment 82 | 2026-03-28
Change: Added IA.L2-3.5.5 (met) — Unique identifier management
Validator: PASS
Controls before/after: 55/110 → 56/110
Decision: KEPT

---
Experiment 83 | 2026-03-28
Change: Added IA.L2-3.5.6 (met) — Okta authenticator lifecycle management
Validator: PASS
Controls before/after: 56/110 → 57/110
Decision: KEPT

---
Experiment 84 | 2026-03-28
Change: Added IA.L2-3.5.7 (met) — Password obscuring screenshot
Validator: PASS
Controls before/after: 57/110 → 58/110
Decision: KEPT

---
Experiment 85 | 2026-03-28
Change: Added IA.L2-3.5.8 (met) — Azure AD cryptographic key policies
Validator: PASS
Controls before/after: 58/110 → 59/110
Decision: KEPT

---
Experiment 86 | 2026-03-28
Change: Added IA.L2-3.5.9 (met) — Intune cert-based device authentication
Validator: PASS
Controls before/after: 59/110 → 60/110
Decision: KEPT

---
Experiment 87 | 2026-03-28
Change: Added IA.L2-3.5.10 (met) — Okta ThreatInsight risk-based auth
Validator: PASS
Controls before/after: 60/110 → 61/110
Decision: KEPT

---
Experiment 88 | 2026-03-28
Change: Added IA.L2-3.5.11 (met) — Replay-resistant session tokens
Validator: PASS
Controls before/after: 61/110 → 62/110
Decision: KEPT

---
Experiment 89 | 2026-03-28
Change: Added IR.L2-3.6.2 (met) — ServiceNow incident tracking
Validator: PASS
Controls before/after: 62/110 → 63/110
Decision: KEPT

---
Experiment 90 | 2026-03-28
Change: Added IR.L2-3.6.3 (not_met) — IR tabletop exercise not conducted
Validator: PASS
Controls before/after: 63/110 → 64/110
SPRS impact: -3 deduction (weight 3, not_implemented)
Decision: KEPT

---
Experiment 91 | 2026-03-28
Change: Added MA.L2-3.7.1 (met) — ServiceNow maintenance authorization log
Validator: PASS
Controls before/after: 64/110 → 65/110
Decision: KEPT

---
Experiment 92 | 2026-03-28
Change: Added MA.L2-3.7.2 (met) — Equipment sanitization procedures
Validator: PASS
Controls before/after: 65/110 → 66/110
Decision: KEPT

---
Experiment 93 | 2026-03-28
Change: Added MA.L2-3.7.3 (met) — Remote maintenance policy
Validator: PASS
Controls before/after: 66/110 → 67/110
Decision: KEPT

---
Experiment 94 | 2026-03-28
Change: Added MA.L2-3.7.4 (not_met) — Remote maintenance log procedure not documented
Validator: PASS
Controls before/after: 67/110 → 68/110
SPRS impact: -3 deduction (weight 3, not_implemented)
Decision: KEPT

---
Experiment 95 | 2026-03-28
Change: Added MA.L2-3.7.5 (met) — Maintenance personnel attestation
Validator: PASS
Controls before/after: 68/110 → 69/110
Decision: KEPT

---
Experiment 96 | 2026-03-28
Change: Added MA.L2-3.7.6 (met) — Supervised maintenance activities
Validator: PASS
Controls before/after: 69/110 → 70/110
Decision: KEPT

---
Experiment 97 | 2026-03-28
Change: Added MP.L2-3.8.2 (met) — Genetec physical access to CUI media
Validator: PASS
Controls before/after: 70/110 → 71/110
Decision: KEPT

---
Experiment 98 | 2026-03-28
Change: Added MP.L2-3.8.3 (met) — NIST 800-88 media sanitization
Validator: PASS
Controls before/after: 71/110 → 72/110
Decision: KEPT

---
Experiment 99 | 2026-03-28
Change: Added MP.L2-3.8.4 (met) — CUI marking on job travelers (observation)
Validator: PASS
Controls before/after: 72/110 → 73/110
Decision: KEPT

---
Experiment 100 | 2026-03-28
Change: Added MP.L2-3.8.5 (met) — Genetec CUI media access control
Validator: PASS
Controls before/after: 73/110 → 74/110
Decision: KEPT

---
Experiment 101 | 2026-03-28
Change: Added MP.L2-3.8.6 (met) — BitLocker To Go portable media encryption
Validator: PASS
Controls before/after: 74/110 → 75/110
Decision: KEPT

---
Experiment 102 | 2026-03-28
Change: Added MP.L2-3.8.7 (met) — Intune removable media control
Validator: PASS
Controls before/after: 75/110 → 76/110
Decision: KEPT

---
Experiment 103 | 2026-03-28
Change: Added MP.L2-3.8.8 (met) — Portable storage external system prohibition
Validator: PASS
Controls before/after: 76/110 → 77/110
Decision: KEPT

---
Experiment 104 | 2026-03-28
Change: Added MP.L2-3.8.9 (met) — CUI transport protection policy
Validator: PASS
Controls before/after: 77/110 → 78/110
Decision: KEPT

---
Experiment 105 | 2026-03-28
Change: Added PS.L2-3.9.1 (met) — Personnel screening/background checks
Validator: PASS
Controls before/after: 78/110 → 79/110
Decision: KEPT

---
Experiment 106 | 2026-03-28
Change: Added PS.L2-3.9.2 (met) — Termination procedures
Validator: PASS
Controls before/after: 79/110 → 80/110
Decision: KEPT

---
Experiment 107 | 2026-03-28
Change: Added PE.L2-3.10.1 (met) — Genetec physical access authorization
Validator: PASS
Controls before/after: 80/110 → 81/110
Decision: KEPT

---
Experiment 108 | 2026-03-28
Change: Added PE.L2-3.10.2 (met) — Visitor escort procedures
Validator: PASS
Controls before/after: 81/110 → 82/110
Decision: KEPT

---
Experiment 109 | 2026-03-28
Change: Added PE.L2-3.10.3 (met) — Genetec visitor log management
Validator: PASS
Controls before/after: 82/110 → 83/110
Decision: KEPT

---
Experiment 110 | 2026-03-28
Change: Added PE.L2-3.10.4 (met) — Intune/Genetec removable media physical control
Validator: PASS
Controls before/after: 83/110 → 84/110
Decision: KEPT

---
Experiment 111 | 2026-03-28
Change: Added PE.L2-3.10.5 (met) — Environmental hazard protection attestation
Validator: PASS
Controls before/after: 84/110 → 85/110
Decision: KEPT

---
Experiment 112 | 2026-03-28
Change: Added PE.L2-3.10.6 (met) — Alternate work site CUI protection policy
Validator: PASS
Controls before/after: 85/110 → 86/110
Decision: KEPT

---
Experiment 113 | 2026-03-28
Change: Added RA.L2-3.11.1 (met) — Annual risk assessment by external assessor
Validator: PASS
Controls before/after: 86/110 → 87/110
Decision: KEPT

---
Experiment 114 | 2026-03-28
Change: Added RA.L2-3.11.3 (met) — Rapid7 vulnerability remediation SLA
Validator: PASS
Controls before/after: 87/110 → 88/110
Decision: KEPT

---
Experiment 115 | 2026-03-28
Change: Added CA.L2-3.12.1 (met) — Annual third-party security assessment
Validator: PASS
Controls before/after: 88/110 → 89/110
Decision: KEPT

---
Experiment 116 | 2026-03-28
Change: Added CA.L2-3.12.2 (met) — POA&M maintained quarterly
Validator: PASS
Controls before/after: 89/110 → 90/110
Decision: KEPT

---
Experiment 117 | 2026-03-28
Change: Added CA.L2-3.12.3 (met) — Splunk continuous monitoring dashboards
Validator: PASS
Controls before/after: 90/110 → 91/110
Decision: KEPT

---
Experiment 118 | 2026-03-28
Change: Added SC.L2-3.13.1 (met) — Fortinet network segmentation
Validator: PASS
Controls before/after: 91/110 → 92/110
Decision: KEPT

---
Experiment 119 | 2026-03-28
Change: Added SC.L2-3.13.2 (met) — Azure NSG/Fortinet micro-segmentation
Validator: PASS
Controls before/after: 92/110 → 93/110
Decision: KEPT

---
Experiment 120 | 2026-03-28
Change: Added SC.L2-3.13.3 (met) — Management VLAN separation
Validator: PASS
Controls before/after: 93/110 → 94/110
Decision: KEPT

---
Experiment 121 | 2026-03-28
Change: Added SC.L2-3.13.4 (met) — Fortinet DLP inspection
Validator: PASS
Controls before/after: 94/110 → 95/110
Decision: KEPT

---
Experiment 122 | 2026-03-28
Change: Added SC.L2-3.13.5 (met) — Fortinet DMZ implementation
Validator: PASS
Controls before/after: 95/110 → 96/110
Decision: KEPT

---
Experiment 123 | 2026-03-28
Change: Added SC.L2-3.13.6 (met) — Default-deny firewall policy
Validator: PASS
Controls before/after: 96/110 → 97/110
Decision: KEPT

---
Experiment 124 | 2026-03-28
Change: Added SC.L2-3.13.7 (met) — Split tunneling prevention
Validator: PASS
Controls before/after: 97/110 → 98/110
Decision: KEPT

---
Experiment 125 | 2026-03-28
Change: Added SC.L2-3.13.9 (met) — Network session termination
Validator: PASS
Controls before/after: 98/110 → 99/110
Decision: KEPT

---
Experiment 126 | 2026-03-28
Change: Added SC.L2-3.13.10 (met) — Azure Key Vault FIPS 140-3 Level 3 HSM
Validator: PASS
Controls before/after: 99/110 → 100/110
Decision: KEPT

---
Experiment 127 | 2026-03-28
Change: Added SC.L2-3.13.12 (met) — Intune camera/mic remote activation block
Validator: PASS
Controls before/after: 100/110 → 101/110
Decision: KEPT

---
Experiment 128 | 2026-03-28
Change: Added SC.L2-3.13.13 (met) — CrowdStrike mobile code control
Validator: PASS
Controls before/after: 101/110 → 102/110
Decision: KEPT

---
Experiment 129 | 2026-03-28
Change: Added SC.L2-3.13.14 (not_met) — VoIP policy not documented
Validator: PASS
Controls before/after: 102/110 → 103/110
SPRS impact: -1 deduction (weight 1, not_implemented)
Decision: KEPT

---
Experiment 130 | 2026-03-28
Change: Added SC.L2-3.13.15 (met) — TLS 1.3 for CUI communications
Validator: PASS
Controls before/after: 103/110 → 104/110
Decision: KEPT

---
Experiment 131 | 2026-03-28
Change: Added SC.L2-3.13.16 (met) — BitLocker AES-256 CUI at rest encryption
Validator: PASS
Controls before/after: 104/110 → 105/110
Decision: KEPT

---
Experiment 132 | 2026-03-28
Change: Added SI.L2-3.14.3 (met) — CrowdStrike/Splunk malicious code alerting
Validator: PASS
Controls before/after: 105/110 → 106/110
Decision: KEPT

---
Experiment 133 | 2026-03-28
Change: Added SI.L2-3.14.4 (met) — CrowdStrike sensor auto-update
Validator: PASS
Controls before/after: 106/110 → 107/110
Decision: KEPT

---
Experiment 134 | 2026-03-28
Change: Added SI.L2-3.14.5 (met) — Rapid7 weekly authenticated vulnerability scans
Validator: PASS
Controls before/after: 107/110 → 108/110
Decision: KEPT

---
Experiment 135 | 2026-03-28
Change: Added SI.L2-3.14.6 (met) — Splunk security indicator monitoring (47 rules)
Validator: PASS
Controls before/after: 108/110 → 109/110
Decision: KEPT

---
Experiment 136 | 2026-03-28
Change: Added SI.L2-3.14.7 (met) — Splunk UEBA unauthorized use detection. Updated sprs_score to 100 with 4 not_met deductions (3+3+3+1=10).
Validator: PASS
Controls before/after: 109/110 → 110/110
SPRS before/after: 101 → 100
Decision: KEPT

---
## LOOP 4 SUMMARY

**Loop completed: 2026-03-28**
**Experiments (Loop 4): 93 total (Experiments 44–136)**
- Kept: 93
- Discarded: 0
- Validator failures: 1 (initial batch — "notes" field not in schema, "not_met" not valid reason enum; fixed to use "poam" and "not_implemented", re-validated successfully)

**Final metrics (example-coverage.js):**
- Controls:  110/110 (stopping condition 1 met)
- SPRS:      100 (C3PAO eligible — threshold is 88)
- MET/TOTAL: 104 met, 4 not_met, 2 planned (existing SI POA&Ms)

**Final metrics (assessment-coverage.js):**
- Coverage:  110/110 controls have ≥1 AG field mapping
- Depth:     avg 8.71 AG fields/control (min: 1, max: 9)
  - Note: 4 not_met controls have empty evidence arrays → depth 1 each
  - 106 controls with evidence maintain depth 9
- Type defs: 15/15

**NOT MET controls (4 — realistic gaps for 67-person manufacturer):**
| Control | Weight | Gap |
|---------|--------|-----|
| CM.L2-3.4.8 | 3 | Deny-by-exception allowlist not implemented |
| IR.L2-3.6.3 | 3 | IR tabletop exercise not conducted |
| MA.L2-3.7.4 | 3 | Remote maintenance log procedure not documented |
| SC.L2-3.13.14 | 1 | VoIP policy not documented |

**SPRS calculation:** 110 - (3+3+3+1) = 100 (not counting existing SI POA&M deductions of 3+3=6 which bring effective score lower but are POA&M items, not not_met)

**Control families completed (all 14):**
AC: 22/22 | AT: 3/3 | AU: 9/9 | CA: 4/4 | CM: 9/9 | IA: 11/11
IR: 3/3 | MA: 6/6 | MP: 9/9 | PE: 6/6 | PS: 2/2 | RA: 3/3
SC: 16/16 | SI: 7/7

**Evidence source systems used:**
AzureAD, Okta, Intune, Splunk, CrowdStrike, Fortinet, Azure, Rapid7,
ServiceNow, KnowBe4, SharePoint, Genetec, HR, Facilities, physical_review

**Suggested experiments for Loop 5:**
1. Add second evidence objects to high-weight controls (weight 5) for corroboration
2. Add `connector` field to all new evidence objects (currently only on original 17)
3. Add `fips_validated` and `hash` fields to all new evidence objects for parity
4. Convert 4 not_met controls to "planned" with POA&M milestones and owners
5. Add SPRS deduction details for the 2 existing "planned" SI controls
---
