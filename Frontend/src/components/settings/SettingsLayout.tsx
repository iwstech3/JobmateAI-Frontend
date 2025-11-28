import React from 'react';
import { User, Palette, Briefcase, Bell, Zap, Shield, Link2 } from 'lucide-react';

interface SettingsLayoutProps {
    activeSection: string;
    onSectionChange: (section: string) => void;
    children: React.ReactNode;
}

const settingsSections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'job-preferences', label: 'Job Preferences', icon: Briefcase },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'auto-apply', label: 'Auto Apply', icon: Zap },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
];

export const SettingsLayout: React.FC<SettingsLayoutProps> = ({ activeSection, onSectionChange, children }) => {
    return (
        <div className="space-y-6">
            {/* Horizontal Tab Navigation */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 overflow-hidden">
                <nav
                    className="flex overflow-x-auto"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        WebkitOverflowScrolling: 'touch'
                    }}
                >
                    <style jsx>{`
                        nav::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    {settingsSections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                            <button
                                key={section.id}
                                onClick={() => onSectionChange(section.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${isActive
                                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-500/5'
                                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                                <span>{section.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content */}
            <div>
                {children}
            </div>
        </div>
    );
};
