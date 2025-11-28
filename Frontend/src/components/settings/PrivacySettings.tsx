import React, { useState } from 'react';
import { PrivacySettings as PrivacySettingsType } from '@/types/settings';
import { Save, Shield, Download, Trash2, AlertTriangle } from 'lucide-react';

interface PrivacySettingsProps {
    settings: PrivacySettingsType;
    onSave: (settings: PrivacySettingsType) => void;
}

export const PrivacySettings: React.FC<PrivacySettingsProps> = ({ settings, onSave }) => {
    const [formData, setFormData] = useState(settings);
    const [hasChanges, setHasChanges] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleChange = (field: keyof PrivacySettingsType, value: any) => {
        setFormData({ ...formData, [field]: value });
        setHasChanges(true);
    };

    const handleSave = () => {
        onSave(formData);
        setHasChanges(false);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Privacy & Security</h2>

                <div className="space-y-6">
                    {/* Profile Visibility */}
                    <div>
                        <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                            Profile Visibility
                        </label>
                        <select
                            value={formData.profileVisibility}
                            onChange={(e) => handleChange('profileVisibility', e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="public">Public - Anyone can view your profile</option>
                            <option value="recruiters">Recruiters only - Only recruiters can view</option>
                            <option value="private">Private - Profile is hidden</option>
                        </select>
                    </div>

                    {/* Analytics */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
                        <div>
                            <p className="font-medium text-neutral-900 dark:text-white">Allow analytics</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Help us improve by sharing anonymous usage data</p>
                        </div>
                        <button
                            onClick={() => handleChange('allowAnalytics', !formData.allowAnalytics)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.allowAnalytics ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.allowAnalytics ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-neutral-800/50">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-green-600" />
                            <div>
                                <p className="font-medium text-neutral-900 dark:text-white">Two-factor authentication</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleChange('twoFactorEnabled', !formData.twoFactorEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formData.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formData.twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
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

            {/* Data Management */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Data Management</h3>

                <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-blue-600" />
                            <div className="text-left">
                                <p className="font-medium text-neutral-900 dark:text-white">Download my data</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Export all your data in JSON format</p>
                            </div>
                        </div>
                    </button>

                    <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full flex items-center justify-between p-4 rounded-lg border border-red-200 dark:border-red-500/20 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <Trash2 className="w-5 h-5 text-red-600" />
                            <div className="text-left">
                                <p className="font-medium text-red-600">Delete account</p>
                                <p className="text-sm text-red-500/70">Permanently delete your account and all data</p>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 max-w-md mx-4 border border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-full bg-red-100 dark:bg-red-500/20">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Delete Account</h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle account deletion
                                    setShowDeleteConfirm(false);
                                }}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
