
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mealDbService } from '../services/mealDbService';
import { authService } from '../services/authService';
import { Meal, AuthState } from '../types';
import { userService } from '../services/userService';

interface FavoritesPageProps {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ auth, setAuth }) => {
  const [favorites, setFavorites] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const mealIds = auth.user?.favorites || [];
        const mealPromises = mealIds.map(id => mealDbService.getMealDetails(id));
        const results = await Promise.all(mealPromises);
        setFavorites(results.filter((m): m is Meal => m !== null));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [auth, navigate]);

  const removeFavorite = async (mealId: string) => {
    try {
      const newFavIds = await userService.toggleFavorite(mealId);
      setAuth({ ...auth, user: { ...auth.user!, favorites: newFavIds } });
      setFavorites(prev => prev.filter(m => m.idMeal !== mealId));
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-red-500 rounded-2xl text-white">
          <Heart size={24} fill="white" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Your Favorites</h1>
          <p className="text-slate-500 dark:text-slate-400">Recipes you've saved to your digital kitchen.</p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {favorites.map((meal, index) => (
            <motion.div
              key={meal.idMeal}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-all"
            >
              <div className="relative aspect-video">
                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeFavorite(meal.idMeal)}
                  className="absolute top-3 right-3 p-2 bg-white/90 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 dark:text-white truncate mb-4">{meal.strMeal}</h3>
                <Link
  to={`/meal/${meal.idMeal}`}
  className="w-full py-2 flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-500/20 hover:text-white rounded-xl text-sm font-bold transition-all duration-200 ease-out hover:scale-[1.04]"
>
  View Details <ArrowRight size={14} />
</Link>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <div className="inline-flex items-center justify-center p-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-700 mb-6">
            <Heart size={64} />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Your cookbook is empty</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8 max-w-sm mx-auto">
            Discover thousands of delicious recipes and save your favorites here.
          </p>
          <Link
            to="/"
            className="bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-orange-500/20"
          >
            Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
