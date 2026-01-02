import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FileText,
  UserCheck,
  Shield,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";

export default function TermsPage() {
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
            <FileText className="text-orange-500" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Terms of Service
          </h1>
        </div>

        <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
          These Terms govern your use of Dishcovery. By accessing or using our
          platform, you agree to follow these terms.
        </p>

        <div className="space-y-10">
          {/* Section */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <UserCheck className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Account Responsibility
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              You are responsible for maintaining the confidentiality of your
              account credentials and all activities under your account.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Acceptable Use
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dishcovery is intended for personal, non-commercial use. You agree
              not to misuse the platform, attempt unauthorized access, or
              disrupt services.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                AI-Generated Content Disclaimer
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              AI-generated recipes and images are provided for inspiration only.
              Dishcovery does not guarantee accuracy, nutritional value, or
              outcomes.
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
