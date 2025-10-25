import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cocktail } from './cocktailService';

const FAVORITES_KEY = 'favorites';

// Save a cocktail to favorites
export const saveFavorite = async (cocktail: Cocktail): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const existingIndex = favorites.findIndex(fav => fav.idDrink === cocktail.idDrink);
    
    if (existingIndex === -1) {
      favorites.push(cocktail);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
    throw error;
  }
};

// Remove a cocktail from favorites
export const removeFavorite = async (cocktailId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const filteredFavorites = favorites.filter(fav => fav.idDrink !== cocktailId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filteredFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

// Get all favorites
export const getFavorites = async (): Promise<Cocktail[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Check if a cocktail is favorited
export const isFavorite = async (cocktailId: string): Promise<boolean> => {
  try {
    const favorites = await getFavorites();
    return favorites.some(fav => fav.idDrink === cocktailId);
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
};

// Clear all favorites
export const clearFavorites = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('Error clearing favorites:', error);
    throw error;
  }
};

// Get favorites count
export const getFavoritesCount = async (): Promise<number> => {
  try {
    const favorites = await getFavorites();
    return favorites.length;
  } catch (error) {
    console.error('Error getting favorites count:', error);
    return 0;
  }
};
