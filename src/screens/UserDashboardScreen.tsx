import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CocktailCard from '../components/CocktailCard';
import { getFavorites, clearFavorites } from '../services/favoriteService';

interface UserDashboardScreenProps {
  navigation: any;
}

const UserDashboardScreen: React.FC<UserDashboardScreenProps> = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [recentCocktails, setRecentCocktails] = useState([]);
  const [userStats, setUserStats] = useState({
    totalFavorites: 0,
    cocktailsTried: 0,
    favoriteSpirit: 'Vodka',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userFavorites = await getFavorites();
      setFavorites(userFavorites);
      setUserStats(prev => ({
        ...prev,
        totalFavorites: userFavorites.length,
      }));
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleCocktailPress = (cocktail: any) => {
    navigation.navigate('RecipeDetails', { cocktail });
  };

  const handleClearFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to clear all your favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearFavorites();
              setFavorites([]);
              setUserStats(prev => ({
                ...prev,
                totalFavorites: 0,
              }));
              Alert.alert('Favorites cleared');
            } catch (error) {
              Alert.alert('Error', 'Failed to clear favorites');
            }
          },
        },
      ]
    );
  };

  const renderCocktailItem = ({ item }: { item: any }) => (
    <CocktailCard
      cocktail={item}
      onPress={() => handleCocktailPress(item)}
    />
  );

  const renderEmptyFavorites = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateTitle}>No Favorites Yet</Text>
      <Text style={styles.emptyStateSubtitle}>
        Start exploring cocktails and add them to your favorites!
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.exploreButtonText}>Explore Cocktails</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.header}>
            <Text style={styles.title}>My Profile</Text>
            <Text style={styles.subtitle}>Your cocktail journey</Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.totalFavorites}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.cocktailsTried}</Text>
              <Text style={styles.statLabel}>Cocktails Tried</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.favoriteSpirit}</Text>
              <Text style={styles.statLabel}>Favorite Spirit</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>My Favorites</Text>
              {favorites.length > 0 && (
                <TouchableOpacity onPress={handleClearFavorites}>
                  <Text style={styles.clearButton}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
            {favorites.length === 0 ? (
              renderEmptyFavorites()
            ) : (
              <FlatList
                data={favorites}
                renderItem={renderCocktailItem}
                keyExtractor={(item) => item.idDrink}
                numColumns={2}
                contentContainerStyle={styles.favoritesGrid}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Search')}
              >
                <Text style={styles.actionButtonText}>🔍 Search Cocktails</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={styles.actionButtonText}>🏠 Home</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <View style={styles.preferencesContainer}>
              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Drink Strength</Text>
                <Text style={styles.preferenceValue}>Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Sweetness Level</Text>
                <Text style={styles.preferenceValue}>Slightly Sweet</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Base Liquor</Text>
                <Text style={styles.preferenceValue}>Vodka</Text>
              </TouchableOpacity>
            </View>
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  clearButton: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  favoritesGrid: {
    paddingBottom: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
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
  preferencesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  preferenceLabel: {
    fontSize: 16,
    color: '#fff',
  },
  preferenceValue: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
});

export default UserDashboardScreen;
