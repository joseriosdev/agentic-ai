"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormAlert from "@/components/auth/form-alert";
import FormField from "@/components/auth/form-field";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/validations/auth";

type RegisterField = "name" | "email" | "password" | "confirmPassword";
type FieldErrors = Partial<Record<RegisterField, string>>;

interface RegisterResponse {
  success: boolean;
  error?: string;
}

function getFieldErrors(formData: FormData): FieldErrors | null {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));
  if (parsed.success) return null;

  const errors: FieldErrors = {};
  for (const issue of parsed.error.issues) {
    const field = issue.path[0] as RegisterField;
    errors[field] ??= issue.message;
  }
  return errors;
}

export default function RegisterForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(undefined);

    const errors = getFieldErrors(formData);
    setFieldErrors(errors ?? {});
    if (errors) return;

    setPending(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const result = (await response.json()) as RegisterResponse;

      if (!response.ok || !result.success) {
        setError(result.error ?? "Registration failed");
        setPending(false);
        return;
      }
      router.push("/sign-in?registered=1");
    } catch {
      setError("Something went wrong. Please try again.");
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <FormAlert message={error} />
        <FormField
          name="name"
          label="Name"
          autoComplete="name"
          error={fieldErrors.name}
          required
        />
        <FormField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={fieldErrors.email}
          required
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          error={fieldErrors.password}
          required
        />
        <FormField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          error={fieldErrors.confirmPassword}
          required
        />
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-foreground underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
