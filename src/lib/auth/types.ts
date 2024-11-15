// Define User interface without extending NetlifyUser
export interface User {
    id: string;
    email: string;
    email_verified?: boolean;
    familyName?: string;
    name?: string;
    role: string;
    created_at: string;
    confirmed_at?: string;
    updated_at?: string;
    confirmation_sent_at?: string;
    recovery_sent_at?: string;
    app_metadata?: {
      provider?: string;
      roles?: string[];
      [key: string]: unknown;
    } | null;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string;
      [key: string]: unknown;
    } | null;
    identities?: Array<{
      id: string;
      user_id: string;
      identity_data: {
        [key: string]: unknown;
      };
      provider: string;
      last_sign_in_at: string;
      created_at: string;
      updated_at: string;
    }>;
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
  }