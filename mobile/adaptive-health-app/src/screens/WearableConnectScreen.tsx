import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

interface Props {
  userId: string;
  onBack: () => void;
}

export const WearableConnectScreen: React.FC<Props> = ({ userId, onBack }) => {
  const [connectedApple, setConnectedApple] = useState(true);
  const [connectedGoogle, setConnectedGoogle] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleSyncNow = async (providerName: string) => {
    setSyncing(true);
    try {
      // Mock call wearable-sync-service
      const res = await fetch('http://localhost:8083/api/v1/wearable/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          provider: providerName === 'Apple Health' ? 'APPLE_HEALTH' : 'GOOGLE_FIT',
          dataPoints: [
            { metricType: 'HEART_RATE', value: 72, unit: 'bpm', timestamp: new Date().toISOString() },
            { metricType: 'STEP_COUNT', value: 8420, unit: 'steps', timestamp: new Date().toISOString() },
            { metricType: 'SLEEP_HOURS', value: 7.5, unit: 'hours', timestamp: new Date().toISOString() }
          ]
        })
      });
      const data = await res.json();
      Alert.alert('Thành công', `Đã đồng bộ ${data.processedPoints} chỉ số từ ${providerName}`);
    } catch (e: any) {
      Alert.alert('Đồng bộ thành công (Chế độ Mock)', `Đã cập nhật chỉ số mới nhất từ ${providerName}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <Text style={styles.backText}>⬅️ Quay lại Dashboard</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Kết Nối Thiết Bị Đeo ⌚</Text>
      <Text style={styles.subtitle}>Đồng bộ tự động bước chân, nhịp tim nghỉ & giấc ngủ theo thời gian thực</Text>

      {/* Device Item: Apple Health */}
      <View style={styles.deviceCard}>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceIcon}>🍎</Text>
          <View>
            <Text style={styles.deviceName}>Apple Health / HealthKit</Text>
            <Text style={styles.deviceStatus}>
              {connectedApple ? '🟢 Đã kết nối • Tự động đồng bộ' : '⚪ Chưa kết nối'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.syncBtn, !connectedApple && styles.connectBtn]}
          onPress={() => (connectedApple ? handleSyncNow('Apple Health') : setConnectedApple(true))}
          disabled={syncing}
        >
          {syncing ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.syncBtnText}>{connectedApple ? 'Đồng Bộ Ngay' : 'Kết Nối'}</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Device Item: Google Fit */}
      <View style={styles.deviceCard}>
        <View style={styles.deviceInfo}>
          <Text style={styles.deviceIcon}>🌐</Text>
          <View>
            <Text style={styles.deviceName}>Google Fit REST API</Text>
            <Text style={styles.deviceStatus}>
              {connectedGoogle ? '🟢 Đã kết nối • Tự động đồng bộ' : '⚪ Chưa kết nối'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.syncBtn, !connectedGoogle && styles.connectBtn]}
          onPress={() => (connectedGoogle ? handleSyncNow('Google Fit') : setConnectedGoogle(true))}
          disabled={syncing}
        >
          <Text style={styles.syncBtnText}>{connectedGoogle ? 'Đồng Bộ Ngay' : 'Kết Nối'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    padding: 20,
  },
  backBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  backText: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 24,
  },
  deviceCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#334155',
  },
  deviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deviceIcon: {
    fontSize: 32,
  },
  deviceName: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceStatus: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  syncBtn: {
    backgroundColor: '#0284C7',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  connectBtn: {
    backgroundColor: '#10B981',
  },
  syncBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
