# MADRASATU DARUL ARKAM
# Master Roadmap v3

## Project Type

Professional School Management Information System (SMIS)

## Delivery Model

This system is commissioned/custom software for Madrasatu Darul Arkam.

The school authority will operate the production system after handover.

The developer may provide optional post-delivery:
- maintenance
- bug fixes
- upgrades
- new modules
- integrations
- technical support

This project is **not** designed as a multi-tenant SaaS product for self-service school onboarding.

Future reuse means reusable engineering foundations, not shared school tenancy. A future school deployment should use its own database, secrets, deployment, configuration and data.

---

# Engineering Workflow

Every major feature follows:

**Inspect → Specify → Implement → Test → Verify → Commit → Push**

Production quality is required. Demo-only implementations, fake integrations, placeholder business logic, and unverified claims are not acceptable.

---

# Cross-Cutting Product Principles

1. **Digital Records First** — important school administrative, academic, student, staff, financial, attendance, welfare, communication, examination, Islamic education and institutional records should have an appropriate digital representation.
2. **Record Integrity** — official records must have ownership, lifecycle, validation, approval and audit history.
3. **Human Accountability** — AI may assist with extraction, analysis and recommendations, but must not silently create or alter official high-impact records.
4. **Security by Default** — RBAC, RLS, least privilege, audit logging and sensitive-data controls apply across modules.
5. **Authorized Reporting** — records should be reportable, printable and exportable only according to permission.
6. **Offline Where Safe** — offline capability is modular and limited to domains that can safely support it.
7. **AI Across the System** — AI should contribute practical value across appropriate administrative and academic domains while remaining permission-aware.
8. **Reusable Foundations, Single-School Delivery** — build once, design for reuse, but keep Madrasatu Darul Arkam as a single-school production system.

---

# Digital Records Standard

Every major record domain should define:

- purpose
- data model / fields
- record owner
- sensitivity level
- permissions
- validation rules
- approval workflow where required
- audit history
- reporting requirements
- export/printing permissions
- retention/archive rules
- offline eligibility
- AI eligibility

Standard record lifecycle:

**Create → Read → Update → Approve → Publish → Audit → Report → Export/Print → Retain/Archive**

Official records must never be silently overwritten. Material corrections should preserve an appropriate history and reason.

---

# Universal Export & Printing Standard

Authorized records should support the appropriate output formats:

- CSV
- XLSX / Excel
- PDF
- professional print views

Requirements:

- permission enforcement
- filtering before export
- authorized column selection where applicable
- sensitive-field masking
- audit logging for sensitive exports
- school/report/register title
- generated date/time
- session/term/filter context where applicable
- generated-by user where appropriate
- page numbers for suitable PDF/print outputs
- no unauthorized bulk extraction

Sensitive student, guardian, staff, finance, discipline, safeguarding and results records require stricter export/print permissions.

---

# Digital Document Intake, OCR & AI Record Digitization

Status: 🟢 Cross-Cutting Capability

The system should support migration and digitization of existing paper/manual records and new uploaded documents.

Supported inputs may include:

- scanned manuscripts
- handwritten forms
- images/photos
- PDFs
- office documents
- scanned registers
- receipts
- mark sheets
- attendance sheets
- certificates
- official letters
- meeting minutes
- inventory/asset sheets

Core pipeline:

**Upload/Capture → OCR/Document AI → Text & Field Extraction → Document Classification → Record Matching → Validation → Human Verification → Official Record → Audit + Original Document Preservation**

AI may assist with:

- OCR
- handwriting recognition where supported
- document classification
- field extraction
- confidence scoring
- duplicate detection
- matching documents to students/staff/records
- validation
- legacy-data migration
- search/indexing

Critical rule:

**AI Extraction → Human Verification → Official Record**

Where policy permits, preserve the original source document together with provenance, metadata, access control, version/history and retention rules.

Example:

**Admission Form → AI Extraction → Human Verification → Admission Register → Student Master Record**

---

