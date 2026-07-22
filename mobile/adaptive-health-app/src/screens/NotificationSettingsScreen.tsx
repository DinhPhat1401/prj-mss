import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';

interface Props {
  onBack: () => void;
}

export const NotificationSettingsScreen: React.FC<Props> = ({ onBack }) => {
  const [mealReminder, setMealReminder] = useState(true);
  const [workoutReminder, setWorkoutReminder] = useState(true);
  const [friAlerts, setFriAlerts] = useState(true);

  const handleSave = () => {
    Alert.alert('Thành công', 'Đã lưu cài đặt thông báo thông minh!');
    onBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Thông Báo Push & Nhắc Nhở 🔔</Text>
      <Text style={styles.subtitle}>Cấu hình thông báo thông minh để không bỏ lỡ bữa ăn và lịch tập luyện</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.infoCol}>
            <Text style={styles.itemTitle}>🥗 Nhắc nhở bữa ăn (Sáng, Trưa, Tối)</Text>
            <Text style={styles.itemSub}>Thông báo đúng giờ theo chế độ ăn</Text>
          </View>
          <Switch value={mealReminder} onValueChange={setMealReminder} trackColor={{ false: '#334155', true: '#0284C7' }} />
        </View>

        <View style={styles.row}>
          <View style={styles.infoCol}>
            <Text style={styles.itemTitle}>🏃‍♂️ Nhắc nhở tập luyện</Text>
            <Text style={styles.itemSub}>Cảnh báo khi đến giờ tập gợi ý</Text>
          </View>
          <Switch value={workoutReminder} onValueChange={setWorkoutReminder} trackColor={{ false: '#334155', true: '#0284C7' }} />
        </View>

        <View style={styles.row}>
          <View style={styles.infoCol}>
            <Text style={styles.itemTitle}>⚡ Cảnh báo mệt mỏi FRI</Text>
            <Text style={styles.itemSub}>Nhắc nhở nghỉ ngơi khi FRI &lt; 50 điểm</Text>
          </View>
          <Switch value={friAlerts} onValueChange={setFriAlerts} trackColor={{ false: '#334155', true: '#0284C7' }} />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Lưu Cài Đặt</Text>
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
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
    paddingRight: 10,
  },
  itemTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#0284C7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
