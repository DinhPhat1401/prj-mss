import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const handleLoginSuccess = (authToken: string, uid: string, name: string) => {
    setToken(authToken);
    setUserId(uid);
    setUserName(name);
  };

  const handleOnboardingComplete = (userProfile: any) => {
    setProfile(userProfile);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {!token || !userId ? (
        <LoginScreen onSuccess={handleLoginSuccess} />
      ) : !profile ? (
        <OnboardingScreen userId={userId} token={token} onComplete={handleOnboardingComplete} />
      ) : (
        <View style={styles.dashboardPlaceholder}>
          <Text style={styles.welcomeText}>Xin chào, {userName}! 👋</Text>
          <Text style={styles.infoText}>Mục tiêu Calo hàng ngày: {profile.targetCalories} kcal</Text>
          <Text style={styles.infoText}>BMR: {profile.bmr} kcal | TDEE: {profile.tdee} kcal</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  dashboardPlaceholder: {
    flex: 1,
    justify: 'center',
    alignItems: 'center',
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#38BDF8',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#E2E8F0',
    marginBottom: 8,
  },
});
