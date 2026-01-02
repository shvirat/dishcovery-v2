import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");

  if (!token) {
  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl text-center space-y-6">
        <AlertTriangle
          size={48}
          className="mx-auto text-orange-500"
        />

        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
          Invalid or Expired Link
        </h1>

        <p className="text-slate-500">
          This password reset link is either invalid or has expired.
          Please request a new one to continue.
        </p>

        <Link
          to="/forgot-password"
          className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-orange-500/20"
        >
          Request New Link
        </Link>

        <p className="text-sm text-slate-400">
          Or go back to{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            login
          </Link>
        </p>
      </div>
    </div>
  );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch(`${API_BASE}/api/user/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password })
      });

      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Reset Password
          </h1>
          <p className="text-slate-500 mt-2">
            Choose a strong new password for your account
          </p>
        </div>

        {/* Success */}
        {status === "success" ? (
          <div className="text-center space-y-4">
            <CheckCircle className="mx-auto text-green-500" size={48} />
            <p className="text-slate-700 dark:text-slate-300 font-medium">
              Your password has been reset successfully.
            </p>
            <Link
              to="/login"
              className="inline-block text-orange-500 font-bold hover:underline"
            >
              Go to login →
            </Link>
          </div>
        ) : (
          <>
            {/* Error */}
            {status === "error" && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/20">
                Reset failed or token expired. Please request a new link.
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