# PHASE 0 — Foundation, Client Requirements & Digital Records Governance

Status: 🟡 In Progress

Objectives:
- establish repository
- establish project scope
- establish architecture
- define requirements
- define roles and permissions
- define ownership and handover boundaries
- define MVP and future scope
- identify optional/deferred integrations
- complete education administration requirements review
- complete academic administration requirements review
- catalogue important digital records
- define record lifecycle and governance
- define export/print standards
- define document digitization/OCR requirements
- define AI contribution across appropriate domains
- define legacy-record migration requirements

Deliverables:
- ROADMAP.md
- PROJECT_SCOPE.md
- ARCHITECTURE.md
- REQUIREMENTS.md
- ROLES_AND_PERMISSIONS.md
- DIGITAL_RECORDS_CATALOG.md

---

# PHASE 1 — Production Foundation & Architecture

Status: 🟢 In Progress

Scope:
- Next.js
- TypeScript
- PostgreSQL/Supabase
- Supabase Authentication
- RBAC
- Row Level Security
- validation
- error handling
- audit logging
- security baseline
- testing infrastructure
- deployment configuration
- English
- Hausa
- Arabic RTL
- Online-First + Offline-Capable architecture
- local offline storage strategy (IndexedDB)
- synchronization and conflict-resolution architecture
- PWA/offline implementation plan
- secure document/file storage foundation
- document metadata and provenance
- export/print architecture
- AI service boundary
- permission-aware AI context model

Arabic must be true RTL across layout, navigation, forms, tables, alignment and relevant workflows.

---

# PHASE 1B — Offline Capability & Synchronization Foundation

Status: ⏳ Planned

Objectives:
- establish PWA/service-worker strategy
- establish IndexedDB/local-store abstraction
- define offline data boundaries
- define offline operation and outbox model
- establish idempotency strategy
- build synchronization service
- track connectivity state
- implement conflict detection and domain-specific resolution
- establish offline audit and security rules
- test online/offline transitions
- ensure server truth is never confused with pending local state

Initial Offline Workflow Targets:
- attendance
- basic score entry
- Tahfiz progress
- cached student records
- draft reports
- cached timetable

Offline capability shall be modular and enabled only for domains that can safely support it.

---

# PHASE 2 — School Administration, Admissions & Student Management

Status: ⏳ Planned

## School Administration

- school profile/institutional information
- registration/accreditation information where applicable
- contacts
- academic/school calendar
- school days and hours
- classes
- sections
- departments
- policies and rules
- announcements
- events
- meetings
- minutes and decisions
- official correspondence/archive
- facilities
- rooms
- assets
- inventory
- maintenance
- emergency contacts/procedures
- visitors and other applicable institutional records

## Admissions & Student Lifecycle

- admission applications
- admission decisions
- admission numbers
- **Admission Register**
- student ID
- student master record
- biodata
- names
- gender
- date/place of birth where required
- photo
- contact/address
- guardian/parent records
- emergency contacts
- student documents
- previous school/transfer information
- admission type/date/session/class
- student status
- enrollment history
- class/section history
- transfer/withdrawal
- graduation/completion
- alumni where applicable

Admission Register is a **first-class School & Student Management module**, not a hidden sub-feature of Academics.

Core lifecycle:

**Inquiry/Application → Admission → Admission Register → Student Master Record → Enrollment → Class/Section → Attendance → Academic Records → Promotion/Repetition → Transfer/Withdrawal → Graduation/Completion → Alumni**

---

# PHASE 3 — Academic Administration & Teaching Management

Status: ⏳ Planned

Scope:
- academic sessions
- terms
- classes
- sections
- subjects
- curriculum
- student enrollment
- class/subject lists
- teacher assignments
- teaching workload
- scheme of work
- lesson planning/records where required
- assignments
- learning resources
- academic history

---

# PHASE 4 — Attendance Management

Status: ⏳ Planned

## Student Attendance

