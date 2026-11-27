"use client";

import { useFormStatus } from "react-dom";
import { Github } from "lucide-react";
import { signInWithGitHub } from "@/actions/auth";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="outline" className="w-full" disabled={pending}>
      <Github />
      {pending ? "Redirecting..." : "Sign in with GitHub"}
    </Button>
  );
}

export default function GitHubSignInButton({ callbackUrl }: { callbackUrl: string }) {
  return (
    <form action={signInWithGitHub}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <SubmitButton />
    </form>
  );
}
