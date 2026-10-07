 "use client";

import { useActionState } from "react";

import {
  inviteUser,
  type InvitableRole,
} from "@/lib/auth/actions";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/types/i18n";

interface InviteUserFormProps {
  locale: Locale;
  dictionary: Dictionary;
}

const initialState = {
  error: null,
  success: false,
};

const roles: readonly InvitableRole[] = [
  "school_administrator",
  "principal",
  "teacher",
  "accountant",
  "student",
  "parent_guardian",
  "result_checker",
];

export function InviteUserForm({
  locale,
  dictionary,
}: InviteUserFormProps) {
  const [state, formAction, pending] = useActionState(
    inviteUser.bind(null, locale),
    initialState,
  );

  const roleLabels: Record<InvitableRole, string> = {
    school_administrator:
      dictionary.auth.roleSchoolAdministrator,
    principal: dictionary.auth.rolePrincipal,
    teacher: dictionary.auth.roleTeacher,
    accountant: dictionary.auth.roleAccountant,
    student: dictionary.auth.roleStudent,
    parent_guardian:
      dictionary.auth.roleParentGuardian,
    result_checker:
      dictionary.auth.roleResultChecker,
  };

  return (
    <form action={formAction} className="auth-form">
      <div className="form-field">
        <label htmlFor="invite-full-name">
          {dictionary.auth.fullName}
        </label>

        <input
          id="invite-full-name"
          name="fullName"
          type="text"
          autoComplete="name"
          maxLength={120}
          required
          disabled={pending}
        />
      </div>

      <div className="form-field">
        <label htmlFor="invite-email">
          {dictionary.auth.email}
        </label>

        <input
          id="invite-email"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={254}
          required
          disabled={pending}
        />
      </div>

      <div className="form-field">
        <label htmlFor="invite-role">
          {dictionary.auth.role}
        </label>

        <select
          id="invite-role"
          name="role"
          defaultValue=""
          required
          disabled={pending}
        >
          <option value="" disabled>
            {dictionary.auth.selectRole}
          </option>

          {roles.map((role) => (
            <option key={role} value={role}>
              {roleLabels[role]}
            </option>
          ))}
        </select>
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="auth-form__success" role="status">
          {dictionary.auth.invitationSent}
        </p>
      )}

      <button
        type="submit"
        className="auth-form__submit"
        disabled={pending}
      >
        {pending
          ? dictionary.auth.invitingUser
          : dictionary.auth.inviteUser}
      </button>
    </form>
  );
}
