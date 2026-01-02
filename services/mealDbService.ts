
import { MEAL_DB_API_BASE } from '../constants';
import { Meal, Category } from '../types';

export const mealDbService = {
  async searchMealsByName(name: string): Promise<Meal[]> {
    const response = await fetch(`${MEAL_DB_API_BASE}/search.php?s=${name}`);
    const data = await response.json();
    return data.meals || [];
  },

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${MEAL_DB_API_BASE}/categories.php`);
    const data = await response.json();
    return data.categories || [];
  },

  async getMealsByCategory(category: string): Promise<Meal[]> {
    const response = await fetch(`${MEAL_DB_API_BASE}/filter.php?c=${category}`);
    const data = await response.json();
    return data.meals || [];
  },

  async getMealsByArea(area: string): Promise<Meal[]> {
    const response = await fetch(`${MEAL_DB_API_BASE}/filter.php?a=${area}`);
    const data = await response.json();
    return data.meals || [];
  },

  async getMealDetails(id: string): Promise<Meal | null> {
    const response = await fetch(`${MEAL_DB_API_BASE}/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  },

  async getRandomMeal(): Promise<Meal | null> {
    const response = await fetch(`${MEAL_DB_API_BASE}/random.php`);
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  }
};
