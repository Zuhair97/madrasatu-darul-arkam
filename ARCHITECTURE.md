# MADRASATU DARUL ARKAM
# Production Architecture

## 1. Purpose

Madrasatu Darul Arkam is a professional School Management Information System (SMIS) designed for production use by the school authority.

The system must be secure, maintainable, modular, multilingual, and suitable for long-term operation and handover.

The initial deployment is for a single school.

## 2. Core Technology Architecture

### Application
- Next.js
- TypeScript
- App Router
- Production-first architecture
- Server-side and client-side separation where appropriate

### Database
- PostgreSQL
- Supabase
- Structured relational schema
- Database constraints
- Row Level Security (RLS)

### Authentication
- Supabase Auth
- Secure sessions
- Role-based access control (RBAC)

### Validation
- Zod or equivalent schema validation
- Server-side validation required
- Client-side validation for user experience

### Deployment
- Vercel or approved production hosting
- Production environment variables
- Secure secrets management
- HTTPS/SSL

### Testing
- Unit tests
- Integration tests
- End-to-end tests
- Security and authorization tests

## 3. High-Level System Structure

The system is organized into the following major domains:

1. Authentication & Authorization
2. School Administration
3. Student Management
4. Staff & Teacher Management
5. Academic Management
6. Attendance
7. Timetable Management
8. Assessment & Results
9. Secure Result Checker
10. Finance
11. Tahfiz / Islamic Education
12. Communication & Notifications
13. Reports & Analytics
14. AI-Assisted Services
15. Audit & Security
16. System Administration

## 4. Multilingual Architecture

Supported languages:

- English
- Hausa
- Arabic

Arabic must support true RTL layout.

The architecture must support:

- translated navigation
- translated forms
- translated validation messages
- translated system notifications
- RTL-aware layouts
- locale-aware formatting

Language support must be implemented as a system capability rather than duplicated application pages.

## 5. Authorization Architecture

Access control uses:

RBAC + database-level RLS.

Application permissions determine what users may attempt to access.

Database policies provide an additional security boundary.

No sensitive school data should depend only on frontend authorization.

## 6. Data Ownership

School operational data belongs to the school authority.

The production architecture must support independent school administration after handover.

Production credentials, database access, deployment access, backups, and domain control must be documented and transferred according to the commercial agreement.

## 7. Academic Architecture

Academic management includes:

- academic sessions
- terms
- classes
- sections
- subjects
- teachers
- teacher assignments
- attendance
- assessments
- examinations
- scores
- grading
- result computation
- comments
- academic reports

## 8. AI-Assisted Master Timetable

The Master Timetable must use a hybrid architecture.

The system must NOT depend on an LLM alone to produce timetables.

Architecture:

School Requirements
        ↓
AI Requirement Understanding
        ↓
Constraint Model
        ↓
Constraint-Based Timetable Solver
        ↓
Conflict Detection
        ↓
AI Optimization
        ↓
Proposed Master Timetable
        ↓
Human Approval
        ↓
Publish

### Constraint-Based Timetable Solver

The solver must handle hard constraints such as:

- teacher availability
- teacher clashes
- class clashes
- room clashes
- period availability
- required weekly subject periods
- school operating days
- breaks
- prayer periods
- assembly
- Jumu'ah constraints
- special school restrictions

Soft constraints may include:

- balanced teacher workload
- balanced student workload
- spreading difficult subjects
- preferred teaching periods
- preferred teacher schedules

The deterministic solver is responsible for validity.

AI may assist with:

- understanding natural-language requirements
- recommending constraints
- optimization
- alternative timetable proposals
- explaining scheduling decisions
- identifying conflicting requirements

A timetable must pass conflict validation before publication.

Final publication requires Human Approval.

## 9. Secure Result Checker

The Result Checker is a separate security-sensitive module.

It must provide controlled public verification without exposing unrelated student information.

Expected protections include:

- secure reference/verification code
- student identity verification
- session/term selection
- rate limiting
- abuse protection
- controlled result exposure
- audit logging where appropriate

Public users must not gain unrestricted database access.

## 10. Finance Architecture

Internal finance functionality may include:

- fee structures
- invoices
- payments
- balances
- receipts
- payment history
- outstanding fees
- financial summaries

Online payment gateway integration is deferred pending client approval and required provider credentials.

No fake payment integration is permitted.

## 11. Communication Architecture

Communication uses a provider-agnostic notification service.

Architecture:

School System
      ↓
Notification Service
   ↙     ↓      ↘
WhatsApp  SMS   Email

The system should support:

- announcements
- notices
- parent/guardian notifications
- academic notifications
- result notifications
- finance reminders
- notification templates
- notification logs

WhatsApp provider/API integration requires approved provider credentials.

The system must never pretend that a message was delivered when no real provider was configured.

## 12. AI Architecture

AI services must operate through controlled application services.

AI must not have unrestricted direct access to the production database.

AI capabilities may include:

- research assistance
- academic insights
- attendance analysis
- performance analysis
- management summaries
- curriculum/resource research
- natural-language reporting
- timetable assistance

All AI access must respect user permissions.

## 13. Audit & Security

Security architecture includes:

- authentication
- RBAC
- RLS
- input validation
- secure session management
- rate limiting
- audit logs
- secure environment variables
- security headers
- controlled public endpoints
- error handling
- database backup strategy

Sensitive actions should be auditable.

## 14. Production Environment

Separate environments should be maintained where practical:

- development
- testing/staging
- production

Production secrets must never be committed to Git.

## 15. Reusable Foundation

The system should be architected as a reusable professional School Management Foundation.

The Darul Arkam deployment remains a single-school implementation.

Reusable components may later be adapted for other school projects, subject to ownership and commercial agreements.

## 16. Explicit Architectural Non-Goals

The initial system will NOT require:

- multi-tenant school onboarding
- public school self-registration
- subscription billing engine
- marketplace
- fake integrations
- unrestricted AI database access
- unnecessary microservices
- unnecessary SaaS complexity

The architecture should remain modular enough to support future upgrades without forcing those features into the current project.

## 17. Handover Readiness

The architecture must support final handover including:

- source code
- production deployment
- database
- environment configuration
- administrator access
- backups
- documentation
- user training
- technical documentation

Ownership and access rights must follow the commercial agreement.
