import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CocktailCard from '../components/CocktailCard';
import { fetchRandomCocktails, fetchCocktailsByIngredient } from '../services/cocktailService';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [recommendedCocktails, setRecommendedCocktails] = useState([]);
  const [trendingCocktails, setTrendingCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCocktails();
  }, []);

  const loadCocktails = async () => {
    try {
      setLoading(true);
      // Fetch random cocktails for recommendations
      const randomCocktails = await fetchRandomCocktails(6);
      setRecommendedCocktails(randomCocktails);

      // Fetch trending cocktails (using popular ingredients)
      const trendingCocktails = await fetchCocktailsByIngredient('vodka', 6);
      setTrendingCocktails(trendingCocktails);
    } catch (error) {
      console.error('Error loading cocktails:', error);
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

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.greeting}>Good evening!</Text>
            <Text style={styles.subtitle}>What would you like to mix tonight?</Text>
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Search')}
            >
              <Text style={styles.actionButtonText}>🔍 Search Cocktails</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('UserDashboard')}
            >
              <Text style={styles.actionButtonText}>👤 My Profile</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <FlatList
              data={recommendedCocktails}
              renderItem={renderCocktailItem}
              keyExtractor={(item) => item.idDrink}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <FlatList
              data={trendingCocktails}
              renderItem={renderCocktailItem}
              keyExtractor={(item) => item.idDrink}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </View>

          <View style={styles.moodMixerSection}>
            <Text style={styles.sectionTitle}>Mood Mixer</Text>
            <TouchableOpacity style={styles.moodMixerButton}>
              <LinearGradient
                colors={['#4ECDC4', '#44A08D']}
                style={styles.moodGradient}
              >
                <Text style={styles.moodMixerText}>🎭 Tell me your mood</Text>
                <Text style={styles.moodMixerSubtext}>Get personalized drink suggestions</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
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
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  horizontalList: {
    paddingHorizontal: 20,
  },
  moodMixerSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  moodMixerButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  moodGradient: {
    padding: 20,
    alignItems: 'center',
  },
  moodMixerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  moodMixerSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});

export default HomeScreen;
