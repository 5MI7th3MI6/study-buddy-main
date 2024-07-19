'use server'
import Link from "next/link"
import { signup } from "@/utils/auth/actions"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function Register({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const errorMessage = searchParams?.error ? "An error occurred" : null
  const limitError = searchParams?.limit ? "Free emails limit reached. Use an SMTP provider for Supabase" : null

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-bold">Create a new account</h1>
      </div>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            name="email"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Username</Label>
          <Input
            id="username"
            type="username"
            placeholder="anon"
            name="username"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" required name="password"
          />
        </div>
        <SubmitButton
          formAction={signup}
          className="w-full bg-primary"
          pendingText="Signing up...">
          Sign up
        </SubmitButton>
        {errorMessage && (
          <div className="text-error text-red-500 mx-auto">{errorMessage}</div>
        )}
        {limitError && (
          <div className="text-error text-red-500 mx-auto">{limitError}</div>
        )}
      </form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  )
}
