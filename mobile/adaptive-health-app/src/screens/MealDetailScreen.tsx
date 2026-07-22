import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  meal: any;
  onBack: () => void;
}

export const MealDetailScreen: React.FC<Props> = ({ meal, onBack }) => {
  if (!meal) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại danh sách thực đơn</Text>
      </TouchableOpacity>

      <Text style={styles.mealType}>{meal.type}</Text>
      <Text style={styles.mealName}>{meal.name}</Text>

      {/* Calorie & Macro Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerCol}>
          <Text style={styles.bannerVal}>{meal.calories}</Text>
          <Text style={styles.bannerLbl}>Calo (kcal)</Text>
        </View>
        <View style={styles.bannerCol}>
          <Text style={styles.bannerVal}>{meal.protein}g</Text>
          <Text style={styles.bannerLbl}>Protein</Text>
        </View>
        <View style={styles.bannerCol}>
          <Text style={styles.bannerVal}>{meal.carbs}g</Text>
          <Text style={styles.bannerLbl}>Carbs</Text>
        </View>
        <View style={styles.bannerCol}>
          <Text style={styles.bannerVal}>{meal.fat}g</Text>
          <Text style={styles.bannerLbl}>Fat</Text>
        </View>
      </View>

      {/* Ingredients Section */}
      <Text style={styles.sectionTitle}>🛒 Thành Phần Thực Phẩm</Text>
      <View style={styles.card}>
        {meal.ingredients.map((ing: string, idx: number) => (
          <Text key={idx} style={styles.ingredientItem}>• {ing}</Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>⏱️ Thời gian chế biến</Text>
      <Text style={styles.prepTime}>{meal.prepTime}</Text>
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
  mealType: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  mealName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 20,
  },
  banner: {
    backgroundColor: '#0369A1',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  bannerCol: {
    alignItems: 'center',
  },
  bannerVal: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  bannerLbl: {
    color: '#BAE6FD',
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  ingredientItem: {
    color: '#CBD5E1',
    fontSize: 16,
    marginBottom: 8,
  },
  prepTime: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '600',
  },
});
