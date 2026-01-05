import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/auth";

type Props = {
  provider?: string;
};

const OAuthCallback = ({ provider }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fetchUser = useAuthStore(state => state.fetchUser);

  useEffect(() => {
    // For Passport server-handled flow the server will set the session and redirect to CLIENT_URL.
    // On arrival here we simply hydrate user from /api/auth/me and then navigate to root.
    (async () => {
      try {
        await fetchUser();
      } catch (err) {
        // ignore - fetchUser handles errors
      } finally {
        // remove query params and navigate home
        navigate("/");
      }
    })();
  }, [fetchUser, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing in with {provider || "provider"}...
    </div>
  );
};

export default OAuthCallback;
