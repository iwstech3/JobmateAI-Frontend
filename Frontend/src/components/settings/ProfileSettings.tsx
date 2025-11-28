import React, { useState } from 'react';
import { UserProfile } from '@/types/settings';
import { Camera, Save } from 'lucide-react';

interface ProfileSettingsProps {
    profile: UserProfile;
    onSave: (profile: UserProfile) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ profile, onSave }) => {
    const [formData, setFormData] = useState(profile);
    const [hasChanges, setHasChanges] = useState(false);

    const handleChange = (field: keyof UserProfile, value: string) => {
        setFormData({ ...formData, [field]: value });
        setHasChanges(true);
    };

    const handleSave = () => {
        onSave(formData);
        setHasChanges(false);
    };

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Profile Settings</h2>

            <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                            {formData.fullName.charAt(0).toUpperCase()}
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors">
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>
                    <div>
                        <h3 className="font-medium text-neutral-900 dark:text-white">Profile Picture</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Upload a new profile picture</p>
                    </div>
                </div>

                {/* Full Name */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-neutral-800/50 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Phone Number <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                        type="tel"
                        value={formData.phoneNumber || ''}
                        onChange={(e) => handleChange('phoneNumber', e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Location
                    </label>
                    <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        placeholder="City, Country"
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Bio */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Bio <span className="text-gray-400">(Optional)</span>
                    </label>
                    <textarea
                        value={formData.bio || ''}
                        onChange={(e) => handleChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    />
                </div>

                {/* Save Button */}
                {hasChanges && (
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => {
                                setFormData(profile);
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
