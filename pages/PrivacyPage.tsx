import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Lock,
  Database,
  ShieldCheck,
  Cookie,
  ArrowLeft
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900
                   rounded-[2rem] p-10
                   border border-slate-100 dark:border-slate-800
                   shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-500/10">
            <Lock className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          Your privacy matters to us. This policy explains how Dishcovery
          collects, uses, and protects your information.
        </p>

        <div className="space-y-10">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Database className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Information We Collect
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We collect basic account details such as email and preferences to
              personalize your experience.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                How We Protect Your Data
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              We apply industry-standard security practices. However, no online
              system can be 100% secure.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Cookie className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Cookies & Sessions
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dishcovery uses cookies for session management and performance.
              You can disable cookies in your browser settings.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-orange-500 font-bold hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <span className="text-xs text-slate-400">
            Last updated: 2026
          </span>
        </div>
      </motion.div>
    </div>
  );
}
