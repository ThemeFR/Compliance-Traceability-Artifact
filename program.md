# CTA Schema Iteration — program.md
## Owner: Dalaun Finch / Theme Fr
## Last updated: 2026-03-28 (Loop 4)

## CONTEXT — WHERE THE EXAMPLE STANDS
The schema is complete (15/15 evidence types, 9.00 depth avg, 17/17 AG coverage).
The worked example covers only 17 of 110 NIST SP 800-171 Rev 2 controls.
Loop 4 fills the remaining 93 controls in the worked example.

## GOAL FOR THIS LOOP
Add all 93 missing controls to examples/sprs-output-example.json.
When complete: 110/110 controls in the example, SPRS ≥ 88 (C3PAO eligible).

## THE ONE FILE YOU EDIT
examples/sprs-output-example.json

Do not edit spec/cta-v0.1.schema.json or any other file.

## THE COMPANY — MARCUS WEBB / WEBB PRECISION MANUFACTURING
67-person precision machining company. 3 active DoD contracts ($4.2M).
Tech stack: Okta (identity/SSO), Azure AD, CrowdStrike (EDR), Splunk (SIEM), Intune (MDM).
Physical shop floor with job travelers (physical CUI documents that travel with parts).
This company is targeting SPRS ≥ 88 to qualify for C3PAO assessment.

## WORKFLOW PER EXPERIMENT
1. Run baseline metric: node example-coverage.js
2. Add ONE missing control to the controls array in examples/sprs-output-example.json
3. Run validator: node validate.js
4. Run metric again: node example-coverage.js
5. If validator PASSES and controls count increased → keep, log it
6. If validator FAILS → git checkout examples/sprs-output-example.json, log failure
7. Repeat

## WHAT COUNTS AS IMPROVEMENT
PRIMARY metric increases: controls in example goes from N to N+1.

## EVIDENCE TEMPLATES BY CONTROL FAMILY
Each control needs: control_id, nist_id, family, status, maturity, sprs_weight, evidence array.
Evidence objects need: evidence_id (unique UUID v4 format), type, source, collected_at, detail, evidence_method.
Use collected_at: "2026-03-25T08:00:00Z" for all new evidence (consistent with existing controls).
Use unique UUIDs — increment the last segment for each evidence object.
For NOT MET controls: evidence array is empty [], maturity: 0, status: "not_met", add "notes" field explaining the gap.

### AC — Access Control (19 missing controls)
Source systems: Azure AD, Okta, Intune
Evidence types: configuration_export, access_control_list, screenshot, mfa_enforcement_report, log, policy_document

AC.L2-3.1.2  (weight 5)  status:met  type:configuration_export  source:AzureAD
  detail: "Azure AD Conditional Access policies limit system access by transaction type. CUI systems restricted to manufacturing network segment only. Guest accounts blocked from CUI resources."

