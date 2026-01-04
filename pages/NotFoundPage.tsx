import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl text-center space-y-6"
      >
        <AlertTriangle size={48} className="mx-auto text-orange-500" />

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          404 – Page Not Found
        </h1>

        <p className="text-slate-500">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-orange-500/20"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
