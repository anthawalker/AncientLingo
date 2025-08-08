import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

/**
 * The entry point for the AncientLingo mobile application.
 *
 * This component currently renders a simple welcome message.  Replace
 * this with your navigation and feature screens as you build out the
 * curriculum, library and user profiles.  To style your components
 * consistently, you can install and configure Tailwind CSS for React
 * Native (e.g. via NativeWind or tailwindcss-react-native).
 */
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.centered}>
        <Text style={styles.title}>AncientLingo</Text>
        <Text style={styles.subtitle}>
          Welcome to the AncientLingo mobile app. Start building your
          language journey here!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  centered: {
    paddingHorizontal: 24,
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937'
  },
  subtitle: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563'
  }
});