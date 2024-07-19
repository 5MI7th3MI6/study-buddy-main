import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function LogoutButton() {
    const router = useRouter();

    const signOut = () => {
        const supabase = createClient();
        supabase.auth.signOut()
            .then(() => {
                router.push('/login');
            })
            .catch(error => {
                console.error('Error signing out:', error.message);
            });
    };

    return (
        <DropdownMenuItem onClick={signOut}>
            Logout
        </DropdownMenuItem>
    );
}
