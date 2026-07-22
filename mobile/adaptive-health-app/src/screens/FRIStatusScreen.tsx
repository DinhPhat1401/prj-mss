import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  onBack: () => void;
}

export const FRIStatusScreen: React.FC<Props> = ({ onBack }) => {
  const friScore = 85;
  const status = 'PEAK_RECOVERY';
  const alphaIntensity = 1.2;
  const currentRHR = 64;
  const baseRHR = 65;
  const sleepHours = 8.0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Chỉ Số Thể Chất FRI (Fatigue Recovery Index) ⚡</Text>
      <Text style={styles.subtitle}>Chỉ số thông minh đánh giá mức độ mệt mỏi và khả năng phục hồi của cơ thể</Text>

      {/* Main Score Card */}
      <View style={styles.scoreCard}>
        <Text style={styles.scoreVal}>{friScore}</Text>
        <Text style={styles.scoreMax}>/ 100 điểm</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>🟢 Phục Hồi Đỉnh Cao (Peak Recovery)</Text>
        </View>
      </View>

      {/* Detail Metrics */}
      <Text style={styles.sectionTitle}>📊 Thành Phần Tính Toán FRI:</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.lbl}>Nhịp tim nghỉ hôm nay (RHR):</Text>
          <Text style={styles.val}>{currentRHR} bpm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>Trung bình 7 ngày (RHR Base):</Text>
          <Text style={styles.val}>{baseRHR} bpm</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>Giấc ngủ đêm qua:</Text>
          <Text style={styles.val}>{sleepHours} tiếng</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>Hệ số cường độ gợi ý $\alpha(t)$:</Text>
          <Text style={styles.valHighlight}>{alphaIntensity}x (Tăng 20%)</Text>
        </View>
      </View>

      {/* Explanation Box */}
      <View style={styles.explainBox}>
        <Text style={styles.explainTitle}>💡 Lời khuyên cho bạn hôm nay:</Text>
        <Text style={styles.explainText}>
          Cơ thể bạn có nhịp tim ổn định và giấc ngủ chất lượng cao. Hệ thống AI đề xuất tăng 20% cường độ tập luyện (HIIT/Kháng lực) và bổ sung 45g Protein ở bữa trưa để tối ưu hóa phát triển cơ bắp!
        </Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  scoreCard: {
    backgroundColor: '#0369A1',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreVal: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreMax: {
    fontSize: 14,
    color: '#BAE6FD',
    marginTop: -6,
    marginBottom: 12,
  },
  statusBadge: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lbl: {
    color: '#94A3B8',
    fontSize: 14,
  },
  val: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: 'bold',
  },
  valHighlight: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  explainBox: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 18,
    borderLeftWidth: 4,
    borderLeftColor: '#38BDF8',
  },
  explainTitle: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  explainText: {
    color: '#CBD5E1',
    fontSize: 14,
    lineHeight: 20,
  },
});
