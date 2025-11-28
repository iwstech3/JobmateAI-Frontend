import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { SettingsLayout } from '@/components/settings/SettingsLayout';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { PrivacySettings } from '@/components/settings/PrivacySettings';
import { UserSettings } from '@/types/settings';

// Mock initial settings
const INITIAL_SETTINGS: UserSettings = {
    profile: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phoneNumber: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        bio: 'Passionate software engineer with 5+ years of experience in web development.',
    },
    appearance: {
        theme: 'dark',
        language: 'en',
        dateFormat: 'MM/DD/YYYY',
        timeFormat: '12h',
    },
    jobPreferences: {
        jobTypes: ['Full-time', 'Contract'],
        workModes: ['Remote', 'Hybrid'],
        salaryRange: {
            min: 100000,
            max: 150000,
            currency: 'USD',
        },
        preferredLocations: ['San Francisco, CA', 'New York, NY', 'Remote'],
        industries: ['Technology', 'Finance', 'Healthcare'],
        experienceLevel: 'Senior',
    },
    notifications: {
        email: {
            newJobMatches: true,
            applicationUpdates: true,
            interviewReminders: true,
            weeklyDigest: false,
        },
        push: {
            enabled: true,
        },
        frequency: 'instant',
    },
    autoApply: {
        enabled: false,
        minMatchPercentage: 80,
        maxApplicationsPerDay: 5,
        excludedCompanies: [],
    },
    privacy: {
        profileVisibility: 'recruiters',
        allowAnalytics: true,
        twoFactorEnabled: false,
    },
    integrations: [
        { name: 'LinkedIn', connected: false },
        { name: 'Google Calendar', connected: false },
        { name: 'GitHub', connected: false },
    ],
};

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('profile');
    const [settings, setSettings] = useState<UserSettings>(INITIAL_SETTINGS);
    const [showToast, setShowToast] = useState(false);

    // Load settings from localStorage on mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('userSettings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    const handleSaveProfile = (profile: UserSettings['profile']) => {
        const newSettings = { ...settings, profile };
        setSettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
        showSuccessToast();
    };

    const handleSaveAppearance = (appearance: UserSettings['appearance']) => {
        const newSettings = { ...settings, appearance };
        setSettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
        showSuccessToast();
    };

    const handleSaveNotifications = (notifications: UserSettings['notifications']) => {
        const newSettings = { ...settings, notifications };
        setSettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
        showSuccessToast();
    };

    const handleSavePrivacy = (privacy: UserSettings['privacy']) => {
        const newSettings = { ...settings, privacy };
        setSettings(newSettings);
        localStorage.setItem('userSettings', JSON.stringify(newSettings));
        showSuccessToast();
    };

    const showSuccessToast = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSettings profile={settings.profile} onSave={handleSaveProfile} />;
            case 'appearance':
                return <AppearanceSettings settings={settings.appearance} onSave={handleSaveAppearance} />;
            case 'job-preferences':
                return (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Job Preferences</h2>
                        <p className="text-gray-500 dark:text-gray-400">Coming soon...</p>
                    </div>
                );
            case 'notifications':
                return <NotificationSettings settings={settings.notifications} onSave={handleSaveNotifications} />;
            case 'auto-apply':
                return (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Auto Apply Settings</h2>
                        <p className="text-gray-500 dark:text-gray-400">Coming soon...</p>
                    </div>
                );
            case 'privacy':
                return <PrivacySettings settings={settings.privacy} onSave={handleSavePrivacy} />;
            case 'integrations':
                return (
                    <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-4">Integrations</h2>
                        <p className="text-gray-500 dark:text-gray-400">Coming soon...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <DashboardLayout>
            <Head>
                <title>Settings - JobMate AI</title>
            </Head>

            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Settings</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your account settings and preferences</p>
                </div>

                <SettingsLayout activeSection={activeSection} onSectionChange={setActiveSection}>
                    {renderSection()}
                </SettingsLayout>
            </div>

            {/* Success Toast */}
            {showToast && (
                <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom">
                    <div className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">Settings saved successfully!</span>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
