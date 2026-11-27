import { Suspense } from "react";
import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import SignInForm from "@/components/auth/sign-in-form";

export const metadata: Metadata = {
  title: "Sign in - DevStash",
};

export default function SignInPage() {
  return (
    <AuthCard title="Welcome back" description="Sign in to your DevStash account">
      {/* The form reads search params, which must sit behind Suspense. */}
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthCard>
  );
}
