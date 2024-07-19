'use server'
import Link from 'next/link';
import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { resetPassword } from '@/utils/auth/actions';

export default async function ResetPassword({ searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const successMessage = searchParams?.success ? "Password reset successful" : ""
    const errorMessage = searchParams?.error ? "Invalid email or unable to process request" : ""

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-xl font-bold">Reset Password</h1>
            </div>
            <form className="grid gap-4" >
                <div className="grid gap-2">
                    <Label htmlFor="password">New Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder=""
                        name="password"
                        required
                    />
                </div>
                <SubmitButton
                    formAction={resetPassword}
                    className="w-full bg-primary"
                    pendingText="Resetting password...">
                    Reset passowrd
                </SubmitButton>
                {successMessage && (
                    <div className="text-success text-green-500 mx-auto">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="text-error text-red-500 mx-auto">{errorMessage}</div>
                )}
            </form>
            <div className="mt-4 text-center text-sm">
                Remembered your password?{' '}
                <Link href="/login" passHref>
                    Login
                </Link>
            </div>
        </>
    );
}