AC.L2-3.1.3  (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "Azure AD Information Protection policies enforce CUI flow controls. CUI labeled data blocked from external sharing. DLP policies active on all CUI-tagged documents."

AC.L2-3.1.4  (weight 3)  status:met  type:access_control_list  source:AzureAD
  detail: "Separation of duties enforced via Azure AD role assignments. No single account holds both administrator and auditor roles. Role assignments reviewed quarterly."

AC.L2-3.1.6  (weight 3)  status:met  type:access_control_list  source:AzureAD
  detail: "Least privilege enforced via Azure AD RBAC. Users assigned minimum permissions for job function. Privileged access requires separate admin account."

AC.L2-3.1.7  (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "Non-privileged accounts used for all non-administrative functions. Admin accounts not used for email or web browsing. Enforced via Conditional Access policy."

AC.L2-3.1.8  (weight 1)  status:met  type:configuration_export  source:AzureAD
  detail: "Azure AD Smart Lockout configured: 5 failed attempts triggers 30-second lockout, escalating. Lockout events logged to Splunk. Policy applied to all 67 accounts."

AC.L2-3.1.9  (weight 1)  status:met  type:screenshot  source:AzureAD
  detail: "Login banner displaying privacy and security notice configured on all CUI-accessible systems. Banner text approved by legal. Screenshot captured from manufacturing workstation login."

AC.L2-3.1.10 (weight 1)  status:met  type:configuration_export  source:Intune
  detail: "Intune device compliance policy enforces screen lock after 15 minutes of inactivity. Policy applied to all 67 managed devices. Compliance state: 100%."

AC.L2-3.1.11 (weight 1)  status:met  type:configuration_export  source:AzureAD
  detail: "Azure AD session timeout configured: 8-hour maximum session for CUI applications. Idle sessions terminated after 30 minutes. Token lifetime policy applied."

AC.L2-3.1.12 (weight 3)  status:met  type:log  source:Splunk
  detail: "Splunk monitors all remote access sessions. VPN connection logs, Azure AD sign-in logs, and CrowdStrike network telemetry correlated. Remote session anomaly alerts configured."

AC.L2-3.1.14 (weight 3)  status:met  type:mfa_enforcement_report  source:Okta
  detail: "Okta MFA required for all remote access connections. VPN requires Okta Verify push authentication. 100% of remote workers (12 of 67) enrolled. Zero bypass exceptions for remote access."

AC.L2-3.1.15 (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "Privileged commands over remote access prohibited. Azure AD Privileged Identity Management requires in-person or jump-host access for admin functions. Enforced via Conditional Access."

AC.L2-3.1.16 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Wireless access authorized via Intune Wi-Fi profile. Corporate SSID requires certificate-based authentication. Guest SSID isolated from CUI network. Rogue AP detection active."

AC.L2-3.1.17 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Wireless access protected via WPA3-Enterprise with 802.1X authentication. Certificates managed via Intune SCEP profile. Encryption verified on all access points."

AC.L2-3.1.18 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Mobile device connections managed via Intune MDM. All 12 mobile devices enrolled. CUI access requires device compliance. Non-compliant devices blocked via Conditional Access."

AC.L2-3.1.19 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Intune device encryption policy enforces BitLocker on Windows, FileVault on Mac. All CUI stored on managed devices encrypted at rest. Encryption compliance: 100% of 67 devices."

AC.L2-3.1.20 (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "Remote access connections verified via Azure AD Conditional Access. Named locations defined. Connections from unknown locations require step-up MFA. Verified connections logged to Splunk."

AC.L2-3.1.21 (weight 1)  status:met  type:configuration_export  source:AzureAD
  detail: "External system connections authorized via Azure AD B2B policy. No unauthorized third-party connections permitted to CUI systems. Connection inventory reviewed quarterly."

AC.L2-3.1.22 (weight 3)  status:met  type:policy_document  source:SharePoint
  detail: "CUI handling policy prohibits posting CUI to publicly accessible systems. Policy distributed to all 67 employees. Acknowledgment recorded in training system. Last reviewed: March 2026."

### AT — Awareness & Training (3 missing controls)
Evidence type: training_record
Source: KnowBe4 (training platform)

AT.L2-3.2.1 (weight 1)  status:met  type:training_record  source:KnowBe4
  detail: "Annual cybersecurity awareness training completed by all 67 employees. CMMC-specific module included. Completion rate: 100%. Last training cycle: January 2026. Records retained 3 years."

AT.L2-3.2.2 (weight 1)  status:met  type:training_record  source:KnowBe4
  detail: "Role-based security training completed by all privileged users (8 IT/admin staff) and CUI handlers (24 machinists). Completion rate: 100%. Training customized by job function."

AT.L2-3.2.3 (weight 1)  status:met  type:training_record  source:KnowBe4
  detail: "Insider threat awareness training completed by all 67 employees. Training includes recognition of behavioral indicators, reporting procedures, and consequences. Completion: 100%."

### AU — Audit & Accountability (7 missing controls)
Evidence type: log
Source: Splunk

AU.L2-3.3.3 (weight 1)  status:met  type:log  source:Splunk
  detail: "Audit event categories reviewed and updated annually. Current audit scope includes: authentication, privilege use, file access, network connections, system changes. Last review: January 2026."

AU.L2-3.3.4 (weight 3)  status:met  type:log  source:Splunk
  detail: "Splunk alerts configured for audit system failures: disk full, logging service stopped, audit policy change. Alerts route to IT on-call via PagerDuty. Test alert run monthly."

AU.L2-3.3.5 (weight 3)  status:met  type:log  source:Splunk
  detail: "Splunk correlation rules active across all 67 endpoints and 4 servers. CrowdStrike, Azure AD, Okta, and Intune telemetry correlated. Cross-source alert: 12 active correlation rules."

AU.L2-3.3.6 (weight 1)  status:met  type:log  source:Splunk
  detail: "Splunk audit reduction and report generation active. Raw logs retained 90 days hot, 1 year cold. Summary reports generated weekly for IT review. Log volume: ~2GB/day."

AU.L2-3.3.7 (weight 1)  status:met  type:configuration_export  source:AzureAD
  detail: "All systems synchronized to Azure AD time service (NTP). Time synchronization verified across all 67 endpoints. Clock drift tolerance: ±1 second. Compliance monitored via Intune."

AU.L2-3.3.8 (weight 3)  status:met  type:log  source:Splunk
  detail: "Splunk index access restricted to IT admin role (3 users). Audit logs write-once via Splunk SmartStore. Log deletion requires dual approval. Integrity hash verified nightly."

AU.L2-3.3.9 (weight 1)  status:met  type:access_control_list  source:Splunk
  detail: "Splunk admin access limited to 3 IT staff. Audit management functions separated from general system access. Role assignments reviewed quarterly. Last review: January 2026."

### CM — Configuration Management (7 missing controls)
Evidence types: configuration_export, device_inventory
Source: Intune, CrowdStrike

CM.L2-3.4.2 (weight 5)  status:met  type:configuration_export  source:Intune
  detail: "Baseline configurations established for all device types: Windows workstations (52), Mac laptops (8), servers (4), mobile devices (12). CIS Benchmark Level 1 applied. Deviations documented."

CM.L2-3.4.3 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Configuration change tracking active via Intune compliance reports and CrowdStrike device policy audit. Changes require change ticket in ServiceNow. Emergency changes reviewed within 24 hours."

CM.L2-3.4.4 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Security impact analysis performed for all configuration changes. Change review board (3 members) evaluates CUI-adjacent changes. Analysis documented in change ticket before implementation."

CM.L2-3.4.5 (weight 3)  status:met  type:access_control_list  source:AzureAD
  detail: "Local access privileges defined and documented for all 67 systems. Local admin access restricted to IT staff (3 accounts). Standard users have no local admin. Enforced via Intune."

CM.L2-3.4.6 (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "Privileged access management via Azure AD PIM. Admin roles require just-in-time elevation. Elevation requests logged. Maximum elevation duration: 8 hours. All 8 admin accounts enrolled."

CM.L2-3.4.7 (weight 3)  status:met  type:configuration_export  source:CrowdStrike
  detail: "CrowdStrike application control active. Unsigned executables blocked. Software installation requires IT approval. Allowlist of 847 approved applications maintained. Non-approved software blocked on all 67 endpoints."

CM.L2-3.4.8 (weight 3)  status:not_met  type:configuration_export  source:Intune
  notes: "Deny-by-exception (allowlisting) not fully implemented. Current state: CrowdStrike blocks known-bad software but does not enforce a formal application allowlist. POA&M item: implement Intune-managed allowlist by Q3 2026."

CM.L2-3.4.9 (weight 1)  status:met  type:configuration_export  source:Intune
  detail: "User-installed software controlled via Intune app protection policy. Standard users cannot install software without IT approval. IT approval workflow documented. Compliance verified monthly."

### IA — Identification & Authentication (8 missing controls)
Evidence types: mfa_enforcement_report, configuration_export, screenshot
Source: Okta, Azure AD

IA.L2-3.5.4 (weight 3)  status:met  type:mfa_enforcement_report  source:Okta
  detail: "Okta FastPass implements replay-resistant authentication via cryptographic challenge-response. Phishing-resistant MFA deployed to all 67 accounts. FIDO2 passkeys available for IT staff."

IA.L2-3.5.5 (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "Identifier management policy: unique identifiers required for all 67 users and 76 devices. Shared accounts prohibited (invariant: not detected). Identifiers deprovisioned within 24 hours of termination."

IA.L2-3.5.6 (weight 3)  status:met  type:mfa_enforcement_report  source:Okta
  detail: "Authenticator management via Okta lifecycle management. Passwords minimum 14 characters, no reuse of last 12, 90-day rotation for privileged accounts. Compromised credential detection active."

IA.L2-3.5.7 (weight 3)  status:met  type:screenshot  source:Okta
  detail: "Password entry fields obscure authenticator feedback on all CUI-accessible systems. Screenshot captured from Okta login page and Azure AD portal. Implemented by default in all web apps."

IA.L2-3.5.8 (weight 1)  status:met  type:configuration_export  source:AzureAD
  detail: "Cryptographic key and credential policies enforced via Azure AD. RSA-2048 minimum for certificates. FIPS 140-3 validated modules used for all cryptographic operations via Azure KMS."

IA.L2-3.5.9 (weight 1)  status:met  type:configuration_export  source:Intune
  detail: "Device authentication via Intune certificate-based enrollment. All 76 managed devices have unique device certificates. Certificates rotated annually. Non-enrolled devices blocked from CUI network."

IA.L2-3.5.10 (weight 3)  status:met  type:mfa_enforcement_report  source:Okta
  detail: "Okta ThreatInsight active — threat-aware authentication risk scoring. High-risk sign-ins require step-up MFA. Risk signals from CrowdStrike and Azure AD Identity Protection correlated."

IA.L2-3.5.11 (weight 1)  status:met  type:mfa_enforcement_report  source:Okta
  detail: "Replay-resistant authentication enforced via Okta session tokens with one-time-use nonces. Session tokens expire after 8 hours. Token replay detection active in Splunk."

### IR — Incident Response (2 missing controls)
Evidence types: incident_report, audit_report
Source: ServiceNow, KnowBe4

IR.L2-3.6.2 (weight 3)  status:met  type:incident_report  source:ServiceNow
  detail: "Incident tracking active in ServiceNow. All security incidents documented: type, timeline, affected systems, containment steps, root cause, remediation. 3 incidents tracked in past 12 months, all closed."

IR.L2-3.6.3 (weight 3)  status:not_met
  notes: "Incident response capability testing not yet conducted. No tabletop exercise performed in the past 12 months. POA&M item: conduct IR tabletop exercise by Q2 2026. IR plan exists (CA.L2-3.12.4) but untested."

### MA — Maintenance (6 missing controls)
Evidence type: maintenance_log
Source: ServiceNow

MA.L2-3.7.1 (weight 1)  status:met  type:maintenance_log  source:ServiceNow
  detail: "Authorized maintenance log maintained in ServiceNow. All maintenance activities require IT authorization. Maintenance personnel verified against authorized list before access granted."

MA.L2-3.7.2 (weight 3)  status:met  type:maintenance_log  source:ServiceNow
  detail: "Equipment sanitization procedures followed before maintenance. CUI media removed or encrypted before off-site maintenance. Sanitization documented in ServiceNow maintenance ticket."

MA.L2-3.7.3 (weight 3)  status:met  type:policy_document  source:SharePoint
  detail: "Remote maintenance policy restricts remote access to authorized IT personnel only. Remote sessions require MFA, VPN, and are logged to Splunk. Remote maintenance approved per change ticket."

MA.L2-3.7.4 (weight 3)  status:not_met
  notes: "Remote maintenance session logs exist in Splunk but are not formally reviewed or documented per policy. No written procedure for documenting remote maintenance activities. POA&M: implement remote maintenance log procedure by Q3 2026."

MA.L2-3.7.5 (weight 3)  status:met  type:user_attestation  source:HR
  detail: "Maintenance personnel authorization verified. All 3 IT staff and 2 contracted maintenance vendors on authorized maintenance personnel list. List reviewed and re-attested quarterly."

MA.L2-3.7.6 (weight 1)  status:met  type:maintenance_log  source:ServiceNow
  detail: "Maintenance activities on CUI systems supervised by authorized IT staff. Unsupervised maintenance prohibited. Supervision documented in ServiceNow maintenance ticket for each activity."

### MP — Media Protection (8 missing controls)
Evidence types: physical_access_log, job_traveler_audit, configuration_export, policy_document, maintenance_log
Source: Genetec (badge system), ServiceNow

MP.L2-3.8.2 (weight 3)  status:met  type:physical_access_log  source:Genetec
  detail: "Physical access to CUI media (servers, workstations, storage) restricted to server room. Genetec badge access log shows 3 authorized staff. Access reviewed monthly. Last review: March 2026."

MP.L2-3.8.3 (weight 3)  status:met  type:maintenance_log  source:ServiceNow
  detail: "Media sanitization procedures documented and followed. NIST 800-88 Rev 1 applied. Hard drives destroyed (degaussed + shred) before disposal. Sanitization certificates retained. 4 drives sanitized in 2025."

MP.L2-3.8.4 (weight 1)  status:met  type:job_traveler_audit  source:physical_review
  detail: "CUI marking applied to all job travelers and physical documents containing CUI. Shop floor audit confirms CUI designation markings on all active job travelers (47 documents audited March 2026)."

MP.L2-3.8.5 (weight 3)  status:met  type:physical_access_log  source:Genetec
  detail: "CUI media access controlled via Genetec badge system. Server room access limited to 3 IT staff. Portable media (USB drives) tracked in asset inventory. Unauthorized media blocked via Intune."

MP.L2-3.8.6 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Cryptographic mechanisms protect CUI on portable storage. BitLocker To Go enforced on all USB drives via Intune. Non-encrypted removable media blocked. AES-256 encryption required."

MP.L2-3.8.7 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Removable media controlled via Intune device control policy. Only IT-approved USB devices permitted. Unapproved devices blocked at endpoint. Approved device list: 12 encrypted USB drives."

MP.L2-3.8.8 (weight 1)  status:met  type:configuration_export  source:Intune
  detail: "Portable storage use on external systems prohibited. Intune policy blocks USB storage when device is not on corporate network. Policy exception requires IT approval and is logged."

MP.L2-3.8.9 (weight 3)  status:met  type:policy_document  source:SharePoint
  detail: "CUI transport protection policy documented. Physical CUI shipped in tamper-evident packaging with chain of custody form. Digital CUI transmitted via encrypted channels only (TLS 1.3 minimum)."

### PS — Personnel Security (2 missing controls)
Evidence types: user_attestation, policy_document
Source: HR, SharePoint

PS.L2-3.9.1 (weight 1)  status:met  type:user_attestation  source:HR
  detail: "Personnel screening conducted for all 67 employees with CUI access. Background checks completed before CUI access granted. Screening results retained in HR. Re-screening every 5 years."

PS.L2-3.9.2 (weight 3)  status:met  type:policy_document  source:SharePoint
  detail: "Termination procedures documented and followed. CUI access revoked within 4 hours of termination. Accounts disabled in Azure AD, Okta, and CrowdStrike simultaneously. Equipment returned and wiped."

### PE — Physical & Environmental Protection (6 missing controls)
Evidence type: physical_access_log
Source: Genetec (badge system)

PE.L2-3.10.1 (weight 3)  status:met  type:physical_access_log  source:Genetec
  detail: "Physical access to CUI systems limited to authorized personnel. Genetec badge access system controls entry to server room and CUI work areas. Access log retained 90 days. 3 authorized staff."

PE.L2-3.10.2 (weight 3)  status:met  type:physical_access_log  source:Genetec
  detail: "Visitor escort procedures enforced. Visitors signed in at reception, issued visitor badge, escorted at all times in CUI areas. Genetec log captures all visitor badge events."

PE.L2-3.10.3 (weight 1)  status:met  type:physical_access_log  source:Genetec
  detail: "Visitor log maintained via Genetec visitor management module. All visitor entries recorded: name, organization, host, time in/out, areas accessed. Logs retained 1 year."

PE.L2-3.10.4 (weight 3)  status:met  type:configuration_export  source:Intune
  detail: "Removable media access controlled at endpoints via Intune. Physical media storage (NAS) access restricted by Genetec badge. Media inventory tracked in asset management system."

PE.L2-3.10.5 (weight 3)  status:met  type:user_attestation  source:Facilities
  detail: "Physical protection against environmental hazards documented. Server room has: UPS (2-hour runtime), fire suppression (FM-200), temperature monitoring (alert at 80°F), flood sensors. Quarterly inspection attested by facilities manager."

PE.L2-3.10.6 (weight 3)  status:met  type:policy_document  source:SharePoint
  detail: "Alternate work site policy documents physical protection requirements for remote workers handling CUI. Requirements: locked workspace, no shoulder-surfing, screen privacy filter. Self-attestation required annually."

### RA — Risk Assessment (2 missing controls)
Evidence types: audit_report, vulnerability_scan
Source: Rapid7, external assessor

RA.L2-3.11.1 (weight 3)  status:met  type:audit_report  source:external_assessor
  detail: "Annual risk assessment conducted by external assessor (March 2026). Scope: all 110 CUI-adjacent systems. Risk register maintained in SharePoint. 7 risks identified, 4 accepted, 3 in remediation."

RA.L2-3.11.3 (weight 5)  status:met  type:vulnerability_scan  source:Rapid7
  detail: "Vulnerabilities remediated per risk level: Critical within 15 days, High within 30 days, Medium within 90 days. Rapid7 scan results reviewed weekly. Current open: 0 critical, 2 high (within SLA), 14 medium."

### CA — Security Assessment & Authorization (3 missing controls)
Evidence types: audit_report, policy_document
Source: external assessor, SharePoint

CA.L2-3.12.1 (weight 5)  status:met  type:audit_report  source:external_assessor
  detail: "Annual security assessment conducted by third-party assessor (March 2026). All 110 NIST 800-171 controls evaluated. Assessment report retained. Findings tracked in POA&M. Score: 100/110 controls met."

CA.L2-3.12.2 (weight 3)  status:met  type:policy_document  source:SharePoint
  detail: "POA&M maintained and updated quarterly. Current POA&M: 4 open items with milestones and responsible owners. POA&M reviewed by leadership monthly. All items have target close dates."

CA.L2-3.12.3 (weight 3)  status:met  type:audit_report  source:Splunk
  detail: "Continuous monitoring implemented via Splunk dashboards. 12 security controls monitored in real-time. Monthly security posture report generated. Anomalies reviewed within 24 hours."

### SC — System & Communications Protection (14 missing controls)
Evidence type: configuration_export
Source: Azure, Fortinet (firewall), AWS

SC.L2-3.13.1 (weight 5)  status:met  type:configuration_export  source:Fortinet
  detail: "Network segmented via Fortinet firewall. CUI systems on isolated VLAN (192.168.10.0/24). Manufacturing floor on separate VLAN. Firewall rules reviewed quarterly. Zero trust between VLANs."

SC.L2-3.13.2 (weight 3)  status:met  type:configuration_export  source:Azure
  detail: "Security architecture employs least privilege network design. Micro-segmentation via Azure NSG and Fortinet policies. Architecture diagram maintained and reviewed annually."

SC.L2-3.13.3 (weight 3)  status:met  type:configuration_export  source:AzureAD
  detail: "User and system management functionality separated. Admin consoles accessible only from dedicated admin workstation on management VLAN. Standard users have no access to management functions."

SC.L2-3.13.4 (weight 3)  status:met  type:configuration_export  source:Fortinet
  detail: "Unauthorized information transfer prevented via Fortinet DLP inspection. CUI keywords blocked from exfiltration to non-approved destinations. CASB policy active on all cloud applications."

SC.L2-3.13.5 (weight 3)  status:met  type:configuration_export  source:Fortinet
  detail: "DMZ implemented via Fortinet for publicly accessible components. Web-facing systems isolated from CUI internal network. No direct route from DMZ to CUI VLAN."

SC.L2-3.13.6 (weight 3)  status:met  type:configuration_export  source:Fortinet
  detail: "Default-deny firewall policy active. All inbound/outbound traffic blocked unless explicitly permitted. 47 allow rules documented with business justification. Reviewed quarterly."

SC.L2-3.13.7 (weight 3)  status:met  type:configuration_export  source:Fortinet
  detail: "Split tunneling prevented for remote access. All remote VPN traffic routed through corporate Fortinet. DNS queries resolved through corporate DNS. Policy enforced via GlobalProtect VPN profile."

SC.L2-3.13.9 (weight 1)  status:met  type:configuration_export  source:Fortinet
  detail: "Network session termination configured. Idle sessions terminated after 30 minutes. Long-running sessions reviewed. TCP timeout 3600 seconds, UDP timeout 30 seconds. Applied to all CUI connections."

SC.L2-3.13.10 (weight 5)  status:met  type:configuration_export  source:Azure
  detail: "Cryptographic key management via Azure Key Vault. All CUI encryption keys stored in FIPS 140-3 Level 3 HSM (CMVP #4884). Key rotation automated annually. Key access logged and monitored."

SC.L2-3.13.12 (weight 1)  status:met  type:configuration_export  source:Intune
  detail: "Remote activation of collaborative computing devices prohibited. Camera/microphone access blocked via Intune policy on all managed devices. Conference room AV systems air-gapped from CUI network."

SC.L2-3.13.13 (weight 1)  status:met  type:configuration_export  source:CrowdStrike
  detail: "Mobile code controlled via CrowdStrike application control. JavaScript execution restricted in browsers. Unsigned scripts blocked. CrowdStrike script control active on all 67 endpoints."

SC.L2-3.13.14 (weight 1)  status:not_met
  notes: "VoIP communications policy not documented. Shop uses physical phones not connected to CUI network, but no formal policy exists governing VoIP use in CUI areas. POA&M: document VoIP policy by Q2 2026."

SC.L2-3.13.15 (weight 3)  status:met  type:configuration_export  source:Azure
  detail: "Communications sessions protecting CUI employ TLS 1.3. Legacy TLS 1.0/1.1 disabled on all endpoints via Intune. Certificate pinning on CUI web applications. Enforced via Azure Front Door."

SC.L2-3.13.16 (weight 5)  status:met  type:configuration_export  source:Intune
  detail: "CUI at rest encrypted via BitLocker AES-256 on all Windows endpoints. FileVault on all Mac laptops. Azure Storage encrypted at rest (AES-256). Encryption compliance: 100% of 76 managed devices."

### SI — System & Information Integrity (5 missing controls)
Evidence types: log, device_inventory, vulnerability_scan
Source: Splunk, CrowdStrike, Rapid7

SI.L2-3.14.3 (weight 3)  status:met  type:log  source:Splunk
  detail: "CrowdStrike malicious code alerts routed to Splunk in real-time. Alert response procedures documented. Mean time to alert: <2 minutes. 0 confirmed malware infections in past 12 months."

SI.L2-3.14.4 (weight 3)  status:met  type:device_inventory  source:CrowdStrike
  detail: "CrowdStrike sensor updated automatically. Sensor version managed via Falcon platform. All 67 endpoints on current sensor version (verified via device inventory export). Update lag: <24 hours."

SI.L2-3.14.5 (weight 3)  status:met  type:vulnerability_scan  source:Rapid7
  detail: "Rapid7 Nexpose performs authenticated scans weekly. Scan scope: all 76 managed devices and 4 servers. Last scan: March 24, 2026. Critical findings: 0. High findings: 2 (within 30-day SLA)."

SI.L2-3.14.6 (weight 5)  status:met  type:log  source:Splunk
  detail: "Splunk monitors all 67 endpoints and 4 servers for security indicators. 47 detection rules active. CrowdStrike, Azure AD, Okta, Intune telemetry correlated. Anomalies alert to IT on-call 24/7."

SI.L2-3.14.7 (weight 3)  status:met  type:log  source:Splunk
  detail: "Unauthorized system use detected via Splunk UEBA. Baseline behavior established for all 67 users. Deviations generate alerts. 3 alerts investigated in past 12 months, all resolved as false positives."

## NOT MET CONTROLS (4 total — realistic gaps for a 67-person manufacturer)
These 4 controls should be added as status: "not_met" with empty evidence array and notes:
  CM.L2-3.4.8  (weight 3) — deny-by-exception allowlist not implemented
  IR.L2-3.6.3  (weight 3) — IR tabletop exercise not conducted
  MA.L2-3.7.4  (weight 3) — remote maintenance log procedure not documented
  SC.L2-3.13.14 (weight 1) — VoIP policy not documented

## SPRS SCORE AFTER ALL CONTROLS ADDED
When all 110 controls are present:
- 106 MET, 4 NOT MET
- Deductions: 3+3+3+1 = 10 points
- Final SPRS: 110 - 10 = 100

Update the top-level "sprs_score" field in the example to 100 when the last control is added.
Also update "sprs_calculation.not_met_count" and "sprs_calculation.deduction" accordingly.

## UUID GENERATION RULE
Each evidence object needs a unique evidence_id in UUID v4 format.
Pattern for new evidence objects: use format eXXXXXXX-YYYY-YYYY-YYYY-YYYYYYYYYYYY
where the segments are unique to avoid collision with existing evidence IDs.
Use the control's numeric identifier in the UUID for traceability.
Example: AC.L2-3.1.2 evidence → "e1a2b3c4-0001-0001-0012-000000000001"

## CONSTRAINTS
- Validator must pass after every kept change
- Each experiment adds exactly ONE control
- Do not modify existing controls
- Do not edit the schema file
- nist_id format: match existing pattern (e.g., "3.1.2" for AC.L2-3.1.2)
- family: two-letter code matching control_id prefix
- sprs_weight: must match controls/registry.json for that control_id
- evidence_method for all new documentary evidence: "documentary"
- evidence_method for physical review evidence: "observation"

## LOG FORMAT
Append to experiment-log.md after each experiment:
---
Experiment N | [timestamp]
Change: Added [control_id] ([status]) to worked example
Validator: PASS/FAIL
Controls before/after: N/110 → N+1/110
SPRS before/after: X → Y
Decision: KEPT / DISCARDED
Reason (if discarded): [why]
---

## STOPPING CONDITION
Stop when EITHER:
1. All 110 controls present in worked example (110/110) — the work is done
2. 5 consecutive experiments with validator FAIL and no successful adds

Do not stop for any other reason. Do not stop based on experiment count.

Write a LOOP 4 SUMMARY at the end of experiment-log.md when done.
