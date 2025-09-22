import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import useAuthStore from "../../stores/auth";
import { toast } from "react-toastify";

const ConfirmSignup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const { confirmSignup, loading, setUser, error } = useAuthStore();

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await confirmSignup({ email, otp });
    if (res?.user) {
      setUser(res.user);
      toast.success(
        res.message || "Account created successfully. Please sign in."
      );
      setTimeout(() => navigate("/auth/signin"), 120);
      return;
    }
    toast.error(res?.error || error || "Failed to confirm signup");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Enter your 6-digit code</h2>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <p>
              {email},
              <br />
              Please check your email for the verification code.
            </p>
          </div>
          <div>
            <label className="block text-sm mb-2">One-time code</label>
            <input
              placeholder="Enter the 6-digit code"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full p-3 bg-[#f3f3f3]"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-[#272727] text-white p-3"
          >
            {loading ? "CONFIRMING..." : "CONFIRM"}
          </button>
        </form>
        <div className="mt-4">
          <Link
            to="/auth/signup"
            className="text-sm text-[#272727] hover:underline"
          >
            Back to Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmSignup;
