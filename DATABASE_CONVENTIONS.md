# Madrasatu Darul Arkam — Database Conventions

## Purpose

This document defines the database engineering conventions for Madrasatu Darul Arkam.

All future PostgreSQL and Supabase migrations must follow these standards unless a documented architectural decision requires an exception.

The goal is to keep the database secure, consistent, auditable, maintainable, performant, and production-ready.

## 1. Database Platform

The application database is PostgreSQL through Supabase.

Database design must use PostgreSQL capabilities deliberately while keeping application authorization and business logic maintainable.

## 2. Primary Keys

UUIDs are preferred for primary keys.

Primary keys must be stable, unique, and suitable for distributed application workflows.

Do not prescribe a specific UUID generation extension unless that extension is explicitly enabled and required by the project.

## 3. Timestamp Standard

All lifecycle timestamps should use:

created_at timestamptz not null default timezone('utc', now())
updated_at timestamptz not null default timezone('utc', now())

Rules:
- Use timestamptz.
- Store timestamps in UTC.
- Convert to local timezone only at presentation layer.
- created_at records creation time.
- updated_at records latest modification time.

## 4. Updated Timestamp Automation

Tables containing updated_at should use:

public.set_updated_at()

The database should maintain updated_at automatically.

## 5. Immutable Creation Timestamp

created_at should normally be immutable after record creation.

Security-sensitive records must not allow ordinary updates to rewrite their creation timestamp.

## 6. Naming Conventions

Use snake_case for PostgreSQL identifiers.

Examples:
- student_id
- full_name
- academic_session_id
- created_at
- updated_at
- guardian_phone

Table names should normally be plural.

Examples:
- profiles
- students
- staff
- subjects
- classes
- sections
- attendance_records
- exam_results

## 7. Foreign Keys

Foreign keys must explicitly describe relationships between tables.

Delete behavior must be intentional.

Use ON DELETE CASCADE only when child records should truly disappear with the parent.

Use ON DELETE RESTRICT or ON DELETE SET NULL where historical records must be preserved.

Financial, academic, attendance, result, and audit records should generally not be casually cascade-deleted.

## 8. Constraints

Business rules that PostgreSQL can safely enforce should be enforced at database level.

Use:
- NOT NULL
- UNIQUE
- CHECK
- FOREIGN KEY
- Controlled enum or status constraints

Application validation remains necessary, but database constraints provide the final integrity boundary.

## 9. Uniqueness

Use database-level unique constraints when a value must be unique.

Possible examples:
- admission_number
- staff_number
- result_reference

Exact uniqueness rules must be determined by domain requirements before implementation.

Do not create unnecessary unique constraints.

## 10. Indexing

Indexes must be added deliberately.

Good candidates commonly include:
- Foreign-key columns
- Frequently filtered fields
- Frequently searched reference numbers
- Frequently queried dates
- Authorization lookup fields
- Proven composite query patterns

Avoid indexing every column.

Indexes have storage and write-performance costs.

Every important index should have a clear query, reporting, or authorization reason.

## 11. Foreign-Key Indexing

Foreign-key columns used frequently for joins, filtering, authorization, or reporting should normally have indexes.

Indexing decisions should follow real application query patterns.

## 12. Soft Deletion

Do not automatically add deleted_at to every table.

Use soft deletion only where business requirements require historical preservation or recoverability.

For academic, financial, attendance, result, and audit records, controlled archival or status-based lifecycle management may be more appropriate.

## 13. Status Fields

Status fields must use controlled values.

For small and stable state machines, PostgreSQL enums may be appropriate.

For business states that may evolve frequently, constrained text or dedicated reference tables may be preferable.

Status transitions should be validated at application and, where necessary, database level.


## 14. Auditability

Sensitive operations must eventually be auditable.

Examples include:
- User creation
- Role changes
- Permission changes
- Result changes
- Result publication
- Result verification
- Financial changes
- Payment recording
- Fee adjustments
- Timetable approval
- Administrative configuration changes

Audit records should preserve enough information to establish:
- Who performed the action
- What happened
- When it happened
- Which record was affected
- Previous state where appropriate
- New state where appropriate

Audit architecture will be implemented in a dedicated future task.

## 15. Sensitive Data

Sensitive information must not be exposed unnecessarily.

Database design must follow least privilege.

Examples:
- Students must not see other students' private records.
- Parents/guardians may only access linked students.
- Teachers may only access authorized academic scopes.
- Accountants may access authorized finance records.
- Public result checking must use a controlled verification path.

RLS must protect sensitive application tables.

## 16. Authentication Identity

Supabase Auth is the source of authenticated user identity.

Application profile information belongs in:
public.profiles

