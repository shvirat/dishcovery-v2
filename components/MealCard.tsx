
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Tag, ArrowRight } from 'lucide-react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  index: number;
}

const MealCard: React.FC<MealCardProps> = ({ meal, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all"
    >
      <Link to={`/meal/${meal.idMeal}`} className="block relative overflow-hidden aspect-[4/3]">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-sm font-medium flex items-center gap-1">
            View Recipe <ArrowRight size={14} />
          </span>
        </div>
      </Link>
      
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white truncate group-hover:text-orange-500 transition-colors">
          {meal.strMeal}
        </h3>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {meal.strCategory && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 border border-orange-100 dark:border-orange-500/20">
              <Tag size={12} />
              {meal.strCategory}
            </span>
          )}
          {meal.strArea && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              <MapPin size={12} />
              {meal.strArea}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MealCard;
