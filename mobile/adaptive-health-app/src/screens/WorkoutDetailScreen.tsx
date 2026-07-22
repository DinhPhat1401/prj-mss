import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  workout: any;
  onBack: () => void;
}

export const WorkoutDetailScreen: React.FC<Props> = ({ workout, onBack }) => {
  if (!workout) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại danh sách bài tập</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{workout.title}</Text>
      <Text style={styles.subText}>⏱️ Thời lượng: {workout.duration} • 🎯 Nhóm cơ: {workout.targetMuscles}</Text>

      <Text style={styles.sectionTitle}>📌 Danh Sách Động Tác ({workout.exercises.length}):</Text>

      {workout.exercises.map((ex: any, idx: number) => (
        <View key={idx} style={styles.exCard}>
          <View style={styles.exHeader}>
            <Text style={styles.exName}>{idx + 1}. {ex.name}</Text>
          </View>
          <View style={styles.exDetailRow}>
            <Text style={styles.tag}>Hiệp: {ex.sets}</Text>
            <Text style={styles.tag}>Số lần/Thời gian: {ex.reps}</Text>
            <Text style={styles.tag}>Nghỉ: {ex.rest}</Text>
          </View>
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
  subText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#38BDF8',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  exHeader: {
    marginBottom: 8,
  },
  exName: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
  },
  exDetailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#334155',
    color: '#BAE6FD',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
});
