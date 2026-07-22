import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  onBack: () => void;
}

export const HistoryScreen: React.FC<Props> = ({ onBack }) => {
  const historyList = [
    { date: 'Hôm nay (22/07)', fri: 85, status: 'Peak Recovery', meal: 'Ức gà gạo lứt & cá hồi', workout: 'HIIT Đốt Mỡ 35 phút' },
    { date: 'Hôm qua (21/07)', fri: 68, status: 'Normal', meal: 'Trứng luộc & Bò xào ớt chuông', workout: 'Chạy bộ Cardio 30 phút' },
    { date: '20/07/2026', fri: 45, status: 'Fatigue', meal: 'Cháo yến mạch & Súp lơ luộc', workout: 'Yoga Giãn Cơ 20 phút' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Lịch Sử Gợi Ý AI 📊</Text>
      <Text style={styles.subtitle}>Xem lại lịch sử thực đơn và bài tập được AI cá nhân hóa theo từng ngày</Text>

      {historyList.map((item, idx) => (
        <View key={idx} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.dateText}>{item.date}</Text>
            <View style={styles.friBadge}>
              <Text style={styles.friBadgeText}>FRI {item.fri}</Text>
            </View>
          </View>

          <Text style={styles.label}>Trạng thái: <Text style={{ color: '#38BDF8' }}>{item.status}</Text></Text>
          <Text style={styles.detailText}>🥗 Thực đơn: {item.meal}</Text>
          <Text style={styles.detailText}>🏃‍♂️ Bài tập: {item.workout}</Text>
        </View>
      ))}
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
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friBadge: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  friBadgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  label: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },
  detailText: {
    color: '#CBD5E1',
    fontSize: 14,
    marginBottom: 4,
  },
});
