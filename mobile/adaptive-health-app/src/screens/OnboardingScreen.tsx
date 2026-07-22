import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { saveUserProfile, UserProfilePayload } from '../services/api';

interface Props {
  userId: string;
  token: string;
  onComplete: (profile: any) => void;
}

export const OnboardingScreen: React.FC<Props> = ({ userId, token, onComplete }) => {
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'MALE' | 'FEMALE'>('MALE');
  const [heightCm, setHeightCm] = useState('170');
  const [weightKg, setWeightKg] = useState('65');
  const [fitnessGoal, setFitnessGoal] = useState<'LOSE_WEIGHT' | 'MAINTAIN_WEIGHT' | 'GAIN_MUSCLE'>('LOSE_WEIGHT');
  const [activityLevel, setActivityLevel] = useState<'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'EXTRA_ACTIVE'>('MODERATELY_ACTIVE');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: UserProfilePayload = {
        userId,
        age: parseInt(age, 10),
        gender,
        heightCm: parseFloat(heightCm),
        weightKg: parseFloat(weightKg),
        fitnessGoal,
        activityLevel,
      };
      const response = await saveUserProfile(payload, token);
      Alert.alert('Thành công', `Chỉ số BMR của bạn: ${response.bmr} kcal. TDEE: ${response.tdee} kcal`);
      onComplete(response);
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Không thể lưu thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Thiết Lập Hồ Sơ Sức Khỏe</Text>
      <Text style={styles.subtitle}>Nhập chỉ số cá nhân để AI tính toán Calo & thực đơn chuẩn xác nhất</Text>

      <Text style={styles.label}>Tuổi</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

      <Text style={styles.label}>Giới tính</Text>
      <View style={styles.row}>
        {(['MALE', 'FEMALE'] as const).map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.chip, gender === g && styles.chipActive]}
            onPress={() => setGender(g)}
          >
            <Text style={[styles.chipText, gender === g && styles.chipTextActive]}>
              {g === 'MALE' ? 'Nam 👨' : 'Nữ 👩'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Chiều cao (cm)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={heightCm} onChangeText={setHeightCm} />

      <Text style={styles.label}>Cân nặng (kg)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={weightKg} onChangeText={setWeightKg} />

      <Text style={styles.label}>Mục tiêu thể hình</Text>
      <View style={styles.col}>
        {[
          { key: 'LOSE_WEIGHT', label: '🔥 Giảm Cân / Siết Cơ' },
          { key: 'MAINTAIN_WEIGHT', label: '⚖️ Giữ Cân / Cân Bằng' },
          { key: 'GAIN_MUSCLE', label: '💪 Tăng Cân / Tăng Cơ' },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            style={[styles.optionCard, fitnessGoal === item.key && styles.optionCardActive]}
            onPress={() => setFitnessGoal(item.key as any)}
          >
            <Text style={[styles.optionText, fitnessGoal === item.key && styles.optionTextActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Hoàn Tất & Bắt Đầu</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#0F172A',
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#38BDF8',
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    gap: 8,
  },
  chip: {
    flex: 1,
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  chipActive: {
    backgroundColor: '#0284C7',
    borderColor: '#38BDF8',
  },
  chipText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  optionCard: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  optionCardActive: {
    backgroundColor: '#0369A1',
    borderColor: '#38BDF8',
  },
  optionText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
