const AUTH_SERVICE_URL = 'http://localhost:8081/api/v1/auth';
const USER_SERVICE_URL = 'http://localhost:8082/api/v1/users';

export interface RegisterPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface UserProfilePayload {
  userId: string;
  age: number;
  gender: 'MALE' | 'FEMALE';
  heightCm: number;
  weightKg: number;
  fitnessGoal: 'LOSE_WEIGHT' | 'MAINTAIN_WEIGHT' | 'GAIN_MUSCLE';
  activityLevel: 'SEDENTARY' | 'LIGHTLY_ACTIVE' | 'MODERATELY_ACTIVE' | 'VERY_ACTIVE' | 'EXTRA_ACTIVE';
}

export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`${AUTH_SERVICE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
};

export const loginUser = async (payload: LoginPayload) => {
  const res = await fetch(`${AUTH_SERVICE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

export const saveUserProfile = async (payload: UserProfilePayload, token: string) => {
  const res = await fetch(`${USER_SERVICE_URL}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Saving profile failed');
  return res.json();
};
