"use client";

import { useActionState } from "react";

import type { Locale } from "@/i18n/config";
import {
  requestPasswordReset,
  type PasswordResetState,
} from "@/lib/auth/actions";

interface ForgotPasswordFormProps {
  locale: Locale;
  labels: {
    email: string;
    submit: string;
    submitting: string;
    backToLogin: string;
    success: string;
  };
  initialState: PasswordResetState;
}

export function ForgotPasswordForm({
  locale,
  labels,
  initialState,
}: ForgotPasswordFormProps) {
  const [state, formAction, pending] = useActionState(
    requestPasswordReset.bind(null, locale),
    initialState,
  );

  return (
    <form action={formAction} className="auth-form">
      <div className="form-field">
        <label htmlFor="email">{labels.email}</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          inputMode="email"
        />
      </div>

      {state.success ? (
        <p className="auth-form__success" role="status">
          {labels.success}
        </p>
      ) : null}

      {state.error ? (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        className="auth-form__submit"
        disabled={pending}
      >
        {pending ? labels.submitting : labels.submit}
      </button>

      <a
        href={`/${locale}/login`}
        className="auth-form__link"
      >
        {labels.backToLogin}
      </a>
    </form>
  );
}