- daily attendance
- class attendance
- subject attendance
- present/absent/late/excused
- absence reasons
- corrections
- approval/history
- attendance percentage
- chronic absence indicators

## Staff Attendance

- staff attendance
- late arrival
- early departure
- absence
- leave records

---

# PHASE 5 — Examination, Assessment & Results

Status: ⏳ Planned

## Assessment

- continuous assessment
- tests
- quizzes
- assignments
- assessment structures
- score entry
- verification

## Examination

- examination types
- sessions
- subjects
- examination timetable
- rooms
- invigilators
- candidate lists
- examination attendance
- incidents
- missing-script/status records where applicable

## Results

- score entry
- verification
- grading
- result computation
- ranking/position rules
- teacher comments
- result approval
- publication
- report cards
- transcripts
- academic history
- promotion/repetition
- graduation/completion
- result statistics

Authoritative workflow:

**Teacher Entry → Verification → Computation → Result Approval → Publication → Audit Trail**

No silent result changes.

---

# PHASE 6 — Secure Result Checker

Status: 🟢 In Scope

- public result lookup
- reference/student identification
- session/term selection
- verification code/reference
- rate limiting
- abuse prevention
- privacy protection
- no unrelated student information
- isolated permissions/data-access boundaries

---

# PHASE 7 — Finance & Fees

Status: ⏳ Planned

- fee categories
- fee structures by session/term/class where applicable
- student charges
- discounts
- scholarships
- waivers
- invoices
- payments
- partial payments
- receipts
- balances
- payment history
- refunds
- adjustments
- approvals
- collection registers
- outstanding-fee registers
- statements
- authorized CSV/XLSX/PDF/print outputs

Online Payment Gateway:

Pending client approval, provider credentials, security review and commercial agreements.

---

# PHASE 8 — Timetable, Workload & Scheduling

Status: ⏳ Planned

- days
- periods
- breaks
- assembly
- prayer/Jumu’ah constraints where applicable
- rooms
- classes
- teachers
- availability
- weekly periods
- hard constraints
- soft constraints
- conflict detection
- workload balancing
- published timetable
- version/history
- approval

## AI Master Timetable

**School Requirements → Constraint Model → Deterministic Solver → AI Assistance → Alternatives → Human Review → Approval → Published Timetable**

The deterministic solver remains authoritative.

AI cannot bypass hard constraints or human approval.

---

# PHASE 9 — Tahfiz & Islamic Education

Status: ⏳ Planned

- Qur’an curriculum
- Surah tracking
- Juz tracking
- memorization progress
- daily progress
- revision
- mistakes
- teacher assessment
- progress history
- completion
- Islamic Studies
- Islamic education attendance/performance

---

# PHASE 10 — Student Welfare, Discipline & Safeguarding

Status: ⏳ Planned

- behaviour records
- discipline incidents
- warnings/actions
- parent notification
- follow-up
- resolution
- counselling/referral
- safeguarding records
- emergency incidents
- confidential notes

Strict permissions, audit, retention, AI, export and print restrictions apply.

---

# PHASE 11 — Staff, HR & Professional Development

Status: ⏳ Planned

- staff ID/profile/photo/contact/emergency
- employment type/position/department
- qualifications/certifications/specialization
- employment date/status
- contracts/documents
- subjects/classes
- workload
- availability
- attendance
- leave
- training/professional development
- promotion
- transfer
- performance appraisal
- disciplinary records
- exit/resignation/retirement

---

# PHASE 12 — Communication, Notifications & Official Correspondence

Status: ⏳ Planned

- announcements/notices
- parent/student/teacher communication
- academic/attendance/result/fee/emergency notifications
- templates
- delivery history/status/failures/retries/recipients
- official correspondence
- audit trail

Architecture:

**School System → Notification Service → WhatsApp / SMS / Email / In-App**

Providers are subject to school approval, credentials, security and commercial review.

---

# PHASE 13 — Library, Learning Resources, Assets, Inventory & Facilities

Status: ⏳ Planned

## Library

