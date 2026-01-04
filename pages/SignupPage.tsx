
import React, { useState } from 'react';
import { Link, useNavigate, Navigate} from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus } from 'lucide-react';
import { authService } from '../services/authService';
import { AuthState } from '../types';
import { Eye, EyeOff } from 'lucide-react';

interface SignupPageProps {
  onLogin: (auth: AuthState) => void;
}

const SignupPage: React.FC<SignupPageProps> = ({auth, onLogin }) => {
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  if (password.length < 8) {
    setError("Password must be at least 8 characters");
    return;
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match');
    return;
  }

  setIsLoading(true);
  try {
    const auth = await authService.signup(name, email, password);
    onLogin(auth);
    navigate('/');
  } catch (err: any) {
    setError(err.message || 'Signup failed');
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Join Dishcovery</h1>
          <p className="text-slate-500 mt-2">Start your culinary journey today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-xl text-sm font-medium border border-red-100 dark:border-red-900/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              placeholder="Your full name"
            />
          </div>
        </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="chef@dishcovery.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 dark:bg-orange-500 hover:bg-slate-800 dark:hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-slate-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <UserPlus size={20} />
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-500 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
