import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  onBack: () => void;
}

export const ProgressAnalyticsScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Thống Kê Tiến Trình 📈</Text>
      <Text style={styles.subtitle}>Theo dõi diễn biến Cân nặng, Calo & Bước chân theo tuần/tháng</Text>

      {/* Progress Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚖️ Cân Nặng (kg)</Text>
        <Text style={styles.statVal}>65.0 kg <Text style={styles.statDelta}>(-1.5 kg tuần này)</Text></Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>📉 Biểu đồ Cân Nặng 7 Ngày (66.5 -> 65.0 kg)</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔥 Calo Tiêu Thụ Trung Bình</Text>
        <Text style={styles.statVal}>1,850 kcal/ngày</Text>
        <View style={styles.chartPlaceholder}>
          <Text style={styles.chartText}>📊 Biểu đồ Nạp vs Đốt Calo</Text>
        </View>
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
  backBtn: {
    marginTop: 10,
    marginBottom: 16,
  },
  backText: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  statVal: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statDelta: {
    color: '#10B981',
    fontSize: 14,
  },
  chartPlaceholder: {
    height: 120,
    backgroundColor: '#0F172A',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  chartText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '600',
  },
});
