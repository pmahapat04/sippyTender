export interface UserPreferences {
  drinkStrength: 'Light' | 'Medium' | 'Strong';
  sweetness: 'Not Sweet' | 'Slightly Sweet' | 'Sweet' | 'Very Sweet';
  baseLiquor: 'Vodka' | 'Whiskey' | 'Rum' | 'Gin' | 'Tequila' | 'Brandy';
  mood: 'Relaxed' | 'Energetic' | 'Social' | 'Romantic' | 'Adventurous';
}

export interface CocktailIngredient {
  ingredient: string;
  measure: string;
}

export interface CocktailStats {
  abv: string;
  flavorProfile: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  prepTime: string;
}

export interface UserStats {
  totalFavorites: number;
  cocktailsTried: number;
  favoriteSpirit: string;
  totalSessions: number;
  lastActive: Date;
}

export interface SearchFilters {
  category?: string;
  alcohol?: string;
  ingredient?: string;
  difficulty?: string;
  abvRange?: {
    min: number;
    max: number;
  };
}

export interface NavigationProps {
  navigation: any;
  route?: {
    params?: any;
  };
}
