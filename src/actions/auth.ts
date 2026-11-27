"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { safeRedirect } from "@/lib/safe-redirect";
import { signInSchema } from "@/lib/validations/auth";

export interface SignInState {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
  email?: string;
}

export async function signInWithCredentials(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const email = formData.get("email");
  const parsed = signInSchema.safeParse({
    email,
    password: formData.get("password"),
  });
  const submittedEmail = typeof email === "string" ? email : "";

  if (!parsed.success) {
    const fieldErrors: SignInState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if ((field === "email" || field === "password") && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return { fieldErrors, email: submittedEmail };
  }

  try {
    await signIn("credentials", {
      ...parsed.data,
      redirectTo: safeRedirect(formData.get("callbackUrl")),
    });
    return {};
  } catch (error) {
    // A successful sign-in throws a redirect, which must be re-thrown.
    if (error instanceof AuthError) {
      return {
        error:
          error.type === "CredentialsSignin"
            ? "Invalid email or password"
            : "Something went wrong. Please try again.",
        email: submittedEmail,
      };
    }
    throw error;
  }
}

export async function signInWithGitHub(formData: FormData): Promise<void> {
  await signIn("github", {
    redirectTo: safeRedirect(formData.get("callbackUrl")),
  });
}

export async function signOutUser(): Promise<void> {
  await signOut({ redirectTo: "/sign-in" });
}
