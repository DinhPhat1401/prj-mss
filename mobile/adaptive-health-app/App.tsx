import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { WearableConnectScreen } from './src/screens/WearableConnectScreen';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState<'DASHBOARD' | 'WEARABLE' | 'PROFILE'>('DASHBOARD');

  const handleLoginSuccess = (authToken: string, uid: string, name: string) => {
    setToken(authToken);
    setUserId(uid);
    setUserName(name);
  };

  const handleOnboardingComplete = (userProfile: any) => {
    setProfile(userProfile);
    setCurrentScreen('DASHBOARD');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {!token || !userId ? (
        <LoginScreen onSuccess={handleLoginSuccess} />
      ) : !profile ? (
        <OnboardingScreen userId={userId} token={token} onComplete={handleOnboardingComplete} />
      ) : currentScreen === 'WEARABLE' ? (
        <WearableConnectScreen userId={userId} onBack={() => setCurrentScreen('DASHBOARD')} />
      ) : currentScreen === 'PROFILE' ? (
        <OnboardingScreen userId={userId} token={token} onComplete={handleOnboardingComplete} />
      ) : (
        <DashboardScreen profile={profile} onNavigate={(screen: any) => setCurrentScreen(screen)} />
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
