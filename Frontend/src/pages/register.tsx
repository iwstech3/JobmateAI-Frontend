import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { registerSchema, type RegisterInput } from '@/utils/validations/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuthStore } from '@/store/authStore';

export default function RegisterPage() {
    const { register: registerUser, isLoading } = useAuth(false);
    const { error } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterInput) => {
        try {
            await registerUser(data);
        } catch (err) {
            // Error handled by hook
        }
    };

    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-12 sm:px-6 lg:px-8"
            style={{ backgroundImage: "url('/images/auth-background.png')" }}
        >
            <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-slate-950/90">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>
                        Enter your information to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first_name">First name</Label>
                                <Input
                                    id="first_name"
                                    placeholder="John"
                                    {...register('first_name')}
                                />
                                {errors.first_name && (
                                    <p className="text-sm text-destructive">{errors.first_name.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last_name">Last name</Label>
                                <Input
                                    id="last_name"
                                    placeholder="Doe"
                                    {...register('last_name')}
                                />
                                {errors.last_name && (
                                    <p className="text-sm text-destructive">{errors.last_name.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-3 pt-2">
                            <Label>I am a...</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        value="job_seeker"
                                        className="peer sr-only"
                                        {...register('role')}
                                        defaultChecked
                                    />
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                                        <span className="font-semibold">Job Seeker</span>
                                        <span className="text-xs text-muted-foreground mt-1">Looking for jobs</span>
                                    </div>
                                </label>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio"
                                        value="employer"
                                        className="peer sr-only"
                                        {...register('role')}
                                    />
                                    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                                        <span className="font-semibold">Employer</span>
                                        <span className="text-xs text-muted-foreground mt-1">Hiring talent</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Create account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
