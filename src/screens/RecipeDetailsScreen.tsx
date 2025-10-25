import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { saveFavorite, removeFavorite, isFavorite } from '../services/favoriteService';

interface RecipeDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      cocktail: any;
    };
  };
}

const RecipeDetailsScreen: React.FC<RecipeDetailsScreenProps> = ({ navigation, route }) => {
  const { cocktail } = route.params;
  const [isFavorited, setIsFavorited] = useState(false);

  React.useEffect(() => {
    checkIfFavorite();
  }, []);

  const checkIfFavorite = async () => {
    const favorite = await isFavorite(cocktail.idDrink);
    setIsFavorited(favorite);
  };

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorited) {
        await removeFavorite(cocktail.idDrink);
        setIsFavorited(false);
        Alert.alert('Removed from Favorites');
      } else {
        await saveFavorite(cocktail);
        setIsFavorited(true);
        Alert.alert('Added to Favorites');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({
          ingredient,
          measure: measure || 'To taste',
        });
      }
    }
    return ingredients;
  };

  const getInstructions = () => {
    return cocktail.strInstructions || 'No instructions available';
  };

  const getAlcoholContent = () => {
    // This would typically come from an API or be calculated
    // For now, we'll use a placeholder
    return '~15% ABV';
  };

  const getFlavorProfile = () => {
    // This would typically be determined by ingredients
    // For now, we'll use a placeholder
    return 'Sweet & Sour';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: cocktail.strDrinkThumb }}
            style={styles.cocktailImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorited ? '❤️' : '🤍'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.cocktailName}>{cocktail.strDrink}</Text>
            <Text style={styles.cocktailCategory}>{cocktail.strCategory}</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Alcohol Content</Text>
              <Text style={styles.statValue}>{getAlcoholContent()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Flavor Profile</Text>
              <Text style={styles.statValue}>{getFlavorProfile()}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Difficulty</Text>
              <Text style={styles.statValue}>Easy</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {getIngredients().map((item, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Text style={styles.ingredientName}>{item.ingredient}</Text>
                <Text style={styles.ingredientMeasure}>{item.measure}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            <Text style={styles.instructions}>{getInstructions()}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Glass Type</Text>
            <Text style={styles.glassType}>{cocktail.strGlass || 'Highball Glass'}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  cocktailImage: {
    width: '100%',
    height: '100%',
  },
  imageGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  favoriteButtonText: {
    fontSize: 20,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  cocktailName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cocktailCategory: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ingredientName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  ingredientMeasure: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  glassType: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default RecipeDetailsScreen;
