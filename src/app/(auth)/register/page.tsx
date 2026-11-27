import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Register - DevStash",
};

export default function RegisterPage() {
  return (
    <AuthCard title="Create an account" description="Start stashing your developer knowledge">
      <RegisterForm />
    </AuthCard>
  );
}
