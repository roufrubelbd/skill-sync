import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  const { resetPassword, setLoading, theme } = useAuth();
  const location = useLocation();
  const prefilledEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefilledEmail);

  const handleResetPassword = (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success("Password reset email sent!");
        // window.location.href = "https://mail.google.com";
        window.open("https://mail.google.com", "_blank", "noopener,noreferrer");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-warning to-black">
      <div className="bg-white p-6 rounded-2xl shadow-md w-96 text-center border border-base-300">
        <h2 className="text-2xl font-bold text-info mb-4">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            className={`input input-bordered w-full ${
              theme === "dark"
                ? "text-black  bg-white border-black"
                : "text-gray-700 border-gray-500"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className={`btn btn-sm btn-warning hover:btn-accent rounded-full w-full ${
              theme === "dark"
                ? "text-black border-black"
                : "text-gray-700 border-gray-500"
            }`}
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
