import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
  strIngredient6?: string;
  strIngredient7?: string;
  strIngredient8?: string;
  strIngredient9?: string;
  strIngredient10?: string;
  strIngredient11?: string;
  strIngredient12?: string;
  strIngredient13?: string;
  strIngredient14?: string;
  strIngredient15?: string;
  strMeasure1?: string;
  strMeasure2?: string;
  strMeasure3?: string;
  strMeasure4?: string;
  strMeasure5?: string;
  strMeasure6?: string;
  strMeasure7?: string;
  strMeasure8?: string;
  strMeasure9?: string;
  strMeasure10?: string;
  strMeasure11?: string;
  strMeasure12?: string;
  strMeasure13?: string;
  strMeasure14?: string;
  strMeasure15?: string;
}

export interface CocktailResponse {
  drinks: Cocktail[];
}

// Search cocktails by name
export const searchCocktails = async (query: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<CocktailResponse>(
      `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error searching cocktails:', error);
    throw error;
  }
};

// Search cocktails by ingredient
export const fetchCocktailsByIngredient = async (ingredient: string, limit?: number): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<CocktailResponse>(
      `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
    );
    const cocktails = response.data.drinks || [];
    return limit ? cocktails.slice(0, limit) : cocktails;
  } catch (error) {
    console.error('Error fetching cocktails by ingredient:', error);
    throw error;
  }
};

// Get random cocktails
export const fetchRandomCocktails = async (count: number = 10): Promise<Cocktail[]> => {
  try {
    const promises = Array.from({ length: count }, () =>
      axios.get<CocktailResponse>(`${BASE_URL}/random.php`)
    );
    
    const responses = await Promise.all(promises);
    return responses.map(response => response.data.drinks[0]);
  } catch (error) {
    console.error('Error fetching random cocktails:', error);
    throw error;
  }
};

// Get cocktail by ID
export const fetchCocktailById = async (id: string): Promise<Cocktail | null> => {
  try {
    const response = await axios.get<CocktailResponse>(
      `${BASE_URL}/lookup.php?i=${id}`
    );
    return response.data.drinks?.[0] || null;
  } catch (error) {
    console.error('Error fetching cocktail by ID:', error);
    throw error;
  }
};

// Get popular cocktails
export const fetchPopularCocktails = async (): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<CocktailResponse>(
      `${BASE_URL}/popular.php`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching popular cocktails:', error);
    throw error;
  }
};

// Get cocktails by category
export const fetchCocktailsByCategory = async (category: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<CocktailResponse>(
      `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching cocktails by category:', error);
    throw error;
  }
};

// Get cocktails by alcohol type
export const fetchCocktailsByAlcohol = async (alcohol: string): Promise<Cocktail[]> => {
  try {
    const response = await axios.get<CocktailResponse>(
      `${BASE_URL}/filter.php?a=${encodeURIComponent(alcohol)}`
    );
    return response.data.drinks || [];
  } catch (error) {
    console.error('Error fetching cocktails by alcohol:', error);
    throw error;
  }
};

// Get list of ingredients
export const fetchIngredients = async (): Promise<string[]> => {
  try {
    const response = await axios.get<{ ingredients: { strIngredient: string }[] }>(
      `${BASE_URL}/list.php?i=list`
    );
    return response.data.ingredients?.map(ingredient => ingredient.strIngredient) || [];
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
};

// Get list of categories
export const fetchCategories = async (): Promise<string[]> => {
  try {
    const response = await axios.get<{ drinks: { strCategory: string }[] }>(
      `${BASE_URL}/list.php?c=list`
    );
    return response.data.drinks?.map(category => category.strCategory) || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
