export interface AnalyticsMetrics {
    totalApplications: number;
    screeningCompletionRate: number; // percentage
    shortlistRate: number; // percentage
    interviewRate: number; // percentage
    offerRate: number; // percentage
    averageTimeToHire: number; // days
    averageScreeningTime: number; // seconds
}

export interface ApplicationsByStatus {
    status: string;
    count: number;
}

export interface OfferDistribution {
    category: string;
    value: number;
}

export interface ApplicationsOverTime {
    date: string;
    count: number;
}

export interface ConversionFunnel {
    jobTitle: string;
    applied: number;
    screened: number;
    interviewed: number;
    offered: number;
}

export interface AICostMetrics {
    llmApiSpend: number; // USD
    tokensUsed: number;
    costPerApplication: number; // USD
}

export interface AnalyticsData {
    metrics: AnalyticsMetrics;
    applicationsByStatus: ApplicationsByStatus[];
    offerDistribution: OfferDistribution[];
    applicationsOverTime: ApplicationsOverTime[];
    conversionFunnels: ConversionFunnel[];
    aiCost: AICostMetrics;
}

export interface AnalyticsFilters {
    startDate?: string;
    endDate?: string;
    jobId?: string;
}
