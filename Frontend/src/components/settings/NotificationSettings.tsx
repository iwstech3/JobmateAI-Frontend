import React, { useState } from 'react';
import { NotificationSettings as NotificationSettingsType } from '@/types/settings';
import { Save } from 'lucide-react';

interface NotificationSettingsProps {
    settings: NotificationSettingsType;
    onSave: (settings: NotificationSettingsType) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ settings, onSave }) => {
    const [formData, setFormData] = useState(settings);
    const [hasChanges, setHasChanges] = useState(false);

    const handleEmailToggle = (field: keyof NotificationSettingsType['email']) => {
        setFormData({
            ...formData,
            email: { ...formData.email, [field]: !formData.email[field] }
        });
        setHasChanges(true);
    };

    const handlePushToggle = () => {
        setFormData({
            ...formData,
            push: { enabled: !formData.push.enabled }
        });
        setHasChanges(true);
    };

    const handleFrequencyChange = (frequency: 'instant' | 'daily' | 'weekly') => {
        setFormData({ ...formData, frequency });
        setHasChanges(true);
    };

    const handleSave = () => {
        onSave(formData);
        setHasChanges(false);
    };

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Notification Settings</h2>

            <div className="space-y-6">
                {/* Email Notifications */}
                <div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Email Notifications</h3>
                    <div className="space-y-3">
                        {[
                            { key: 'newJobMatches' as const, label: 'New job matches', description: 'Get notified when new jobs match your preferences' },
                            { key: 'applicationUpdates' as const, label: 'Application status updates', description: 'Updates on your job applications' },
                            { key: 'interviewReminders' as const, label: 'Interview reminders', description: 'Reminders for upcoming interviews' },
                            { key: 'weeklyDigest' as const, label: 'Weekly digest', description: 'Summary of your activity and new opportunities' },
                        ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
                                <div>
                                    <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
                                </div>
                                <button
                                    onClick={() => handleEmailToggle(item.key)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.email[item.key] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.email[item.key] ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Push Notifications */}
                <div>
                    <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Push Notifications</h3>
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-white">Enable push notifications</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications in your browser</p>
                        </div>
                        <button
                            onClick={handlePushToggle}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.push.enabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.push.enabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Notification Frequency */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Notification Frequency
                    </label>
                    <select
                        value={formData.frequency}
                        onChange={(e) => handleFrequencyChange(e.target.value as any)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="instant">Instant - Receive notifications immediately</option>
                        <option value="daily">Daily digest - Once per day</option>
                        <option value="weekly">Weekly digest - Once per week</option>
                    </select>
                </div>

                {/* Save Button */}
                {hasChanges && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => {
                                setFormData(settings);
                                setHasChanges(false);
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
