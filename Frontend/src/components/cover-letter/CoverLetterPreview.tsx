import React from 'react';
import { CoverLetterData } from '@/types/coverLetter';
import { Button } from '@/components/ui/Button';
import { Copy, Download, RefreshCw } from 'lucide-react';

interface CoverLetterPreviewProps {
    data: CoverLetterData;
    onRegenerate?: () => void;
}

export const CoverLetterPreview: React.FC<CoverLetterPreviewProps> = ({ data, onRegenerate }) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(data.content);
        // Could add toast notification here
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([data.content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `Cover_Letter_${data.companyName.replace(/\s+/g, '_')}.txt`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div className="space-y-4">
            <div className="bg-white dark:bg-neutral-900 p-8 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm min-h-[600px] whitespace-pre-wrap font-serif text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {data.content}
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
                {onRegenerate && (
                    <Button variant="outline" onClick={onRegenerate}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                    </Button>
                )}
                <Button variant="outline" onClick={handleCopy}>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Text
                </Button>
                <Button onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download .txt
                </Button>
            </div>
        </div>
    );
};
