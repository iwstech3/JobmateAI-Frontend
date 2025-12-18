import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { HRDashboardLayout } from '@/components/layout/HRDashboardLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { CreateJobDto, JobType } from '@/types/job';
import { useJobStore } from '@/store/jobStore';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function PostJobPage() {
    const router = useRouter();
    const { createJob, isLoading, error } = useJobStore();
    const { register, handleSubmit, formState: { errors } } = useForm<CreateJobDto>();

    const onSubmit = async (data: CreateJobDto) => {
        // Convert requirements string to array if it's coming as a string from a textarea
        // For this simple implementation, we'll assume the user enters comma-separated values or new lines
        // But for better UX, we might want a dynamic list input. 
        // For now, let's handle it as a simple text area and split by newline.

        // @ts-ignore - handling the form input which might be different from the DTO
        const formattedData = {
            ...data,
            requirements: typeof data.requirements === 'string'
                ? (data.requirements as string).split('\n').filter((r: string) => r.trim() !== '')
                : data.requirements
        };

        try {
            await createJob(formattedData);
            router.push('/hr/jobs');
        } catch (err) {
            // Error is handled by store
        }
    };

    return (
        <HRDashboardLayout>
            <Head>
                <title>Post New Job - JobMate AI</title>
            </Head>

            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link href="/hr/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Post a New Job</h1>
                        <p className="text-gray-500 dark:text-gray-400">Create a job listing to find your next great hire.</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    {...register('title', { required: 'Job title is required' })}
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    id="company"
                                    placeholder="e.g. TechCorp"
                                    {...register('company', { required: 'Company name is required' })}
                                />
                                {errors.company && <p className="text-sm text-red-500">{errors.company.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    placeholder="e.g. Remote, New York, NY"
                                    {...register('location', { required: 'Location is required' })}
                                />
                                {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Job Type</Label>
                                <select
                                    id="type"
                                    className="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                                    {...register('type', { required: 'Job type is required' })}
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Internship">Internship</option>
                                </select>
                                {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="salaryRange">Salary Range (Optional)</Label>
                            <Input
                                id="salaryRange"
                                placeholder="e.g. $120k - $150k"
                                {...register('salaryRange')}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Job Description</Label>
                            <textarea
                                id="description"
                                className="w-full min-h-[150px] p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
                                placeholder="Describe the role, responsibilities, and what you're looking for..."
                                {...register('description', { required: 'Description is required' })}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="requirements">Requirements (One per line)</Label>
                            <textarea
                                id="requirements"
                                className="w-full min-h-[150px] p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
                                placeholder="• 5+ years of React experience&#10;• Strong TypeScript skills&#10;• Experience with Next.js"
                                {...register('requirements', { required: 'Requirements are required' })}
                            />
                            {errors.requirements && <p className="text-sm text-red-500">{errors.requirements.message}</p>}
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Link href="/hr/dashboard">
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Job'
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </HRDashboardLayout>
    );
}
