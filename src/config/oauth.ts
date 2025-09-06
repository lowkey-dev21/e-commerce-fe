// OAuth Configuration
export const OAUTH_CONFIG = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    redirectUri: `${window.location.origin}/auth/google/callback`,
    scope: 'openid profile email',
    responseType: 'code',
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth'
  },
};

// OAuth URL builders
export const buildGoogleAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: OAUTH_CONFIG.google.clientId,
    redirect_uri: OAUTH_CONFIG.google.redirectUri,
    scope: OAUTH_CONFIG.google.scope,
    response_type: OAUTH_CONFIG.google.responseType,
    access_type: 'offline',
    prompt: 'consent'
  });
  
  return `${OAUTH_CONFIG.google.authUrl}?${params.toString()}`;
};


// OAuth handlers
export const initiateGoogleAuth = (): void => {
  if (!OAUTH_CONFIG.google.clientId) {
    console.error('Google Client ID not configured');
    return;
  }
  
  const authUrl = buildGoogleAuthUrl();
  window.location.href = authUrl;
};



// Parse OAuth callback parameters
export const parseOAuthCallback = (search: string): { code?: string; error?: string; state?: string } => {
  const params = new URLSearchParams(search);
  return {
    code: params.get('code') || undefined,
    error: params.get('error') || undefined,
    state: params.get('state') || undefined
  };
};

// OAuth API endpoints (to be implemented on backend)
export const OAUTH_ENDPOINTS = {
  google: {
    callback: '/api/auth/google/callback',
    token: '/api/auth/google/token'
  },
  github: {
    callback: '/api/auth/github/callback',
    token: '/api/auth/github/token'
  }
};