and is linked to:
auth.users(id)

Application roles and statuses must not be trusted merely because a client sends them in a request.

## 17. Authorization

Authorization follows:

Role
  +
Permission
  +
Resource Ownership / Scope
  =
Authorized Access

Examples:
- Teacher → assigned classes and authorized academic scope
- Parent/Guardian → linked students
- Student → own records
- Accountant → authorized finance records
- Public Result Checker → controlled verification only

RLS remains a database-level enforcement layer.

## 18. Public Verification Endpoints

Public result verification must never expose unrestricted database access.

The result checker architecture must use:
- Controlled lookup
- Minimal returned information
- Secure reference design
- Abuse protection
- Rate limiting
- Audit logging
- No unrestricted table exposure

This will be implemented in the Secure Result Checker module.

## 19. Migration Conventions

Database changes must be introduced through versioned migrations.

Migration files should use sequential names:
0001_core_identity.sql
0002_<domain>.sql
0003_<domain>.sql

Each migration should have:
- Clear purpose
- Clear scope
- Safe ordering
- Explicit constraints
- Appropriate indexes
- RLS where required
- Comments for security-sensitive behavior

Avoid mixing unrelated domains into one migration.

## 20. Migration Safety

Before committing a migration:
1. Inspect the current schema.
2. Confirm dependencies.
3. Review foreign keys.
4. Review delete behavior.
5. Review indexes.
6. Review RLS.
7. Review security-sensitive functions.
8. Check for accidental secrets.
9. Validate SQL structure.
10. Review the Git diff.

Production migrations must never depend on fake data.


## 21. Security Definer Functions

SECURITY DEFINER functions must only be used when necessary.

Such functions must:
- Set a controlled search_path
- Have appropriate execution privileges
- Have a narrowly defined purpose
- Avoid unnecessary public execution
- Never expose privileged operations as unrestricted RPCs

Security-sensitive functions are part of the authorization boundary.

## 22. Secrets

Secrets must never be stored in:
- SQL migrations
- Source code
- Git history
- Public environment variables
- Documentation

Never expose a Supabase service-role credential through a NEXT_PUBLIC_* variable.

Service-role credentials, when genuinely required, must remain server-only.

## 23. Data Integrity Principle

The database should enforce rules that must never be violated.

Architecture:

Application Validation
        ↓
Database Constraints
        ↓
RLS / Authorization
        ↓
Persistent Data

No frontend check should be considered sufficient protection for sensitive data.

## 24. UTC and Localization

Database timestamps remain UTC.

Localization belongs to the application layer.

The application supports:
- English
- Hausa
- Arabic

Arabic presentation uses RTL, but database storage remains language-neutral and timezone-neutral.

## 25. Reporting and Historical Data

Academic and financial records may require long-term historical preservation.

Delete behavior must not accidentally destroy:
- Student academic history
- Published results
- Attendance history
- Financial records
- Payment records
- Audit records

Historical preservation requirements must be considered before defining destructive foreign-key behavior.


## 26. Performance Principle

Optimize based on real query patterns.

Preferred order:
Correct schema
→ Correct constraints
→ Correct indexes
→ Query inspection
→ Targeted optimization

Do not prematurely introduce:
- Unnecessary caching
- Excessive indexes
- Unnecessary denormalization
- Complex database procedures
- Triggers for ordinary business logic

## 27. Reusable Foundation Principle

The database architecture should be reusable for future school-management deployments.

The current Madrasatu Darul Arkam deployment is a commissioned single-school system.

Do not introduce multi-tenant infrastructure unless a future project explicitly requires it.

## 28. Current Foundation

Migration 0001_core_identity.sql establishes:
- user_role
- user_status
- profiles
- UTC timestamps
- set_updated_at()
- Supabase Auth profile creation
- Current-user role helper
- Profile RLS
- Protection of authoritative profile fields

Future migrations must build on this foundation rather than creating competing conventions.

## 29. Engineering Rule

For every new persistent table, answer:
1. What is the primary key?
2. Which fields are required?
3. What are the foreign keys?
4. What happens on deletion?
5. What constraints protect integrity?
6. Which fields require uniqueness?
7. Which indexes are justified?
8. Does it require created_at?
9. Does it require updated_at?
10. Does it require RLS?
11. Which roles can access it?
12. Which ownership/scope rules apply?
13. Which actions require audit logging?
14. Does the table contain sensitive information?
15. Can the design preserve required historical records?

A table is not production-ready until these questions have been answered.

## 30. Standard

The database must remain:

Secure → Consistent → Auditable → Maintainable → Performant → Production-ready

Any exception to these conventions should be intentional, documented, and reviewable.

