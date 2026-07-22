import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  profile: any;
  onNavigate: (screen: string) => void;
}

export const DashboardScreen: React.FC<Props> = ({ profile, onNavigate }) => {
  const targetCalories = profile?.targetCalories || 2000;
  const consumedCalories = 1250;
  const burnedCalories = 420;
  const remainingCalories = targetCalories - consumedCalories + burnedCalories;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tổng Quan Hôm Nay 📊</Text>
        <TouchableOpacity style={styles.profileBtn} onPress={() => onNavigate('PROFILE')}>
          <Text style={styles.profileBtnText}>⚙️ Hồ sơ</Text>
        </TouchableOpacity>
      </View>

      {/* Calorie Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Năng Lượng & Calo</Text>
        <View style={styles.calorieRow}>
          <View style={styles.calorieCol}>
            <Text style={styles.calorieValue}>{consumedCalories}</Text>
            <Text style={styles.calorieLabel}>Đã nạp (kcal)</Text>
          </View>
          <View style={styles.calorieColMain}>
            <Text style={styles.calorieMainValue}>{remainingCalories}</Text>
            <Text style={styles.calorieMainLabel}>Còn lại (kcal)</Text>
          </View>
          <View style={styles.calorieCol}>
            <Text style={styles.calorieValue}>{burnedCalories}</Text>
            <Text style={styles.calorieLabel}>Đốt cháy (kcal)</Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.min(100, (consumedCalories / targetCalories) * 100)}%` }]} />
        </View>
        <Text style={styles.targetText}>Mục tiêu hàng ngày: {targetCalories} kcal</Text>
      </View>

      {/* Quick Wearable Sync Card */}
      <TouchableOpacity style={styles.cardHighlight} onPress={() => onNavigate('WEARABLE')}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardHighlightTitle}>⌚ Kết Nối Thiết Bị Đeo</Text>
          <Text style={styles.cardHighlightSub}>Google Fit / Apple Health: Đã đồng bộ 10 phút trước</Text>
        </View>
        <Text style={styles.arrowText}>➔</Text>
      </TouchableOpacity>

      {/* Quick Stats Grid */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('WEARABLE_DATA')}>
          <Text style={styles.gridIcon}>❤️</Text>
          <Text style={styles.gridValue}>72 bpm</Text>
          <Text style={styles.gridLabel}>Nhịp tim nghỉ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('WEARABLE_DATA')}>
          <Text style={styles.gridIcon}>👟</Text>
          <Text style={styles.gridValue}>8,420</Text>
          <Text style={styles.gridLabel}>Bước chân</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('WEARABLE_DATA')}>
          <Text style={styles.gridIcon}>😴</Text>
          <Text style={styles.gridValue}>7.5 giờ</Text>
          <Text style={styles.gridLabel}>Giấc ngủ đêm qua</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridCard} onPress={() => onNavigate('WEARABLE_DATA')}>
          <Text style={styles.gridIcon}>⚡</Text>
          <Text style={styles.gridValue}>FRI 85</Text>
          <Text style={styles.gridLabel}>Phục hồi tốt</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0F172A',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  profileBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  profileBtnText: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
  },
  calorieRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calorieCol: {
    alignItems: 'center',
  },
  calorieColMain: {
    alignItems: 'center',
  },
  calorieValue: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: 'bold',
  },
  calorieMainValue: {
    color: '#38BDF8',
    fontSize: 32,
    fontWeight: 'bold',
  },
  calorieLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  calorieMainLabel: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
  progressTrack: {
    height: 10,
    backgroundColor: '#334155',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0284C7',
    borderRadius: 5,
  },
  targetText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
  cardHighlight: {
    backgroundColor: '#0369A1',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardHighlightTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardHighlightSub: {
    color: '#BAE6FD',
    fontSize: 12,
    marginTop: 2,
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: {
    width: '48%',
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  gridIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  gridValue: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gridLabel: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
});
