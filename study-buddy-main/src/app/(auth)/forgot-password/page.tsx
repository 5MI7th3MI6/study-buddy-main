'use server'
import Link from "next/link"
import { forgetPassword } from "@/utils/auth/actions"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default async function ForgotPassword({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const successMessage = searchParams?.success ? "Check your email for the reset link" : ""
    const errorMessage = searchParams?.error ? "Invalid email or unable to process request" : ""

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-xl font-bold">Forgot Password</h1>
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
                <SubmitButton
                    formAction={forgetPassword}
                    className="w-full bg-primary"
                    pendingText="Sending Reset Link...">
                    Send Reset Link
                </SubmitButton>
                {successMessage && (
                    <div className="text-success text-green-500 mx-auto">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-error text-red-500 mx-auto">{errorMessage}</div>
                )}
            </form>
            <div className="mt-4 text-center text-sm">
                Remembered your password?{" "}
                <Link href="/login" className="underline">
                    Login
                </Link>
            </div>
        </>
    )
}
