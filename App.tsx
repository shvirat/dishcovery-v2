import React, { useState, useEffect, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  Search,
  Heart,
  User as UserIcon,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ChefHat,
  Sparkles,
  Wand2,
  Compass,
  History,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Theme, User, AuthState } from "./types";
import { THEME_STORAGE_KEY } from "./constants";
import { authService } from "./services/authService";

// Pages
import HomePage from "./pages/HomePage";
import MealDetailsPage from "./pages/MealDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AIMealLabPage from "./pages/AIMealLabPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UserProfile from "./pages/UserProfile";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";

// Components
const Navbar: React.FC<{
  theme: Theme;
  toggleTheme: () => void;
  auth: AuthState;
  onLogout: () => void;
}> = ({ theme, toggleTheme, auth, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/", icon: <ChefHat size={18} /> },
    { name: "AI Lab", path: "/ai-lab", icon: <Sparkles size={18} /> },
  ];

  if (auth.isAuthenticated) {
    navLinks.push({
      name: "Favorites",
      path: "/favorites",
      icon: <Heart size={18} />,
    });
  }

  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-xl text-white group-hover:rotate-12 transition-transform">
              <img
                src={
                  theme === Theme.LIGHT
                    ? "/images/dishcovery-icon-square-light.png"
                    : "/images/dishcovery-icon-square-dark.png"
                }
                alt="Logo"
                width="40px"
                rounded-xl
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dishcovery
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link key={link.path} to={link.path}>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${isActive
                          ? "text-orange-500"
                          : "text-slate-600 dark:text-slate-400 hover:text-orange-500"
                        }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {theme === Theme.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              {auth.isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2
                      px-3 py-2 rounded-xl
                      hover:bg-slate-100 dark:hover:bg-slate-800
                      transition-colors
                      focus:outline-none focus:ring-2 focus:ring-orange-500/30"
                    >
                    <UserIcon
                      size={20}
                      className="text-slate-700 dark:text-slate-300"
                    />

                    <span className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[100px]">
                      {auth.user?.name}
                    </span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-orange-500/20"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === Theme.LIGHT ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                {auth.isAuthenticated ? (
                  <div className="flex flex-row items-center">
                    <button
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut size={20} />
                      Sign Out
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                      className="flex flex-row items-center gap-1 px-3 py-3 rounded-lg text-base font-medium hover:bg-orange-50 dark:hover:bg-orange-900/30"
                    >
                      <UserIcon size={20} />
                      <span className="truncate max-w-[100px]">
                        {auth.user?.name}
                      </span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-lg text-base font-medium text-orange-500"
                  >
                    <UserIcon size={20} />
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return (saved as Theme) || Theme.LIGHT;
  });

  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  const [authLoading, setAuthLoading] = useState(true);

  // Theme side-effect
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === Theme.DARK);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Auth restore (ONLY ONCE)
  useEffect(() => {
    authService
      .getMe()
      .then((auth) => {
        if (auth) {
          setAuth(auth);
        }
      })
      .catch(() => {
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  if (authLoading) {
    return null; // or <Loader />
  }

  const toggleTheme = () =>
    setTheme((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  const handleAuthChange = (newAuth: AuthState) => setAuth(newAuth);
  const handleLogout = () => {
    authService.logout();
    setAuth({ user: null, token: null, isAuthenticated: false });
    window.location.replace("/");
  };

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors ${theme === Theme.DARK ? "dark" : ""
          } bg-slate-50 dark:bg-slate-950`}
      >
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          auth={auth}
          onLogout={handleLogout}
        />

        <main className="pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/meal/:id"
              element={
                <MealDetailsPage auth={auth} setAuth={handleAuthChange} />
              }
            />
            <Route
              path="/favorites"
              element={<FavoritesPage auth={auth} setAuth={handleAuthChange} />}
            />
            <Route
              path="/login"
              element={<LoginPage auth={auth} onLogin={handleAuthChange} />}
            />
            <Route
              path="/signup"
              element={<SignupPage auth={auth} onLogin={handleAuthChange} />}
            />
            <Route
              path="/ai-lab"
              element={<AIMealLabPage auth={auth} setAuth={handleAuthChange} />}
            />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/profile"
              element={
                <UserProfile
                  auth={auth}
                  onLogout={handleLogout}
                  onUpdateAuth={handleAuthChange}
                />
              }
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <ChefHat className="text-orange-500" size={24} />
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Dishcovery
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md mx-auto">
              The ultimate AI-powered culinary companion. Discover, save, and
              visualize your next favorite meal.
            </p>
            <div className="mt-8 flex justify-center gap-6">
              <a
                href="/terms"
                className="text-slate-400 hover:text-orange-500 transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="/privacy"
                className="text-slate-400 hover:text-orange-500 transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="/about"
                className="text-slate-400 hover:text-orange-500 transition-colors text-sm"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-slate-400 hover:text-orange-500 transition-colors text-sm"
              >
                Contact
              </a>
            </div>
            <div className="mt-8 text-slate-500 dark:text-slate-600 text-xs">
              © {new Date().getFullYear()} Dishcovery. Built with human
              creativity.
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
