"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { activateInvitedAccount } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/client";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/types/i18n";

interface SetPasswordFormProps {
  locale: Locale;
  dictionary: Dictionary;
}

const initialState = {
  error: null,
  success: false,
};

export function SetPasswordForm({
  locale,
  dictionary,
}: SetPasswordFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    activateInvitedAccount.bind(null, locale),
    initialState,
  );

  const [sessionReady, setSessionReady] = useState(false);
  const [sessionInvalid, setSessionInvalid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) {
        return;
      }

      if (!user) {
        setSessionInvalid(true);
      } else {
        setSessionReady(true);
      }
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!state.success) {
      return;
    }

    const timer = window.setTimeout(() => {
      router.push(`/${locale}/login`);
      router.refresh();
    }, 1800);

    return () => window.clearTimeout(timer);
  }, [locale, router, state.success]);

  if (!sessionReady && !sessionInvalid) {
    return (
      <p className="auth-form__status">
        {dictionary.auth.checkingInvitationSession}
      </p>
    );
  }

  if (sessionInvalid) {
    return (
      <div className="auth-form__error" role="alert">
        {dictionary.auth.invitationSessionInvalid}
      </div>
    );
  }

  return (
    <form action={formAction} className="auth-form">
      <div className="form-field">
        <label htmlFor="new-password">
          {dictionary.auth.newPassword}
        </label>

        <div className="password-field">
          <input
            id="new-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            disabled={pending}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={
              showPassword
                ? dictionary.auth.hidePassword
                : dictionary.auth.showPassword
            }
          >
            {showPassword
              ? dictionary.auth.hidePassword
              : dictionary.auth.showPassword}
          </button>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="confirm-password">
          {dictionary.auth.confirmPassword}
        </label>

        <div className="password-field">
          <input
            id="confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            disabled={pending}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword((value) => !value)
            }
            aria-label={
              showConfirmPassword
                ? dictionary.auth.hidePassword
                : dictionary.auth.showPassword
            }
          >
            {showConfirmPassword
              ? dictionary.auth.hidePassword
              : dictionary.auth.showPassword}
          </button>
        </div>
      </div>

      {state.error && (
        <p className="auth-form__error" role="alert">
          {state.error}
        </p>
      )}

      {state.success && (
        <p className="auth-form__success" role="status">
          {dictionary.auth.passwordSetSuccess}
        </p>
      )}

      {!state.success && (
        <button
          type="submit"
          className="auth-form__submit"
          disabled={pending}
        >
          {pending
            ? dictionary.auth.settingPassword
            : dictionary.auth.setPassword}
        </button>
      )}
    </form>
  );
}
