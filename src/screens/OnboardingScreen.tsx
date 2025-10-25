import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface OnboardingScreenProps {
  navigation: any;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [preferences, setPreferences] = useState({
    drinkStrength: '',
    sweetness: '',
    baseLiquor: '',
    mood: '',
  });

  const drinkStrengths = ['Light', 'Medium', 'Strong'];
  const sweetnessLevels = ['Not Sweet', 'Slightly Sweet', 'Sweet', 'Very Sweet'];
  const baseLiquors = ['Vodka', 'Whiskey', 'Rum', 'Gin', 'Tequila', 'Brandy'];
  const moods = ['Relaxed', 'Energetic', 'Social', 'Romantic', 'Adventurous'];

  const handlePreferenceSelect = (category: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const isComplete = Object.values(preferences).every(value => value !== '');

  const handleContinue = () => {
    // Save preferences to AsyncStorage or context
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#FF6B6B', '#FF8E53', '#FF6B6B']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome to SippyTenders</Text>
            <Text style={styles.subtitle}>Your Pocket Bartender</Text>
            <Text style={styles.description}>
              Let's personalize your cocktail experience
            </Text>
          </View>

          <View style={styles.preferencesContainer}>
            <Text style={styles.sectionTitle}>Drink Strength</Text>
            <View style={styles.optionsContainer}>
              {drinkStrengths.map((strength) => (
                <TouchableOpacity
                  key={strength}
                  style={[
                    styles.optionButton,
                    preferences.drinkStrength === strength && styles.selectedOption,
                  ]}
                  onPress={() => handlePreferenceSelect('drinkStrength', strength)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      preferences.drinkStrength === strength && styles.selectedOptionText,
                    ]}
                  >
                    {strength}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Sweetness Level</Text>
            <View style={styles.optionsContainer}>
              {sweetnessLevels.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.optionButton,
                    preferences.sweetness === level && styles.selectedOption,
                  ]}
                  onPress={() => handlePreferenceSelect('sweetness', level)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      preferences.sweetness === level && styles.selectedOptionText,
                    ]}
                  >
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Preferred Base Liquor</Text>
            <View style={styles.optionsContainer}>
              {baseLiquors.map((liquor) => (
                <TouchableOpacity
                  key={liquor}
                  style={[
                    styles.optionButton,
                    preferences.baseLiquor === liquor && styles.selectedOption,
                  ]}
                  onPress={() => handlePreferenceSelect('baseLiquor', liquor)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      preferences.baseLiquor === liquor && styles.selectedOptionText,
                    ]}
                  >
                    {liquor}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Current Mood</Text>
            <View style={styles.optionsContainer}>
              {moods.map((mood) => (
                <TouchableOpacity
                  key={mood}
                  style={[
                    styles.optionButton,
                    preferences.mood === mood && styles.selectedOption,
                  ]}
                  onPress={() => handlePreferenceSelect('mood', mood)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      preferences.mood === mood && styles.selectedOptionText,
                    ]}
                  >
                    {mood}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.continueButton, !isComplete && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!isComplete}
          >
            <Text style={styles.continueButtonText}>Get Started</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  preferencesContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 15,
    marginTop: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedOption: {
    backgroundColor: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FF6B6B',
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  continueButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
