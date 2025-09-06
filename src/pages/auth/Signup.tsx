import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initiateGoogleAuth} from "../../config/oauth";
import logo from "../../assets/images/logo.png";

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface SignupFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<SignupFormErrors>({});

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement actual registration logic
      console.log("Signup attempt:", formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to signin on success
      navigate("/auth/signin", { 
        state: { message: "Account created successfully! Please sign in." }
      });
    } catch (err) {
      setErrors({ email: "An error occurred. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
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
          <h1 className="text-4xl font-bold text-[#272727] mb-2">SIGN UP</h1>
          <p className="text-[#272727]/70 text-lg">
            Create your account to get started.
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3 mb-8">
          <button
            onClick={handleGoogleSignup}
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

        {/* Sign Up Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#272727] mb-2">
                First Name
              </label>
              <input
                type="text"
                required
                value={formData.firstName}
                onChange={e => handleInputChange("firstName", e.target.value)}
                className={`w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20 ${
                  errors.firstName ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#272727] mb-2">
                Last Name
              </label>
              <input
                type="text"
                required
                value={formData.lastName}
                onChange={e => handleInputChange("lastName", e.target.value)}
                className={`w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20 ${
                  errors.lastName ? "ring-2 ring-red-500" : ""
                }`}
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#272727] mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => handleInputChange("email", e.target.value)}
              className={`w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20 ${
                errors.email ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#272727] mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={e => handleInputChange("password", e.target.value)}
              className={`w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20 ${
                errors.password ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#272727] mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={e =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className={`w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20 ${
                errors.confirmPassword ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={e =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                className="h-4 w-4 text-[#272727] focus:ring-[#272727] border-gray-300 rounded mt-1"
              />
              <span className="ml-2 text-sm text-[#272727]/70">
                I agree to the{" "}
                <Link to="/terms" className="text-[#272727] hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-[#272727] hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#272727] text-white p-3 hover:bg-[#1a1a1a] hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        {/* Sign In Link */}
        <div className="mt-8 text-center">
          <p className="text-[#272727]/70">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-[#272727] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;