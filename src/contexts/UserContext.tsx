import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserPreferences, UserStats } from '../types';

interface UserContextType {
  preferences: UserPreferences | null;
  stats: UserStats;
  updatePreferences: (preferences: UserPreferences) => Promise<void>;
  updateStats: (stats: Partial<UserStats>) => void;
  clearUserData: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const PREFERENCES_KEY = 'user_preferences';
const STATS_KEY = 'user_stats';

const defaultStats: UserStats = {
  totalFavorites: 0,
  cocktailsTried: 0,
  favoriteSpirit: 'Vodka',
  totalSessions: 0,
  lastActive: new Date(),
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [stats, setStats] = useState<UserStats>(defaultStats);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Load preferences
      const preferencesJson = await AsyncStorage.getItem(PREFERENCES_KEY);
      if (preferencesJson) {
        setPreferences(JSON.parse(preferencesJson));
      }

      // Load stats
      const statsJson = await AsyncStorage.getItem(STATS_KEY);
      if (statsJson) {
        const savedStats = JSON.parse(statsJson);
        setStats({
          ...savedStats,
          lastActive: new Date(savedStats.lastActive),
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const updatePreferences = async (newPreferences: UserPreferences) => {
    try {
      setPreferences(newPreferences);
      await AsyncStorage.setItem(PREFERENCES_KEY, JSON.stringify(newPreferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  };

  const updateStats = (newStats: Partial<UserStats>) => {
    const updatedStats = { ...stats, ...newStats };
    setStats(updatedStats);
    AsyncStorage.setItem(STATS_KEY, JSON.stringify(updatedStats)).catch(error => {
      console.error('Error saving stats:', error);
    });
  };

  const clearUserData = async () => {
    try {
      setPreferences(null);
      setStats(defaultStats);
      await AsyncStorage.multiRemove([PREFERENCES_KEY, STATS_KEY]);
    } catch (error) {
      console.error('Error clearing user data:', error);
      throw error;
    }
  };

  const value: UserContextType = {
    preferences,
    stats,
    updatePreferences,
    updateStats,
    clearUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
