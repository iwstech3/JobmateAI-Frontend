export interface UserProfile {
    fullName: string;
    email: string;
    phoneNumber?: string;
    location: string;
    bio?: string;
    avatar?: string;
}

export interface AppearanceSettings {
    theme: 'light' | 'dark';
    language: string;
    dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
    timeFormat: '12h' | '24h';
}

export interface JobPreferences {
    jobTypes: string[];
    workModes: string[];
    salaryRange: {
        min: number;
        max: number;
        currency: string;
    };
    preferredLocations: string[];
    industries: string[];
    experienceLevel: string;
}

export interface NotificationSettings {
    email: {
        newJobMatches: boolean;
        applicationUpdates: boolean;
        interviewReminders: boolean;
        weeklyDigest: boolean;
    };
    push: {
        enabled: boolean;
    };
    frequency: 'instant' | 'daily' | 'weekly';
}

export interface AutoApplySettings {
    enabled: boolean;
    minMatchPercentage: number;
    maxApplicationsPerDay: number;
    excludedCompanies: string[];
    defaultResumeId?: string;
    coverLetterTemplate?: string;
}

export interface PrivacySettings {
    profileVisibility: 'public' | 'private' | 'recruiters';
    allowAnalytics: boolean;
    twoFactorEnabled: boolean;
}

export interface Integration {
    name: string;
    connected: boolean;
    connectedAt?: string;
}

export interface UserSettings {
    profile: UserProfile;
    appearance: AppearanceSettings;
    jobPreferences: JobPreferences;
    notifications: NotificationSettings;
    autoApply: AutoApplySettings;
    privacy: PrivacySettings;
    integrations: Integration[];
}
