# MADRASATU DARUL ARKAM
# Project Scope

## 1. Purpose

Madrasatu Darul Arkam requires a professional School Management Information System (SMIS) for managing core school operations, academic activities, student records, results, finance, Islamic education, communication, reporting, and selected AI-assisted workflows.

The system must be production-oriented, secure, maintainable, and suitable for real school operations.

---

# 2. Delivery Model

This is commissioned/custom software for a single school.

The school authority will operate the system after handover.

The project does not require:
- public self-service school registration
- multi-tenant onboarding
- subscription billing
- SaaS marketplace
- school-to-school tenant switching
- unnecessary SaaS infrastructure

The architecture should nevertheless be modular and reusable as a professional school-management foundation for future projects.

---

# 3. Primary Objectives

The system should enable the school to:

- manage students
- manage staff
- manage classes and sections
- manage academic sessions and terms
- manage subjects
- manage teacher assignments
- record attendance
- manage assessments and examinations
- calculate results
- securely publish/verify results
- manage school fees and payments
- manage Qur'an/Tahfiz progress
- communicate with stakeholders
- generate reports
- use AI-assisted insights and research
- maintain secure audit trails

---

# 4. Languages

The system shall support:

1. English
2. Hausa
3. Arabic

Arabic must provide true RTL behavior.

RTL must affect:
- layout
- navigation
- text direction
- alignment
- forms
- tables where appropriate
- relevant UI components

Translation alone is not sufficient.

---

# 5. Core Modules

## School Management
- school profile
- academic sessions
- terms
- classes
- sections
- subjects
- staff

## Student Management
- admission
- student profile
- guardian information
- student status
- academic history
- student identification

## Academic Management
- attendance
- timetable
- assessments
- examinations
- scores
- grading
- result computation

## Secure Result Checker
- public verification
- result reference
- secure lookup
- abuse protection
- privacy protection

## Finance
- fee structures
- invoices
- payments
- balances
- receipts
- reports

## Tahfiz / Islamic Education
- Qur'an memorization
- Surah/Juz
- daily progress
- revision
- teacher assessment

## Communication
- announcements
- notices
- notifications
- message records
- integration-ready notification service

## Reports & Analytics
- student
- academic
- attendance
- financial
- teacher
- Tahfiz
- management reports

## AI
- research
- summarization
- insights
- analytics assistance
- natural-language reporting

---

# 6. Optional / Deferred Features

The following are not required to delay the core system:

## Online Payment Gateway

Status:
Pending client approval / optional post-validation integration.

The system can first support internal finance management.

## Real WhatsApp API

Architecture can be prepared now.

Actual provider integration requires:
- school approval
- provider selection
- credentials
- appropriate account ownership

## Mobile Application

Potential post-delivery upgrade.

---

# 7. MVP Scope

The practical first production milestone should prioritize:

- authentication
- roles
- permissions
- student management
- staff management
- classes
- subjects
- academic sessions
- terms
- attendance
- assessments
- results
- secure result checker
- basic finance
- basic Tahfiz
- basic communication
- reporting foundation
- English/Hausa/Arabic
- security baseline
- audit logging

---

# 8. Future Scope

Potential future upgrades:

- mobile applications
- online payment
- real WhatsApp provider
- SMS provider
- advanced analytics
- advanced AI
- parent portal expansion
- student portal expansion
- advanced timetable automation
- OCR
- additional integrations

---

# 9. Explicit Non-Goals

The project does not currently include:

- multi-school SaaS onboarding
- public marketplace
- subscription billing engine
- cryptocurrency/payment features
- unnecessary blockchain features
- fake AI functionality
- fake WhatsApp sending
- fake payment integration
- unrestricted AI database access
- unnecessary third-party dependencies

---

# 10. Data Ownership

School operational data belongs to the school authority according to the commercial agreement.

This includes:
- student records
- staff records
- attendance
- academic records
- financial records
- Tahfiz records
- communication records
- reports

Data access must be governed by authorization and security controls.

---

# 11. Handover

Before final delivery, ownership/control responsibilities must be explicitly documented for:

- production domain
- hosting account
- database/Supabase project
- authentication configuration
- environment/secrets management
- backups
- source code
- deployment credentials
- third-party integrations

Source-code ownership should be defined contractually, including distinction between custom project work and any pre-existing/reusable components.

---

# 12. Quality Standard

The system must be:

- real
- production-oriented
- secure
- maintainable
- testable
- documented
- modular
- auditable
- deployable
- handover-ready

No feature should be marked complete solely because a UI exists.
