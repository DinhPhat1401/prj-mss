import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

interface Props {
  onSelectMeal: (meal: any) => void;
  onNavigateBlacklist: () => void;
  onBack: () => void;
}

export const MealPlanScreen: React.FC<Props> = ({ onSelectMeal, onNavigateBlacklist, onBack }) => {
  const meals = [
    {
      id: '1',
      type: 'Bữa Sáng 🍳',
      name: 'Yến mạch ức gà & trứng luộc',
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 10,
      prepTime: '15 phút',
      ingredients: ['50g Yến mạch', '150g Ức gà', '1 Quả trứng gà', '100ml Sữa tươi không đường'],
    },
    {
      id: '2',
      type: 'Bữa Trưa 🥗',
      name: 'Cơm gạo lứt phi lê cá hồi nướng & súp lơ',
      calories: 650,
      protein: 48,
      carbs: 55,
      fat: 18,
      prepTime: '25 phút',
      ingredients: ['150g Gạo lứt chín', '180g Cá hồi tươi', '100g Súp lơ xanh', '1 thìa Dầu olive'],
    },
    {
      id: '3',
      type: 'Bữa Tối 🍲',
      name: 'Thịt bò xào ớt chuông & salad bơ',
      calories: 520,
      protein: 42,
      carbs: 30,
      fat: 20,
      prepTime: '20 phút',
      ingredients: ['150g Thăn bò', '1 Quả ớt chuông', '1/2 Quả bơ chín', 'Xà lách & Cà chua chery'],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại Dashboard</Text>
      </TouchableOpacity>

      <View style={styles.headerRow}>
        <Text style={styles.title}>Gợi Ý Thực Đơn Hôm Nay 🥗</Text>
        <TouchableOpacity style={styles.blacklistBtn} onPress={onNavigateBlacklist}>
          <Text style={styles.blacklistBtnText}>🛡️ Blacklist</Text>
        </TouchableOpacity>
      </View>

      {meals.map((meal) => (
        <TouchableOpacity key={meal.id} style={styles.mealCard} onPress={() => onSelectMeal(meal)}>
          <View style={styles.cardHeader}>
            <Text style={styles.mealType}>{meal.type}</Text>
            <Text style={styles.caloriesText}>{meal.calories} kcal</Text>
          </View>

          <Text style={styles.mealName}>{meal.name}</Text>

          <View style={styles.macroRow}>
            <View style={styles.macroTag}>
              <Text style={styles.macroText}>P: {meal.protein}g</Text>
            </View>
            <View style={styles.macroTag}>
              <Text style={styles.macroText}>C: {meal.carbs}g</Text>
            </View>
            <View style={styles.macroTag}>
              <Text style={styles.macroText}>F: {meal.fat}g</Text>
            </View>
          </View>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    flex: 1,
  },
  blacklistBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  blacklistBtnText: {
    color: '#FCA5A5',
    fontSize: 13,
    fontWeight: 'bold',
  },
  mealCard: {
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
  mealType: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: 'bold',
  },
  caloriesText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealName: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  macroRow: {
    flexDirection: 'row',
    gap: 8,
  },
  macroTag: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  macroText: {
    color: '#CBD5E1',
    fontSize: 12,
    fontWeight: '600',
  },
});
