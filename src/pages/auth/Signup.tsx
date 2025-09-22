import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import useAuthStore from "../../stores/auth";
import { toast } from "react-toastify";

type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  agreeToTerms: boolean;
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    agreeToTerms: false,
  });
  // OTP handled on a separate confirmation page

  const { initiateRegistration, loading, message, error } = useAuthStore();

  const handleInputChange = (
    field: keyof SignupFormData,
    value: string | boolean
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.agreeToTerms
    )
      return;
    const data: any = await initiateRegistration({
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    // Prefer payload messages
    if (data && data.message) toast.success(data.message);
    else if (message) toast.success(message);
    if (data && data.error) toast.error(data.error);
    else if (error) toast.error(error);
    // show dev fallback OTP via toast when provided
    if (data && data.otp && process.env.NODE_ENV !== "production") {
      toast.info(`DEV OTP: ${data.otp}`, { autoClose: 10000 });
    }
    // navigate to confirm page only when we have a response
    if (data) {
      navigate(
        `/auth/signup/confirm?email=${encodeURIComponent(formData.email)}`
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <img src={logo} alt="logo" className="h-12 w-auto" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#272727] mb-2">SIGN UP</h1>
          <p className="text-[#272727]/70 text-lg">
            Create your account to get started.
          </p>
        </div>

        {/* Notifications are shown via react-toastify */}

        <form onSubmit={handleInitiate} className="space-y-6">
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
                className="w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20"
                placeholder="First name"
              />
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
                className="w-full p-3 bg-[#d4d4d4] border-none focus:outline-none focus:ring-2 focus:ring-[#272727] focus:ring-opacity-20"
                placeholder="Last name"
              />
            </div>
          </div>

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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#272727] text-white p-3 hover:bg-[#1a1a1a] hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? "SENDING OTP..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#272727]/70">
            Already have an account?{" "}
            <Link
              to="/auth/signin"
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
