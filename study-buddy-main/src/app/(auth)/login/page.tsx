'use server'
import Link from "next/link"
import { login } from "@/utils/auth/actions"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function Login({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const errorMessage = searchParams?.error ? "Invalid email or password" : ""

  return (
    <>
      <div className="grid gap-2 text-center">
        <h1 className="text-2xl font-bold">Login</h1>
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
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              Forgot your password?
            </Link> */}
          </div>
          <Input id="password" type="password" required name="password"
          />
        </div>
        <SubmitButton
          formAction={login}
          className="w-full bg-primary"
          pendingText="Logging In...">
          Login
        </SubmitButton>
        {errorMessage && (
          <div className="text-error text-red-500 mx-auto">{errorMessage}</div>
        )}
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Sign up
        </Link>
      </div>
    </>
  )
}
