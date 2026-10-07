"use client";

import { useActionState, useEffect, useState } from "react";

import type { Locale } from "@/i18n/config";
import { createClient } from "@/lib/supabase/client";
import {
  updatePassword,
  type UpdatePasswordState,
} from "@/lib/auth/actions";

interface ResetPasswordFormProps {
  locale: Locale;
  labels: {
    password: string;
    confirmPassword: string;
    updatePassword: string;
    updatingPassword: string;
    showPassword: string;
    hidePassword: string;
    success: string;
    invalidSession: string;
    checkingSession: string;
    backToLogin: string;
  };
  initialState: UpdatePasswordState;
}

export function ResetPasswordForm({
  locale,
  labels,
  initialState,
}: ResetPasswordFormProps) {
  const [state, formAction, pending] = useActionState(
    updatePassword.bind(null, locale),
    initialState,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data.session) {
        setSessionError(true);
        return;
      }

      setSessionReady(true);
    });
  }, []);

  if (sessionError) {
    return (
      <div className="auth-form">
        <p className="auth-form__error" role="alert">
          {labels.invalidSession}
        </p>

        <a
          href={`/${locale}/login`}
          className="auth-form__link"
        >
          {labels.backToLogin}
        </a>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <p className="auth-form__status" role="status">
        {labels.checkingSession}
      </p>
    );
  }

  return (
    <form action={formAction} className="auth-form">
      <div className="form-field">
        <label htmlFor="password">{labels.password}</label>

        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={
              showPassword
                ? labels.hidePassword
                : labels.showPassword
            }
          >
            {showPassword
              ? labels.hidePassword
              : labels.showPassword}
          </button>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="confirmPassword">
          {labels.confirmPassword}
        </label>

        <div className="password-field">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword((value) => !value)
            }
            aria-label={
              showConfirmPassword
                ? labels.hidePassword
                : labels.showPassword
            }
          >
            {showConfirmPassword
              ? labels.hidePassword
              : labels.showPassword}
          </button>
        </div>
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

      {!state.success ? (
        <button
          type="submit"
          className="auth-form__submit"
          disabled={pending}
        >
          {pending
            ? labels.updatingPassword
            : labels.updatePassword}
        </button>
      ) : null}

      {state.success ? (
        <a
          href={`/${locale}/login`}
          className="auth-form__link"
        >
          {labels.backToLogin}
        </a>
      ) : null}
    </form>
  );
}
