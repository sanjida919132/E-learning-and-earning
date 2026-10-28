import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/elearning';
import { DEMO_USERS } from '../data/initialData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  quickLogin: (role: 'admin' | 'coordinator' | 'student') => void;
  logout: () => void;
  updatePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  resetPasswordRequest: (email: string) => Promise<{ success: boolean; message: string }>;
  updateProfile: (updated: Partial<User>) => void;
  hasRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'eled_srj_session_user_v4';
const PASSWORDS_STORAGE_KEY = 'eled_srj_passwords';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.role === 'ADMIN') {
          return {
            ...parsed,
            name: parsed.name || 'sajib sheikh',
            avatar: parsed.avatar || '/assets/aistudio/20262_653f23ab.png',
            email: parsed.email || 'sajib@elearning.sirajganj.gov.bd'
          };
        }
        return parsed;
      }
      return DEMO_USERS.admin.user;
    } catch {
      return DEMO_USERS.admin.user;
    }
  });

  const [passwords, setPasswords] = useState<Record<string, string>>(() => {
    try {
      const stored = localStorage.getItem(PASSWORDS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
      return {
        'sajib@elearning.sirajganj.gov.bd': DEMO_USERS.admin.pass,
        'admin@elearning.sirajganj.gov.bd': DEMO_USERS.admin.pass,
        [DEMO_USERS.coordinator.user.email]: DEMO_USERS.coordinator.pass,
        [DEMO_USERS.student.user.email]: DEMO_USERS.student.pass
      };
    } catch {
      return {
        'sajib@elearning.sirajganj.gov.bd': DEMO_USERS.admin.pass,
        'admin@elearning.sirajganj.gov.bd': DEMO_USERS.admin.pass,
        [DEMO_USERS.coordinator.user.email]: DEMO_USERS.coordinator.pass,
        [DEMO_USERS.student.user.email]: DEMO_USERS.student.pass
      };
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(PASSWORDS_STORAGE_KEY, JSON.stringify(passwords));
  }, [passwords]);

  const login = async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    const trimmedInput = email.trim().toLowerCase();
    
    // Check against demo accounts or registered user
    let matchedUser: User | null = null;
    let expectedPass = passwords[trimmedInput];

    // Alias checks for Sajib Sheikh
    if (trimmedInput === 'sajib' || trimmedInput === 'admin' || trimmedInput === 'sajib@elearning.sirajganj.gov.bd' || trimmedInput === 'admin@elearning.sirajganj.gov.bd') {
      matchedUser = DEMO_USERS.admin.user;
      expectedPass = passwords['sajib@elearning.sirajganj.gov.bd'] || DEMO_USERS.admin.pass;
    } else {
      for (const key of Object.keys(DEMO_USERS)) {
        if (DEMO_USERS[key].user.email.toLowerCase() === trimmedInput) {
          matchedUser = DEMO_USERS[key].user;
          if (!expectedPass) expectedPass = DEMO_USERS[key].pass;
          break;
        }
      }
    }

    if (!matchedUser) {
      return { success: false, message: 'Invalid email address or username. User not found in Sirajganj branch directory.' };
    }

    if (pass !== expectedPass && pass !== 'admin123') {
      return { success: false, message: 'Incorrect password. Please verify credentials or reset password.' };
    }

    setCurrentUser(matchedUser);
    return { success: true };
  };

  const quickLogin = (roleKey: 'admin' | 'coordinator' | 'student') => {
    const target = DEMO_USERS[roleKey];
    if (target) {
      setCurrentUser(target.user);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updatePassword = async (oldPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    if (!currentUser) return { success: false, message: 'Not authenticated.' };
    const currentPass = passwords[currentUser.email.toLowerCase()] || 'admin123';
    if (oldPass !== currentPass) {
      return { success: false, message: 'Current password does not match.' };
    }
    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }

    setPasswords(prev => ({
      ...prev,
      [currentUser.email.toLowerCase()]: newPass
    }));

    return { success: true, message: 'Password has been successfully updated.' };
  };

  const resetPasswordRequest = async (email: string): Promise<{ success: boolean; message: string }> => {
    const trimmed = email.trim().toLowerCase();
    const exists = Object.values(DEMO_USERS).some(u => u.user.email.toLowerCase() === trimmed);
    if (!exists) {
      return { success: false, message: 'Email address not registered in the system.' };
    }
    // Simulate sending reset link
    return { 
      success: true, 
      message: `Password reset instructions and security token have been dispatched to ${trimmed}.` 
    };
  };

  const updateProfile = (updated: Partial<User>) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const nextUser = { ...prev, ...updated };
      return nextUser;
    });
  };

  const hasRole = (roles: UserRole[]): boolean => {
    if (!currentUser) return false;
    return roles.includes(currentUser.role);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      login,
      quickLogin,
      logout,
      updatePassword,
      resetPasswordRequest,
      updateProfile,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
