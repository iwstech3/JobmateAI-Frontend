import { UserProfile } from './settings';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role?: 'job_seeker' | 'employer';
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user?: UserProfile;
}

export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}
