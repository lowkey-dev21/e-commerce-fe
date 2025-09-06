import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { parseOAuthCallback, OAUTH_ENDPOINTS } from '../../config/oauth';

interface OAuthCallbackProps {
  provider: 'google' | 'github';
}

const OAuthCallback = ({ provider }: OAuthCallbackProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { code, error: oauthError } = parseOAuthCallback(location.search);
        
        if (oauthError) {
          setError(`OAuth error: ${oauthError}`);
          setStatus('error');
          return;
        }
        
        if (!code) {
          setError('No authorization code received');
          setStatus('error');
          return;
        }

        // Send code to backend for token exchange
        const endpoint = provider === 'google' 
          ? OAUTH_ENDPOINTS.google.callback 
          : OAUTH_ENDPOINTS.github.callback;
          
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        });

        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Store authentication data (adjust based on your auth system)
        if (data.token) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        setStatus('success');
        
        // Redirect to home page after successful authentication
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
        
      } catch (err) {
        console.error('OAuth callback error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        setStatus('error');
      }
    };

    handleCallback();
  }, [location.search, navigate, provider]);

  const handleRetry = () => {
    navigate('/signin', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        {status === 'loading' && (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#272727] mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-[#272727] mb-2">
              Authenticating...
            </h2>
            <p className="text-[#272727]/70">
              Please wait while we complete your {provider} authentication.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#272727] mb-2">
              Authentication Successful!
            </h2>
            <p className="text-[#272727]/70">
              Redirecting you to the homepage...
            </p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#272727] mb-2">
              Authentication Failed
            </h2>
            <p className="text-[#272727]/70 mb-6">
              {error}
            </p>
            <button
              onClick={handleRetry}
              className="bg-[#272727] text-white px-6 py-3 hover:bg-[#1a1a1a] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;