import React, { useState } from 'react';
import { AppearanceSettings as AppearanceSettingsType } from '@/types/settings';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Save } from 'lucide-react';

interface AppearanceSettingsProps {
    settings: AppearanceSettingsType;
    onSave: (settings: AppearanceSettingsType) => void;
}

const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'pt', name: 'Português' },
    { code: 'zh', name: '中文' },
];

export const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({ settings, onSave }) => {
    const [formData, setFormData] = useState(settings);
    const [hasChanges, setHasChanges] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const handleChange = (field: keyof AppearanceSettingsType, value: any) => {
        setFormData({ ...formData, [field]: value });
        setHasChanges(true);
    };

    const handleThemeToggle = () => {
        toggleTheme();
        handleChange('theme', theme === 'dark' ? 'light' : 'dark');
    };

    const handleSave = () => {
        onSave(formData);
        setHasChanges(false);
    };

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-white/10 p-6">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Appearance Settings</h2>

            <div className="space-y-6">
                {/* Theme */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-3">
                        Theme
                    </label>
                    <div className="flex gap-3">
                        <button
                            onClick={handleThemeToggle}
                            className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${theme === 'light'
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                }`}
                        >
                            <Sun className="w-5 h-5" />
                            <span className="font-medium">Light</span>
                        </button>
                        <button
                            onClick={handleThemeToggle}
                            className={`flex-1 flex items-center justify-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${theme === 'dark'
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                    : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                                }`}
                        >
                            <Moon className="w-5 h-5" />
                            <span className="font-medium">Dark</span>
                        </button>
                    </div>
                </div>

                {/* Language */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Language
                    </label>
                    <select
                        value={formData.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date Format */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Date Format
                    </label>
                    <select
                        value={formData.dateFormat}
                        onChange={(e) => handleChange('dateFormat', e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="MM/DD/YYYY">MM/DD/YYYY (12/31/2024)</option>
                        <option value="DD/MM/YYYY">DD/MM/YYYY (31/12/2024)</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD (2024-12-31)</option>
                    </select>
                </div>

                {/* Time Format */}
                <div>
                    <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                        Time Format
                    </label>
                    <select
                        value={formData.timeFormat}
                        onChange={(e) => handleChange('timeFormat', e.target.value as '12h' | '24h')}
                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="12h">12-hour (3:30 PM)</option>
                        <option value="24h">24-hour (15:30)</option>
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
