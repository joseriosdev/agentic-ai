"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signInWithCredentials, type SignInState } from "@/actions/auth";
import FormAlert from "@/components/auth/form-alert";
import FormField from "@/components/auth/form-field";
import GitHubSignInButton from "@/components/auth/github-sign-in-button";
import { Button } from "@/components/ui/button";
import { safeRedirect } from "@/lib/safe-redirect";

const INITIAL_STATE: SignInState = {};

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = safeRedirect(searchParams.get("callbackUrl"));
  const registered = searchParams.get("registered") === "1";
  const [state, formAction, pending] = useActionState(
    signInWithCredentials,
    INITIAL_STATE,
  );

  return (
    <div className="flex flex-col gap-6">
      <form action={formAction} noValidate className="flex flex-col gap-4">
        {registered && !state.error && (
          <FormAlert variant="success" message="Account created. Please sign in." />
        )}
        <FormAlert message={state.error} />
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          defaultValue={state.email}
          error={state.fieldErrors?.email}
          required
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          error={state.fieldErrors?.password}
          required
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase">
        <span className="h-px flex-1 bg-border" />
        or
        <span className="h-px flex-1 bg-border" />
      </div>

      <GitHubSignInButton callbackUrl={callbackUrl} />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-foreground underline-offset-4 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
