import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import useAuthStore from "../../stores/auth";
import { toast } from "react-toastify";

interface SigninFormData {
  email: string;
}

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SigninFormData>({ email: "" });
  const { initiateLogin, loading, message, error } = useAuthStore();

  const handleInputChange = (field: keyof SigninFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInitiate = async (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = await initiateLogin(formData.email);
    // prefer server-returned message over store fields
    if (data && data.message) {
      toast.success(data.message);
    } else if (message) {
      toast.success(message);
    }
    if (data && data.error) {
      toast.error(data.error);
    } else if (error) {
      toast.error(error);
    }

    // show dev fallback OTP if provided
    if (data && data.otp && process.env.NODE_ENV !== "production") {
      toast.info(`DEV OTP: ${data.otp}`, { autoClose: 10000 });
    }

    // navigate to confirmation page only if initiate succeeded
    if (data) {
      navigate(
        `/auth/signin/confirm?email=${encodeURIComponent(formData.email)}`
      );
    }
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

        {/* Notifications are shown via react-toastify */}
        <form onSubmit={handleInitiate} className="space-y-6">
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#272727] text-white p-3 hover:bg-[#1a1a1a] hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {loading ? "SENDING OTP..." : "SEND OTP"}
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
