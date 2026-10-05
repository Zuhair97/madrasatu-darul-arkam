# MADRASATU DARUL ARKAM
# Roles & Permissions Baseline

## 1. Purpose

This document defines the initial role and permission model for the School Management Information System.

Authorization must be enforced at both application and database levels where appropriate.

## 2. SUPER ADMIN

Highest system administration role.

Permissions may include:

- manage users
- manage roles
- manage permissions
- manage school configuration
- manage academic sessions
- manage classes
- manage subjects
- manage staff
- manage students
- manage finance
- manage results
- manage timetable
- manage Tahfiz
- manage communications
- access reports
- access audit logs
- manage system settings

SUPER ADMIN access must be highly restricted.

## 3. School Administrator

Operational administration role.

Permissions may include:

- manage students
- manage staff
- manage classes
- manage subjects
- manage sessions
- manage attendance
- manage academic records
- manage results
- manage timetable
- view reports
- manage approved communications

Sensitive system-level settings remain restricted.

## 4. Principal / Head

Management and oversight role.

Permissions may include:

- view student information
- view staff information
- view attendance
- view academic performance
- review results
- approve published results where required
- review timetable
- approve timetable publication
- view financial summaries
- view management reports
- access permitted AI insights

## 5. Teacher

Teaching role.

Permissions may include:

- view assigned classes
- view assigned students
- record attendance
- enter assessments
- enter scores
- view relevant academic records
- manage assigned subject data
- participate in timetable workflows
- view permitted student progress

Teachers must not access unrelated administrative or financial data.

## 6. Accountant

Finance role.

Permissions may include:

- manage fee structures
- record payments
- issue receipts
- view student fee information
- manage outstanding balances
- generate finance reports

Accountants must not automatically receive unrestricted academic administration access.

## 7. Student

Student role.

Permissions may include:

- view own profile
- view own academic information
- view own attendance where enabled
- view own results
- view approved announcements
- access permitted learning information

Students must not access other students' records.

## 8. Parent / Guardian

Parent/guardian role.

Permissions may include:

- view linked student's profile
- view linked student's attendance
- view linked student's results
- view approved academic information
- receive notifications
- view approved fee information

A guardian must only access students explicitly linked to that guardian.

## 9. Result Checker / Public User

Unauthenticated or limited public role.

Permissions are intentionally restricted.

May:

- submit a valid result verification request
- receive the permitted result verification response

Must NOT:

- browse students
- search unrestricted student records
- access internal dashboards
- access teacher information
- access finance
- access audit logs
- access database APIs directly

Rate limiting and abuse protection are required.

## 10. Permission Domains

Permissions should be organized by domain:

- users
- roles
- students
- guardians
- staff
- teachers
- classes
- subjects
- attendance
- assessments
- examinations
- results
- timetable
- finance
- Tahfiz
- communications
- reports
- AI services
- audit logs
- system configuration

## 11. Data Access Principle

Access should follow:

Role + Permission + Resource Ownership/Scope.

Examples:

- A teacher may access assigned classes.
- A guardian may access linked students.
- A student may access only their own records.
- A public result checker may access only the requested verification result.

## 12. AI Authorization

AI services inherit the user's authorization boundary.

AI must not bypass:

- RBAC
- RLS
- resource ownership
- school data access rules

## 13. Audit Requirements

Sensitive actions should be auditable, including where appropriate:

- user creation
- role changes
- permission changes
- result changes
- result publication
- timetable approval
- financial record changes
- administrative configuration changes

## 14. Handover

The school authority shall receive the appropriate administrator access required to operate the production system after handover.

Credentials must be transferred securely and must not be hard-coded in source code.
