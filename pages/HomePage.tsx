
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, Sparkles, Filter, ChevronRight, Utensils, Globe } from 'lucide-react';
import { mealDbService } from '../services/mealDbService';
import { Meal, Category } from '../types';
import { CUISINES } from '../constants';
import MealCard from '../components/MealCard';
import { useNavigate, useSearchParams } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  const NAVBAR_HEIGHT = 64; // px (h-16)

  function scrollToResults() {
    const el = document.getElementById("meal-results");
    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      NAVBAR_HEIGHT -
      16; // optional extra spacing

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }

  const fetchCategories = useCallback(async () => {
    try {
      const cats = await mealDbService.getCategories();
      setCategories(cats);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const fetchDefaultMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const initialMeals = await mealDbService.searchMealsByName('');
      setMeals(initialMeals.slice(0, 12));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resultsTitle = isSearching
    ? "Searching..."
    : queryParam
      ? `Search results for "${queryParam}"`
      : selectedCategory
        ? `${selectedCategory} Meals`
        : selectedArea
          ? `${selectedArea} Cuisine`
          : "Recommended for You";

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (!queryParam) {
      fetchDefaultMeals();
    }
  }, [queryParam, fetchDefaultMeals]);

  useEffect(() => {
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const area = searchParams.get("area");

    const fetch = async () => {
      setIsSearching(true);
      try {
        if (q) {
          setSearchQuery(q);
          setSelectedCategory(null);
          setSelectedArea(null);
          setMeals(await mealDbService.searchMealsByName(q));
        }
        else if (category) {
          setSelectedCategory(category);
          setSelectedArea(null);
          setMeals(await mealDbService.getMealsByCategory(category));
        }
        else if (area) {
          setSelectedArea(area);
          setSelectedCategory(null);
          setMeals(await mealDbService.getMealsByArea(area));
        }
        else {
          fetchDefaultMeals(); // reset
          return;
        }

        scrollToResults();
      } finally {
        setIsSearching(false);
      }
    };

    fetch();
  }, [searchParams]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchParams({});
      return;
    }

    setSearchParams({ q: searchQuery });
  };


  const handleCategorySelect = (category: string) => {
    setSearchParams({ category });
  };

  const handleAreaSelect = (area: string) => {
    setSearchParams({ area });
  };

  const handleSurpriseMe = async () => {
    try {
      const random = await mealDbService.getRandomMeal();
      if (random) navigate(`/meal/${random.idMeal}`);
    } catch (err) {
      console.error(err);
    }
  };

  const ParallaxMeal = ({ src, speed }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, speed]);

    return (
      <motion.img
        src={src}
        style={{ y }}
        className="absolute w-56 rounded-full shadow-xl"
      />
    );
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 text-sm font-bold mb-6"
            >
              <Sparkles size={16} />
              AI-Powered Culinary Exploration
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
            >
              What's on your <span className="text-orange-500">menu</span> today?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl"
            >
              Search thousands of recipes, explore diverse cuisines, and use our magical AI tools to reimagine your favorite dishes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center max-w-2xl"
            >
              <form onSubmit={handleSearch} className="flex-1 group">
                <div className="relative h-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search recipe, ingredients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 py-4 pl-12 pr-4 rounded-2xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-lg"
                  />
                </div>
              </form>
              <button
                onClick={handleSurpriseMe}
                className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/5 flex items-center justify-center gap-2 whitespace-nowrap min-h-[60px]"
              >
                <Sparkles size={20} />
                Surprise Me
              </button>
            </motion.div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[40%] h-full pointer-events-none overflow-hidden hidden lg:block">
          <motion.img
            src="/images/dishcovery-icon.png"
            alt=""
            className="absolute top-[20%] left-[10%] 
                      -translate-x-1/2 -translate-y-1/2
                      w-[350px]"
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </section>

      {/* Categories Bar */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500 rounded-lg text-white">
              <Utensils size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Browse by Category</h2>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.length > 0 ? categories.map((cat) => (
            <button
              key={cat.idCategory}
              onClick={() => handleCategorySelect(cat.strCategory)}
              className={`flex-shrink-0 group relative overflow-hidden rounded-2xl p-4 w-32 flex flex-col items-center gap-3 transition-all ${selectedCategory === cat.strCategory
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-orange-200 dark:hover:border-orange-500/30'
                }`}
            >
              <img src={cat.strCategoryThumb} alt={cat.strCategory} className="w-16 h-16 object-contain" />
              <span className="text-xs font-bold uppercase tracking-wider text-center">{cat.strCategory}</span>
            </button>
          )) : Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-32 h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl" />
          ))}
        </div>
      </section>

      {/* Cuisine / Area Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg text-white">
              <Globe size={20} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Explore Cuisines</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {CUISINES.map((area) => (
            <button
              key={area}
              onClick={() => handleAreaSelect(area)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${selectedArea === area
                  ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-blue-500 dark:hover:border-blue-500/50'
                }`}
            >
              {area}
            </button>
          ))}
        </div>
      </section>

      {/* Results Section */}
      <section id="meal-results" className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-10">
          {/* <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {isSearching ? 'Searching...' : selectedCategory ? `${selectedCategory} Meals` : selectedArea ? `${selectedArea} Cuisine` : 'Recommended for You'}
          </h2> */}
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            {resultsTitle}
          </h2>

        </div>

        {isSearching ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />
                <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
                <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
              </div>
            ))}
          </div>
        ) : meals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {meals.map((meal, index) => (
              <MealCard key={meal.idMeal} meal={meal} index={index} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center p-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-6">
              <Utensils size={48} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">No meals found</h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Try searching for something else or browse categories.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
