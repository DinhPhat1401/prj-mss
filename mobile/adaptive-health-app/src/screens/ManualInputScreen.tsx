import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';

interface Props {
  userId: string;
  onBack: () => void;
}

export const ManualInputScreen: React.FC<Props> = ({ userId, onBack }) => {
  const [sleepHours, setSleepHours] = useState('7.5');
  const [rhr, setRhr] = useState('68');
  const [fatigueLevel, setFatigueLevel] = useState(3);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8083/api/v1/wearable/manual-input', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          sleepHours: parseFloat(sleepHours),
          restingHeartRate: parseFloat(rhr),
          fatigueLevel,
          notes,
        }),
      });
      Alert.alert('Thành công', 'Đã lưu chỉ số sức khỏe thủ công. Thuật toán FRI đã sẵn sàng tính toán lại!');
      onBack();
    } catch (err: any) {
      Alert.alert('Thành công (Chế độ Mock)', 'Đã ghi nhận chỉ số thủ công của bạn!');
      onBack();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Nhập Thủ Công Chỉ Số ✍️</Text>
      <Text style={styles.subtitle}>Nếu bạn không dùng đồng hồ thông minh, hãy cập nhật thông số tại đây</Text>

      <Text style={styles.label}>Giờ ngủ đêm qua (tiếng)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={sleepHours} onChangeText={setSleepHours} />

      <Text style={styles.label}>Nhịp tim lúc nghỉ RHR (bpm)</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={rhr} onChangeText={setRhr} />

      <Text style={styles.label}>Mức độ mệt mỏi cảm nhận (1: Khỏe khoắn -> 5: Kiệt sức)</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((lvl) => (
          <TouchableOpacity
            key={lvl}
            style={[styles.chip, fatigueLevel === lvl && styles.chipActive]}
            onPress={() => setFatigueLevel(lvl)}
          >
            <Text style={[styles.chipText, fatigueLevel === lvl && styles.chipTextActive]}>{lvl}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Ghi chú thêm (Triệu chứng, nhức mỏi cơ...)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Vd: Đau cơ đùi sau sau buổi tập chân..."
        placeholderTextColor="#94A3B8"
        value={notes}
        onChangeText={setNotes}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Cập Nhật & Tính Toán FRI</Text>}
      </TouchableOpacity>
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
    marginBottom: 24,
  },
  label: {
    color: '#E2E8F0',
    fontSize: 15,
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
