import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Save,
  Heart,
  LogOut,
  Trash2
} from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthState } from "../types";
import { userService } from "../services/userService";

interface Props {
  auth: AuthState;
  onLogout: () => void;
  onUpdateAuth: (auth: AuthState) => void;
}

export default function UserProfilePage({
  auth,
  onLogout,
  onUpdateAuth
}: Props) {
  const navigate = useNavigate();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const [name, setName] = useState(auth.user?.name || "");
  const [password, setPassword] = useState("");
  const [confirmDelete, setConfirmDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  async function handleSave() {
    setLoading(true);
    setMessage("");

    try {
      const updatedUser = await userService.updateProfile({
        name,
        password: password || undefined
      });

      onUpdateAuth({
        ...auth,
        user: updatedUser
      });

      setPassword("");
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (confirmDelete !== "DELETE") return;

    setDeleting(true);
    try {
      await userService.deleteAccount();
      onLogout();
      navigate("/", { replace: true });
    } catch (err: any) {
      setMessage(err.message || "Failed to delete account");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900
                   rounded-[2rem] p-8
                   border border-slate-100 dark:border-slate-800
                   shadow-2xl"
      >
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
          Your Profile
        </h1>

        {/* Fields */}
        <div className="space-y-6">
          <Field label="Name" icon={<User size={18} />} value={name} onChange={setName} />
          <Field
            label="Email"
            icon={<Mail size={18} />}
            value={auth.user?.email || ""}
            disabled
          />
          <Field
            label="New Password"
            icon={<Lock size={18} />}
            value={password}
            onChange={setPassword}
            placeholder="Leave empty to keep current"
            type="password"
          />
        </div>

        {message && (
          <p className="mt-4 text-sm text-orange-500">{message}</p>
        )}

        {/* Actions */}
        <div className="mt-10 space-y-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600
                       text-white font-bold py-3 rounded-2xl
                       flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Changes"}
          </button>

          <button
            onClick={() => navigate("/favorites")}
            className="w-full bg-slate-100 dark:bg-slate-800
                       py-3 rounded-2xl font-semibold
                       flex items-center justify-center gap-2"
          >
            <Heart size={18} />
            View Favorites
          </button>

          <button
            onClick={onLogout}
            className="w-full text-red-500 py-3 rounded-2xl font-semibold
                       hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <LogOut size={18} className="inline mr-2" />
            Logout
          </button>
        </div>

        {/* Delete */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-6">
          <p className="text-xs text-slate-500 mb-3">
            This action is permanent. Type <b>DELETE</b> to confirm.
          </p>

          <input
            value={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="w-full mb-3 rounded-xl px-4 py-3
                       bg-slate-50 dark:bg-slate-800
                       border border-slate-200 dark:border-slate-700"
          />

          <button
            onClick={handleDeleteAccount}
            disabled={confirmDelete !== "DELETE" || deleting}
            className="w-full py-3 rounded-2xl font-bold
                       bg-red-500 hover:bg-red-600 text-white
                       disabled:opacity-40"
          >
            <Trash2 size={18} className="inline mr-2" />
            {deleting ? "Deleting Account..." : "Delete Account"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ---------- Field ---------- */

function Field({
  label,
  icon,
  value,
  onChange,
  disabled,
  placeholder,
  type = "text"
}: any) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-bold uppercase text-slate-500">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-2xl py-3 pl-12 pr-4
                     bg-slate-50 dark:bg-slate-800
                     border border-slate-200 dark:border-slate-700"
        />
      </div>
    </div>
  );
}
