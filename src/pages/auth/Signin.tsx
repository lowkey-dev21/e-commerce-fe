import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initiateGoogleAuth} from "../../config/oauth";
import logo from "../../assets/images/logo.png";

interface SigninFormData {
  email: string;
  password: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field: keyof SigninFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement actual authentication logic
      console.log("Signin attempt:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to home on success
      navigate("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignin = () => {
    initiateGoogleAuth();
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="logo" className="h-12 w-auto" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#272727] mb-2">SIGN IN</h1>
          <p className="text-[#272727]/70 text-lg">
            Welcome back! Please sign in to your account.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleGoogleSignin}
            className="w-full p-3 gap-4 bg-white border flex items-center justify-center border-gray-300 text-[#272727] hover:bg-gray-50 "
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-[#272727]/50">OR</span>
          </div>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#272727] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => handleInputChange("email", e.target.value)}
              className="w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#272727] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={e => handleInputChange("password", e.target.value)}
              className="w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-[#272727] focus:ring-[#272727] border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-[#272727]/70">
                Remember me
              </span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-[#272727] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#272727] text-white p-3 hover:bg-[#1a1a1a] hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-[#272727]/70">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="font-medium text-[#272727] hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;