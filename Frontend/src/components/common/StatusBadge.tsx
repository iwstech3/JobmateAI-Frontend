import React from 'react';
import { ApplicationStatus } from '@/types/application';

interface StatusBadgeProps {
    status: ApplicationStatus;
}

const statusStyles: Record<ApplicationStatus, string> = {
    'Submitted': 'bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300 border-gray-200 dark:border-gray-500/30',
    'Screening': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-500/30',
    'Shortlisted': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border-blue-200 dark:border-blue-500/30',
    'Interview Scheduled': 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/30',
    'Rejected': 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 border-red-200 dark:border-red-500/30',
    'Accepted': 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 border-green-200 dark:border-green-500/30',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
};