- catalog
- categories
- copies
- borrowing
- returns
- overdue
- lost/damaged
- history
- reports

## Assets

- asset IDs
- categories
- locations
- acquisition
- condition
- assignment
- maintenance
- disposal
- history

## Inventory

- stock in/out
- issuance
- reorder
- history

## Facilities

- rooms
- facilities
- maintenance
- incidents
- condition

---

# PHASE 14 — Reports, Analytics & Management Intelligence

Status: ⏳ Planned

Reports/dashboards:

- student population
- admissions
- Admission Register
- enrollment
- attendance
- academic performance
- weak/strong subjects
- class performance
- teacher workload
- examination statistics
- results
- promotion/repetition
- fees/outstanding fees
- discipline/welfare
- Tahfiz
- library/resources
- assets/inventory/facilities
- staff statistics
- management summaries

Outputs:

- CSV
- XLSX
- PDF
- professional print

All reporting respects RBAC, RLS, sensitivity, filtering and export authorization.

---

# PHASE 15 — Cross-Cutting AI & Research Intelligence

Status: ⏳ Planned

AI contributions across:

- School Administration
- Admissions & Students
- Staff & HR
- Academic & Teaching
- Attendance
- Assessment/Examination/Results
- Timetable
- Welfare/Safeguarding (aggregate only)
- Document Digitization

AI must never:

- bypass RBAC/RLS
- expose restricted data
- invent official records
- claim actions not performed
- silently mutate official records
- publish sensitive information without authorization

High-impact actions require human approval.

---

# PHASE 16 — AI Research Agent

Status: ⏳ Planned

Capabilities:

- educational research
- school administration research
- policy/curriculum/assessment/attendance/teaching-learning research
- learning resources
- education technology
- management research
- report/document synthesis
- modern school software research

The system must distinguish:

- school records
- external research
- AI analysis
- recommendations
- actions requiring approval

The AI Research Agent must never be an unrestricted database agent.

---

# PHASE 17 — Security, Privacy, Audit & Production Hardening

Status: ⏳ Planned

- authentication hardening
- authorization
- RBAC
- RLS
- input validation
- rate limiting
- audit logs
- secure secrets
- backup strategy
- error monitoring
- security headers
- session security
- result-checker protection
- data access controls
- secure document/file access
- document provenance
- sensitive-record controls
- export/print authorization
- AI data-access controls
- privacy/retention
- offline security
- synchronization integrity
- record-integrity verification

---

# PHASE 18 — Cross-Cutting Reusable Foundations Strategy

Status: ⏳ Planned

Goal:

**Build once, design for reuse — but deploy Madrasatu Darul Arkam as a single-school production system.**

Reusable foundations:

- architecture/service/repository patterns
- configuration
- UI components
- forms
- tables
- filters
- dashboards
- dialogs
- RTL support
- validation
- error handling
- authentication
- RBAC
- RLS
- audit
- rate limiting
- record lifecycle/approval
- export/print
- PDF/XLSX/CSV
- secure document storage
- OCR/document-intake interfaces
- AI service/context interfaces
- AI safety/approval
- offline store/outbox/sync
- security tests
- integration tests
- export tests
- record-integrity tests
- offline tests
- AI permission tests
- documentation/templates

Future deployments use separate:

- database
- secrets
- deployment
- configuration
- data

Do not introduce multi-tenancy merely for future reuse.

---

# PHASE 19 — UAT / Client Acceptance

Status: ⏳ Planned

Test all major areas, including:

- school administration
- admissions
- Admission Register
- students/guardians
- staff
- academics
- attendance
- exams/results
- finance
- timetable
- Tahfiz
- welfare
- communication
- library
- assets/inventory/facilities
- reports
- exports/printing
- document digitization/OCR
- AI
- offline workflows
- result checker
- languages
- Arabic RTL
- permissions/security

Critical defects must be resolved before final acceptance.

---

# PHASE 20 — Production Deployment & Handover

Status: ⏳ Planned

