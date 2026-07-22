import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';

interface Props {
  userId: string;
  onBack: () => void;
}

export const BlacklistScreen: React.FC<Props> = ({ userId, onBack }) => {
  const [blacklist, setBlacklist] = useState<string[]>(['Cần tây', 'Hải sản', 'Thịt cừu']);
  const [newFood, setNewFood] = useState('');

  const handleAdd = () => {
    if (!newFood.trim()) return;
    if (blacklist.includes(newFood.trim())) {
      Alert.alert('Thực phẩm đã tồn tại trong danh sách');
      return;
    }
    setBlacklist([...blacklist, newFood.trim()]);
    setNewFood('');
  };

  const handleRemove = (food: string) => {
    setBlacklist(blacklist.filter((item) => item !== food));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Quản Lý Blacklist Thực Phẩm 🛡️</Text>
      <Text style={styles.subtitle}>AI Recommendation Engine sẽ loại bỏ 100% món ăn chứa thực phẩm trong danh sách này</Text>

      {/* Input */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên thực phẩm hoặc dị ứng (vd: Tôm, Đậu phộng)..."
          placeholderTextColor="#94A3B8"
          value={newFood}
          onChangeText={setNewFood}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <Text style={styles.sectionTitle}>Danh sách cấm / dị ứng hiện tại ({blacklist.length}):</Text>
      <View style={styles.list}>
        {blacklist.map((item, idx) => (
          <View key={idx} style={styles.itemChip}>
            <Text style={styles.itemText}>🚫 {item}</Text>
            <TouchableOpacity onPress={() => handleRemove(item)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  addBtn: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 10,
  },
  addBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#CBD5E1',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  list: {
    gap: 10,
  },
  itemChip: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7F1D1D',
  },
  itemText: {
    color: '#FCA5A5',
    fontSize: 16,
    fontWeight: '600',
  },
  removeText: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
