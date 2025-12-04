import React from 'react';
import { useForm } from 'react-hook-form';
import { GenerateCoverLetterRequest } from '@/types/coverLetter';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Loader2 } from 'lucide-react';

interface CoverLetterFormProps {
    onSubmit: (data: GenerateCoverLetterRequest) => void;
    isLoading: boolean;
}

export const CoverLetterForm: React.FC<CoverLetterFormProps> = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<GenerateCoverLetterRequest>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white dark:bg-neutral-900 p-6 rounded-xl border border-gray-200 dark:border-white/10">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Job Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Job Title</Label>
                        <Input
                            id="jobTitle"
                            placeholder="e.g. Senior Frontend Engineer"
                            {...register('jobTitle', { required: 'Job title is required' })}
                        />
                        {errors.jobTitle && <p className="text-sm text-red-500">{errors.jobTitle.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input
                            id="companyName"
                            placeholder="e.g. TechCorp"
                            {...register('companyName', { required: 'Company name is required' })}
                        />
                        {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <textarea
                        id="jobDescription"
                        className="w-full min-h-[150px] p-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
                        placeholder="Paste the job description here..."
                        {...register('jobDescription', { required: 'Job description is required' })}
                    />
                    {errors.jobDescription && <p className="text-sm text-red-500">{errors.jobDescription.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="tone">Tone</Label>
                    <select
                        id="tone"
                        className="w-full p-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        {...register('tone')}
                    >
                        <option value="professional">Professional</option>
                        <option value="enthusiastic">Enthusiastic</option>
                        <option value="confident">Confident</option>
                        <option value="formal">Formal</option>
                    </select>
                </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                    </>
                ) : (
                    'Generate Cover Letter'
                )}
            </Button>
        </form>
    );
};
