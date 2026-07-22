import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { loginUser, registerUser } from '../services/api';

interface Props {
  onSuccess: (token: string, userId: string, name: string) => void;
}

export const LoginScreen: React.FC<Props> = ({ onSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password || (isRegisterMode && !fullName)) {
      Alert.alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      if (isRegisterMode) {
        const res = await registerUser({ email, password, fullName });
        Alert.alert('Thành công', 'Đăng ký tài khoản thành công!');
        onSuccess(res.accessToken, res.userId, res.fullName);
      } else {
        const res = await loginUser({ email, password });
        onSuccess(res.accessToken, res.userId, res.fullName);
      }
    } catch (err: any) {
      Alert.alert('Lỗi', err.message || 'Thao tác thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adaptive AI Health</Text>
      <Text style={styles.subtitle}>{isRegisterMode ? 'Tạo tài khoản mới' : 'Đăng nhập vào hệ thống'}</Text>

      {isRegisterMode && (
        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          placeholderTextColor="#94A3B8"
          value={fullName}
          onChangeText={setFullName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        placeholderTextColor="#94A3B8"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.buttonText}>{isRegisterMode ? 'Đăng Ký' : 'Đăng Nhập'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsRegisterMode(!isRegisterMode)} style={styles.switchContainer}>
        <Text style={styles.switchText}>
          {isRegisterMode ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#38BDF8',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  button: {
    backgroundColor: '#0284C7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#38BDF8',
    fontSize: 14,
  },
});
