import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CocktailCard from '../components/CocktailCard';
import { searchCocktails, fetchCocktailsByIngredient } from '../services/cocktailService';

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('name');

  const filterOptions = [
    { key: 'name', label: 'By Name' },
    { key: 'ingredient', label: 'By Ingredient' },
    { key: 'alcohol', label: 'By Alcohol' },
  ];

  const popularIngredients = [
    'Vodka', 'Whiskey', 'Rum', 'Gin', 'Tequila', 'Brandy',
    'Lime', 'Lemon', 'Orange', 'Cranberry', 'Pineapple'
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      let results = [];
      if (selectedFilter === 'ingredient') {
        results = await fetchCocktailsByIngredient(searchQuery);
      } else {
        results = await searchCocktails(searchQuery);
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleIngredientPress = async (ingredient: string) => {
    setSearchQuery(ingredient);
    setSelectedFilter('ingredient');
    setLoading(true);
    try {
      const results = await fetchCocktailsByIngredient(ingredient);
      setSearchResults(results);
    } catch (error) {
      console.error('Ingredient search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCocktailPress = (cocktail: any) => {
    navigation.navigate('RecipeDetails', { cocktail });
  };

  const renderCocktailItem = ({ item }: { item: any }) => (
    <CocktailCard
      cocktail={item}
      onPress={() => handleCocktailPress(item)}
    />
  );

  const renderIngredientItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.ingredientChip}
      onPress={() => handleIngredientPress(item)}
    >
      <Text style={styles.ingredientText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4ECDC4', '#44A08D']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Search Cocktails</Text>
          <Text style={styles.subtitle}>Find your perfect drink</Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search cocktails..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {filterOptions.map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.filterButton,
                  selectedFilter === option.key && styles.selectedFilter,
                ]}
                onPress={() => setSelectedFilter(option.key)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === option.key && styles.selectedFilterText,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.content}>
          {searchResults.length === 0 && !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>Popular Ingredients</Text>
              <Text style={styles.emptyStateSubtitle}>
                Tap an ingredient to find cocktails
              </Text>
              <FlatList
                data={popularIngredients}
                renderItem={renderIngredientItem}
                keyExtractor={(item) => item}
                numColumns={3}
                contentContainerStyle={styles.ingredientsGrid}
              />
            </View>
          ) : (
            <FlatList
              data={searchResults}
              renderItem={renderCocktailItem}
              keyExtractor={(item) => item.idDrink}
              numColumns={2}
              contentContainerStyle={styles.resultsGrid}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    padding: 10,
  },
  searchButtonText: {
    fontSize: 18,
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedFilter: {
    backgroundColor: '#fff',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedFilterText: {
    color: '#4ECDC4',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 30,
    textAlign: 'center',
  },
  ingredientsGrid: {
    paddingHorizontal: 20,
  },
  ingredientChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ingredientText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  resultsGrid: {
    paddingBottom: 20,
  },
});

export default SearchScreen;
