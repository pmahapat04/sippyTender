# SippyTenders - Your Pocket Bartender

A mobile app designed to help beginner and intermediate drink enthusiasts discover, learn, and personalize cocktail recipes. Built with React Native and powered by TheCocktailDB API.

## 🍹 Features

### Core Features
- **Personalized Recommendations**: Get cocktail suggestions based on your preferences
- **Cocktail Search & Filter**: Search by name, ingredient, or alcohol type
- **Recipe Details**: Complete ingredient lists, measurements, and step-by-step instructions
- **User Dashboard**: Track favorites, recent drinks, and personal stats
- **Mood Mixer**: Get drink suggestions based on your current mood

### User Experience
- Simple, intuitive UI for beginners
- Visual appeal with drink photos and clean navigation
- Quick recipe discovery and clear instructions
- Scalable architecture for future AI-powered personalization

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sippytenders
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the Metro bundler**
   ```bash
   npm start
   ```

5. **Run the app**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

## 📱 App Flow

1. **Onboarding** → User selects preferences (drink strength, sweetness, base liquor, mood)
2. **Home Screen** → Personalized drink recommendations and trending cocktails
3. **Search/Filter** → Find cocktails by name, ingredient, or alcohol type
4. **Drink Details** → Complete recipe with ingredients and instructions
5. **User Dashboard** → Manage favorites and view personal stats

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── CocktailCard.tsx
├── contexts/           # React Context for state management
│   └── UserContext.tsx
├── screens/            # App screens
│   ├── OnboardingScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── RecipeDetailsScreen.tsx
│   └── UserDashboardScreen.tsx
├── services/           # API services and data management
│   ├── cocktailService.ts
│   └── favoriteService.ts
├── types/              # TypeScript type definitions
│   └── index.ts
└── utils/              # Utility functions
```

## 🛠️ Tech Stack

- **Frontend**: React Native
- **Navigation**: React Navigation v6
- **State Management**: React Context + AsyncStorage
- **API**: TheCocktailDB
- **Styling**: StyleSheet + LinearGradient
- **Storage**: AsyncStorage for local data persistence

## 🎯 Target User

**Primary Persona**: Jack Daniels, a 21-year-old student who enjoys social drinking but feels bored of plain whiskey. He wants a fun, easy way to learn cocktails, gain confidence in making them, and impress his friends and girlfriend.

## 🔧 Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## 📦 Dependencies

### Main Dependencies
- `react` - React library
- `react-native` - React Native framework
- `@react-navigation/native` - Navigation library
- `@react-navigation/stack` - Stack navigator
- `@react-navigation/bottom-tabs` - Tab navigator
- `react-native-linear-gradient` - Gradient backgrounds
- `react-native-vector-icons` - Icon library
- `axios` - HTTP client for API calls
- `@react-native-async-storage/async-storage` - Local storage

### Development Dependencies
- `@babel/core` - Babel compiler
- `@types/react` - TypeScript types for React
- `eslint` - Code linting
- `jest` - Testing framework
- `prettier` - Code formatting

## 🚀 Future Enhancements

- **AI-Powered Personalization**: Machine learning recommendations
- **Ingredient Scanner**: Camera-based ingredient recognition
- **Social Features**: Share cocktails with friends
- **Shopping List**: Generate shopping lists from favorite recipes
- **Offline Mode**: Download recipes for offline access
- **Voice Instructions**: Audio-guided cocktail making
- **AR Features**: Augmented reality cocktail mixing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TheCocktailDB](https://www.thecocktaildb.com/) for providing the cocktail API
- React Native community for excellent documentation and support
- All contributors who help make this project better

---

**SippyTenders** - Mix, Learn, Enjoy! 🍹✨
