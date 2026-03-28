# CTA Schema Iteration — program.md
## Owner: Dalaun Finch / Theme Fr
## Last updated: 2026-03-28 (Loop 5)

## CONTEXT — WHERE THINGS STAND
Loop 3: schema complete — 15/15 evidence types, depth 9.00, 17/17 AG coverage
Loop 4: example complete — 110/110 controls, SPRS 100
Loop 5: fix 5 schema gaps discovered during Cowork simulation

## GOAL FOR THIS LOOP
Address 5 schema gaps discovered by simulation. These are not cosmetic — two are
correctness bugs that affect SPRS calculation accuracy.

## THE FILES YOU MAY EDIT THIS LOOP
  spec/cta-v0.1.schema.json
  examples/sprs-output-example.json

Edit one file per experiment. Log which file was changed.

## GAP 1 — INVARIANT WEIGHT CORRECTION (correctness bug — fix first)
CLAUDE.md documents the shared_account_violation invariant as firing 5+3+3=11 points.
The actual registry weights are AC.L2-3.1.1=5, IA.L2-3.5.1=5, AU.L2-3.3.2=5 → 15 points.

Fix: Update the shared_account_violation description in spec/cta-v0.1.schema.json
to reflect the correct weight (15 points, not 11).

Find the shared_account_violation property in the schema definitions.
Update its description to state: "When detected, maturity auto-resets to 0 for
AC.L2-3.1.1 (weight 5), IA.L2-3.5.1 (weight 5), AU.L2-3.3.2 (weight 5).
Combined SPRS impact: 15 points. Breach threshold from SPRS 100: drops to 85,
below C3PAO eligibility threshold of 88."

Also update the sprs_weight in the worked example for IA.L2-3.5.1 and AU.L2-3.3.2
if they show weight 3 instead of 5. Check examples/sprs-output-example.json.

## GAP 2 — evidence_method REQUIRED ON ALL EVIDENCE OBJECTS (correctness bug)
Currently evidence_method is defined but not required in the evidence_object definition.
Simulation found controls where evidence_method is missing — assessors cannot determine
examination method (documentary vs observation vs interview).

Fix: In spec/cta-v0.1.schema.json, add "evidence_method" to the required array
of the evidence_object definition.

Verify validator still passes after this change against the worked example.
If any evidence objects in the example are missing evidence_method, add it
(default: "documentary" for all non-physical-review evidence).

## GAP 3 — poa_and_m CONDITIONALLY REQUIRED WHEN status = not_met
Currently NOT MET controls have notes but no structured POA&M block.
Assessors expect a structured remediation plan with target date and owner.

Fix: Add a poa_and_m object definition to the schema with these properties:
  target_close_date: string (format: date)
  responsible_owner: string
  remediation_steps: array of strings
  estimated_effort_weeks: number

This should be a definition (evidence_poa_and_m or similar), NOT required globally —
it is an optional addition to control objects for now. Marking it required conditionally
on status=not_met requires if/then/else which adds complexity. Add as optional first.

Add poa_and_m to each of the 4 NOT MET controls in the worked example with realistic data:
  CM.L2-3.4.8:  target: 2026-05-15, owner: "IT Director", effort: 3
  IR.L2-3.6.3:  target: 2026-04-30, owner: "IT Director", effort: 1
  MA.L2-3.7.4:  target: 2026-04-15, owner: "IT Director", effort: 1
  SC.L2-3.13.14: target: 2026-04-08, owner: "Compliance Lead", effort: 0.5

## GAP 4 — coverage_percentage FOR PLANNED CONTROLS
Two SI controls in the example have status that indicates partial/planned coverage
(CNC machine coverage gap — CNC endpoints not under CrowdStrike management).
The current schema has no way to express partial coverage numerically.

Fix: Add coverage_percentage property (type: number, minimum: 0, maximum: 100)
to the evidence_object definition. This expresses what percentage of in-scope
systems are covered by this evidence.

Example use in the worked example for the CNC controls:
  coverage_percentage: 78  (meaning: 52 of 67 endpoints covered, CNC machines excluded)

Add coverage_percentage to the SI.L2-3.14.1 and SI.L2-3.14.2 evidence objects
in the worked example to document the CNC gap explicitly.

## GAP 5 — assessment_blocker FLAG
Some findings block C3PAO assessment eligibility without affecting SPRS score
(e.g., missing SSP = assessment blocker even if all controls are MET).
The schema has no way to express this distinction.

Fix: Add assessment_blocker boolean property to the control object definition
in spec/cta-v0.1.schema.json with description:
"True if this control's NOT MET status blocks C3PAO assessment eligibility
regardless of SPRS score. Controls with documented DoD assessment prerequisite
requirements (e.g., CA.L2-3.12.4 SSP) should set this flag when not_met."

Do not add this field to any MET controls in the example — it is only relevant
when status = not_met and the gap independently blocks assessment.

## WORKFLOW PER EXPERIMENT
1. Run baseline: node validate.js && node assessment-coverage.js | head -4 && node example-coverage.js | head -4
2. Make ONE targeted change to ONE file
3. Run validator: node validate.js
4. Run metrics: node assessment-coverage.js | head -4 && node example-coverage.js | head -4
5. If validator PASSES → keep, log it
6. If validator FAILS → git checkout the edited file, log failure
7. Repeat

## WHAT COUNTS AS IMPROVEMENT
- Validator passes after a schema correctness fix
- A new field appears in schema definitions or example that addresses a documented gap
- A weight or description correction applied

## STOPPING CONDITION
Stop when EITHER:
1. All 5 gaps addressed (may take 5-10 experiments depending on complexity)
2. 5 consecutive validator failures with no progress

## LOG FORMAT
Append to experiment-log.md:
---
Experiment N | [timestamp]
Gap addressed: [1-5]
File edited: [schema or example]
Change: [what you changed]
Validator: PASS/FAIL
Decision: KEPT / DISCARDED
---

Write a LOOP 5 SUMMARY at the end of experiment-log.md when done.
