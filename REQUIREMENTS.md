# MADRASATU DARUL ARKAM
# Production Requirements

## 1. Functional Requirements

### 1.1 Authentication
The system shall provide secure authentication for authorized users.

### 1.2 User Management
Administrators shall be able to manage authorized users according to their permissions.

### 1.3 Student Management
The system shall support:

- student registration
- admission numbers
- student profiles
- photographs
- class and section assignment
- guardian information
- student status
- academic history

### 1.4 Staff Management
The system shall support:

- teachers
- administrators
- accountants
- non-teaching staff
- staff profiles
- role assignment
- teacher subject/class assignments

### 1.5 Academic Management
The system shall support:

- academic sessions
- terms
- classes
- sections
- subjects
- attendance
- assessments
- examinations
- scores
- grading
- results
- comments
- academic reports

## 2. Master Timetable Requirements

The system shall support an AI-assisted Master Timetable.

Required capabilities:

- define school days
- define periods
- define breaks
- define prayer periods
- define assembly
- define classes
- define subjects
- define teachers
- define rooms where applicable
- define teacher availability
- define subject weekly periods
- define special constraints

The timetable engine shall detect:

- teacher clashes
- class clashes
- room clashes
- impossible requirements

The system shall use a Constraint-Based Timetable Solver for deterministic validation.

AI may assist with:

- requirement understanding
- optimization
- alternative proposals
- explanations
- re-optimization

The generated timetable must require Human Approval before publication.

## 3. Result Requirements

The system shall calculate and store academic results according to approved school rules.

The system shall provide a separate Secure Result Checker.

The public checker must not expose unrelated student records.

## 4. Finance Requirements

The system shall support:

- fee structures
- student fee records
- invoices
- payment recording
- outstanding balances
- receipts
- payment history
- financial summaries

Online payment gateway integration is optional and requires client approval.

## 5. Tahfiz Requirements

Where enabled, the system shall support:

- Qur'an memorization tracking
- Surah
- Juz
- daily progress
- revision
- teacher assessment
- progress history

## 6. Communication Requirements

The system shall support:

- announcements
- notices
- internal messages
- academic notifications
- parent/guardian notifications

The architecture shall support future WhatsApp, SMS, Email, and in-app providers.

Real external messaging requires approved provider credentials.

## 7. Reporting Requirements

The system shall support reports for:

- students
- teachers
- attendance
- academic performance
- results
- finance
- outstanding fees
- Tahfiz progress
- timetable
- school management

Exports may include PDF, Excel, and CSV where appropriate.

## 8. Language Requirements

Supported languages:

- English
- Hausa
- Arabic

Arabic shall use true RTL layout.

Language switching must not compromise authorization or data integrity.

## 9. AI Requirements

AI services may provide:

- school research
- educational research
- academic insights
- attendance analysis
- performance analysis
- management summaries
- natural-language reporting
- timetable assistance

AI must respect user permissions.

AI must not have unrestricted database access.

## 10. Security Requirements

The system shall implement:

- secure authentication
- RBAC
- RLS
- server-side authorization
- input validation
- rate limiting
- audit logging
- secure secrets
- HTTPS
- security headers
- protected public endpoints

## 11. Non-Functional Requirements

The system should be:

- reliable
- maintainable
- modular
- secure
- responsive
- accessible
- testable
- multilingual
- production-ready

## 12. Performance Requirements

Common school operations should respond efficiently under expected school workload.

Heavy operations such as timetable generation and large reports should be handled without blocking normal application operations unnecessarily.

## 13. Backup Requirements

Production data must have an appropriate backup strategy.

Backup and recovery procedures must be documented before handover.

## 14. Handover Requirements

Before final acceptance, the delivery package should include:

- production application
- source code according to agreement
- database
- administrator access
- deployment information
- environment configuration
- backup procedure
- technical documentation
- user documentation
- training

## 15. Explicit Non-Goals

The current project does not require:

- multi-tenant SaaS
- school self-signup
- subscription billing
- marketplace
- fake payment integration
- fake WhatsApp integration
- unnecessary enterprise infrastructure

Future upgrades may be added through a separate maintenance or upgrade agreement.