- production database
- production domain
- SSL
- environment variables
- backups
- monitoring
- admin/staff accounts
- documentation
- user guide
- training
- technical handover
- record migration plan
- initial legacy-data digitization

---

# PHASE 21 — Project Closure

Status: ⏳ Planned

- final acceptance
- delivery package
- production system
- documentation
- operational procedures
- backup strategy
- technical documentation
- source-code handover arrangement
- final payment according to agreement
- formal closure

---

# PHASE 22 — Optional Maintenance & Future Upgrades

Status: 🔵 Post-Delivery / Optional

- bug fixes
- maintenance
- security updates
- upgrades
- new modules
- mobile apps
- WhatsApp integrations
- payment integrations
- third-party integrations
- new reports
- AI improvements
- OCR/document-processing improvements
- technical support

Possible commercial models:

- per-task
- monthly
- annual
- upgrade contract

---

# Official Registers / Core Record Universe

- Admission Register
- Student Register
- Enrollment Register
- Class/Section Register
- Transfer Register
- Withdrawal Register
- Graduation/Completion Register
- Guardian/Parent Register
- Staff Register
- Teacher Register
- Staff Attendance Register
- Leave Register
- Training/Professional Development Register
- Student Attendance Register
- Assessment Register
- Examination Register
- Result Register
- Promotion/Repetition Register
- Subject Performance Register
- Class Performance Register
- Fee Register
- Payment Register
- Receipt Register
- Outstanding Fees Register
- Visitor Register
- Asset Register
- Inventory Register
- Communication Register
- Meeting/Minutes Register
- Correspondence Register
- Incident/Discipline Register

Exact registers may be refined with the school authority.

---

# Record Governance & Audit Standard

Important records should capture where applicable:

- creator
- created date/time
- last modifier
- modification date/time
- approval status
- approver
- publication status
- cancellation/reversal status
- reason for material correction
- audit history
- source/provenance

Example result workflow:

**Teacher enters score → Saved → Verification → Approval → Computation → Result Approval → Publication → Audit Trail**

No silent changes.

---

# Current Status

Phase 0: 🟡 In Progress
Phase 1: 🟢 In Progress
Phase 1B: ⏳ Planned
Phase 2: ⏳ Planned
Phase 3: ⏳ Planned
Phase 4: ⏳ Planned
Phase 5: ⏳ Planned
Phase 6: 🟢 In Scope
Phase 7: ⏳ Planned
Phase 8: ⏳ Planned
Phase 9: ⏳ Planned
Phase 10: ⏳ Planned
Phase 11: ⏳ Planned
Phase 12: ⏳ Planned
Phase 13: ⏳ Planned
Phase 14: ⏳ Planned
Phase 15: ⏳ Planned
Phase 16: ⏳ Planned
Phase 17: ⏳ Planned
Phase 18: ⏳ Planned
Phase 19: ⏳ Planned
Phase 20: ⏳ Planned
Phase 21: ⏳ Planned
Phase 22: 🔵 Optional

---

# Definition of Done

A feature is not complete until:

1. Requirements defined.
2. Architecture appropriate.
3. Real implementation.
4. Validation exists.
5. Tests pass.
6. Security reviewed.
7. Permissions/RLS verified.
8. Audit behavior verified where applicable.
9. Export/print verified where applicable.
10. AI permission-awareness verified where applicable.
11. Offline behavior verified where applicable.
12. Documentation updated.
13. Production behavior verified.
14. Changes committed.
15. Changes pushed.

---

# Master Product Principle

Build a complete, secure, modern, production-grade digital school administration and academic system for Madrasatu Darul Arkam.

Digitize important records. Preserve provenance and accountability. Make authorized records reportable, exportable and printable. Use AI responsibly across the system, including document-to-record digitization, research and management intelligence. Support safe offline workflows. Build reusable foundations without turning this single-school deployment into a multi-tenant SaaS product.

**Build once, design for reuse — but deploy Madrasatu Darul Arkam as a single-school production system.**
