
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, ArrowLeft, Youtube, Clock, Users, ChevronRight, 
  Sparkles, Check, Wand2, RefreshCcw, Download, Share2, Utensils,
  PlayIcon,
  PlaySquareIcon,
  YoutubeIcon,
  LucideYoutube
} from 'lucide-react';
import { mealDbService } from '../services/mealDbService';
import { authService } from '../services/authService';
import { geminiService } from '../services/geminiService';
import { Meal, AuthState } from '../types';
import { userService } from '../services/userService';

interface MealDetailsPageProps {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

const MealDetailsPage: React.FC<MealDetailsPageProps> = ({ auth, setAuth }) => {
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoriting, setIsFavoriting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchMeal = async () => {
      setIsLoading(true);
      try {
        const data = await mealDbService.getMealDetails(id);
        setMeal(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="w-full aspect-square rounded-3xl bg-slate-200 dark:bg-slate-800" />

            <div className="rounded-3xl p-6 bg-slate-200 dark:bg-slate-800 space-y-4">
              <div className="h-6 w-1/2 rounded bg-slate-300 dark:bg-slate-700" />
              <div className="h-4 w-full rounded bg-slate-300 dark:bg-slate-700" />
              <div className="h-10 w-full rounded-xl bg-slate-300 dark:bg-slate-700" />
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 space-y-10">
            {/* Title */}
            <div className="space-y-4">
              <div className="h-4 w-32 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-10 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800"
                />
              ))}
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800"
                  />
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <div className="h-6 w-40 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-40 rounded-3xl bg-slate-200 dark:bg-slate-800" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!meal) return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-bold">Meal not found</h2>
      <Link to="/" className="text-orange-500 mt-4 inline-block">Go back home</Link>
    </div>
  );

  const isFavorite =
    !!auth.user &&
    Array.isArray(auth.user.favorites) &&
    auth.user.favorites.includes(meal.idMeal);

  const handleToggleFavorite = async () => {
    if (!auth.isAuthenticated || !auth.user) {
      navigate('/login');
      return;
    }

    setIsFavoriting(true);

    try {
      const newFavs = await userService.toggleFavorite(meal.idMeal);

      setAuth({
        ...auth,
        user: {
          ...auth.user,
          favorites: newFavs
        }
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsFavoriting(false);
    }
  };


  const handleAIEdit = async () => {
    if (!editPrompt.trim()) return;
    setIsAILoading(true);
    try {
      // Use original thumb for editing, or existing AI image
      const sourceImage = aiImage || meal.strMealThumb;
      const edited = await geminiService.editMealImage(sourceImage, editPrompt);
      setAiImage(edited);
      setIsEditing(false);
    } catch (err) {
      alert("Please check your internet connection. If everything looks fine, then I’m still Gareeb.");
      console.error(err);
    } finally {
      setIsAILoading(false);
    }
  };

  // Extract ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors font-medium">
        <ArrowLeft size={20} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image and Meta */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-orange-500/10">
            <motion.img
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              src={aiImage || meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-auto object-cover aspect-square"
            />
            
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button
                onClick={handleToggleFavorite}
                disabled={isFavoriting}
                className={`p-3 rounded-full shadow-lg transition-all ${
                  isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-slate-900 hover:bg-white'
                } ${isFavoriting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>

            {aiImage && (
              <div className="absolute bottom-4 left-4">
                <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} />
                  AI Reimaged
                </div>
              </div>
            )}
          </div>

          {/* AI Tools Affordance */}
          <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={24} />
              <h3 className="text-xl font-bold">Magic Kitchen</h3>
            </div>
            <p className="text-orange-50 opacity-90 text-sm mb-6 leading-relaxed">
              Want to see this dish with a different garnish? A retro filter? Or reimagined as a fine-dining course?
            </p>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-white text-orange-600 rounded-2xl font-bold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Wand2 size={18} />
                Try AI Edit
              </button>
            ) : (
              <div className="space-y-4">
                <textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="e.g., 'Make it look like it's from a 1970s cookbook' or 'Add fresh parsley garnish'"
                  className="w-full bg-orange-400/30 border border-white/20 rounded-2xl p-4 text-white placeholder:text-orange-100 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm h-24 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAIEdit}
                    disabled={isAILoading}
                    className="flex-1 py-3 bg-white text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isAILoading ? <RefreshCcw className="animate-spin" size={18} /> : <Check size={18} />}
                    {isAILoading ? 'Cooking...' : 'Apply Magic'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            {aiImage && (
              <button
                onClick={() => setAiImage(null)}
                className="w-full mt-4 py-2 border border-white/30 text-white rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                Reset to Original
              </button>
            )}
          </div>
        </div>

        {/* Right: Info, Ingredients, Instructions */}
        <div className="lg:col-span-7 space-y-10">
          <section>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {meal.strCategory}
              </span>
              <span className="bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {meal.strArea}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {meal.strMeal}
            </h1>
            
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 text-center">
                <Clock className="mx-auto mb-2 text-orange-500" size={20} />
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-tighter">Prep Time</span>
                <span className="font-bold text-slate-900 dark:text-white">25-30m</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 text-center">
                <Users className="mx-auto mb-2 text-blue-500" size={20} />
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-tighter">Servings</span>
                <span className="font-bold text-slate-900 dark:text-white">2-4 People</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 text-center">
                <Utensils className="mx-auto mb-2 text-green-500" size={20} />
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-tighter">Difficulty</span>
                <span className="font-bold text-slate-900 dark:text-white">Medium</span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 text-center">
                <Share2 className="mx-auto mb-2 text-purple-500" size={20} />
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-tighter">Share</span>
                <span className="font-bold text-slate-900 dark:text-white">Social</span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Ingredients */}
            <section>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                Ingredients
                <span className="text-sm font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                  {ingredients.length} items
                </span>
              </h3>
              <ul className="space-y-3">
                {ingredients.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-orange-500 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{item.measure}</span>
                      <span className="ml-2 text-slate-600 dark:text-slate-400">{item.ingredient}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* YouTube Embed placeholder or button */}
            {meal.strYoutube && (
              <section className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Video Guide</h3>
                <div className="relative aspect-video rounded-3xl overflow-hidden group shadow-xl">
                  <img 
                    src={`https://img.youtube.com/vi/${meal.strYoutube.split('=')[1]}/maxresdefault.jpg`} 
                    alt="Video preview" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <a 
                      href={meal.strYoutube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-red-600 text-white p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    >
                      <Youtube size={40} fill="none" />
                    </a>
                  </div>
                </div>
<a
  href={meal.strYoutube}
  target="_blank"
  rel="noopener noreferrer"
  className="block p-4 bg-orange-50 dark:bg-orange-900/10 rounded-2xl border border-red-300 dark:border-red-900/60 text-center transition-all duration-300 hover:bg-orange-200 dark:hover:bg-orange-900/30 hover:scale-[1.03] hover:shadow-md hover:shadow-orange-500/10 active:scale-[0.98]"
>
  <p className="text-orange-600 dark:text-orange-400 text-sm font-semibold">
    Watch the full tutorial on YouTube
  </p>
</a>

              </section>
            )}
          </div>

          {/* Instructions */}
          <section>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Instructions</h3>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-300 dark:border-slate-800">
              <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-lg whitespace-pre-line">
                {meal.strInstructions}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MealDetailsPage;
