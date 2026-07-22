import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { LoginScreen } from './src/screens/LoginScreen';
import { OnboardingScreen } from './src/screens/OnboardingScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { WearableConnectScreen } from './src/screens/WearableConnectScreen';
import { MealPlanScreen } from './src/screens/MealPlanScreen';
import { MealDetailScreen } from './src/screens/MealDetailScreen';
import { BlacklistScreen } from './src/screens/BlacklistScreen';
import { WorkoutPlanScreen } from './src/screens/WorkoutPlanScreen';
import { WorkoutDetailScreen } from './src/screens/WorkoutDetailScreen';
import { ManualInputScreen } from './src/screens/ManualInputScreen';
import { FRIStatusScreen } from './src/screens/FRIStatusScreen';
import { HistoryScreen } from './src/screens/HistoryScreen';
import { ProgressAnalyticsScreen } from './src/screens/ProgressAnalyticsScreen';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';

export default function App() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [currentScreen, setCurrentScreen] = useState<'DASHBOARD' | 'WEARABLE' | 'PROFILE' | 'MEALS' | 'MEAL_DETAIL' | 'BLACKLIST' | 'WORKOUTS' | 'WORKOUT_DETAIL' | 'MANUAL_INPUT' | 'FRI_STATUS' | 'HISTORY' | 'PROGRESS' | 'NOTIFICATIONS'>('DASHBOARD');
  const [selectedMeal, setSelectedMeal] = useState<any>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

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
      ) : currentScreen === 'MEALS' ? (
        <MealPlanScreen
          onSelectMeal={(meal) => { setSelectedMeal(meal); setCurrentScreen('MEAL_DETAIL'); }}
          onNavigateBlacklist={() => setCurrentScreen('BLACKLIST')}
          onBack={() => setCurrentScreen('DASHBOARD')}
        />
      ) : currentScreen === 'MEAL_DETAIL' ? (
        <MealDetailScreen meal={selectedMeal} onBack={() => setCurrentScreen('MEALS')} />
      ) : currentScreen === 'BLACKLIST' ? (
        <BlacklistScreen userId={userId} onBack={() => setCurrentScreen('MEALS')} />
      ) : currentScreen === 'WORKOUTS' ? (
        <WorkoutPlanScreen
          onSelectWorkout={(w) => { setSelectedWorkout(w); setCurrentScreen('WORKOUT_DETAIL'); }}
          onNavigateManualInput={() => setCurrentScreen('MANUAL_INPUT')}
          onBack={() => setCurrentScreen('DASHBOARD')}
        />
      ) : currentScreen === 'WORKOUT_DETAIL' ? (
        <WorkoutDetailScreen workout={selectedWorkout} onBack={() => setCurrentScreen('WORKOUTS')} />
      ) : currentScreen === 'MANUAL_INPUT' ? (
        <ManualInputScreen userId={userId} onBack={() => setCurrentScreen('DASHBOARD')} />
      ) : currentScreen === 'FRI_STATUS' ? (
        <FRIStatusScreen onBack={() => setCurrentScreen('DASHBOARD')} />
      ) : currentScreen === 'HISTORY' ? (
        <HistoryScreen onBack={() => setCurrentScreen('DASHBOARD')} />
      ) : currentScreen === 'PROGRESS' ? (
        <ProgressAnalyticsScreen onBack={() => setCurrentScreen('DASHBOARD')} />
      ) : currentScreen === 'NOTIFICATIONS' ? (
        <NotificationSettingsScreen onBack={() => setCurrentScreen('DASHBOARD')} />
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
