import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  userId: string | null;
  login: (token: string, id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
interface AuthProviderProps {
    children: React.ReactNode; // Define the children prop explicitly
  }
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = (token: string, id: string) => {
    // Your login logic here
    setAccessToken(token)
    setUserId(id)
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Your logout logic here
    setAccessToken(null)
    setUserId(null)
    setIsAuthenticated(false);
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    userId,
    accessToken,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
