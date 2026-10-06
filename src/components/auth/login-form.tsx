"use client";

import { useActionState, useState } from "react";

import type { Locale } from "@/i18n/config";
import { login, type LoginState } from "@/lib/auth/actions";

interface LoginFormProps {
  locale: Locale;
  labels: {
    email: string;
    password: string;
    login: string;
    loggingIn: string;
    forgotPassword: string;
    showPassword: string;
    hidePassword: string;
  };
  initialState: LoginState;
}

export function LoginForm({
  locale,
  labels,
  initialState,
}: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    login.bind(null, locale),
    initialState,
  );

  const [showPassword, setShowPassword] = useState(false);

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

      <div className="form-field">
        <label htmlFor="password">{labels.password}</label>

        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={
              showPassword ? labels.hidePassword : labels.showPassword
            }
          >
            {showPassword ? labels.hidePassword : labels.showPassword}
          </button>
        </div>
      </div>

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
        {pending ? labels.loggingIn : labels.login}
      </button>

      <a
        href={`/${locale}/forgot-password`}
        className="auth-form__link"
      >
        {labels.forgotPassword}
      </a>
    </form>
  );
}
