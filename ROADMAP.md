# MADRASATU DARUL ARKAM
# Master Roadmap v2

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

This project is not designed as a multi-tenant SaaS product for self-service school onboarding.

---

# Engineering Workflow

Every major feature follows:

Inspect → Specify → Implement → Test → Verify → Commit

Production quality is required. Demo-only implementations, fake integrations, placeholder business logic, and unverified claims are not acceptable.

---

# PHASE 0 — Foundation & Client Requirements

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

Deliverables:
- ROADMAP.md
- PROJECT_SCOPE.md
- ARCHITECTURE.md
- REQUIREMENTS.md
- ROLES_AND_PERMISSIONS.md

---

# PHASE 1 — Production Foundation & Architecture

Status: ⏳ Planned

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

---

# PHASE 2 — School & Student Management

Status: ⏳ Planned

Scope:
- student registration
- admission numbers
- student profiles
- student photos
- classes
- sections
- academic sessions
- terms
- guardians
- student status
- academic history
- staff management
- teacher management
- subject management
- teacher assignments

---

# PHASE 3 — Academic Management

Status: ⏳ Planned

Scope:
- attendance
- teacher/class timetable
- timetable conflict detection
- assessments
- examinations
- score entry
- grading
- result computation
- ranking/position rules
- teacher comments
- result management

---

# PHASE 4 — Secure Result Checker

Status: 🟢 In Scope

The result checker is a separate security-sensitive module.

Scope:
- public result lookup
- result verification
- student/reference identification
- session/term selection
- verification code/reference
- rate limiting
- abuse protection
- privacy protection
- no exposure of unrelated student information

---

# PHASE 5 — Finance

Status: ⏳ Planned

Core scope:
- fee structures
- invoices
- payments
- outstanding balances
- receipts
- payment history
- collection summaries
- outstanding-fee reports

## Online Payment Gateway

Status: 🟡 Pending Client Approval / Optional Post-Validation Integration

The internal finance system remains part of the project.

A real online payment gateway will not be integrated until:
- school authority approves the requirement
- provider is selected
- credentials are supplied
- commercial/payment responsibilities are agreed
- security requirements are reviewed

---

# PHASE 6 — Tahfiz / Islamic Education

Status: ⏳ Planned

Scope:
- Qur'an memorization
- Surah tracking
- Juz tracking
- daily progress
- revision
- teacher assessment
- progress history
- Islamic studies subjects
- Islamic education attendance/performance where required

---

# PHASE 7 — Communication

Status: ⏳ Planned

Core:
- announcements
- notices
- messages
- academic notifications
- communication logs

Integration-ready architecture:
- Email
- SMS
- WhatsApp
- in-app notifications

## WhatsApp

Architecture:
School System
→ Notification Service
→ WhatsApp / SMS / Email

Status:
- WhatsApp architecture: 🟢 Prepare Now
- Real WhatsApp provider/API: 🟡 Pending school approval and provider credentials

---

# PHASE 8 — Reports & Analytics

Status: ⏳ Planned

Scope:
- student population
- attendance
- academic performance
- fee collection
- outstanding fees
- teacher statistics
- Tahfiz progress
- class reports
- student reports
- academic reports
- financial reports
- exports where appropriate

Possible export formats:
- PDF
- Excel
- CSV

---

# PHASE 9 — AI Layer

Status: ⏳ Planned

AI must provide practical value.

Scope:
- AI Research Agent
- educational research
- school policy research
- curriculum-related research
- administrative research
- summarization
- academic insights
- attendance analysis
- performance analysis
- natural-language reporting

AI must be permission-aware.

AI must not have unrestricted database access.

Example queries:
- "Wadanne subjects ne students suka fi samun matsala?"
- "Wane class ne attendance dinsa ya ragu?"
- "Nuna min attendance na JSS2 a wannan term."

---

# PHASE 10 — Security & Production Hardening

Status: ⏳ Planned

Scope:
- authentication hardening
- authorization
- RBAC
- RLS
- input validation
- rate limiting
- audit logs
- secure secrets
- database backup strategy
- error monitoring
- security headers
- session security
- result-checker protection
- data-access controls

---

# PHASE 11 — UAT / Client Acceptance

Status: ⏳ Planned

School testing areas:
- admissions
- students
- teachers
- attendance
- results
- finance
- Tahfiz
- reports
- result checker
- languages
- permissions
- security-sensitive workflows

All critical defects should be resolved before final acceptance.

---

# PHASE 12 — Deployment & Handover

Status: ⏳ Planned

Scope:
- production database
- production domain
- SSL
- environment variables
- backups
- monitoring
- administrator account
- staff accounts
- documentation
- user guide
- training
- technical handover

---

# PHASE 13 — Project Closure

Status: ⏳ Planned

Scope:
- final acceptance
- delivery package
- production system
- documentation
- operational procedures
- backup strategy
- technical documentation
- source-code handover arrangement
- final payment according to agreement

---

# PHASE 14 — Optional Maintenance & Upgrades

Status: 🔵 Post-Delivery / Optional

Possible services:
- bug fixes
- maintenance
- security updates
- upgrades
- new modules
- mobile applications
- WhatsApp integration
- payment integration
- third-party integrations
- new reports
- technical support

Possible commercial models:
- per-task fee
- monthly maintenance
- annual maintenance
- upgrade contract

---

# Current Status

Phase 0: 🟡 In Progress
Phase 1: ⏳ Planned
Phase 2: ⏳ Planned
Phase 3: ⏳ Planned
Phase 4: 🟢 In Scope
Phase 5: ⏳ Planned
Phase 6: ⏳ Planned
Phase 7: ⏳ Planned
Phase 8: ⏳ Planned
Phase 9: ⏳ Planned
Phase 10: ⏳ Planned
Phase 11: ⏳ Planned
Phase 12: ⏳ Planned
Phase 13: ⏳ Planned
Phase 14: 🔵 Optional

---

# Definition of Done

A feature is not considered complete until:

1. Requirements are defined.
2. Architecture is appropriate.
3. Implementation is real.
4. Validation exists.
5. Tests pass.
6. Security implications are reviewed.
7. Relevant documentation is updated.
8. Production behavior is verified.
9. Changes are committed.
10. Changes are pushed to the repository.
