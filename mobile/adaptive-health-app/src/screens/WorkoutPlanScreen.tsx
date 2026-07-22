import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  onSelectWorkout: (workout: any) => void;
  onNavigateManualInput: () => void;
  onBack: () => void;
}

export const WorkoutPlanScreen: React.FC<Props> = ({ onSelectWorkout, onNavigateManualInput, onBack }) => {
  const workouts = [
    {
      id: 'w1',
      title: 'HIIT Đốt Mỡ Cường Độ Cao 🏋️‍♂️',
      duration: '35 phút',
      intensity: 'Cao (alpha = 1.0)',
      targetMuscles: 'Toàn thân (Full Body)',
      exercisesCount: 5,
      exercises: [
        { name: 'Jumping Jacks', sets: '3 sets', reps: '45 giây', rest: '15 giây' },
        { name: 'Burpees', sets: '4 sets', reps: '15 reps', rest: '30 giây' },
        { name: 'Push-ups', sets: '3 sets', reps: '20 reps', rest: '30 giây' },
        { name: 'Mountain Climbers', sets: '4 sets', reps: '40 giây', rest: '20 giây' },
        { name: 'Plank Hold', sets: '3 sets', reps: '60 giây', rest: '45 giây' },
      ],
    },
    {
      id: 'w2',
      title: 'Stretching & Giãn Cơ Phục Hồi 🧘‍♀️',
      duration: '20 phút',
      intensity: 'Thấp (Phục hồi mệt mỏi)',
      targetMuscles: 'Cột sống & Đùi sau',
      exercisesCount: 4,
      exercises: [
        { name: 'Cat-Cow Pose', sets: '2 sets', reps: '60 giây', rest: '10 giây' },
        { name: 'Downward Dog', sets: '3 sets', reps: '45 giây', rest: '15 giây' },
        { name: 'Child Pose', sets: '2 sets', reps: '90 giây', rest: '0 giây' },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <Text style={styles.title}>Gợi Ý Bài Tập Hôm Nay 🏃‍♂️</Text>
        <TouchableOpacity style={styles.manualBtn} onPress={onNavigateManualInput}>
          <Text style={styles.manualBtnText}>✍️ Nhập Thủ Công</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Được cá nhân hóa dựa trên chỉ số mệt mỏi FRI của bạn</Text>

      {workouts.map((w) => (
        <TouchableOpacity key={w.id} style={styles.card} onPress={() => onSelectWorkout(w)}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{w.title}</Text>
            <Text style={styles.cardDuration}>⏱️ {w.duration}</Text>
          </View>

          <Text style={styles.intensityText}>🔥 Cường độ: {w.intensity}</Text>
          <Text style={styles.muscleText}>🎯 Nhóm cơ: {w.targetMuscles}</Text>
          <Text style={styles.exerciseCountText}>📌 Số bài tập: {w.exercisesCount} bài</Text>
        </TouchableOpacity>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    flex: 1,
  },
  manualBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#38BDF8',
  },
  manualBtnText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 6,
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  cardDuration: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: 'bold',
  },
  intensityText: {
    color: '#F59E0B',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  muscleText: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },
  exerciseCountText: {
    color: '#CBD5E1',
    fontSize: 13,
  },
});
