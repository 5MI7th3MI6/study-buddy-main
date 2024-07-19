'use client'
import { DialogHeader } from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { EditProfileSchema, EditProfileValues, User } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { updateUser } from "@/utils/db/user";
import toast from 'react-hot-toast';
import { supabase } from "@/utils/supabase/client";

interface EditProfileButtonProps {
    // eslint-disable-next-line no-unused-vars
    setOpen: (open: boolean) => void;
    user: User
}

export default function EditProfile({ setOpen, user }: EditProfileButtonProps) {
    const [loading, setLoading] = useState(false);

    const form = useForm<EditProfileValues>({
        resolver: zodResolver(EditProfileSchema),
        defaultValues: {
            username: user.username ?? "anonymous",
        },
    });

    const onSubmit = async (data: EditProfileValues) => {
        try {
            setLoading(true);
            const file_path = `avatars_${new Date().getTime()}`;
            if (data.avatar_file) {
                const { data: url } = await supabase.storage.from('avatars').upload(file_path, data.avatar_file, {
                    cacheControl: '3600',
                    upsert: true
                })
                if (!url) throw new Error("Error uploading avatar")

                await updateUser({
                    username: data.username,
                    avatar_url: url.path
                });
            }
            else {
                await updateUser({
                    username: data.username
                });
            }



            toast.success('Profile updated successfully')
        }
        catch (err: any) {
            toast.error(`Error: ${err}`);
        }
        finally {
            setLoading(false);
            setOpen(false);
        }

    };

    return (
        <>
            <DialogHeader>Edit Profile</DialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6" >
                    <FormField
                        name="username"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-around gap-5">
                                <FormLabel className="w-24">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="avatar_file"
                        control={form.control}
                        // eslint-disable-next-line no-unused-vars
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem className="flex items-center justify-around gap-5">
                                <FormLabel className="w-24">Avatar URL</FormLabel>
                                <FormControl>
                                    <Input
                                        {...fieldProps}
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) =>
                                            onChange(event.target.files && event.target.files[0])
                                        }
                                    />
                                </FormControl>
                                <FormMessage>{form.formState.errors.avatar_file?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <FormItem className="flex items-center justify-start gap-5">
                        <FormLabel>Current Avatar</FormLabel>
                        <FormControl>
                            <img
                                src={user.avatar_url ?? "/default.png"}
                                alt="Current Avatar"
                                className="w-24 h-24 rounded-full"
                            />
                        </FormControl>
                    </FormItem>
                    <Button className="w-full mt-6" type="submit" disabled={loading}>
                        Submit
                    </Button>
                </form>
            </Form >
        </>
    );
}
